const { exec } = require('child_process');

module.exports.executeScript = path  => {
  exec(`sh ${path}`, (error, stdout, stderr) => {
      console.log(`${stdout}`);
      console.log(`${stderr}`);
      if (error !== null) {
          console.log(`exec error: ${error}`);
      }
  });
}