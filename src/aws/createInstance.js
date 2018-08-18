const { ec2 } = require('./configureAWS')
const { instanceParams } = require('./instanceParamas');
const { describeKeys } = require('./describeKeyPair')
const { describeSecurityGroup } = require('./describeSecurityGroup')
const { setTagToInstance } = require('./addTagToInstance')
const { createElasticIp } = require('./createElasticIp')
const { associateElasticIp } = require('./associateElasticIp')

const instancePromise = () => ec2().runInstances(instanceParams()).promise()

module.exports.createInstance = () => {
    return new Promise((resolve, reject) => {
        instancePromise().then( ( data ) => {
            const dataEc2 = {
                instanceId: data.Instances[0].InstanceId
            }
            const allPromises = [
                setTagToInstance(dataEc2.instanceId),
                describeKeys(),
                describeSecurityGroup(),
                createElasticIp()
            ];
            
            Promise.all(allPromises).then(responses => {
                dataEc2.publicIp = responses[3].PublicIp;
                dataEc2.allocationId = responses[3].AllocationId;
                associateElasticIp(dataEc2).then(() => {
                    resolve(dataEc2);
                }).catch(error => {
                    reject();
                })
            }).catch(err => {
                console.log('Failed in: ', err);
                reject();
            })
        })
    })
} 






