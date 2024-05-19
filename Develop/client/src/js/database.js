import { openDB } from 'idb';

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

// TODO: Add logic to a method that accepts some content and adds it to the database
// Adds content to the database.
export const putDb = async (content) => {
  try {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    await store.add({ content });
    await tx.done;
    console.log('Content added to database', content);
  } catch (error) {
    console.error('Error adding content to database:', error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
// Gets all content from the db.
export const getDb = async () => {
  try {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const allContent = await store.getAll();
    await tx.done;
    console.log('All content retrived from database:', allContent);
    return allContent;
  } catch (error) {
    console.error('Error getting content from database', error);
    return null;
  }
};

initdb();
