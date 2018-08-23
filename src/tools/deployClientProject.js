const { createInstance } = require('../aws/createInstance');
const { getProjectName } = require('./getProjectName');
const { executeScript } = require('./scriptsExecuter');
const shell = require('shelljs');
var rexec = require('remote-exec');

// Project to test 
const gitUrl = 'https://github.com/sakdev/TheFox.git';

module.exports.deployClientProject = (gitUrl) => {
  createInstance().then( data => {
    console.log(`Ec2 instance (${ data.instanceId }) created and asocciated to this public ip: ${ data.publicIp }`);
    executeScript(`/home/deployme/scripts/createDockerFile.sh ${gitUrl} ${ getProjectName(gitUrl) }`);
    executeScript(`/home/deployme/scripts/compressFiles.sh`);
    deploy(data.publicIp);
  })
}

function deploy(publicIp){
  if( shell.exec(`ssh -tt -i /home/deployme/private/deploymepairkeys.pem -t -o "StrictHostKeyChecking no" ubuntu@${publicIp} "exit; bash -l"`).code !== 0){
    console.log("Problems with ssh1");
    shell.exit(1);
  }else{
    console.log("hice el primer ssh")
    if( shell.exec(`scp -i /home/deployme/private/deploymepairkeys.pem setup-files.tar.gz ubuntu@${publicIp}:/tmp`).code !== 0){
      console.log("Problems with scp");
      shell.exit(1);
    }else{
      console.log("pasé el fichero")
      shell.exec("rm setup-files.tar.gz");
      remoteExecuter(publicIp);
    }
  }
}

function remoteExecuter(publicIp){
  const connection_options = {
    port: 22,
    username: 'ubuntu',
    privateKey: require('fs').readFileSync('./private/deploymepairkeys.pem'),
    passphrase: ''
  };
  
  const hosts = [ publicIp ];

  const cmds = [ 
    'tar -xzf /tmp/setup-files.tar.gz',
    'sudo apt update',
    'rm /tmp/setup-files.tar.gz',
    'sudo apt install docker.io -y',
    'sudo docker build -t image-front ./client-setup-files/',
    'sudo docker run -p 80:80 image-front'
  ];

  rexec(hosts, cmds, connection_options, function(err){
      if (err) {
          console.log(err);
      } else {
          console.log('Great Success!!');
      }
  });
}