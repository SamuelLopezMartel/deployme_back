const { createInstance } = require('../aws/createInstance');
const { getProjectName } = require('./getProjectName');
const { executeScript } = require('./scriptsExecuter');
const { remoteExecuter } = require('./remoteExecuter')
const shell = require('shelljs');

module.exports.deployClientProject = (gitUrl, technology) => {
  return new Promise( (resolve, reject) => {
    console.log("tech: ", technology);
    createInstance().then( data => {
      const allPromises = [
        chooseDockerfileCreator(technology, gitUrl),
        //executeScript(`/home/deployme/scripts/createDockerFile.sh ${gitUrl} ${getProjectName(gitUrl)}`),
        executeScript(`/home/deployme/scripts/compressFiles.sh`),
        deploy(data.publicIp, gitUrl)
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
        reject(error);
      })
    })
  });
}

function chooseDockerfileCreator(technology, gitUrl){
  console.log(gitUrl);
  switch(technology){
    case "estatica":
      console.log("entra en estatica");
      executeScript(`/home/deployme/scripts/createDockerFile.sh ${gitUrl} ${getProjectName(gitUrl)}`)
      return 
    case "webpack":
      console.log("entra en webpack");
      return executeScript(`/home/deployme/scripts/createwebpack.sh ${gitUrl} ${getProjectName(gitUrl)}`)      
    case "node":
      return executeScript(`/home/deployme/scripts/createnode.sh ${gitUrl} ${getProjectName(gitUrl)}`) 
    case "php":
      return executeScript(`/home/deployme/scripts/createphp.sh ${gitUrl} ${getProjectName(gitUrl)}`)
    default: 
      console("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!tecnologia invalida");
      break;    
  }
  
}


function deploy(publicIp, gitUrl){
  console.log("llego a deploy");
  return new Promise(( resolve , reject ) => {
    if( shell.exec(`ssh -tt -i /home/deployme/private/eoisamuel.pem -t -o "StrictHostKeyChecking no" ubuntu@${publicIp} "exit; bash -l"`).code !== 0){
      console.log('Primer script')
      shell.exit(1);
      reject();            
    }else{
      if( shell.exec(`scp -i /home/deployme/private/eoisamuel.pem setup-files.tar.gz ubuntu@${publicIp}:/tmp`).code !== 0){
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
          'ls ./client-setup-files/',
          'pwd',
          `sudo docker build -t image-front ./client-setup-files/`,
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

