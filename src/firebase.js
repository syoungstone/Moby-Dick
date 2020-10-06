import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: 'AIzaSyAbHABBYvNND29g9TFG7DGL6cSTalSSIfg',
  authDomain: 'blog-brightspot-interview.firebaseapp.com',
  databaseURL: 'https://blog-brightspot-interview.firebaseio.com',
  projectId: 'blog-brightspot-interview',
  storageBucket: 'blog-brightspot-interview.appspot.com',
  messagingSenderId: '334187938112',
  appId: '1:334187938112:web:8fe42f6e61a4fcae57faa5'
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const blogPostsCollection = db.collection('blogPosts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')
const dislikesCollection = db.collection('dislikes')
const repliesCollection = db.collection('replies')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  blogPostsCollection,
  commentsCollection,
  likesCollection,
  dislikesCollection,
  repliesCollection
}
