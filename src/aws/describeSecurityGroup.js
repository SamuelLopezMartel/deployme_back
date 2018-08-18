const { ec2 } = require('./configureAWS')
module.exports.describeSecurityGroup = () => {
    return new Promise((resolve, reject) => {
        ec2().describeSecurityGroups( { GroupIds: [ 'sg-0b7d7345e7c7a926d' ] }, ( err , data )  =>  {
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