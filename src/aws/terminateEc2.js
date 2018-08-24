const { ec2 } = require('./configureAWS')
module.exports.terminateInstance = (instanceId) => {
    return new Promise ( (resolve , reject ) => {
        const params = {
            InstanceIds: [
               instanceId
            ]
        };
        ec2().terminateInstances(params, ( err , data ) => {
            if ( err ){
                console.log( 'Fail terminate instance ' , err , err.stack )
                reject();
            }else {
                console.log('Sucessfull terminate instace ' , data )
                resolve();
            }
        })
    })
}
