const path = require('path');
const childProcess = require('child_process');

const root = process.cwd();

console.log('Building UI...');
childProcess.execSync('ng build --prod --env=prod', {
    cwd: path.join(root, 'web-gen-ui'),
    env: process.env,
    stdio: 'inherit',
});

console.log('Run launch.js');
