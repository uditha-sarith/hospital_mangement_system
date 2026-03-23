const express = require('express');
const router = express.Router();

const { getWards } = require('../controllers/wardController');
const { getBeds, updateBed } = require('../controllers/bedController');
const { getPatients, getPatientById, addPatient, updatePatient, deletePatient } = require('../controllers/patientController');
const { getVitals, addVital } = require('../controllers/vitalController');

// Ward routes
router.get('/wards', getWards);

// Bed routes
router.get('/beds', getBeds);
router.put('/beds/:id', updateBed);

// Patient routes
router.get('/patients', getPatients);
router.get('/patients/:id', getPatientById);
router.post('/patients', addPatient);
router.put('/patients/:id', updatePatient);
router.delete('/patients/:id', deletePatient);

// Vitals routes
router.get('/vitals', getVitals);
router.post('/vitals', addVital);

// Users routes
const { getUsers, addUser, updateUser, deleteUser } = require('../controllers/userController');
router.get('/users', getUsers);
router.post('/users', addUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Appointments routes
const { getAppointments, addAppointment, updateAppointment, deleteAppointment } = require('../controllers/appointmentController');
router.get('/appointments', getAppointments);
router.post('/appointments', addAppointment);
router.put('/appointments/:id', updateAppointment);
router.delete('/appointments/:id', deleteAppointment);

// Billing routes
const { getBilling, addBilling, updateBilling, deleteBilling } = require('../controllers/billingController');
router.get('/billing', getBilling);
router.post('/billing', addBilling);
router.put('/billing/:id', updateBilling);
router.delete('/billing/:id', deleteBilling);

// Inventory routes
const { getInventory, addInventoryItem, updateInventoryItem, deleteInventoryItem } = require('../controllers/inventoryController');
router.get('/inventory', getInventory);
router.post('/inventory', addInventoryItem);
router.put('/inventory/:id', updateInventoryItem);
router.delete('/inventory/:id', deleteInventoryItem);

// Chat routes
const { getChats, addChat } = require('../controllers/chatController');
router.get('/chats', getChats);
router.post('/chats', addChat);

module.exports = router;
