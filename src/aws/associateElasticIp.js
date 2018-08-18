const { ec2 } = require('./configureAWS');
const { associateAddressWithEc2 } = require('./associateAddressWithEc2');

module.exports.associateElasticIp = (dataEc2) => {
    return new Promise((resolve, reject) => {
        ec2().waitFor('instanceRunning', { InstanceIds : [ dataEc2.instanceId ]}, (err, data) => {
            if(err){
                console.log('Failed waiting for ec2 running status:', err);
                reject();
            }else{
                associateAddressWithEc2(dataEc2.allocationId, dataEc2.instanceId).then(() => {
                    resolve();
                }).catch(err => {
                    reject();
                })

            }
        })
    })
}
