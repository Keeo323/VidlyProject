const auth = require('../middleware/auth');
const mongoose = require ('mongoose');
const express = require('express');
const router = express.Router();
const {Customer, validate} = require('../models/customers');
  
  router.get('/', async (req,res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
  });
  
  router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    let customer = new Customer({ 
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
     });
    customer = await customer.save();
    res.send(customer);
  });
  
  router.put('/:id', auth, async (req,res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
   const customer = await Customer.findByIdAndUpdate(req.params.id, 
    { 
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
    }, { new: true }); 

  if (!customer) return res.status(404).send('The customer cannot be found');
  
  
  customer.name = req.body.name;
  res.send(customer);
  });
  
  router.delete ('/:id', auth, async (req,res) =>{
    const customer = await Customer.findByIdAndDelete(req.params.id);
    
    if (!customer) return res.status(404).send('The customer cannot be found');
    
    res.send(customer);
  });
  
  router.get('/:id', async (req, res) => {
    const customer = await Customer.findbyID(req.params.id);

    if (!customer) return res.status(404).send('The genre cannot be found');
    res.send(customer);
  });

module.exports = router;