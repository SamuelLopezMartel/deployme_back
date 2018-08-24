const { ec2 } = require('./configureAWS')
module.exports.releaseAddress = ( allocationId ) => {
    return new Promise (( resolve , reject ) => {
        const params = {
            AllocationId: allocationId
        };

        ec2().releaseAddress(params, ( err , data ) => {
            if( err ){
                console.log( 'Fail releaseAddress ' , err , err.stack );
                reject()
            }else{
                console.log ( 'Sucessfull releaseAddress ' , data );
                resolve()
            }
        })
    })
}