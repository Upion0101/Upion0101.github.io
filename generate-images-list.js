const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src/assets/photos');
let images = [];

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.error('Unable to scan directory: ' + err);
    } 

    files.forEach((file) => {
        const ext = path.extname(file).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.heic'].includes(ext)) {
            images.push(file);
        }
    });

    const exportData = 'export const IMAGES_LIST = ' + JSON.stringify(images) + ';';

    fs.writeFile('src/assets/images-list.ts', exportData, (err) => {
        if (err) throw err;
        console.log('Image list generated!');
    });
});
