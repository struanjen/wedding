
var WDNG = WDNG || {};

document.addEventListener('scroll', function() {
  'use strict';

  WDNG.navbar.navPosition();
  //WDNG.intro.resize();
});

function setupMenuBtn() {
    console.log('setup menu');

  document.querySelector('#fixed-nav #menu').addEventListener('click', function(e) {
    'use strict';

    console.log('clicked on menu');

    var menuContent = document.querySelector('.menu-content'),
      targetClass = e.target.classList;

    if ( menuContent.classList.contains('menu-open') ) {
      menuContent.classList.remove('menu-open');
      targetClass.add('hamburger');
      targetClass.remove('cross');
    } else {
      menuContent.classList.add('menu-open');
      targetClass.remove('hamburger');
      targetClass.add('cross');
    }
  });
}

WDNG.app = (function () {

  'use strict';
  
  return {

  };
}());

WDNG.util = (function () {
  
  'use strict';

  function domEl(selector) {
    return document.querySelector(selector);
  }

  function getOffset(el) {
    var curLeft, curTop;

    var winHeight = window.innerHeight;
    
    curLeft = curTop = 0;

    if (el && el.offsetParent) {
      do {
        //console.log('offsetParent');
        //console.log('el.offsetTop ' + el.offsetTop + ', el.scrollTop ' + el.scrollTop);
        //curLeft += el.offsetLeft - el.scrollLeft;
        curTop += el.offsetTop - el.scrollTop;
      } while (el = el.offsetParent);
    }

    return {top: curTop, left: curLeft, winHeight: winHeight};
  }

  return {
    domEl: domEl,
    getOffset: getOffset
  };
}());

WDNG.intro = (function () {

  'use strict';

  // Track distance of header from top of page
  // resize from ? to ?
  
  var selector = 'header[role="banner"]';

  function resize () {
    var el = WDNG.util.domEl(selector);
    
    if (!el) {
      return;
    }

    el.style.overflow = 'visible';

    var offset = WDNG.util.getOffset(el);
    var initialScale = 1.35;
    var i = 1024 * initialScale; // image width
    var c = 1024; // container width
    var h = 382; // container height
    //h = 191;
    var minScale = 382/c/1.5;
    minScale = 0.55;
    var p = -1 * offset.top; // current position
    var scaleFactor = (c*p)/(h*i);
    var scale = initialScale - scaleFactor;
    var translateY = -1024 + 1700 * scaleFactor;
    var thresholdY = 700;
    thresholdY = 352;
    translateY = translateY > thresholdY ? thresholdY : translateY;
    //translateY = -50;
    //var posTop = -50 + 100 * scaleFactor;
    scale = scale > minScale ? scale : minScale;
    var image = el.querySelector('img');

    //console.log('header offset top:', offset);
    /*console.log('scale = ' + scale);
    console.log('translateY = ' + translateY);*/
    var newTransform = 'translate3d(-50%, ' + translateY + 'px, 0) scale(' + scale + ')';
    image.style.webkitTransform = newTransform;
    image.style.mozTransform = newTransform;
    image.style.transform = newTransform;
  }
  
  return {
    resize: resize
  };
}());

WDNG.navbar = (function () {

  'use strict';

  var selector = 'nav[role="navigation"]';
  var trigger = 'main[role="main"]';

  function navTop () {
    var el = WDNG.util.domEl(selector);
    var triggerEl = WDNG.util.domEl(trigger);
    var offset = WDNG.util.getOffset(triggerEl);
    var fixedNavId = 'fixed-nav';
    var fixedNav = WDNG.util.domEl('#' + fixedNavId);
    //var clone = el.cloneNode(true);
    //clone.id = fixedNavClassName;
    // append clone and set 'fixed' position
    //console.log('el offset top:', offset);
    if (offset.top < 10) {
      if (fixedNav === null) {
        //document.body.appendChild(clone);
        //el.style.visibility = 'hidden';
        el.id = fixedNavId;
        setupMenuBtn();
      }
    } else if (fixedNav) {
      //document.body.removeChild(fixedNav);
      el.id = '';
      //el.style.visibility = '';
    }
  }

  /*function navBottom() {
    var el = WDNG.util.domEl(selector);
    var offset = WDNG.util.getOffset(el);
    var navFixed = false;

    //console.log('el offset top:', offset);

    if (offset.top <= offset.winHeight) {
      if (!navFixed) {
        el.style.position = 'fixed';
        navFixed = true;
      }
    } else if (navFixed) {
      el.style.position = 'relative';
      navFixed = false;
    }
  }*/

  var navPosition = function navPosition() {}

  return {
    navTop: navTop,
    //navBottom: navBottom,
    navPosition: navPosition
  };
}());


if ( window.matchMedia("(min-width: 56em)").matches ) {
  console.log('Min medium screen...');
  WDNG.navbar.navPosition = WDNG.navbar.navTop
} /*else {
  console.log('Small screen...');
  WDNG.navbar.navPosition = WDNG.navbar.navBottom;
  WDNG.intro.resize = function() {};
}*/