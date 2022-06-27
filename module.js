const { persons, ages } = require('./people') // import object from another file
const os = require('os') // operating system object
const fs = require('fs') // file system object

// console.log(os.platform()); // whitch platform we use
// console.log(os.homedir()); // home folder
// console.log(os.hostname()); // hostname
// console.log(persons);

// read file
fs.readFile('./text.txt', (err, data) => {
    if (err) {
        console.log(err);
    }
    console.log(data.toString());
})



// delete file
if (fs.existsSync('./text1.txt')) {
    fs.unlink('./text1.txt', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('file deleted');
    })
}

// create text file
fs.writeFile('./text1.txt', 'Hello world', () => {
    console.log('file was written');
})

// test if folder not exists
if (!fs.existsSync('./assets')) {
    // create folder
    fs.mkdir('./assets', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('folder was created');
    })
}
else {
    fs.rmdir('./assets', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('folder deleted');
    })
}

// start using data before it has finished loading
const readstream = fs.createReadStream('./text.txt', {encoding:'utf8'})
readstream.on('data', (chunk) => {
    console.log('new chunk --------------------------------------------------');
    console.log(chunk);
})


