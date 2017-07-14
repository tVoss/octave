#!/usr/bin/env node

const fs = require('fs');
const movies = require('./movies.json');
const path = require('path')

const printUsage = () => {
    console.log('usage: octave movie_dir');
    console.log('scid.* -> title.*');
}

const renameFile = (filename) => {
    
    const split = filename.split('.');
    if (split.length !== 2) {
        return console.log(`${filename} has an unrecognized filename format.`);
    }

    const entry = movies.filter(m => m.scid === split[0])[0];
    if (!entry) {
        return console.log(`could not find entry for ${filename}`);
    }

    const oldpath = path.join(process.argv[2], filename);
    const newpath = path.join(process.argv[2], `${entry.title}.${split[1]}`);
    fs.rename(oldpath, newpath, (err) => {
        if (err) {
            console.log(`there was an error renaming ${filename}`);
        } else {
            console.log(`${filename} -> ${entry.title}.${split[1]}`);
        }
    });
}

if (process.argv.length !== 3) {
    return printUsage();
}

fs.readdir(process.argv[2], (err, files) => {
    if (err) {
        console.log(`directory not found: ${process.argv[2]}`);
        return printUsage();
    }
    files.forEach(renameFile);
});