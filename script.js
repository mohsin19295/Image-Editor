const fileUpload = document.querySelector(".file-upload");
const chooseImg = document.querySelector(".choose-img");
const displayImg = document.querySelector(".display-img img");
const mainContainer = document.querySelector(".main-container");
const filterButtons = document.querySelectorAll(".filter button");
const inputRange = document.querySelector(".slider input");

const uploadImg = () => {
  let file = fileUpload.files[0]; // Get selected file
  if (!file) return; // Return if the file has not selected (if canceled)
  displayImg.src = URL.createObjectURL(file); // Passing file url as display img src
  displayImg.addEventListener("load", function () { // Removing desable class, after selecting an image
    mainContainer.classList.remove("disable");
  });
}

// Managing .active class on filter options
filterButtons.forEach((select => {
    select.addEventListener("click", function () {
      document.querySelector(".filter .active").classList.remove("active");
      select.classList.add("active");
      document.querySelector(".slider .name").innerHTML = select.innerHTML; // Passing filter name
    })
}))

const displayRangeValue = () => {
  document.querySelector(".slider .value").innerHTML = `${inputRange.value}%`; // Passing inputRage
}

inputRange.addEventListener('input', displayRangeValue)
fileUpload.addEventListener("change", uploadImg)

chooseImg.addEventListener('click', function () {
    return fileUpload.click();
})