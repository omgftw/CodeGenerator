const path = require('path');
const childProcess = require('child_process');
const root = process.cwd();

console.log('Compiling Settings Files...');
childProcess.execSync('tsc generator.ts', {
    cwd: path.join(root),
    env: process.env,
    stdio: 'inherit',
});

console.log('Building UI...');
childProcess.execSync('ng build --env=prod', {
    cwd: path.join(root, 'web-gen-ui'),
    env: process.env,
    stdio: 'inherit',
});

console.log('Run "node launch.js"');
