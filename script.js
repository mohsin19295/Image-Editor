const fileUpload = document.querySelector(".file-upload");
const chooseImg = document.querySelector(".choose-img");
const displayImg = document.querySelector(".display-img img");
const mainContainer = document.querySelector(".main-container");
const filterButtons = document.querySelectorAll(".filter button");
const rotateButtons = document.querySelectorAll(".rotate button");
const resetFilterButton = document.querySelector(".reset-filters");
const inputRange = document.querySelector(".slider input");
const inputValue = document.querySelector(".slider .value");

let [brightness, saturation, inversion, grayscale] = [100, 100, 0, 0];
let [rotate, horizontalFlip, verticalFlip] =[0, 1, 1]

const applyFilter = () => {
  displayImg.style.transform = `rotate(${rotate}deg) scale(${horizontalFlip}, ${verticalFlip})`;
  displayImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

const uploadImg = () => {
  let file = fileUpload.files[0]; // Get selected file
  if (!file) return; // Return if the file has not selected (if canceled)
  displayImg.src = URL.createObjectURL(file); // Passing file url as display img src
  displayImg.addEventListener("load", function () { // Removing desable class, after selecting an image
    mainContainer.classList.remove("disable");
  });
}

// Managing.active class on filter options
filterButtons.forEach((select => {
    select.addEventListener("click", function () {
      document.querySelector(".filter .active").classList.remove("active");
      select.classList.add("active");
      document.querySelector(".slider .name").innerHTML = select.innerHTML; // Passing filter name

    // Set indivisual selected filter value
        if (select.id === "brightness") {
          inputRange.max = "200";
          inputRange.value = brightness;
          inputValue.innerHTML = `${brightness}%`;
        } else if (select.id === "saturation") {
          inputRange.max = "200";
          inputRange.value = saturation;
          inputValue.innerHTML = `${saturation}%`;
        } else if (select.id === "inversion") {
          inputRange.max = "100";
          inputRange.value = inversion;
          inputValue.innerHTML = `${inversion}%`;
        } else {
          inputRange.max = "100";
          inputRange.value = grayscale;
          inputValue.innerHTML = `${grayscale}%`;
        }
  })
}))

// Updating filters
const displayAndUpdateFilter = () => {
  inputValue.innerHTML = `${inputRange.value}%`; // Passing inputRage
  let filterId = document.querySelector(".filter .active").id; // Get selected filter

  if (filterId === "brightness") {
    brightness = inputRange.value;
  } else if (filterId === "saturation") {
    saturation = inputRange.value;
  } else if (filterId === "inversion") {
    inversion = inputRange.value;
  } else {
    grayscale = inputRange.value;
    }
    applyFilter()
}

// Managing.rotion and flip on rotate options
rotateButtons.forEach((select) => {
  select.addEventListener('click', () => {
    if (select.id === 'left') {
      rotate -= 90;
    }
    else if (select.id === 'right') {
      rotate += 90;
    }
    else if (select.id === 'horizontal') {
      horizontalFlip = horizontalFlip == 1 ? -1 : 1
    }
    else {
      verticalFlip = verticalFlip == 1 ? -1 : 1
    }
    applyFilter()
  })
})

// Resetting filters
const resetFilters = () => {
  [brightness, saturation, inversion, grayscale] = [100, 100, 0, 0];

  [rotate, horizontalFlip, verticalFlip] = [0, 1, 1]

  filterButtons[0].click() // select brightness by default

  applyFilter()
}


resetFilterButton.addEventListener('click', resetFilters)
inputRange.addEventListener('input', displayAndUpdateFilter)
fileUpload.addEventListener("change", uploadImg)

chooseImg.addEventListener('click', function () {
    return fileUpload.click();
})