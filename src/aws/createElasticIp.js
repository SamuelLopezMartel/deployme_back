const { ec2 } = require('./configureAWS')
const params = () => { Domain : 'vpc' } 

module.exports.createElasticIp = () => {
    return new Promise ((resolve,reject) => {
        ec2().allocateAddress(params() , ( err , data ) => {
            err ? console.log('Create elastic ip failed ', err) : resolve ( data )
        })
    })
}

