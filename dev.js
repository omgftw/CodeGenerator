const path = require('path');
const childProcess = require('child_process');

const root = process.cwd();

console.log('Compiling Settings Files...');
// Compile settings files
childProcess.execSync('tsc generator.ts', {
    cwd: root,
    env: process.env,
    stdio: 'inherit',
});


console.log('Launching Server...');
// Running node server
let server = childProcess.exec('node server.js', {
    cwd: root,
    env: process.env,
    stdio: 'inherit',
});

console.log('Launching UI');
// Running angular CLI serve to serve front-end in dev mode
let ui = childProcess.exec('ng serve', {
    cwd: path.join(root, 'web-gen-ui'),
    env: process.env,
    stdio: 'inherit',
});
console.log('Navigate to http://localhost:4200 in your browser...');

// Echo server console
server.stdout.on('data', function(data) {
    console.log('Server: ' + data);
});

// Echo ui console
ui.stdout.on('data', function(data) {
    console.log('UI: ' + data);
});
