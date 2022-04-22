   // Your web app's Firebase configuration
   const firebaseConfig = {
    apiKey: "AIzaSyDVWuBFgO7xP9eCj_BNhDZGQzERH-mKKxw",
    authDomain: "auth-js-afc1a.firebaseapp.com",
    projectId: "auth-js-afc1a",
    storageBucket: "auth-js-afc1a.appspot.com",
    messagingSenderId: "394773602609",
    appId: "1:394773602609:web:ac46e99e2bdb7fa716d010",
    measurementId: "G-Q3623XH85S"
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