const { ec2 } = require ( './configureAWS' )
module.exports.describeKeys = () => {
    return new Promise((resolve, reject) => {
        ec2().describeKeyPairs(( err , data ) => {
            if(err){
                console.log( 'Failed describe key pair');
                reject();
            }else{
                console.log('Successful describe key')
                resolve();
            }
        })
    })
}