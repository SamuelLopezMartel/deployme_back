const { deployClientProject } = require('../src/tools/deployClientProject');

module.exports = { getFrontUrl, getBackUrl }

function getFrontUrl(req, res) {
    const urlfront = req.body.urlfront;
    console.log("Starting deploy of: " + urlfront);
    deployClientProject(urlfront).then( (instanceData) => {
        console.log('¡¡¡¡ ESTO ES LO QUE DEVUELVO !!!!!!! ' , instanceData)
        res.json(instanceData);
    }).catch(error => {
        res.send("An error has occurred deploying your project")
    });
}

function getBackUrl(req, res) {
    const urlback = req.body.urlback;
    console.log("Deploying back in: " + urlback);
    res.send("Deploying back in: " + urlback);
}
