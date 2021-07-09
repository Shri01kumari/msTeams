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



let myName = prompt("Enter Your Name")

const sendMessage = () => {
    let message = document.getElementById("message").value
    firebase.database().ref("messages").push().set({
        "sender": myName,
        "message": message
    });
    let message1 = document.getElementById("message")
    message1.value = ""
    return false;

}