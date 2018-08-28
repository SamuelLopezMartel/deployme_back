const router = require('express').Router();
const { getFrontUrl, getBackUrl, terminateProject } = require ('./api.controller');

router.post('/deploy-front', getFrontUrl);
router.post('/deploy-back', getBackUrl);
router.post('/terminate-project', terminateProject);

module.exports = router;