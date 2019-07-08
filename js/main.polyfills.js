/*!
 * undp v0.0.1
 * A description for your project.
 * (c) 2019 
 * MIT License
 * 
 */

/**
 * Element.matches() polyfill (simple version)
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
 */
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
(function() {
	if (window.__twitterIntentHandler) return;
	var intentRegex = /twitter\.com\/intent\/(\w+)/,
		windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
		width = 550,
		height = 420,
		winHeight = screen.height,
		winWidth = screen.width;
  
	function handleIntent(e) {
	  e = e || window.event;
	  var target = e.target || e.srcElement,
		  m, left, top;
  
	  while (target && target.nodeName.toLowerCase() !== 'a') {
		target = target.parentNode;
	  }
  
	  if (target && target.nodeName.toLowerCase() === 'a' && target.href) {
		m = target.href.match(intentRegex);
		if (m) {
		  left = Math.round((winWidth / 2) - (width / 2));
		  top = 0;
  
		  if (winHeight > height) {
			top = Math.round((winHeight / 2) - (height / 2));
		  }
  
		  window.open(target.href, 'intent', windowOptions + ',width=' + width +
											 ',height=' + height + ',left=' + left + ',top=' + top);
		  e.returnValue = false;
		  e.preventDefault && e.preventDefault();
		}
	  }
	}
  
	if (document.addEventListener) {
	  document.addEventListener('click', handleIntent, false);
	} else if (document.attachEvent) {
	  document.attachEvent('onclick', handleIntent);
	}
	window.__twitterIntentHandler = true;
}());

var getWindowOptions = function() {
	var width = 500;
	var height = 450;
	var left = (window.innerWidth / 2) - (width / 2);
	var top = (window.innerHeight / 2) - (height / 2);
  
	return [
	  'resizable,scrollbars,status',
	  'height=' + height,
	  'width=' + width,
	  'left=' + left,
	  'top=' + top,
	].join();
};

var fbBtn = document.querySelectorAll('.js-fb-share');
var title = encodeURIComponent('');

if(fbBtn && fbBtn.length > 0) {
	fbBtn.forEach((function(btn) {
		var shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + btn.href + '&title=' + title;

		btn.addEventListener('click', (function(e) {
			e.preventDefault();
			var win = window.open(shareUrl, 'ShareOnFb', getWindowOptions());
			win.opener = null;
		}))
	}))
}

var hamburger = {
	navToggle: document.querySelector('.nav-toggle'),
	nav: document.querySelector('nav'),

	doToggle: function(e) {
		e.preventDefault();
		this.navToggle.classList.toggle('x');
		this.nav.classList.toggle('open');
	}
};

hamburger.navToggle.addEventListener('click', (function(e) { hamburger.doToggle(e); }));


// var nav = {
// 	main: document.querySelector('.nav-main'),
// 	mainItem: document.querySelectorAll('.nav-main a')
// }

// nav.mainItem.forEach(function(item) {
// 	item.addEventListener('click',function(e) {
// 		// e.preventDefault();

// 		document.querySelector('nav .active').classList.remove('active');
// 		this.parentNode.classList.add('active');
// 	})
// })

var getParams = function (url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};

var updateQueryStringParam = function (key, value) {

    var baseUrl = [location.protocol, '//', location.host, location.pathname].join(''),
        urlQueryString = document.location.search,
        newParam = key + '=' + value,
        params = '?' + newParam;

    // If the "search" string exists, then build params from it
    if (urlQueryString) {
        var updateRegex = new RegExp('([\?&])' + key + '[^&]*');
        var removeRegex = new RegExp('([\?&])' + key + '=[^&;]+[&;]?');

        if( typeof value == 'undefined' || value == null || value == '' ) { // Remove param if value is empty
            params = urlQueryString.replace(removeRegex, "$1");
            params = params.replace( /[&;]$/, "" );

        } else if (urlQueryString.match(updateRegex) !== null) { // If param exists already, update it
            params = urlQueryString.replace(updateRegex, "$1" + newParam);

        } else { // Otherwise, add it to end of query string
            params = urlQueryString + '&' + newParam;
        }
    }

    // no parameter was set so we don't need the question mark
    params = params == '?' ? '' : params;

    window.history.replaceState({}, "", baseUrl + params);
};

var body = document.querySelector('body')

if(body.classList.contains('loading')) {
	setTimeout((function(){
		body.classList.remove('loading')
		body.classList.add('loaded')
	}), 2000);
}


// Loading screen
var loadingScreen = document.getElementById('LoadingScreen')

var opacity = 0;
var animation = true;

function writeCookie (key, value, days) {
    var date = new Date();

    // Default at 365 days.
    days = days || 365;

    // Get unix milliseconds at current time plus number of days
    date.setTime(+ date + (days * 86400000)); //24 * 60 * 60 * 1000

    window.document.cookie = key + "=" + value + "; expires=" + date.toGMTString() + "; path=/";

    return value;
};

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

var btnEnter = document.getElementById('LoadingButton');

if(loadingScreen && btnEnter) {
	btnEnter.addEventListener('click', (function() {
		setTimeout((function(){
			body.classList.add('load-animation')
			hamburger.navToggle.click();
			
			if(getParams(window.location.href).forceLoading == 'true') {
				updateQueryStringParam('forceLoading','')
			}

			setTimeout((function(){
				hamburger.navToggle.click();
			}), 4000);

			setTimeout((function() {
				body.classList.remove('load-animation')
				loadingScreen.classList.remove('active')
				body.classList.add('loaded')

				// writeCookie('loadingAnimation', false, 30);
				// console.log('readCookie()',readCookie('loadingAnimation'))
			}), 3000)
		}), 500);
	}))
} else {
	// body.classList.remove('load-animation')
	// body.classList.add('loaded')
	// loadingScreen.classList.remove('active')
}


// Nav scroll for mobile
var w=window,
d=document,
e=d.documentElement,
g=d.getElementsByTagName('body')[0],
x=w.innerWidth||e.clientWidth||g.clientWidth,
y=w.innerHeight||e.clientHeight||g.clientHeight;

var navBar = document.getElementById('nav');
var scrollPosY = window.pageYOffset | document.body.scrollTop;
var fadeIn = document.querySelectorAll('.js-fade-in');

if(scrollPosY > 10 && x < 769) {
	body.classList.add(newFunction());
} else {
	body.classList.remove('has-scrolled');
}

// Fade in elems
if(fadeIn && fadeIn.length > 0) {
	fadeIn.forEach((function(elem) {
		var bounding = elem.parentNode.offsetTop;
		var pos = elem.getBoundingClientRect();
		
		if(scrollPosY >= (bounding * .9)) {
			elem.classList.add('visible')
		} else {
			elem.classList.remove('visible')
		}
	}))
}

// scroll
window.onscroll = function scroll(){
	scrollPosY = window.pageYOffset | document.body.scrollTop;
	
	// Mobile nav
	if(scrollPosY > 10 && x < 769) {
		body.classList.add('has-scrolled');
	} else {
		body.classList.remove('has-scrolled');
	}
	
	// Fade in elems
	if(fadeIn && fadeIn.length > 0) {
		fadeIn.forEach((function(elem) {
			var bounding = elem.parentNode.offsetTop;
			var pos = elem.getBoundingClientRect();
			
			if(scrollPosY >= (bounding * .9)) {
				elem.classList.add('visible')
			} else {
				elem.classList.remove('visible')
			}
		}))
	}
}

// Modals
var modalTrigger = document.querySelectorAll('.js-modal-trigger');
var modalWrapper = document.querySelectorAll('.js-modal-wrapper');

if(modalTrigger && modalTrigger.length > 0) {
	modalTrigger.forEach((function(trigger) {

		trigger.addEventListener('click', (function(e) {
			e.preventDefault();
			
			var modalId = this.dataset.modalId,
				modal = document.getElementById(modalId)

			if(typeof(modal) != 'undefined' && modal != null){
				modal.classList.add('active')
			}

		}))
	}))
}

if(modalWrapper && modalWrapper.length > 0) {
	modalWrapper.forEach((function(wrapper) {
		wrapper.addEventListener('click', (function(e) {
			e.preventDefault();
			this.classList.remove('active')
		}))
	}))
}

function newFunction() {
	return 'has-scrolled';
}

