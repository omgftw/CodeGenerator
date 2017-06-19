const path = require('path')
const child_process = require('child_process')

const root = process.cwd()

console.log('Running Application...');
console.log('Navigate to http://localhost:3000 in your browser...');
child_process.execSync('node server.js', { cwd: root, env: process.env, stdio: 'inherit' })
