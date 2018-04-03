const program = require('commander');
const path = require('path');
const utils = require('./utils');

const outputPath = path.join(__dirname, '/output');

(async function() {
    program
    .version('0.1.0')
    .option('-i, --input [videoFile]', 'Specify video file')
    .parse(process.argv);

    if (program.input) {
        try {
            await utils.createDirectory(outputPath)
            await utils.videoToFrames(path.resolve(__dirname, program.input))
            await utils.framesToAscii(outputPath)
        }
        catch(err) {
            console.log(err);
        }
    }
})()