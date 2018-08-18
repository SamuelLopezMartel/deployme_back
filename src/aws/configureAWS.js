const AWS = require('aws-sdk')
module.exports.configureAWS = () => AWS.config.update({region:'eu-west-1'})
module.exports.ec2 = () => new AWS.EC2({apiVersion:'2016-11-15'})