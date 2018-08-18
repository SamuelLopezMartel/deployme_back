const { configureAWS } = require('./src/aws/configureAWS');
const { createInstance } = require('./src/aws/createInstance');

configureAWS();
createInstance().then( data => {
  console.log(`Ec2 instance (${ data.instanceId }) created and asocciated to this public ip: ${ data.publicIp }`);
})