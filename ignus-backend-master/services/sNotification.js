const models = require("../models");
const sUser = require("./sUser");
const {throwException} = require("../global/helpers");

const { sendNewNotification } = require('../global/mailer');
const { sendWS, sendSMS } = require('../global/twilioSMS_WS');

async function checkForNewNotifications(UserId) {
    const user = await sUser.getUserById(UserId);
    const notifications = await user.getNotifications({
        where: { status: 'P' },
    });
    
    if(!notifications || !notifications.length)
        throwException('E047');
        
    return notifications.length
}

async function getAllNotifications(UserId) {
    const user = await sUser.getUserById(UserId);
    const notifications = await user.getNotifications({
        include: [{ model: models.TypeNotification }],
        order: [ ['creationDate','desc'] ],
    });
    
    if(!notifications || !notifications.length)
        throwException('E047');
        
    await models.Notification.update(
        { status: 'V' },
        { where : { UserId } }
    )
        
    return notifications
}

async function addNotification(UserId, text, TypeNotificationId) {
    //await sUser.getUserById(UserId); 
    
    const notification = await models.Notification.create({
        text,
        TypeNotificationId,
        UserId
    })
    
    await sendEmailNotificationById(notification.id)
}

async function sendEmailNotificationById(NotificationId) {
    const notification = await models.Notification.findOne({
        where: {id : NotificationId},
        include: [
            {model: models.TypeNotification},
            {model: models.User, include: [
                {
                    model: models.Client
                },{
                    model: models.Employee
                }]
            }
        ]
    })
    
    if(!notification)
        throwException('E049')
    
    const emailData = { 
        name: notification.TypeNotification.name, 
        text: notification.text, 
        urlImage: notification.TypeNotification.urlImage,
        email: notification.User.username
        //email: "jorgechiquinv@gmail.com"
    }
    
    const user = notification.User;
    const person = notification.User.Client || notification.User.Employee
    const phoneNumber = person.phoneNumber
	// Send email with message
	
	const SMS_WS = `INMOBILIARIUM informa:
	
${emailData.name}

${emailData.text}

Este mensaje es sólo una notificación, por favor no responder. Gracias.`


    if(user.notificationEmail)
        sendNewNotification(emailData);
    if(user.notificationSMS)
	    sendSMS(phoneNumber, SMS_WS)
    if(user.notificationWS)
	    sendWS(phoneNumber, SMS_WS)
}

async function getUnreadNotificacions(UserId) {
    const user = await sUser.getUserById(UserId);
    const notifications = await user.getNotifications({
        where: { status: 'P'},
        include: [{ model: models.TypeNotification }],
        order: [ ['creationDate','desc'] ],
    });
    
    if(!notifications || !notifications.length)
        throwException('E047');
        
    await models.Notification.update(
        { status: 'V' },
        { where : { UserId } }
    )
        
    return notifications
}

async function getCountNotificationsByUserId(UserId) {
    await sUser.getUserById(UserId);
    const count = await models.Notification.count({ where: { UserId } })
    return count;
}



module.exports = {
  checkForNewNotifications,
  getAllNotifications,
  addNotification,
  getUnreadNotificacions,
  getCountNotificationsByUserId
}