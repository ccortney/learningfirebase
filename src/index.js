import { initializeApp } from 'firebase/app';
import { 
    getFirestore, collection, getDocs, onSnapshot,
    addDoc, deleteDoc, doc, 
    query, where, 
    orderBy, serverTimestamp,
    getDoc, updateDoc, 
 } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAl4KR_9lbCvmUO5wpL3jfjCitNGfQDX7g",
    authDomain: "fir-9intro.firebaseapp.com",
    projectId: "fir-9intro",
    storageBucket: "fir-9intro.appspot.com",
    messagingSenderId: "912650597382",
    appId: "1:912650597382:web:7d1f93ba390fe909c6ff87"
  };

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, 'books');

// queries
const q = query(colRef, orderBy('createdAt'))

// get collection data (only once, when initialized)
    // getDocs(colRef)
    //   .then((snapshot) => {
    //     let books = [];
    //     snapshot.docs.forEach((doc) => {
    //         books.push({ ...doc.data(), id: doc.id })
    //     })
    //     console.log(books)
    //   })
    //   .catch(err => {
    //     console.log(err.message)
    //   })

// real time collection data
onSnapshot(q, (snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books) 
})

// adding documents
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', e => {
    e.preventDefault();
    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value, 
        createdAt: serverTimestamp()
    })
    .then(() => {
        addBookForm.reset();
    })
})

// deleting documents
const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', e => {
    e.preventDefault();

    const docRef = doc(db, 'books', deleteBookForm.id.value);
    deleteDoc(docRef)
      .then(() => {
        deleteBookForm.reset();
      })
})

// get a single document (by id)
const docRef = doc(db, 'books', 'ppgInuJGPoR21yekmES7');
// getDoc(docRef)
//   .then((doc) => {
//     console.log(doc.data(), doc.id)
//   })

// updating a document
const updateBookForm = document.querySelector('.updated');
updateBookForm.addEventListener('submit', e => {
    e.preventDefault();

    const docRef = doc(db, 'books', updateBookForm.id.value);
    updateDoc(docRef, {
        title: updateBookForm.title.value,
        author: updateBookForm.author.value
    })
      .then(() => {
        updateBookForm.reset()
      });
})