const childProcess = require('child_process');

const root = process.cwd();

console.log('Running Application...');
console.log('Navigate to http://localhost:3000 in your browser...');
childProcess.execSync('node server.js', {
    cwd: root,
    env: process.env,
    stdio: 'inherit',
});
