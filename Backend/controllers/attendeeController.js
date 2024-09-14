const Attendee = require('../models/Attendee');

// RSVP to an event
exports.rsvpEvent = async (req, res) => {
  try {
    const attendee = new Attendee(req.body);
    await attendee.save();
    res.status(201).json(attendee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all attendees for an event
exports.getAttendeesForEvent = async (req, res) => {
  try {
    const attendees = await Attendee.find({ event: req.params.eventId });
    res.status(200).json(attendees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
