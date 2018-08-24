const { createInstance } = require('../aws/createInstance');
const { getProjectName } = require('./getProjectName');
const { executeScript } = require('./scriptsExecuter');
const { remoteExecuter } = require('./remoteExecuter')
const shell = require('shelljs');

module.exports.deployClientProject = (gitUrl) => {
  return new Promise( (resolve, reject) => {
    createInstance().then( data => {
      const allPromises = [
        executeScript(`/home/deployme/scripts/createDockerFile.sh ${gitUrl} ${ getProjectName(gitUrl) }`),
        executeScript(`/home/deployme/scripts/compressFiles.sh`),
        deploy(data.publicIp)
      ]
      Promise.all(allPromises).then(() => {
        console.log(`Ec2 instance (${ data.instanceId }) created and asocciated to this public ip: ${ data.publicIp }`);
        const dataResolve = {
          publicIp : data.publicIp,
          nameProyect: getProjectName(gitUrl),
          gitUrl,
          instanceId: data.instanceId,
          elasticId: data.allocationId
        }
        resolve(dataResolve);        
      }).catch(error => {
        console.log('Posible error ', error )
        reject();
      })
    })
  });
}

function deploy(publicIp){
  return new Promise(( resolve , reject ) => {
    if( shell.exec(`ssh -tt -i /home/deployme/private/deploymepairkeys.pem -t -o "StrictHostKeyChecking no" ubuntu@${publicIp} "exit; bash -l"`).code !== 0){
      console.log('Primer script')
      shell.exit(1);
      reject();            
    }else{
      if( shell.exec(`scp -i /home/deployme/private/deploymepairkeys.pem setup-files.tar.gz ubuntu@${publicIp}:/tmp`).code !== 0){
        shell.exit(1);
        console.log('Primer script')
        reject();
      }else{
        console.log('hasta aqui todo ok')
        shell.exec("rm setup-files.tar.gz");
        const commandsToSetup = [ 
          'tar -xzf /tmp/setup-files.tar.gz',
          'sudo apt update',
          'rm /tmp/setup-files.tar.gz',
          'sudo apt install docker.io -y',
          'sudo docker build -t image-front ./client-setup-files/',
          'sudo docker run -d -p 80:80 image-front',
          'exit'
        ];
        remoteExecuter(publicIp, commandsToSetup).then(() => {
          resolve();
        }).catch(error => {
          console.log('Cakita ' , error)
          reject();                                        
        })
      }
    }
  })    
}

