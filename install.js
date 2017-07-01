const path = require('path');
const childProcess = require('child_process');

const root = process.cwd();

/**
 * @param {string} package - The package to check via npm ls
 * @param {boolean} global - Whether the package should be
 * checked with the -g parameter
 * @return {Promise<boolean>} - Whether the npm package is installed
 */
function npmCheckInstalled(package, global) {
    return new Promise((resolve) => {
        if (global) package = '-g ' + package;
        let npm = childProcess.exec('npm ls ' + package, {
            cwd: root,
            env: process.env,
            stdio: 'inherit',
        });

        npm.stdout.on('data', function (data) {
            resolve(data.indexOf('-- (empty)') === -1);
        });
    });
}

/**
 * Runs 'npm install' on the passed directory
 * @param {string} path
 * @return {Promise}
 */
function npmInstall(path) {
    return new Promise((resolve) => {
        let child = childProcess.exec('npm install', {
            cwd: path,
            env: process.env,
            stdio: 'inherit',
        });
        child.on('exit', () => {
            resolve();
        });
    });
}

/**
 * @param {string} package - The package to be installed
 * @param {boolean} global - Whether the package should be installed globally
 * @return {Promise} - Resolves once the npm process exits
 */
function npmInstallPackage(package, global) {
    return new Promise((resolve) => {
        if (global) package = '-g ' + package;
        let child = childProcess.exec('npm install ' + package, {
            cwd: root,
            env: process.env,
            stdio: 'inherit',
        });

        child.on('exit', () => {
            resolve();
        });
    });
}


let pendingInstalls = [];

// Runs npm install in the root folder
console.log('Installing core libraries...');
let coreInstallPromise =
    npmInstall(root).then(() => {
        console.log('Finished installing core libraries...');
    });
pendingInstalls.push(coreInstallPromise);


// Runs npm install in the web-gen-core folder
console.log('Installing generator libraries...');
let webGenInstallPromise =
    npmInstall(path.join(root, 'web-gen-core')).then(() => {
        console.log('Finished installing generator libraries...');
    });
pendingInstalls.push(webGenInstallPromise);


// Runs npm install in the web-gen-ui folder
console.log('Installing UI libraries...');
let uiInstallPromise =
    npmInstall(path.join(root, 'web-gen-ui')).then(() => {
        console.log('Finished installing UI libraries...');
    });
pendingInstalls.push(uiInstallPromise);


// console.log('Checking for existing Angular CLI installation...');
// Installs Angular CLI globally if it isn't already installed
let angularCliCheckPromise =
    npmCheckInstalled('@angular/cli', true)
        .then((installed) => {
            if (installed) {
                console.log('Angular CLI already installed. ' +
                    'Skipping installation...');
            } else {
                console.log('No global Angular CLI installation found. ' +
                    'Installing now...');
                return npmInstallPackage('@angular/cli', true).then(() => {
                    console.log('Angular CLI installation finished...');
                });
            }
        });
pendingInstalls.push(angularCliCheckPromise);


// console.log('Checking for existing global TypeScript installation...');
// Installs TypeScript globally if it isn't already installed
let typescriptCheckPromise =
    npmCheckInstalled('typescript', true)
        .then((installed) => {
            if (installed) {
                console.log('TypeScript already installed. ' +
                    'Skipping installation...');
            } else {
                console.log('No global TypeScript installation found. ' +
                    'Installing now...');
                return npmInstallPackage('typescript', true).then(() => {
                    console.log('TypeScript installation finished...');
                });
            }
        });
pendingInstalls.push(typescriptCheckPromise);


// Wait for libraries to finish installing
// then run ng build
Promise.all(pendingInstalls).then(() => {
    console.log('All installations completed...');
    console.log('Performing post-install tasks...')

    let pendingPostInstalls = [];
    let compilePromise = new Promise((resolve) => {
        console.log('Compiling Settings Files...');
        let child =
            childProcess.exec('tsc generator.ts', {
                cwd: path.join(root),
                env: process.env,
                stdio: 'inherit',
            });

        child.on('exit', () => {
            resolve();
        });
    });
    pendingPostInstalls.push(compilePromise);

    let buildPromise = new Promise((resolve) => {
        console.log('Building UI...');
        let child =
            childProcess.exec('ng build --prod --env=prod', {
                cwd: path.join(root, 'web-gen-ui'),
                env: process.env,
                stdio: 'inherit',
            });

        child.on('exit', () => {
            resolve();
        });
    });
    pendingPostInstalls.push(buildPromise);

    Promise.all(pendingPostInstalls).then(() => {
        console.log('All post-install tasks completed...')
        console.log('Run "node launch.js"');
    });
});
