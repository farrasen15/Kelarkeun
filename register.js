// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3PoNn1HdMBomteNMqYNoZ82xHakUICfY",
  authDomain: "proven-solstice-419105.firebaseapp.com",
  projectId: "proven-solstice-419105",
  storageBucket: "proven-solstice-419105.firebasestorage.app",
  messagingSenderId: "465028305410",
  appId: "1:465028305410:web:7cb6e9264cc847a8b8cd1b",
  measurementId: "G-02VFZF1JJL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const loginTab = document.getElementById('login-tab');
const signupTab = document.getElementById('signup-tab');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

loginTab.addEventListener('click', () => {
  loginTab.classList.add('active-tab');
  signupTab.classList.remove('active-tab');
  loginForm.classList.add('active-form');
  signupForm.classList.remove('active-form');
});

signupTab.addEventListener('click', () => {
  signupTab.classList.add('active-tab');
  loginTab.classList.remove('active-tab');
  signupForm.classList.add('active-form');
  loginForm.classList.remove('active-form');
});

// Login form submission
document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission for demo purposes

  const email = this.querySelector('input[type="text"]').value.trim();
  const password = this.querySelector('input[type="password"]').value.trim();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      alert('Login successful!');
      // Redirect or perform other actions
      window.location.href = 'index.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert('Login failed: ' + errorMessage);
    });
});

// Signup form submission
document.getElementById('signup-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission for demo purposes

  const username = this.querySelector('input[type="text"]').value.trim();
  const email = this.querySelector('input[type="email"]').value.trim();
  const password = this.querySelector('input[type="password"]').value.trim();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      alert('Signup successful! Welcome, ' + username);
      // Redirect or perform other actions
      window.location.href = 'index.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert('Signup failed: ' + errorMessage);
    });
});
