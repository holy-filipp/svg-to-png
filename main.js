const sharp = require('sharp');
const fs = require('fs');

const input = './input/';
const output = './output/';

console.log('Searching files to convert...');

fs.readdirSync(input).forEach(async file => {
    console.log(`Trying to convert file ${file}`);
    var newName = file.replace(/\.[^/.]+$/, '') + '.png';
    var savePath = output + newName;

    var data = fs.readFileSync(input + file, 'utf8');
    data = data.replace('currentColor', '#fff');

    sharp(Buffer.from(data))
        .resize(256, 256)
        .png()
        .toFile(savePath)
        .then(function(info) {
            console.log(`Successfully converted file, saved as ${newName}`);
            fs.unlink(input + file, (err) => {
                if(err) return console.log(err);
            });
        })
        .catch(function(err) {
            console.log(err)
        })
});