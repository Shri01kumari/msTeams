const joinMeeting = () => {
  var meetingId = document.getElementById("meeting-number").value;
  if (meetingId === "") {
    alert("Please enter a valid meeting id");
    return;
  }
  console.log(meetingId);
  url = `https://teams-clone-appv3.herokuapp.com/${meetingId}`;
  console.log(url);
  window.location = url;
};
