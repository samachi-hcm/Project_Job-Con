const admin = require('firebase-admin');
const serviceAccount = require('./jobrecord-8c52b-firebase-adminsdk-6ktr7-649f86d1c8.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const collectionRef = db.collection('UserData').doc('info@shioh.jp').collection('Data');

const newData = {};

collectionRef
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      const collectionName = doc.id;
      const formData = doc.data().formData;
      newData[collectionName] = { formData };
    });

    console.log('New data:', newData);
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
