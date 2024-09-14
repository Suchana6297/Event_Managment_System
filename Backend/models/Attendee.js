const mongoose = require('mongoose');

const attendeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  rsvp: { type: Boolean, default: false },
});

module.exports = mongoose.model('Attendee', attendeeSchema);
