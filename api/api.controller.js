const { deployClientProject } = require('../src/tools/deployClientProject');

module.exports = { getFrontUrl, getBackUrl }

function getFrontUrl(req, res) {
    const urlfront = req.body.urlfront;
    console.log("Deploying front in: " + urlfront);
    deployClientProject(urlfront);
    res.send("Deploying front in: " + urlfront);
}

function getBackUrl(req, res) {
    const urlback = req.body.urlback;
    console.log("Deploying back in: " + urlback);
    res.send("Deploying back in: " + urlback);
}
