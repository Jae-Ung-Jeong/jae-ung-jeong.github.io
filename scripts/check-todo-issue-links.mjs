import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const TARGET_DIR = path.join(ROOT, 'src');
const TARGET_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx']);
const REQUIRED_PATTERN = /TODO\(#\d+\):/;

const violations = [];

function walk(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.')) {
      continue;
    }

    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (!TARGET_EXTENSIONS.has(path.extname(entry.name))) {
      continue;
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    const lines = content.split(/\r?\n/);
    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      if (!line.includes('TODO')) {
        continue;
      }

      if (!REQUIRED_PATTERN.test(line)) {
        violations.push({
          file: path.relative(ROOT, fullPath),
          line: index + 1,
          text: line.trim(),
        });
      }
    }
  }
}

if (!fs.existsSync(TARGET_DIR)) {
  console.error(`Target directory not found: ${TARGET_DIR}`);
  process.exit(1);
}

walk(TARGET_DIR);

if (violations.length > 0) {
  console.error('TODO issue-link policy violations detected.');
  console.error('Required format: TODO(#<issue_id>): <description>');
  for (const violation of violations) {
    console.error(
      `- ${violation.file}:${violation.line} -> ${violation.text || '(empty line)'}`
    );
  }
  process.exit(1);
}

console.log('TODO issue-link policy check passed.');
