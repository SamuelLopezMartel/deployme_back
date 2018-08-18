const { configureAWS } = require('./src/aws/configureAWS');
const { createInstance } = require('./src/aws/createInstance');
const { executeScript } = require('./src/tools/scriptsExecuter');
const { getProjectName } = require('./src/tools/getProjectName');
// Project to test 
const gitUrl = 'https://github.com/sakdev/TheFox.git';

configureAWS();
createInstance().then( data => {
  console.log(`Ec2 instance (${ data.instanceId }) created and asocciated to this public ip: ${ data.publicIp }`);
  executeScript(`/home/deployme/scripts/createDockerFile.sh ${gitUrl} ${ getProjectName(gitUrl) }`);
  
})