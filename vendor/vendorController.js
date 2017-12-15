var vendorModel = require('./vendorModel.js');

/**
 * vendorController.js
 *
 * @description :: Server-side logic for managing vendors.
 */
module.exports = {

    /**
     * vendorController.list()
     */
    list: function (req, res) {
        vendorModel.find(function (err, vendors) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting vendor.',
                    error: err
                });
            }
            return res.json(vendors);
        });
    },

    /**
     * vendorController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        vendorModel.findOne({_id: id}, function (err, vendor) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting vendor.',
                    error: err
                });
            }
            if (!vendor) {
                return res.status(404).json({
                    message: 'No such vendor'
                });
            }
            return res.json(vendor);
        });
    },

    /**
     * vendorController.create()
     */
    create: function (req, res) {
        var vendor = new vendorModel({
			name : req.body.name,
			address : req.body.address,
			currency : req.body.currency

        });

        vendor.save(function (err, vendor) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating vendor',
                    error: err
                });
            }
            return res.status(201).json(vendor);
        });
    },

    /**
     * vendorController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        vendorModel.findOne({_id: id}, function (err, vendor) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting vendor',
                    error: err
                });
            }
            if (!vendor) {
                return res.status(404).json({
                    message: 'No such vendor'
                });
            }

            vendor.name = req.body.name ? req.body.name : vendor.name;
			vendor.address = req.body.address ? req.body.address : vendor.address;
			vendor.currency = req.body.currency ? req.body.currency : vendor.currency;
			
            vendor.save(function (err, vendor) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating vendor.',
                        error: err
                    });
                }

                return res.json(vendor);
            });
        });
    },

    /**
     * vendorController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        vendorModel.findByIdAndRemove(id, function (err, vendor) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the vendor.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
