// const facebook_login = () => {

//     var provider = new firebase.auth.FacebookAuthProvider();

//     firebase.auth().signInWithPopup(provider).then(function (result) {
//         var token = result.credential.accessToken;
//         var user = result.user;

//         console.log("user===>", user.displayName)
//     })
//         .catch(function (error) {
//             console.log(error.message)
//         });

// }

// const google_login = () => {

//     var provider = new firebase.auth.GoogleAuthProvider();

//     firebase.auth().signInWithPopup(provider).then(function (result) {
//         var token = result.credential.accessToken;
//         var user = result.user;

//         console.log("user ===> ", user)
//     })
//         .catch(function (error) {
//             console.log(error.message)
//         });
// }
