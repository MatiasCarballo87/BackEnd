const fs = require('fs');

let read;

try {
    fs.writeFileSync('./fyh.txt', Date.now().toLocaleString());
    read = fs.readFileSync('./fyh.txt', 'utf-8');
}catch(e){
    console.log(e)
}

console.log(read);