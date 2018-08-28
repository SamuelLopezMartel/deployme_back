const { ec2 } = require('./configureAWS')
const { releaseAddress } = require('./releasesElasticIp');
module.exports.terminateInstance = (instanceId, allocationId) => {
    return new Promise ( (resolve , reject ) => {
        releaseAddress(allocationId).then(response =>{
            const params = {
                InstanceIds: [
                   instanceId
                ]
            };
            ec2().terminateInstances(params, ( err , data ) => {
                if ( err ){
                    reject(err);
                }else {
                    resolve();
                }
            })
        }).catch(err => {
            reject(err);
        })        
    })
}
