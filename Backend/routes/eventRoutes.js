const express = require('express');
const { createEvent, getAllEvents, getEventById, deleteEvent } = require('../controllers/eventController');
const router = express.Router();

router.post('/', createEvent);
router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.delete('/:id', deleteEvent);

module.exports = router;
