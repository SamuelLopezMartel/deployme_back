const { ec2 } = require('./configureAWS')
module.exports.describeSecurityGroup = () => {
    return new Promise((resolve, reject) => {
        ec2().describeSecurityGroups( { GroupIds: [ 'sg-024e2e9f549e9fb55' ] }, ( err , data )  =>  {
            if( err ){
                console.log( 'Fail describe group', err );
                reject();
            }else {
                console.log( 'Successful describe group')
                resolve(); 
            }
        })
    })
}