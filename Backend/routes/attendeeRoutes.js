const express = require('express');
const { rsvpEvent, getAttendeesForEvent } = require("../controllers/attendeeController.js");
const router = express.Router();

router.post('/', rsvpEvent);
router.get('/event/:eventId', getAttendeesForEvent);

module.exports = router;
