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
/******/ 	return __webpack_require__(__webpack_require__.s = 2477);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1496:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Router_1 = __webpack_require__(38);
exports.userActivityStatusRoute = function () {
    return Router_1.default.api("users/" + (window.API.credentials.uid || window.PORTAL.currentUser.id) + "/activity-status").url();
};
exports.userTimeoutRoute = function () {
    return Router_1.default.api("users/" + (window.API.credentials.uid || window.PORTAL.currentUser.id) + "/timeout").url();
};
exports.adminRoleRoute = function () {
    return Router_1.default.api("users/granted-role").url();
};


/***/ }),

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.API = {
    base: window.API.base,
    credentials: window.API.credentials,
    opentok: window.API.opentok,
    login_url: window.API.login_url,
    base_v2: window.API.base_v2
};


/***/ }),

/***/ 2477:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2478);


/***/ }),

/***/ 2478:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var routes_1 = __webpack_require__(1496);
var AlertifyHelper_1 = __webpack_require__(34);
var Router_1 = __webpack_require__(38);
var utils_1 = __webpack_require__(64);
var interval = 60000; // 1 Minute
var idleWatcher;
var warningTimer;
var logoutUrl;
var didReset = 'false';
resetTimeoutTimer();
// Check if user is idle.
function checkIfIdle() {
    utils_1.api_get(routes_1.userTimeoutRoute(), { didReset: didReset }).then(function (response) {
        didReset = 'false';
        if (response['isIdle']) {
            logoutUrl = response['isAdmin'] ? Router_1.default.get('auto-logout').url() : Router_1.default.portalRoute('auto-logout').url();
            idleWarning(interval);
        }
    });
}
// Show idle timeout warning dialog.
function idleWarning(timeout) {
    warningTimer = setTimeout(idleTimeout, timeout);
    clearInterval(idleWatcher);
    popUpWarning();
}
// Reset timer, renew session.
function resetTimeoutTimer() {
    clearTimeout(warningTimer);
    idleWatcher = setInterval(checkIfIdle, interval);
}
// Logout the user.
function idleTimeout() {
    window.onbeforeunload = null;
    this.window.location = logoutUrl;
}
function popUpWarning() {
    alertify.okBtn('Stay Logged In').alert('Session about to expire due to inactivity.', function () {
        didReset = 'true';
        checkIfIdle();
        resetTimeoutTimer();
        AlertifyHelper_1.default.boot();
        AlertifyHelper_1.default.success('Session extended.');
    });
}


/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var API_1 = __webpack_require__(164);
var AlertifyHelper_1 = __webpack_require__(34);
function handleJsonErrorResponse(xhr) {
    switch (xhr.status) {
        case 403:
            AlertifyHelper_1.default.error('Access Denied. You are not authorized to access this page or perform this action.');
            window.location.href = window.ERROR_EXCEPTION.url + '403';
            break;
        case 401:
            AlertifyHelper_1.default.error('Your session has expired. Please login again.');
            window.location.href = API_1.API.login_url;
            break;
        case 400:
        case 404:
        case 412:
            var errorMsg = null;
            try {
                var error = xhr.responseJSON.error ? xhr.responseJSON.error.exception[0] : xhr.responseJSON[0];
                errorMsg = error.message;
            }
            catch (e) { }
            AlertifyHelper_1.default.error(errorMsg || 'Something went wrong');
            break;
        default:
            break;
    }
}
exports.handleJsonErrorResponse = handleJsonErrorResponse;


/***/ }),

/***/ 330:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var FormDataHelper = (function () {
    function FormDataHelper() {
    }
    FormDataHelper.from = function (obj) {
        var formData = new FormData();
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                var val = obj[prop];
                if (val instanceof Object && !(val instanceof File)) {
                    this.recursive_from(prop, val, formData);
                }
                else if (val || 0 === val) {
                    formData.append(prop, val);
                }
            }
        }
        return formData;
    };
    FormDataHelper.recursive_from = function (property, obj, formData) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                var val = obj[prop];
                var prefix = property + "[" + prop + "]";
                if (val instanceof Object && !(val instanceof File)) {
                    this.recursive_from(prefix, val, formData);
                }
                else if (val || 0 === val) {
                    formData.append(prefix, val);
                }
            }
        }
    };
    return FormDataHelper;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FormDataHelper;


/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var AlertifyHelper = (function () {
    function AlertifyHelper() {
    }
    AlertifyHelper.boot = function () {
        alertify.clearLogs();
        alertify.reset();
        alertify.logPosition('top left');
    };
    AlertifyHelper.success = function (message) {
        alertify.success(message || 'Saved.');
    };
    AlertifyHelper.error = function (message) {
        alertify.error(message || 'Something went wrong.');
    };
    AlertifyHelper.confirm = function (callback, message, okButton) {
        if (message === void 0) { message = 'Are you sure you want to proceed?'; }
        if (okButton === void 0) { okButton = 'Yes'; }
        alertify.okBtn(okButton).confirm(message, callback);
    };
    AlertifyHelper.loading = function (text) {
        if (text === void 0) { text = 'Loading'; }
        alertify.log('<div class="loader"></div>&nbsp;&nbsp;' + text).delay(0).closeLogOnClick(false);
    };
    AlertifyHelper.alert = function (message) {
        alertify.okBtn('Ok').alert(message);
    };
    AlertifyHelper.handleErrorResponse = function (responseJson) {
        var code = responseJson['code'];
        switch (code) {
            case 400:
                AlertifyHelper.error('Please fill out the form properly.');
                break;
            default:
                AlertifyHelper.error('Unexpected error occured.');
                break;
        }
    };
    return AlertifyHelper;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AlertifyHelper;


/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ADMIN_1 = __webpack_require__(396);
var API_1 = __webpack_require__(164);
var Router = (function () {
    function Router(resource, base) {
        if (base === void 0) { base = ADMIN_1.ADMIN.base; }
        this.base = base;
        this.resource = resource;
    }
    Router.get = function (base) {
        return new Router(base);
    };
    Router.api = function (base) {
        return new Router(base, API_1.API.base);
    };
    Router.apiV2 = function (base) {
        return new Router(base, API_1.API.base_v2);
    };
    Router.root = function (base) {
        return new Router(base, window.ROOT);
    };
    Router.portalRoute = function (base) {
        return new Router(base, ADMIN_1.PORTAL.base);
    };
    Router.prototype.url = function (id, action) {
        var parameters = [this.base, this.resource, id ? '' + id : null, action];
        return '/' + parameters.filter(function (p) { return p && p.length; }).join('/');
    };
    Router.prototype.actionUrl = function (action) {
        var parameters = [this.base, this.resource, action];
        return '/' + parameters.filter(function (p) { return p && p.length; }).join('/');
    };
    return Router;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Router;


/***/ }),

/***/ 396:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.ADMIN = {
    base: window.ADMIN.base,
    currentUser: window.ADMIN.currentUser,
    userType: function () { return window.ADMIN.currentUser.adminUserType; }
};
exports.PORTAL = {
    base: window.PORTAL.base,
    currentUser: window.PORTAL.currentUser
};
exports.ADMIN_USER_TYPE = {
    SUPER_ADMIN: 1,
    INTERNAL_USER: 2,
    ENGAGEMENT_SPECIALIST: 3,
    CARE_COORDINATOR: 4
};


/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var errorHandlers_1 = __webpack_require__(253);
var FormDataHelper_1 = __webpack_require__(330);
function apiFetch(method, url, params, asynchronous) {
    if (params === void 0) { params = {}; }
    if (asynchronous === void 0) { asynchronous = true; }
    return $.ajax({
        type: method,
        url: url,
        data: params,
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + window.API.credentials.access_token
        },
        error: function (jqXHR) {
            errorHandlers_1.handleJsonErrorResponse(jqXHR);
        },
        async: asynchronous
    });
}
exports.apiFetch = apiFetch;
function api_multipart_upload(url, uploadData) {
    return $.ajax({
        url: url,
        type: 'POST',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + window.API.credentials.access_token
        },
        data: uploadData,
        processData: false,
        contentType: false,
        error: function (jqXHR) {
            errorHandlers_1.handleJsonErrorResponse(jqXHR);
        },
        cache: false
    });
}
exports.api_multipart_upload = api_multipart_upload;
function api_multipart_upload_patch(url, data) {
    return api_multipart_upload(url, FormDataHelper_1.default.from(data));
}
exports.api_multipart_upload_patch = api_multipart_upload_patch;
function api_get(url, params, async) {
    if (params === void 0) { params = {}; }
    if (async === void 0) { async = true; }
    return apiFetch('get', url, params, async);
}
exports.api_get = api_get;
function api_post(url, params, async) {
    if (params === void 0) { params = {}; }
    if (async === void 0) { async = true; }
    return apiFetch('post', url, params, async);
}
exports.api_post = api_post;
function api_put(url, params) {
    if (params === void 0) { params = {}; }
    return apiFetch('put', url, params);
}
exports.api_put = api_put;
function api_patch(url, params) {
    if (params === void 0) { params = {}; }
    return apiFetch('patch', url, params);
}
exports.api_patch = api_patch;
function api_delete(url, params) {
    if (params === void 0) { params = {}; }
    return apiFetch('delete', url, params);
}
exports.api_delete = api_delete;
function getCurrentUser() {
    if (window.PORTAL.currentUser) {
        return window.PORTAL.currentUser;
    }
    return null;
}
exports.getCurrentUser = getCurrentUser;


/***/ })

/******/ });