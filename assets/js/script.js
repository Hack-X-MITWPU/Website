// loader
$(window).ready(() => {
  setTimeout(() => {
    $("#loader").removeClass("d-flex").addClass("d-none");
    $("body").css("overflow-y", "scroll");
    //header animation
    anime
      .timeline({ loop: false })
      .add({
        targets: ".introText .text",
        scale: [14, 1],
        opacity: [0, 1],
        easing: "easeOutCirc",

        delay: (el, i) => 800 * i,
      })
      .add({
        targets: ".introText",

        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000,
      });
  }, 3000);
});

//progress bar
let progress = document.getElementById("progressBar");
let totalHeight = document.body.scrollHeight - window.innerHeight;
window.onscroll = function () {
  let progressHeight = (window.pageYOffset / totalHeight) * 101;
  progress.style.height = progressHeight + "%";
};

//counter
let delayTime =
  200 +
  $("#features").outerHeight(true) +
  $("#about").outerHeight(true) +
  $("#events").outerHeight(true);
let flag = true;

$(window).on("scroll", function () {
  if (flag) {
    if (window.pageYOffset > delayTime) {
      $(".count").each(function () {
        $(this)
          .prop("Counter", 0)
          .animate(
            {
              Counter: $(this).text(),
            },
            {
              duration: 1000,
              easing: "swing",
              step: function (now) {
                $(this).text(Math.ceil(now));
              },
            }
          );
      });
      flag = false;
    }
  }
});

//image gallery
var a = document.getElementsByTagName("a");
var cfImg = document.getElementsByClassName("coverflow__image");

var scaleI = 0;
for (scaleI; scaleI < a.length; scaleI++) {
  if (scaleI === 3) {
    continue;
  } else {
    a[scaleI].style.cursor = "default";
    a[scaleI].addEventListener("click", prevDef);
  }
}

function prevDef(e) {}

function forScale(coverflowPos) {
  for (scaleI = 0; scaleI < a.length; scaleI++) {
    a[scaleI].style.cursor = "default";
    a[scaleI].addEventListener("click", prevDef);
  }
  for (scaleI = 0; scaleI < cfImg.length; scaleI++) {
    if (cfImg[scaleI].getAttribute("data-coverflow-index") == coverflowPos) {
      cfImg[scaleI].parentElement.style.cursor = "pointer";
      cfImg[scaleI].parentElement.removeEventListener("click", prevDef);
    }
  }
}

function setupCoverflow(coverflowContainer) {
  var coverflowContainers;

  if (typeof coverflowContainer !== "undefined") {
    if (Array.isArray(coverflowContainer)) {
      coverflowContainers = coverflowContainer;
    } else {
      coverflowContainers = [coverflowContainer];
    }
  } else {
    coverflowContainers = Array.prototype.slice.apply(
      document.getElementsByClassName("coverflow")
    );
  }

  coverflowContainers.forEach(function (containerElement) {
    var coverflow = {};
    var prevArrows, nextArrows;

    //capture coverflow elements
    coverflow.container = containerElement;
    coverflow.images = Array.prototype.slice.apply(
      containerElement.getElementsByClassName("coverflow__image")
    );
    coverflow.position = Math.floor(coverflow.images.length / 2) + 1;

    //set indicies on images
    coverflow.images.forEach(function (coverflowImage, i) {
      coverflowImage.dataset.coverflowIndex = i + 1;
    });

    //set initial position
    coverflow.container.dataset.coverflowPosition = coverflow.position;

    //get prev/next arrows
    prevArrows = Array.prototype.slice.apply(
      coverflow.container.getElementsByClassName("prev-arrow")
    );
    nextArrows = Array.prototype.slice.apply(
      coverflow.container.getElementsByClassName("next-arrow")
    );

    //add event handlers
    function setPrevImage() {
      coverflow.position = Math.max(1, coverflow.position - 1);
      coverflow.container.dataset.coverflowPosition = coverflow.position;
      //call the functin forScale added
      forScale(coverflow.position);
    }

    function setNextImage() {
      coverflow.position = Math.min(
        coverflow.images.length,
        coverflow.position + 1
      );
      coverflow.container.dataset.coverflowPosition = coverflow.position;
      //call the function Chase added
      forScale(coverflow.position);
    }

    function jumpToImage(evt) {
      coverflow.position = Math.min(
        coverflow.images.length,
        Math.max(1, evt.target.dataset.coverflowIndex)
      );
      coverflow.container.dataset.coverflowPosition = coverflow.position;
      //start added by Chase
      setTimeout(function () {
        forScale(coverflow.position);
      }, 1);
      //end added by Chase
    }

    function onKeyPress(evt) {
      switch (evt.which) {
        case 37: //left arrow
          setPrevImage();
          break;
        case 39: //right arrow
          setNextImage();
          break;
      }
    }
    prevArrows.forEach(function (prevArrow) {
      prevArrow.addEventListener("click", setPrevImage);
    });
    nextArrows.forEach(function (nextArrow) {
      nextArrow.addEventListener("click", setNextImage);
    });
    coverflow.images.forEach(function (image) {
      image.addEventListener("click", jumpToImage);
    });
    window.addEventListener("keyup", onKeyPress);
  });
}

setupCoverflow();
