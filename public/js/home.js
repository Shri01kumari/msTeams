const joinMeeting = () => {
  var meetingId = document.getElementById("meeting-number").value;
  if (meetingId === "") {
    alert("Please enter a valid meeting id");
    return;
  }
  // For testing purpose
  // url = `http://localhost:3000/${meetingId}`;
  // var pattern = /localhost/;
  // End testing

  // For production
  url = `https://teams-clone-appv3.herokuapp.com/${meetingId}`;
  var pattern = /appv3/;
  // end production
  if (pattern.test(meetingId)) {
    url = `${meetingId}`;
  } else {
    url = url;
  }

  console.log(url);
  window.location = url;
};
