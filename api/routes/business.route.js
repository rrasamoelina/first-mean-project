const express = require('express');
const app = express();
const businessRoutes = express.Router();

let Business = require('../models/Business');

businessRoutes.route('/add').post(function(req, res) {
    let business = new Business(req.body)
    business.save()
        .then(business => {
            res.json({ 'business': 'business has been added successfully', 'status': 200 });
        })
        .catch (err => {
            res.status(400).send("unabled to save to database");
        });
});

businessRoutes.route('/edit/:id').get(function(req, res) {
    let id = req.params.id;
    Business.findById(id, function(err, business) {
        res.json(business);
    });
});

businessRoutes.route('/').get(function(req, res) {
    Business.find(function(err, businesses) {
        if (err) {
            console.log(err);
        } else {
            res.json(businesses);
        }
    });
});

businessRoutes.route('/update/:id').post(function(req, res) {
    Business.findById(req.params.id, function(err, business) {
        if (!business) 
            return next(new Error('Could not load Document'));
        else {
            business.person_name = req.body.person_name;
            business.business_name = req.body.business_name;
            business.business_gst_number = req.body.business_gst_number;

            business.save()
                .then(business => {
                    res.json('Update complete');
                })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

businessRoutes.route('/delete/:id').get(function(req, res) {
    Business.findByIdAndRemove({_id: req.params.id}, function(err, business) {
        if (err) 
            res.json(err);
        else 
            res.json('Successfully removed');
    });
});

module.exports = businessRoutes;