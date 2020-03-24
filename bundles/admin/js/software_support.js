/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2915);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2915:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2916);
module.exports = __webpack_require__(2917);


/***/ }),

/***/ 2916:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 2917:
/***/ (function(module, exports) {

var TIME_DELAY = 1000;
$(document).ready(function () {
    var body = $('body');
    var interval = setInterval(function () {
        if (body.find('#jsd-widget').length > 0) {
            var jsdWidget_1 = $('#jsd-widget');
            jsdWidget_1.ready(function () {
                setTimeout(function () {
                    var supportWrapper = $('.support-wrapper');
                    var supportClass = supportWrapper.attr('class');
                    var getSecondClass = supportClass.split(' ');
                    jsdWidget_1.addClass(getSecondClass[1]);
                    supportWrapper.html('<div class="support-button">\n' +
                        '<small>Click here for</small>\n' +
                        '<span>software support</span>\n' +
                        '<small>Or call us at (855) 766-6979</small>\n' +
                        '</div>');
                    jsdWidget_1.addClass('show');
                }, 1.5 * TIME_DELAY);
            });
            clearInterval(interval);
            var laptopScreenHeight = 700;
            var screenHeight = $(document).height();
            var jsdHeightForm_1 = (laptopScreenHeight >= screenHeight) ? 'unset' : '450px';
            jsdWidget_1.ready(function () {
                var iframe = jsdWidget_1.contents();
                var sample = '<style>#button-container{opacity: 0;} .help-form{height: ' + jsdHeightForm_1 + '!important; } ' +
                    '.Select-menu-outer .Select-menu {max-height: 15em; overscroll-behavior-y: auto;}</style>';
                iframe.find('head').append(sample);
            });
        }
    }, TIME_DELAY);
});


/***/ })

/******/ });