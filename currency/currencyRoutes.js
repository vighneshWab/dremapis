var express = require('express');
var router = express.Router();
var currencyController = require('./currencyController.js');

/*
 * GET
 */
router.get('/', currencyController.list);

/*
 * GET
 */
router.get('/:id', currencyController.show);

/*
 * POST
 */
router.post('/', currencyController.create);

/*
 * PUT
 */
router.put('/:id', currencyController.update);

/*
 * DELETE
 */
router.delete('/:id', currencyController.remove);

module.exports = router;
