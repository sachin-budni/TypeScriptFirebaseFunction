import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// admin.initializeApp({
//   databaseURL: "https://allfire-fb40c.firebaseio.com",
//   projectId: "allfire-fb40c",
//   storageBucket: "allfire-fb40c.appspot.com",
// })
admin.initializeApp(functions.config().firebase);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send({data:"sachin"});
// response.send(admin.auth().getUser("2lMXTranluTKYBncoNoCr6k7eZW2"));
    response.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.set('Access-Control-Allow-Credentials', 'true');

    // let key =admin.database().ref("messages").child("2lMXTranluTKYBncoNoCr6k7eZW2");
    // admin.database().ref("messages").once('value',snapshot=>{
    //   response.status(200).send({
    //     key:snapshot.key,
    //     data:Object.keys(snapshot.val())
    //   })
    // })
    // admin.database().ref("messages").once('value').then(data=>{
    //   response.status(200).send({
    //     key:data,
    //     data:data.val()
    //   });
    // })
    // admin.database().ref().child("messages")

    // response.set('Access-Control-Allow-Methods', 'GET');
    // response.set('Access-Control-Allow-Headers', 'Content-Type');
    // response.set('Access-Control-Max-Age', '3600');
    // response.status(204).send('');


    // response.status(401).send("401 error");

    // response.status(500).send("500error");
    // response.set('Content-Type', 'application/json')
    // response.send({
    //     databaseURL: "https://allfire-fb40c.firebaseio.com",
    //     projectId: "allfire-fb40c",
    //     storageBucket: "allfire-fb40c.appspot.com",
    //   });

});

export const helloWorld1 = functions.https.onRequest((request,response)=>{
     response.send({data:"sachin"});
     
})

export const addWelcomeMessages = functions.auth.user().onCreate((user)=>{
    console.log('A new user signed in for the first time.');
  const fullName = user.displayName || 'Anonymous';

  // Saves the new welcome message into the database
  // which then displays it in the FriendlyChat clients.
  return admin.database().ref('messages').push({
    name: 'Firebase Bot',
    photoUrl: '/assets/images/firebase-logo.png', // Firebase logo
    text: `${fullName} yes signed in for the first time! Welcome!`
  });
});


exports.fcmSend = functions.database.ref('/messages/{userId}/{messageId}').onCreate(event => {

 
  // const message = event.after
  // const userId  = event.params.userId
  console.log(event.val())

  const payload = {
        notification: {
          title: "sachin",
          body: "Hii Bro",
          icon: "https://placeimg.com/250/250/people"
        }
      };


   admin.database()
        .ref(`/fcmTokens/${"rCry2YAqYlZ8rKrCqtWn6jkDkBN2"}`)
        .once('value')
        .then(token => token.val() )
        .then(userFcmToken => {
          return admin.messaging().sendToDevice(userFcmToken, payload)
        })
        .then(res => {
          console.log("Sent Successfully", res);
        })
        .catch(err => {
          console.log(err);
        });
});