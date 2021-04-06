$('#sun-link').hover(function () {
  $('#sun').css({ 'box-shadow': '0px 0px 10px 10px rgba(242, 120, 75, 0.4)' });
}, function () {
  $('#sun').css({ 'box-shadow': '0px 0px 8px 8px rgba(242, 120, 75, 0.2)' });
});

const planets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];

for (let i = 0; i < planets.length; i++) {
  let planet = planets[i];
  $(`#${planet}-link`).hover(function () {
    $(`#${planet}-orbit`).css({ border: 'solid 3px rgba(137, 196, 244, 0.4)' });
  }, function () {
    $(`#${planet}-orbit`).css({ border: 'solid 3px rgba(137, 196, 244, 0.1)' });
  });
}



let currentSlide = 0; // Current Slide
let images = []; // Images Array

// Images List
images[0] = 'img/1.jpg';
images[1] = 'img/2.jpg';
images[2] = 'img/3.jpg';
images[3] = 'img/4.jpg';
images[4] = 'img/5.jpg';
images[5] = 'img/6.jpg';

// Opens Lightbox
function openModal() {
    document.querySelector(".lightboxContainer").style.display = "flex";
    document.body.style.overflow = "hidden";
    document.querySelector(".gallery").style.filter = "blur(5px)";
}

// Closes Lightbox
function closeModal() {
    document.querySelector(".lightboxContainer").style.display = "none";
    document.body.style.overflow = "initial";  
    document.querySelector(".gallery").style.filter = "blur(0)";
}

// Sets Current Image to Lightbox when clicked
// Returns the Current Slide Index
function changeImage(n) {
    document.activeImage.src = images[n];
    currentSlide = n;
    return currentSlide;
}

// Cycles Through Images
// n is either 1 (next slide) or -1 (previous slide)
function nextSlide(n) {

    if (currentSlide < 1 && n == -1) {
        //IF at first slide AND selecting previous slide
        currentSlide = images.length - 1;
        document.activeImage.src = images[currentSlide];
        return currentSlide;

    } else if (currentSlide < images.length - 1 && currentSlide >= 0 && n == 1) {
        //IF at any slide besides the last AND going up
        currentSlide = currentSlide + 1;
        document.activeImage.src = images[currentSlide];
        return currentSlide;

    } else if (currentSlide == images.length - 1 && n == 1) {
        //IF at final slide last AND going up
        currentSlide = 0;
        document.activeImage.src = images[currentSlide];
        return currentSlide;

    } else {
        //Anything else (going down AND not at first slide)
        currentSlide = currentSlide - 1;
        document.activeImage.src = images[currentSlide];
        return currentSlide;

    }
}