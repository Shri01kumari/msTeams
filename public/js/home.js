// Bug: join meeting not working
// Todo : change the below js

const joinMeeting = () => {
  var meetingId = $("#meeting-number").val();

  if (meetingId === "") {
    alert("Please enter a valid meeting id");
    return;
  }

  console.log(meetingId);
  url = `localhost:3030/${meetingId}`;
  console.log(url);
  window.location = url;
};
