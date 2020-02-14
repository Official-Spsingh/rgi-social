const functions = require('firebase-functions');
const admin = require('firebase-admin')
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
admin.initializeApp()
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello Shubham");
});

exports.getScreams = functions.https.onRequest((request, response) => {
    admin.firestore().collection('screams').get().then(data=>{
        let screams=[]
        data.forEach(doc=>{
            screams.push(doc.data())
        })
        return response.json(screams)
    })
    .catch(e=>{console.log(e)})
   });
   exports.addScreams = functions.https.onRequest((request, response) => {
       const newScream={
           userHandle:request.body.userHandle,
           body:request.body.body,
           createdAt:admin.firestore.Timestamp.fromDate(new Date())
       }
    admin.firestore().collection('screams').add(newScream).then(doc=>{
      
        response.json({message:`message ${doc.id} created successfully`})
    })
    .catch(e=>response.status(500).json({data:"something went wrong"}))
   });