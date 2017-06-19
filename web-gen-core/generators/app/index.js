var Generator = require('yeoman-generator');

var gen = {};

var test1 = function (genFiles) {
    console.log("test1");
    console.log(genFiles);
    gen.fs.copyTpl(
        gen.templatePath('testTemplate1.html'),
        gen.destinationPath('testTemplate1.html'),
        { title: 'You chose option 1' }
    );
};

var test2 = function (genFiles) {
    console.log("test2");
    console.log(genFiles);
    gen.fs.copyTpl(
        gen.templatePath('testTemplate1.html'),
        gen.destinationPath('testTemplate1.html'),
        { title: 'You chose option 2' }
    );
};

module.exports = class extends Generator {
    initializing() {
        gen = this;

        gen.destinationRoot('output');

        console.log(gen.destinationRoot());
        console.log(gen.sourceRoot());
    }

    method1() {
        console.log('arbitrary first method');
    };

    prompting() {

        return this.prompt([{
            type: 'input',
            name: 'generatorType',
            message: 'What would you like to generate? (1 or 2)',
            default: 1//this.appname // Default to current folder name
        }, {
            type: 'confirm',
            name: 'generateFiles',
            message: 'Would you like to generate files?'
        }]).then((answers) => {
            console.log(answers.generatorType);
            if (answers.generatorType == 1) {
                test1(answers.generateFiles);
            } else if (answers.generatorType == 2) {
                test2(answers.generateFiles);
            }
        });
    }
};