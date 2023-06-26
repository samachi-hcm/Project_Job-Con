const admin = require('firebase-admin');
const serviceAccount = require('./jobrecord-8c52b-firebase-adminsdk-6ktr7-649f86d1c8.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const sourceCollectionRef = db.collection('UserData').doc('yongtianshuu@gmail.com').collection('Data');
const destinationCollectionRef = db.collection('UserData').doc('ljCrFWcUqSSoUAkkel7z14dx8Qb2').collection('Data');

const collectionNames = ['careerData', 'profileData', 'recordData', 'sheetData'];

collectionNames.forEach(collectionName => {
  sourceCollectionRef.doc(collectionName).get()
    .then(snapshot => {
      if (snapshot.exists) {
        const formData = snapshot.data().formData;
        destinationCollectionRef.doc(collectionName).set({ formData })
          .then(() => {
            console.log(`Data added to ${collectionName}`);
          })
          .catch(err => {
            console.error(`Error adding data to ${collectionName}:`, err);
          });
      } else {
        console.log(`No document found for ${collectionName}`);
      }
    })
    .catch(err => {
      console.log(`Error getting ${collectionName} document`, err);
    });
});
