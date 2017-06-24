const Generator = require('yeoman-generator');

let gen = {};

module.exports = class extends Generator {
    /**
     * First method called
     */
    initializing() {
        gen = this;
        gen.destinationRoot('output');
    }

    /**
     * Gets user input
     * @return {Promise<inquirer.Answers>} nothing
     */
    prompting() {
        return this.prompt([{
            type: 'input',
            name: 'displayText',
            message: '',
            default: '',
        },
        {
            type: 'input',
            name: 'textColor',
            message: '',
            default: '',
        },
        {
            type: 'input',
            name: 'backgroundColor',
            message: '',
            default: '',
        }])
            .then((answers) => {
                let file1 = 'test-page-1.html';
                gen.fs.copyTpl(
                    gen.templatePath(file1),
                    gen.destinationPath(file1),
                    // since all the answers are actually params passed
                    // by the API just pass the object through
                    answers
                );
            });
    }
};
