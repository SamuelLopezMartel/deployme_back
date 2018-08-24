const { exec } = require('child_process');

module.exports.executeScript = path  => {
    return new Promise((resolve, reject) => {
        exec(`sh ${path}`, (error, stdout, stderr) => {
          if (error !== null) {
              console.log(`exec error: ${error}`);
              reject();
          }else{
              console.log('Sucessfull execute scripts')
              resolve();
          }
        });
    })
}