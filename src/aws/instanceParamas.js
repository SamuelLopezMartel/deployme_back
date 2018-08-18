module.exports.instanceParams = () => {
    return {
        ImageId: 'ami-2a7d75c0', 
        InstanceType: 't2.micro',
        KeyName: 'deploymepairkeys',
        MinCount: 1,
        MaxCount: 1
    }    
}
