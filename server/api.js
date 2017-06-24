const express = require('express');
const router = express.Router();

const helpers = require('yeoman-test');
const path = require('path');

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});

router.post('/test', (req, res) => {
    console.log(req.body);
    let data = req.body;
    helpers.run(path.join(__dirname, '../web-gen-core/generators/app'))
    // .withOptions({ foo: 'bar' })    // Mock options passed in
    // .withArguments(['name-x'])      // Mock the arguments
        .cd(__dirname)
        .withPrompts({
            generatorType: data.generatorType,
            generateFiles: data.generateFiles,
        })
        .on('end', function() {
            res.send({
                finished: true,
                params: data,
            });
        });
});

router.post('/test-page-1', (req, res) => {
    let data = req.body;
    console.log(data);
    helpers.run(path.join(__dirname, '../web-gen-core/generators/test-page-1'))
        .cd(__dirname)
        .withPrompts(data)
        .on('end', function() {
            res.send({
                finished: true,
                params: data,
            });
        });
});

module.exports = router;
