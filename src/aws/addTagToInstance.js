const { ec2 } = require('./configureAWS')

const tagParameters = (instanceId) => (
    tagParams = {
        Resources: [instanceId],
        Tags: [
            {
                Key: 'Name',
                Value: 'DeployMe test'
            }
        ]
    }
)

module.exports.setTagToInstance = (instanceId) => ec2().createTags(tagParameters(instanceId)).promise() 