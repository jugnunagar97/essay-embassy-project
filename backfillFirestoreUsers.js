// backfillFirestoreUsers.js
// Run this script with: node backfillFirestoreUsers.js
// Make sure you have your Firebase Admin SDK service account key in the same folder as serviceAccountKey.json

const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();

async function backfillUsers() {
  const auth = admin.auth();
  let nextPageToken;
  let createdCount = 0;
  let skippedCount = 0;

  do {
    const listUsersResult = await auth.listUsers(1000, nextPageToken);
    for (const userRecord of listUsersResult.users) {
      const { uid, email, displayName } = userRecord;
      const userDocRef = db.collection('users').doc(uid);
      const userDoc = await userDocRef.get();
      if (userDoc.exists) {
        console.log(`User ${email} already exists in Firestore. Skipping.`);
        skippedCount++;
        continue;
      }
      const name = displayName || email?.split('@')[0] || 'User';
      const newUserProfile = {
        id: uid,
        email: email || '',
        name,
        role: 'client',
        createdAt: new Date().toISOString(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`
      };
      await userDocRef.set(newUserProfile);
      console.log(`Created Firestore user doc for: ${email}`);
      createdCount++;
    }
    nextPageToken = listUsersResult.pageToken;
  } while (nextPageToken);

  console.log(`\nBackfill complete! Created: ${createdCount}, Skipped: ${skippedCount}`);
  process.exit(0);
}

backfillUsers().catch(err => {
  console.error('Error during backfill:', err);
  process.exit(1);
}); 