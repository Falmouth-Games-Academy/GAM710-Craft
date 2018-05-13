/**
 * @Author: alcwynparker
 * @Date:   2018-05-03T11:14:24+01:00
 * @Last modified by:   alcwynparker
 * @Last modified time: 2018-05-03T15:12:09+01:00
 */

// Self-executing anonymous function
// interesting article: http://markdalgleish.com/2011/03/self-executing-anonymous-functions/
(function(window, document, undefined){


  var sideNav = document.getElementById('side-nav');
  var sideNavOpen = document.getElementById('side-nav-open');
  var sideNavClose = document.getElementById('side-nav-close');

  sideNavOpen.addEventListener('click', function (e) {
    sideNav.style.width = '90%';
  });

  sideNavClose.addEventListener('click', function (e) {
    sideNav.style.width = '0';
  });

  // 5.Canvas
  //
  // First we must retrieve the canvas element and get the canvas context to draw on
  var canvas = document.getElementById('drawing-area');

  // make sure canvas is supported
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    // rectangles
    ctx.fillStyle = 'rgb(120, 120, 0)';
    ctx.fillRect(10, 10, 50, 50);

    ctx.fillStyle = 'rgba(0, 100, 100, 0.5)';
    ctx.fillRect(30, 10, 30, 100);

    // Circle
    ctx.fillStyle = 'rgba(210, 30, 100)';
    ctx.beginPath();
      ctx.arc(150,65,50,0,2*Math.PI);
    ctx.stroke();

    // diamonds
    ctx.fillStyle = 'rgba(0, 100, 100, 0.5)';
    drawDiamond(ctx, 100, 100, 50, 50, true);
    drawDiamond(ctx, 120, 100, 50, 50, true);
    drawDiamond(ctx, 140, 100, 50, 50, true);
    drawDiamond(ctx, 160, 100, 50, 50, true);
    drawDiamond(ctx, 180, 100, 50, 50, true);

    // create a new image object
    var img = new Image();

    // add an eventlistener for when the image has finished loading
    img.onload = function () {
      ctx.drawImage(img, 100, 200);
    }

    // set the src - this begins the loading of the image
    img.src = "img/box.png";

  } else {
    console.log("This browser does not support the Canvas Element!")
  }

  /**
   * drawDiamond - Helper function to draw a diamond to the canvas context
   * @param  {Object} ctx - the canvas context to draw on
   * @param  {Number} xPos
   * @param  {Number} yPos
   * @param  {Number} width
   * @param  {Number} height
   * @param  {Boolean} fill - whether to fill the diamond with color or not
   */
  function drawDiamond (ctx, xPos, yPos, width, height, fill) {

    // calculate the mid points
    var halfWidth = width / 2;
    var halfHeight = height / 2;

    // draw diamond - clockwise
    ctx.beginPath();
    ctx.moveTo(xPos + halfWidth, yPos);
    ctx.lineTo(xPos + width, yPos + halfHeight);
    ctx.lineTo(xPos + halfWidth, yPos + height);
    ctx.lineTo(xPos, yPos + halfHeight);

    // if requested fill the inside of the diamond
    if (fill) ctx.fill();
  }

  // 6.Canvas
  //
  // Start with a simple animation

  // starting coordinates
  var animPos = [-30, 10];

  // start the loop
  window.requestAnimationFrame(update);


  /**
   * update - loop to handle all the animations
   *
   * @param  {Number} timeStamp - the time in millis since app started
   */
  function update(timeStamp){
    // output timestamp to console
    //console.log('Tick: ' + timeStamp);

    // draw a diamond to the canvas
    drawDiamond(ctx, animPos[0], animPos[1], 10, 10, true);

    // move along the x axis
    animPos[0]+=10;

    // check for boundaries
    if (animPos[0] > 350){
      animPos[1] += 20;
      animPos[0] = -30;
    }

    // animation stops when it gets to 400 on the y axis
    if (animPos[1] < 400) {
      // call the update loop again
      window.requestAnimationFrame(update);
    }
  }

  canvas.addEventListener("touchend", handleTouch, false);
  var canvasBounds = canvas.getBoundingClientRect();

  function handleTouch (e) {
    e.preventDefault();

    console.log(e.changedTouches[0]);

    // create a new image object
    var img = new Image();

    // add an eventlistener for when the image has finished loading
    img.onload = function () {
      ctx.drawImage(img, e.changedTouches[0].clientX - canvasBounds.left, e.changedTouches[0].clientY - canvasBounds.top);
    }

    // set the src - this begins the loading of the image
    img.src = "img/phi.png";

  }


})(window, document);
