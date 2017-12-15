var currencyModel = require('./currencyModel.js');

/**
 * currencyController.js
 *
 * @description :: Server-side logic for managing currencys.
 */
module.exports = {

    /**
     * currencyController.list()
     */
    list: function (req, res) {
        currencyModel.find(function (err, currencys) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting currency.',
                    error: err
                });
            }
            return res.json(currencys);
        });
    },

    /**
     * currencyController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        currencyModel.findOne({_id: id}, function (err, currency) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting currency.',
                    error: err
                });
            }
            if (!currency) {
                return res.status(404).json({
                    message: 'No such currency'
                });
            }
            return res.json(currency);
        });
    },

    /**
     * currencyController.create()
     */
    create: function (req, res) {
        var currency = new currencyModel({
			code : req.body.code,
			name : req.body.name,
			rate : req.body.rate

        });

        currency.save(function (err, currency) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating currency',
                    error: err
                });
            }
            return res.status(201).json(currency);
        });
    },

    /**
     * currencyController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        currencyModel.findOne({_id: id}, function (err, currency) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting currency',
                    error: err
                });
            }
            if (!currency) {
                return res.status(404).json({
                    message: 'No such currency'
                });
            }

            currency.code = req.body.code ? req.body.code : currency.code;
			currency.name = req.body.name ? req.body.name : currency.name;
			currency.rate = req.body.rate ? req.body.rate : currency.rate;
			
            currency.save(function (err, currency) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating currency.',
                        error: err
                    });
                }

                return res.json(currency);
            });
        });
    },

    /**
     * currencyController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        currencyModel.findByIdAndRemove(id, function (err, currency) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the currency.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
