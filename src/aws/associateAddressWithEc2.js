const { ec2 } = require('./configureAWS');

module.exports.associateAddressWithEc2 = ( allocationId, instaceId ) => {
    return new Promise((resolve, reject) => {
        ec2().associateAddress( params(allocationId, instaceId) , ( err , data ) => {
            if(err){
                console.log( 'Asoociate address failed ' , err )
                reject();
            }else{
                resolve();
            }
        })
    })
}

const params = ( allocationId, instaceId ) => (
    {
        AllocationId: allocationId,
        InstanceId: instaceId
    }
)


