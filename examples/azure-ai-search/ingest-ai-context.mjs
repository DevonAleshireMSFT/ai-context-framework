#!/usr/bin/env node
// Reference example: ingest committed .ai/ Markdown into Azure AI Search.
// Reads Azure Search configuration from environment variables; never hardcode secrets.

import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();
const aiRoot = path.join(repoRoot, '.ai');
const endpoint = process.env.AZURE_SEARCH_ENDPOINT;
const apiKey = process.env.AZURE_SEARCH_API_KEY;
const indexName = process.env.AZURE_SEARCH_INDEX ?? 'ai-context';
const apiVersion = '2024-07-01';
const chunkSize = 3000;

async function walkMarkdown(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walkMarkdown(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

function parseFrontMatter(markdown) {
  if (!markdown.startsWith('---\n')) {
    return { metadata: {}, body: markdown };
  }

  const end = markdown.indexOf('\n---\n', 4);
  if (end === -1) {
    return { metadata: {}, body: markdown };
  }

  const metadata = {};
  const frontMatter = markdown.slice(4, end).trim();
  const body = markdown.slice(end + 5).trim();

  for (const line of frontMatter.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (match) {
      metadata[match[1]] = match[2].trim();
    }
  }

  return { metadata, body };
}

function titleFrom(markdown, metadata, sourcePath) {
  if (metadata.title) return metadata.title;
  const heading = markdown.match(/^#\s+(.+)$/m);
  return heading ? heading[1].trim() : sourcePath;
}

function splitList(value) {
  if (!value) return [];
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function chunkText(text) {
  const paragraphs = text.split(/\n{2,}/);
  const chunks = [];
  let current = '';

  for (const paragraph of paragraphs) {
    const next = current ? `${current}\n\n${paragraph}` : paragraph;
    if (next.length > chunkSize && current) {
      chunks.push(current);
      current = paragraph;
    } else {
      current = next;
    }
  }

  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

function toSearchDocuments(filePath, markdown) {
  const sourcePath = path.relative(repoRoot, filePath).split(path.sep).join('/');
  const { metadata, body } = parseFrontMatter(markdown.replace(/\r\n/g, '\n'));
  const chunks = chunkText(body);

  return chunks.map((content, index) => ({
    id: createHash('sha256').update(`${sourcePath}:${index}`).digest('base64url'),
    title: titleFrom(body, metadata, sourcePath),
    content,
    owner: metadata.owner,
    contextVersion: metadata['context-version'],
    lastUpdated: metadata['last-updated'],
    appliesTo: splitList(metadata['applies-to']),
    adrStatus: sourcePath.startsWith('.ai/adr/') ? metadata.status : undefined,
    sourcePath
  }));
}

async function pushDocuments(docs) {
  const response = await fetch(`${endpoint}/indexes/${encodeURIComponent(indexName)}/docs/index?api-version=${apiVersion}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey
    },
    body: JSON.stringify({
      value: docs.map((doc) => ({ '@search.action': 'mergeOrUpload', ...doc }))
    })
  });

  if (!response.ok) {
    throw new Error(`Azure AI Search push failed: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

const files = await walkMarkdown(aiRoot);
const docs = (await Promise.all(files.map(async (file) => toSearchDocuments(file, await readFile(file, 'utf8'))))).flat();

if (!endpoint || !apiKey) {
  console.log(`Prepared ${docs.length} documents for index '${indexName}'. Set AZURE_SEARCH_ENDPOINT and AZURE_SEARCH_API_KEY to push.`);
  console.log(JSON.stringify(docs.slice(0, 2), null, 2));
} else {
  const result = await pushDocuments(docs);
  console.log(`Pushed ${docs.length} documents to index '${indexName}'.`);
  console.log(JSON.stringify(result, null, 2));
}
