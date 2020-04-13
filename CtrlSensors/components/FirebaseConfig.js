import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyBaYFysbW0XAUCyCNDczh6O_OmPi4RJ1KA',
  authDomain: 'fir-rn-e60d4.firebaseapp.com',
  databaseURL: 'https://fir-rn-e60d4.firebaseio.com',
  projectId: 'fir-rn-e60d4',
  storageBucket: 'fir-rn-e60d4.appspot.com',
  messagingSenderId: '660101633272',
  appId: '1:660101633272:web:f13a1d58bda3c584',
};
// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
