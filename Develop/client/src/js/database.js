// import { openDB } from 'idb';

// const initdb = async () =>
//   openDB('jate', 1, {
//     upgrade(db) {
//       if (db.objectStoreNames.contains('jate')) {
//         console.log('jate database already exists');
//         return;
//       }
//       db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
//       console.log('jate database created');
//     },
//   });

//   ///////////////////////////////////////////////////////////////////////////////////
// // TODO: Add logic to a method that accepts some content and adds it to the database
// // Adds content to the database.
// export const putDb = async (content) => {
//   try {
//     const db = await openDB('jate', 1);
//     const tx = db.transaction('jate', 'readwrite');
//     const store = tx.objectStore('jate');
//     await store.add({ content });
//     await tx.done;
//     console.log('Content added to database', content);
//   } catch (error) {
//     console.error('Error adding content to database:', error);
//   }
// };

// // TODO: Add logic for a method that gets all the content from the database
// // Gets all content from the db.
// export const getDb = async () => {
//   try {
//     const db = await openDB('jate', 1);
//     const tx = db.transaction('jate', 'readonly');
//     const store = tx.objectStore('jate');
//     const allContent = await store.getAll();
//     await tx.done;
//     console.log('All content retrived from database:', allContent);
//     return allContent;
//   } catch (error) {
//     console.error('Error getting content from database', error);
//     return null;
//   }
// };
// //////////////////////////////////////////////////////////////////////////////////////////

// initdb();


import { openDB } from 'idb';

const DB_NAME = 'jate';
const STORE_NAME = 'jate';

// Open the IndexedDB database
const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
    }
  },
});

// PUT content into the database
export const putDb = async (content) => {
  const db = await dbPromise;
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.clear(); // Clear existing content
  await store.add({ content }); // Add new content
  await tx.done;
};

// GET all content from the database
export const getDb = async () => {
  const db = await dbPromise;
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const allContent = await store.getAll();
  await tx.done;
  return allContent.length > 0 ? allContent[0].content : null; // Return the first content item or null if database is empty
};

// Initialize the IndexedDB database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

initdb(); // Call the initialization function
