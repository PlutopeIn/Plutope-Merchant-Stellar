import admin from 'firebase-admin';
import Crediential from '../utils/merchantPlutopeFirebase.js'

admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: Crediential.private_key,
    clientEmail: Crediential.client_email,
    projectId: Crediential.project_id,
  })
});

export const SendPushNotification = async (title, body, fcmToken) => {
  const message = {
    notification: { title, body },
    token: fcmToken
  };
  try {
    if(fcmToken){
      const notificationResponse = await admin.messaging().send(message);
      return notificationResponse;
    }
    return message
  } catch (error) {
    console.error("Error sending notification:", error);
    // throw error;
  }
};
