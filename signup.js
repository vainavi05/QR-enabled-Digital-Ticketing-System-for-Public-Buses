async function handleRegistration(event) {
    event.preventDefault();
    const firebaseConfig = {
    apiKey: "AIzaSyCSFoUATpAZrCtxGtui4TLfgYT10Umi-DQ",
    authDomain: "qrbus089100110.firebaseapp.com",
    projectId: "qrbus089100110",
    storageBucket: "qrbus089100110.firebasestorage.app",
    messagingSenderId: "657471727355",
    appId: "1:657471727355:web:dd056322455432d1f9f25e",
    measurementId: "G-5PVHP64LEF"
};
      
firebase.initializeApp(firebaseConfig);
const realtimeDB = firebase.database();
const auth = firebase.auth(); 




    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
  
    if (!emailInput || !emailInput.value) {
        alert('Email input is missing or empty.');
      console.error('Email input is missing or empty.');
      return;
    }
  
    if (!passwordInput || !passwordInput.value) {
        alert('Password input is missing or empty.');
      console.error('Password input is missing or empty.');
      return;
    }
  
    if (!confirmPasswordInput || !confirmPasswordInput.value || confirmPasswordInput.value !== passwordInput.value) {
        
      alert('Confirm password input is missing, empty, or does not match the password.');
      console.error('Confirm password input is missing, empty, or does not match the password.');
      return;
    }
  


const password = document.getElementById("password").value;

const email = document.getElementById("email").value;
const name = document.getElementById("fullName").value;
const username = document.getElementById("username").value;
const phoneNumber = document.getElementById("phoneNumber").value;
const genderValue = document.querySelector('input[name="userGender"]:checked').value;

try {
    console.log('Creating user...');
    
document.getElementById('loader-overlay').style.display = 'flex';
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    console.log('User created successfully.');

    const user = userCredential.user;
    const userRef = realtimeDB.ref(`users/${user.uid}`);

    await userRef.set({
        name: name,
        username: username,
        email: email,
        phoneNumber: phoneNumber,
        gender: genderValue,
    });
    document.getElementById('loader-overlay').style.display = 'none';
    console.log('User information stored in Realtime Database.');
    
    // Show alert for successful registration
    alert('Registration successful!');
    // Clear input fields
emailInput.value = '';
passwordInput.value = '';
confirmPasswordInput.value = '';
document.getElementById('fullName').value = '';
document.getElementById('username').value = '';
document.getElementById('phoneNumber').value = '';
document.querySelector('input[name="userGender"]:checked').checked = false;


    // Optionally, you can still redirect the user to another page if needed.
    // window.location.href = '/home';
} catch (error) {
    console.error('Error during user registration:', error);
    document.getElementById('loader-overlay').style.display = 'none';
    // Handle the error as needed, e.g., show an error message to the user.
    if (error.code === 'auth/invalid-value-email') {
        alert('Invalid email format. Please provide a valid email address.');
    } else {
        alert('An error occurred during registration. Please try again.');
    }
}


    
  }









  
  
  document.getElementById('profile-button').addEventListener('click', function (event) {
    event.stopPropagation();
  
    var signUpButton = document.getElementById('sign-up-button');
    var signInButton = document.getElementById('sign-in-button');
  
    signUpButton.style.display = (signUpButton.style.display === 'none') ? 'block' : 'none';
    signInButton.style.display = (signInButton.style.display === 'none') ? 'block' : 'none';
  });
  
  document.body.addEventListener('click', function (event) {
    var signUpButton = document.getElementById('sign-up-button');
    var signInButton = document.getElementById('sign-in-button');
  
    // Check if the event target is the `profile-button` element before hiding the `sign-up-button` and `sign-in-button` elements.
    if (!document.getElementById('profile-button').contains(event.target)) {
      signUpButton.style.display = 'none';
      signInButton.style.display = 'none';
    }
  });
  




































document.getElementById('profile-button').addEventListener('click', function (event) {
    event.stopPropagation(); 

    var signUpButton = document.getElementById('sign-up-button');
    var signInButton = document.getElementById('sign-in-button');

    signUpButton.style.display = (signUpButton.style.display === 'none') ? 'block' : 'none';
    signInButton.style.display = (signInButton.style.display === 'none') ? 'block' : 'none';
});


document.body.addEventListener('click', function (event) {
    var signUpButton = document.getElementById('sign-up-button');
    var signInButton = document.getElementById('sign-in-button');

   
    if (!document.getElementById('profile-button').contains(event.target)) {
        signUpButton.style.display = 'none';
        signInButton.style.display = 'none';
    }
});