const { ec2 } = require('./configureAWS')

const tagParameters = (instanceId) => (
    tagParams = {
        Resources: [instanceId],
        Tags: [
            {
                Key: 'Name',
                Value: 'DeployMe client'
            }
        ]
    }
)

module.exports.setTagToInstance = (instanceId) => ec2().createTags(tagParameters(instanceId)).promise() 