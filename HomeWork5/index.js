const fs = require('fs');
const path = require('path');
let result = {
    files: [],
    dirs: []
}

const MainPath = process.argv.slice(2)[0];

async function Main(MainPath){ 
    if (!MainPath){
        console.log('NO PATH');
        return;
    }
    if (!fs.existsSync(MainPath)){
        console.log('DIRECTORY DOES NOT EXIST');
        return;
    }
    result.dirs.push(MainPath);
    let r = await getDirContent(MainPath);
    console.log(result);
}

async function getDirContent(FolderPath){
    let files = await fs.promises.readdir(FolderPath)
    for await (const file of files){
        let current_path = path.join(FolderPath, file); 
        let stat = await fs.promises.lstat(current_path);
        if(stat.isFile())
            result.files.push(current_path);
        else{
            result.dirs.push(current_path);
            let d = await getDirContent(current_path);
        }
    }
}

Main(MainPath);