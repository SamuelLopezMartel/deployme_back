const { createInstance } = require('../aws/createInstance');
const { executeScript } = require('./src/tools/scriptsExecuter');
const { getProjectName } = require('./src/tools/getProjectName');

// Project to test 
const gitUrl = 'https://github.com/sakdev/TheFox.git';

module.exports.deployClientProject = (gitUrl) => {
  createInstance().then( data => {
    console.log(`Ec2 instance (${ data.instanceId }) created and asocciated to this public ip: ${ data.publicIp }`);
    executeScript(`/home/deployme/scripts/createDockerFile.sh ${gitUrl} ${ getProjectName(gitUrl) }`);
    executeScript(`/home/deployme/scripts/deploy.sh ${data.publicIp}`);
  })
}