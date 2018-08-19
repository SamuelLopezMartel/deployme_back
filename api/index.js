const router = require('express').Router();
const { getFrontUrl, getBackUrl } = require ('./api.controller');

router.post('/deploy-front', getFrontUrl);
router.post('/deploy-back', getBackUrl);

module.exports = router;