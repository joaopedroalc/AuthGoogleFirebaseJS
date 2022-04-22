   // Your web app's Firebase configuration
   const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  document.getElementById('dashboard').style.display = "none"

  document.getElementById('login').addEventListener('click', GoogleLogin)
  document.getElementById('logout').addEventListener('click', LogoutUser)

  let provider = new firebase.auth.GoogleAuthProvider()

  function GoogleLogin() {
    console.log('Login Btn Call')
    firebase.auth().signInWithPopup(provider).then(res => {
      console.log(res.user)
      document.getElementById('LoginScreen').style.display = "none"
      document.getElementById('dashboard').style.display = "block"
      showUserDetails(res.user)
    }).catch(e => {
      console.log(e)
    })
  }

  function showUserDetails(user) {
    document.getElementById('userDetails').innerHTML = `
        <img src="${user.photoURL}">
        <p>Name: ${user.displayName}</p>
        <p>Email: ${user.email}</p>
      `
  }

  function checkAuthState() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        document.getElementById('LoginScreen').style.display = "none"
        document.getElementById('dashboard').style.display = "block"
        showUserDetails(user)
      } else {

      }
    })
  }

  function LogoutUser() {
    console.log('Logout Btn Call')
    firebase.auth().signOut().then(() => {
      document.getElementById('LoginScreen').style.display = "block"
      document.getElementById('dashboard').style.display = "none"
    }).catch(e => {
      console.log(e)
    })
  }
  checkAuthState()