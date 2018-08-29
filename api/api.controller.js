const { deployClientProject } = require('../src/tools/deployClientProject');
const { terminateInstance } = require('../src/aws/terminateEc2')

module.exports = { getFrontUrl, getBackUrl, terminateProject }

function getFrontUrl(req, res) {
    deployClientProject(req.body.urlfront, req.body.technology).then( (instanceData) => {
        res.json(instanceData);
    }).catch(error => {
        res.send("An error has occurred deploying your project: ", error);
    });
}

function getBackUrl(req, res) {
    const urlback = req.body.urlback;
    console.log("Starting deploy of: " + urlback + " - " + req.body.technology);
    res.send("Deploying back in: " + urlback);
}

function terminateProject(req, res){
    const instanceId = req.body.instanceId;
    const allocationId = req.body.elasticId;
    terminateInstance(instanceId, allocationId).then( () => {
        res.json(req.body);
    }).catch(error => {
        res.code(500).send("error: ", error);
    })
}
