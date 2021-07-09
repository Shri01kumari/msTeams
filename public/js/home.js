const joinMeeting = () => {
  var meetingId = document.getElementById("meeting-number").value;
  if (meetingId === "") {
    alert("Please enter a valid meeting id");
    return;
  }
  console.log(meetingId);
  url = `http://localhost:3000/${meetingId}`;
  console.log(url);
  window.location = url;
};

// Change form outline to filled on hovering
// Todo Think about workin it with svg

// $(document).ready(function () {
//   $(".change-fill").hover(
//     function () {
//       $(this).toggleClass("material-icons-outlined");
//     },
//     function () {
//       $(this).toggleClass("material-icons");
//     }
//   );
// });

// (function ($) {
//   document.querySelector(".card").tilt({
//     maxTilt: 15,
//     perspective: 1400,
//     easing: "cubic-bezier(.03,.98,.52,.99)",
//     speed: 1200,
//     glare: true,
//     maxGlare: 0.2,
//     scale: 1.04,
//   });
// });
