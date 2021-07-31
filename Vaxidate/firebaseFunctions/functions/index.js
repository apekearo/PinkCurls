const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const firestore = admin.firestore();

exports.sendChatPushNotification = functions.firestore
  .document("channels/{some_channel_document}/threads/{some_thread_document}")
  .onWrite((change, context) => {
    const data = change.after.data();
    const senderFirstName = data.senderFirstName;
    const content = data.content;
    const recipientID = data.recipientID;
    const url = data.url;

    let payload = {};

    if (url) {
      payload = {
        notification: {
          title: "New message",
          body: `text: ${senderFirstName} sent a photo`
        }
      };
    } else {
      payload = {
        notification: {
          title: "New message",
          body: `${senderFirstName}: ${content}`
        }
      };
    }

    let pushToken = "";
    return firestore
      .collection("users")
      .doc(recipientID)
      .get()
      .then(doc => {
        pushToken = doc.data().pushToken;
        return admin.messaging().sendToDevice(pushToken, payload);
      });
  });

exports.sendNewMatchPushNotification = functions.firestore
  .document("friendships/{some_friendships_document}")
  .onWrite((change, context) => {
    const data = change.after.data();
    const recipientID = data.user1;
    const payload = {
      notification: {
        title: "New Match",
        body: "You just got a new match!"
      }
    };
    let pushToken = "";

    return firestore
      .collection("users")
      .doc(recipientID)
      .get()
      .then(doc => {
        pushToken = doc.data().pushToken;
        return admin.messaging().sendToDevice(pushToken, payload);
      });
  });


exports.sendNewChirpPushNotification = functions.firestore
.document("swipes/{some_swipes_document}")
.onWrite((change, context) => {
  const data = change.after.data();
  const recipientID = data.swipedProfile;
  const type = data.type;
  const authorName = data.authorName;
  let payload = {};

  if (type === "like") {
    payload = {
      notification: {
        title: "New Like!",
        body: "Someone likes you on Vaccidate 👀🤫!",
        badge: "1"
      }
    };
  } else if (type === "superlike") {
    payload = {
      notification: {
        title: "New Super Like",
        body: `${authorName} likes you 👀🤫. Peep Vaccidate!`,
        badge: "1"
      }
    };
  }

  let pushToken = "";

  return firestore
    .collection("users")
    .doc(recipientID)
    .get()
    .then(doc => {
      pushToken = doc.data().pushToken;
      return admin.messaging().sendToDevice(pushToken, payload);
    });
});
