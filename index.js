const crypto = require("crypto");

function openSideNav() {
  document.getElementById("sideNavBar").style.width = "240px";
}

function closeSideNav() {
  document.getElementById("sideNavBar").style.width = "0";
}

function openModal() {
  var modal = document.getElementById("idModal");
  var openButton = document.getElementsByClassName("add-button")[0];
  var closeButton = document.getElementsByClassName("close-button")[0];

  openButton.onclick = () => {
    modal.style.display = "block";
  };

  closeButton.onclick = () => {
    modal.style.display = "none";
  };
}
