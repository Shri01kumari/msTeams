const closeDropup = () => {
  document.getElementById("close-menu").classList.toggle("show-content");
};

// Close the dropdown if the user clicks outside of it
window.onclick = (event) => {
  if (!event.target.matches(".dropbtn")) {
    let dropupData = document.getElementsByClassName("dropup-alpha-content");
    for (let i = 0; i < dropupData.length; i++) {
      let openDropdown = dropupData[i];
      if (openDropdown.classList.contains("show-content")) {
        openDropdown.classList.remove("show-content");
      }
    }
  }
};
