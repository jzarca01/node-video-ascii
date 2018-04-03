const spawn = require('@expo/spawn-async');
const path = require('path');
const fs = require('await-fs');
const imageToAscii = require("image-to-ascii");
const clear = require('clear');

async function createDirectory(dirPath) {
    try {
        await new Promise(async (resolve, reject) => {
            fs.mkdir(dirPath, err => {
                if (err) reject(err);
                else resolve();
            });
        });
    }
    catch (err) {
      console.log("Output folder creation error or exists already");
    }
  }

async function videoToFrames(video) {
    try {
        console.log("Converting video to frames...");
        let ffmpegVideoFrameProcess = await spawn('ffmpeg', [
            '-i', `${video}`,
            '-f', 'image2',
            '-bt', '20M',
            '-vf', 'fps=1',
            `./output/${path.parse(video).name}%03d.jpg`
        ]);
    }
    catch(err) {
        console.log(err);
    }
}

async function framesToAscii(outputPath) {
    try {
        console.log("Converting frames to ASCII...");
        const frames = await fs.readdir(outputPath);
        frames.filter(file => file.lastIndexOf(".jpg") > -1).map(frame => {
            imageToAscii(path.join(outputPath, frame), (err, converted) => {
                clear();
                console.log(err || converted);
            });
        });
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = {
    createDirectory: createDirectory,
    videoToFrames: videoToFrames,
    framesToAscii: framesToAscii
};