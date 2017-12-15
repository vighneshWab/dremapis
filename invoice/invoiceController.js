var invoiceModel = require('./invoiceModel.js');

/**
 * invoiceController.js
 *
 * @description :: Server-side logic for managing invoices.
 */
module.exports = {

    /**
     * invoiceController.list()
     */
    list: function (req, res) {
        invoiceModel.find(function (err, invoices) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting invoice.',
                    error: err
                });
            }
            return res.json(invoices);
        });
    },

    /**
     * invoiceController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        invoiceModel.findOne({_id: id}, function (err, invoice) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting invoice.',
                    error: err
                });
            }
            if (!invoice) {
                return res.status(404).json({
                    message: 'No such invoice'
                });
            }
            return res.json(invoice);
        });
    },

    /**
     * invoiceController.create()
     */
    create: function (req, res) {
        var invoice = new invoiceModel({
			vendor : req.body.vendor,
			vendorGST : req.body.vendorGST,
			date : req.body.date,
			pan : req.body.pan,
			services : req.body.services,
			invoice_no : req.body.invoice_no,
            tax : req.body.tax,
            due : req.body.due,
            total : req.body.total,
            discount : req.body.discount,


        });

        invoice.save(function (err, invoice) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating invoice',
                    error: err
                });
            }
            return res.status(201).json(invoice);
        });
    },

    /**
     * invoiceController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        invoiceModel.findOne({_id: id}, function (err, invoice) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting invoice',
                    error: err
                });
            }
            if (!invoice) {
                return res.status(404).json({
                    message: 'No such invoice'
                });
            }

            invoice.vendor = req.body.vendor ? req.body.vendor : invoice.vendor;
			invoice.vendorGST = req.body.vendorGST ? req.body.vendorGST : invoice.vendorGST;
			invoice.date = req.body.date ? req.body.date : invoice.date;
			invoice.pan = req.body.pan ? req.body.pan : invoice.pan;
			invoice.services = req.body.services ? req.body.services : invoice.services;
			invoice.invoice_no = req.body.invoice_no ? req.body.invoice_no : invoice.invoice_no;
            tax = req.body.tax ? req.body.tax : invoice.tax,
            due = req.body.due  ? req.body.due : invoice.due,
            total = req.body.total  ? req.body.total : invoice.total,
            discount = req.body.discount  ? req.body.discount : invoice.discount,
			
            invoice.save(function (err, invoice) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating invoice.',
                        error: err
                    });
                }

                return res.json(invoice);
            });
        });
    },

    /**
     * invoiceController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        invoiceModel.findByIdAndRemove(id, function (err, invoice) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the invoice.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
