import fs from 'fs';

const nodeModulesExists = fs.existsSync('./node_modules');

if (!nodeModulesExists) {
  console.error('\x1b[31m%s\x1b[0m', '[ERROR] Please run "npm install" before starting the project.');
  process.exit(1);
}
