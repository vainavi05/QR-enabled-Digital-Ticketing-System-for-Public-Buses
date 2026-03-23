// firebase.initializeApp({
//     // Your Firebase configuration
//     apiKey: "AIzaSyC3QS5kpqgxSZboFvNZXZbyQRfQmOy5pDs",
//             authDomain: "dinesh-project-2c976.firebaseapp.com",
//             projectId: "dinesh-project-2c976",
//             storageBucket: "dinesh-project-2c976.appspot.com",
//             messagingSenderId: "94308291661",
//             appId: "1:94308291661:web:a5bb00f16e6029ac087804"
//   });


  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDHA9aTavnSDSdh3MYYSy7K9ElFiZeBLig",
    authDomain: "qrbus-27261.firebaseapp.com",
    projectId: "qrbus-27261",
    storageBucket: "qrbus-27261.firebasestorage.app",
    messagingSenderId: "964751282467",
    appId: "1:964751282467:web:54e14d15ca6c0d6465bc96"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);



  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in
      const email = user.email;
    
      changeSVGContent(email);
      console.log("User is signed in:", email);
    }
  });
  
  
  
  function handleSignIn(event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Handle errors
        alert(`Error: ${errorCode} - ${errorMessage}`);
      });
  }
  
  // Change SVG content function remains the same
  function changeSVGContent(email) {
    const svgElement = document.getElementById('userIcon');
    if (svgElement) {
      const firstLetter = email.charAt(0).toUpperCase();
      svgElement.innerHTML = `<text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" fill="White">${firstLetter}</text>`;
    }
   
  }



  document.getElementById('signOutBtn').addEventListener('click', handleSignOut);

// Sign-out function
function handleSignOut() {
  firebase.auth().signOut()
    .then(() => {
      // Sign-out successful
      
      alert('Signed out successfully!');
      // Redirect to the sign-in page or any other desired page
      window.location.href = 'index.html';
    })
    .catch((error) => {
      // An error occurred
      console.error('Sign-out error:', error);
      alert('Error signing out. Please try again.');
    });
}



firebase.auth().onAuthStateChanged((user) => {
    var profileButton = document.getElementById('profile-button');
    var signUpButton = document.getElementById('sign-up-button');
    var signInButton = document.getElementById('sign-in-button');
    var signOutButton = document.getElementById('signOutBtn');

    if (!user){
        document.getElementById('profile-button').addEventListener('click', function (event) {
            event.stopPropagation(); 

            signUpButton.style.display = (signUpButton.style.display === 'none') ? 'block' : 'none';
            signInButton.style.display = (signInButton.style.display === 'none') ? 'block' : 'none';
        });
        
    }
    else{
    profileButton.addEventListener('click', function (event) {
        event.stopPropagation();
        signOutButton.style.display = (signOutButton.style.display === 'none') ? 'block' : 'none';
      });
    }
  });