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





})(window, document);
