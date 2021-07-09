function getFullscreenElement() {
  return (
    document.fullscreenElement ||
    document.webkitFullscreenElement || //for support for Safari/Opera
    document.mozFullscreenElement || //for Mozilla Firefox
    document.msFullscreenElement //for Microsoft Edge
  );
}

function toggleFullScreen() {
  if (getFullscreenElement()) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen().catch(console.log);
  }
}
document.addEventListener("dblclick", () => {
  toggleFullScreen();
});
