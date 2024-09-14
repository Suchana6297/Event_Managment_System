const { sendEmail } = require('./emailService');

let notifications = [];

const addNotification = (userId, message) => {
  const notification = {
    userId,
    message,
    read: false,
    date: new Date(),
  };
  notifications.push(notification);
  console.log('In-app notification added:', notification);
};

const markNotificationAsRead = (userId) => {
  notifications = notifications.map((notification) => 
    notification.userId === userId ? { ...notification, read: true } : notification
  );
};

const getUserNotifications = (userId) => {
  return notifications.filter((notification) => notification.userId === userId);
};

const sendNotification = async (userId, userEmail, message) => {
  try {
    addNotification(userId, message);
    await sendEmail(userEmail, 'Event Notification', message);
    console.log('Notification sent successfully');
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

module.exports = {
  sendNotification,
  getUserNotifications,
  markNotificationAsRead,
};
