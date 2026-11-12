import path from 'path';       
 console.log(path);
 
 let myPath=path.join('/folder1','folder2','folder3','file.txt');
    console.log(myPath);
    console.log(path.basename(myPath));
    console.log(path.dirname(myPath));
    console.log(path.extname(myPath));
    console.log(path.join("c:/","program\\progrMING.txt"))