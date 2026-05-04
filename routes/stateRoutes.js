const express = require('express');
const router = express.Router();
const statesController = require('../controllers/statesController');
const verifyState = require('../middleware/verifyState');

router.get('/', statesController.getAllStates);

router.get('/:state', verifyState, statesController.getState);
router.get('/:state/funfact', verifyState, statesController.getFunFact);
router.get('/:state/capital', verifyState, statesController.getCapital);
router.get('/:state/nickname', verifyState, statesController.getNickname);
router.get('/:state/population', verifyState, statesController.getPopulation);
router.get('/:state/admission', verifyState, statesController.getAdmission);

router.post('/:state/funfact', verifyState, statesController.addFunFact);
router.patch('/:state/funfact', verifyState, statesController.updateFunFact);
router.delete('/:state/funfact', verifyState, statesController.deleteFunFact);

module.exports = router;