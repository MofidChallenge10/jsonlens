#!/usr/bin/env node
"use strict";
const fs = require("fs");

const HELP = `🔍 jsonlens - pretty-print and query JSON

Usage:
  jsonlens [file] [options]
  cat data.json | jsonlens -q users[0].name

Options:
  -q, --query <path>   Extract a value (a.b[0].c, a.0.b, or * wildcard)
  -k, --keys           Print the keys of the (queried) object
  -c, --compact        Print minified JSON
  -r, --raw            Print strings without quotes
  -h, --help           Show this help
`;

function parsePath(path) {
  const tokens = [];
  const re = /([^.[\]]+)|\[(\d+)\]/g;
  let m;
  while ((m = re.exec(path)) !== null) {
    tokens.push(m[1] !== undefined ? m[1] : Number(m[2]));
  }
  return tokens;
}

function query(data, tokens) {
  let current = data;
  for (let i = 0; i < tokens.length; i++) {
    if (current === null || current === undefined) return undefined;
    const token = tokens[i];
    if (token === "*") {
      const rest = tokens.slice(i + 1);
      return Object.values(current).map((v) => query(v, rest));
    }
    current = current[token];
  }
  return current;
}

function parseArgs(argv) {
  const opts = { file: null, query: null, keys: false, compact: false, raw: false, help: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "-q" || a === "--query") opts.query = argv[++i];
    else if (a === "-k" || a === "--keys") opts.keys = true;
    else if (a === "-c" || a === "--compact") opts.compact = true;
    else if (a === "-r" || a === "--raw") opts.raw = true;
    else if (a === "-h" || a === "--help") opts.help = true;
    else if (!a.startsWith("-")) opts.file = a;
    else {
      console.error(`❌ Unknown option: ${a}`);
      process.exit(2);
    }
  }
  return opts;
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help || (!opts.file && process.stdin.isTTY)) {
    console.log(HELP);
    return;
  }

  let input;
  try {
    input = fs.readFileSync(opts.file || 0, "utf8");
  } catch (err) {
    console.error(`❌ Cannot read input: ${err.message}`);
    process.exit(2);
  }

  let data;
  try {
    data = JSON.parse(input);
  } catch (err) {
    console.error(`❌ Invalid JSON: ${err.message}`);
    process.exit(2);
  }

  let result = opts.query ? query(data, parsePath(opts.query)) : data;
  if (result === undefined) {
    console.error("⚠️  Path not found");
    process.exit(1);
  }

  if (opts.keys) {
    result = result !== null && typeof result === "object" ? Object.keys(result) : [];
  }

  if (opts.raw && typeof result === "string") {
    console.log(result);
  } else {
    console.log(JSON.stringify(result, null, opts.compact ? 0 : 2));
  }
}

main();
