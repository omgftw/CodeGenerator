const path = require('path')
const child_process = require('child_process')

const root = process.cwd()

function npmInstall(path)
{
    child_process.execSync('npm install', { cwd: path, env: process.env, stdio: 'inherit' })
}

console.log('Installing core libraries...');
npmInstall(root);

console.log('Installing generator libraries...');
npmInstall(path.join(root, 'web-gen-core'));

console.log('Installing UI libraries...');
npmInstall(path.join(root, 'web-gen-ui'));

console.log('Ensuring Angular CLI installation...');
child_process.execSync('npm install -g @angular/cli', { cwd: root, env: process.env, stdio: 'inherit' })

// console.log('Finished installing required libraries...');
console.log('Building UI...');
child_process.execSync('ng build --prod --env=prod', { cwd: path.join(root, 'web-gen-ui'), env: process.env, stdio: 'inherit' })

console.log("Run launch.js");