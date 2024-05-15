let slideIndex = 1;
showSlides(slideIndex);


function plusSlides(n) {
  showSlides(slideIndex += n);
  clearTimeout(timeoutId);
}


function currentSlide(n) {
  showSlides(slideIndex = n);
  clearTimeout(timeoutId);
}
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }


  slides[slideIndex - 1].style.display = "block";


  dots[slideIndex - 1].className += " active";

  timeoutId = setTimeout(function () {
    showSlides(slideIndex += 1);
  }, 5000);
}


//HORIZONTAL TIMELINE
//Sample dates
var dates = ["1/1/2015", "2/15/2015", "4/1/2015", "5/16/2015", "6/30/2015", "8/14/2015", "9/28/2015", "11/12/2015"];
//For the purpose of stringifying MM/DD/YYYY date format
var monthSpan = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var imgSpan = ["T1.png", "T2.png", "T3.png", "T4.png", "T5.png", "T6.png", "T7.png","T8.png"]

//Format MM/DD/YYYY into string
function dateSpan(date) {
  var month = date.split('/')[0];
  month = monthSpan[month - 1];
  var day = date.split('/')[1];
  if (day.charAt(0) == '0') {
    day = day.charAt(1);
  }
  var year = date.split('/')[2];

  //Spit it out!
  if(month == "January"){
    return "Heatmap Visualization"
  }
  if(month == "February"){
    return "Comparative Analysis"
  }
  if(month == "April"){
    return "Search Results"
  }
  if(month == "May"){
    return "Chromosomal View"
  }
  if(month == "June"){
    return "Intuitive Reports"
  }
  if(month == "August"){
    return "Dynamic Dashboards"
  }
  if(month == "September"){
    return "Quick Search"
  }
  if(month == "November"){
    return "Variant Analysis"
  }
}

//Main function. Draw your circles.
function makeCircles() {
  //Forget the timeline if there's only one date. Who needs it!?
  if (dates.length < 2) {
    $("#line").hide();
    $("#span").show().text(dateSpan(dates[0]));
    //This is what you really want.
  } else if (dates.length >= 2) {
    //Set day, month and year variables for the math
    var first = dates[0];
    var last = dates[dates.length - 1];

    var firstMonth = parseInt(first.split('/')[0]);
    var firstDay = parseInt(first.split('/')[1]);

    var lastMonth = parseInt(last.split('/')[0]);
    var lastDay = parseInt(last.split('/')[1]);

    //Integer representation of the last day. The first day is represnted as 0
    var lastInt = ((lastMonth - firstMonth) * 30) + (lastDay - firstDay);

    //Draw first date circle
    $("#line").append('<div class="circle" id="circle0" style="left: ' + 0 + '%;"><div class="popupSpan">' + dateSpan(dates[0]) + '</div></div>');

    $("#mainCont").append('<span id="span0" class="center"><img src="T1.png" alt="Image 0"></span>');

    //Loop through middle dates
    for (i = 1; i < dates.length - 1; i++) {
      var thisMonth = parseInt(dates[i].split('/')[0]);
      var thisDay = parseInt(dates[i].split('/')[1]);

      //Integer representation of the date
      var thisInt = ((thisMonth - firstMonth) * 30) + (thisDay - firstDay);

      //Integer relative to the first and last dates
      var relativeInt = thisInt / lastInt;

      //Draw the date circle
      $("#line").append('<div class="circle" id="circle' + i + '" style="left: ' + relativeInt * 100 + '%;"><div class="popupSpan">' + dateSpan(dates[i]) + '</div></div>');

      $("#mainCont").append('<span id="span' + i + '" class="right"><img src="' + imgSpan[i] + '"></span>');
    }

    //Draw the last date circle
    $("#line").append('<div class="circle" id="circle' + i + '" style="left: ' + 99 + '%;"><div class="popupSpan">' + dateSpan(dates[dates.length - 1]) + '</div></div>'); 

    $("#mainCont").append('<span id="span' + i + '" class="right"><img src="' + imgSpan[i] + '"></span>');
  }

  $(".circle:first").addClass("active");
}

makeCircles();

$(".circle").mouseenter(function() {
  $(this).addClass("hover");
});

$(".circle").mouseleave(function() {
  $(this).removeClass("hover");
});

$(".circle").click(function() {
  var spanNum = $(this).attr("id");
  selectDate(spanNum);
});

function selectDate(selector) {
  $selector = "#" + selector;
  $spanSelector = $selector.replace("circle", "span");
  var current = $selector.replace("circle", "");

  $(".active").removeClass("active");
  $($selector).addClass("active");

  if ($($spanSelector).hasClass("right")) {
    $(".center").removeClass("center").addClass("left")
    $($spanSelector).addClass("center");
    $($spanSelector).removeClass("right")
  } else if ($($spanSelector).hasClass("left")) {
    $(".center").removeClass("center").addClass("right");
    $($spanSelector).addClass("center");
    $($spanSelector).removeClass("left");
  }; 
};

console.log();