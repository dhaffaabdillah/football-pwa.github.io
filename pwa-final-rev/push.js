let webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BLC34HtlPOBQUaIMOTrPjuQjOro7taRdg93XQs1ymTABCK0gCk3cN9SxqPnwiFNXMpGp4f8lYbTwZZRo2c4WJ5Y",
   "privateKey": "6BKnBO4FcOy0OkutC23jficABoYQU04HhKeIRNdc3is"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
let pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dp7okW_-Ts4:APA91bEXs3M2FR63y4G8x8_jzaEyl-xHAYEAtZgfs0HsQXnmtnXrFYCX3OHA04qI2S3uDoVEFmyNrwY8JtXfkCmiNKanRQUgi8kzLKcpV_ACmEYNH8N4wKKhSErL1lRidhCs-JD68WC0",
   "keys": {
       "p256dh": "BOcxIJdJJG7BDxv7SdZbYpS58n+9c0poGXFJZxHLysa5iZMh2WgNgKWQoHTB06FGHUpNbgRvszhh5MIx1hXV5Yg=",
       "auth": "yDLMJ7bNFSme2XRtmr78Mw=="
   }
};
let payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
let options = {
   gcmAPIKey: '890967679573',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);