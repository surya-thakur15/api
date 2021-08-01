const express = require('express');
const getCtrl = require('../controller/getPolicies');
const postCtrl = require('../controller/postPolicies');

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json({"message": "OK"})
})

router.get('/policy', getCtrl.getAllPolicies)

router.put('/policy/update', postCtrl.updatePolicy)

router.get('/policy/graph', getCtrl.getGraphData)

router.get('/policy/data/:id', getCtrl.getOnePolicy)

module.exports = router;