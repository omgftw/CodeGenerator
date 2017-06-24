const path = require('path');
const childProcess = require('child_process');

const root = process.cwd();

/**
 * Runs 'npm install' on the passed directory
 * @param {string} path
 */
function npmInstall(path) {
    childProcess.execSync('npm install', {
        cwd: path,
        env: process.env,
        stdio: 'inherit',
    });
}

console.log('Installing core libraries...');
npmInstall(root);

console.log('Installing generator libraries...');
npmInstall(path.join(root, 'web-gen-core'));

console.log('Installing UI libraries...');
npmInstall(path.join(root, 'web-gen-ui'));

console.log('Ensuring Angular CLI installation...');
childProcess.execSync('npm install -g @angular/cli', {
    cwd: root,
    env: process.env,
    stdio: 'inherit',
});

// console.log('Finished installing required libraries...');
console.log('Building UI...');
childProcess.execSync('ng build --prod --env=prod', {
    cwd: path.join(root, 'web-gen-ui'),
    env: process.env,
    stdio: 'inherit',
});

console.log('Run launch.js');
