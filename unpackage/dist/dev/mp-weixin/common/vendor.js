(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };




var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: '' };

          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin']['options']) {
      Object.assign(options, vueOptions['mp-weixin']['options']);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 15:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 229:
/*!**********************************************************************!*\
  !*** D:/UniAppProject/fd/fd/components/mescroll-uni/mescroll-uni.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = MeScroll; /* mescroll
                                                                                                        * version 1.2.1
                                                                                                        * 2020-02-08 wenju
                                                                                                        * http://www.mescroll.com
                                                                                                        */

function MeScroll(options, isScrollBody) {
  var me = this;
  me.version = '1.2.1'; // mescroll版本号
  me.options = options || {}; // 配置
  me.isScrollBody = isScrollBody || false; // 滚动区域是否为原生页面滚动; 默认为scroll-view

  me.isDownScrolling = false; // 是否在执行下拉刷新的回调
  me.isUpScrolling = false; // 是否在执行上拉加载的回调
  var hasDownCallback = me.options.down && me.options.down.callback; // 是否配置了down的callback

  // 初始化下拉刷新
  me.initDownScroll();
  // 初始化上拉加载,则初始化
  me.initUpScroll();

  // 自动加载
  setTimeout(function () {// 待主线程执行完毕再执行,避免new MeScroll未初始化,在回调获取不到mescroll的实例
    // 自动触发下拉刷新 (只有配置了down的callback才自动触发下拉刷新)
    if (me.optDown.use && me.optDown.auto && hasDownCallback) {
      if (me.optDown.autoShowLoading) {
        me.triggerDownScroll(); // 显示下拉进度,执行下拉回调
      } else {
        me.optDown.callback && me.optDown.callback(me); // 不显示下拉进度,直接执行下拉回调
      }
    }
    // 自动触发上拉加载
    setTimeout(function () {// 延时确保先执行down的callback,再执行up的callback,因为部分小程序emit是异步,会导致isUpAutoLoad判断有误
      me.optUp.use && me.optUp.auto && !me.isUpAutoLoad && me.triggerUpScroll();
    }, 100);
  }, 30); // 需让me.optDown.inited和me.optUp.inited先执行
}

/* 配置参数:下拉刷新 */
MeScroll.prototype.extendDownScroll = function (optDown) {
  // 下拉刷新的配置
  MeScroll.extend(optDown, {
    use: true, // 是否启用下拉刷新; 默认true
    auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
    native: false, // 是否使用系统自带的下拉刷新; 默认false; 仅mescroll-body生效 (值为true时,还需在pages配置enablePullDownRefresh:true;详请参考mescroll-native的案例)
    autoShowLoading: false, // 如果设置auto=true(在初始化完毕之后自动执行下拉刷新的回调),那么是否显示下拉刷新的进度; 默认false
    isLock: false, // 是否锁定下拉刷新,默认false;
    offset: 80, // 在列表顶部,下拉大于80px,松手即可触发下拉刷新的回调
    startTop: 100, // scroll-view滚动到顶部时,此时的scroll-top不一定为0, 此值用于控制最大的误差
    fps: 80, // 下拉节流 (值越大每秒刷新频率越高)
    inOffsetRate: 1, // 在列表顶部,下拉的距离小于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
    outOffsetRate: 0.2, // 在列表顶部,下拉的距离大于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
    bottomOffset: 20, // 当手指touchmove位置在距离body底部20px范围内的时候结束上拉刷新,避免Webview嵌套导致touchend事件不执行
    minAngle: 45, // 向下滑动最少偏移的角度,取值区间  [0,90];默认45度,即向下滑动的角度大于45度则触发下拉;而小于45度,将不触发下拉,避免与左右滑动的轮播等组件冲突;
    textInOffset: '下拉刷新', // 下拉的距离在offset范围内的提示文本
    textOutOffset: '释放更新', // 下拉的距离大于offset范围的提示文本
    textLoading: '加载中 ...', // 加载中的提示文本
    inited: null, // 下拉刷新初始化完毕的回调
    inOffset: null, // 下拉的距离进入offset范围内那一刻的回调
    outOffset: null, // 下拉的距离大于offset那一刻的回调
    onMoving: null, // 下拉过程中的回调,滑动过程一直在执行; rate下拉区域当前高度与指定距离的比值(inOffset: rate<1; outOffset: rate>=1); downHight当前下拉区域的高度
    beforeLoading: null, // 准备触发下拉刷新的回调: 如果return true,将不触发showLoading和callback回调; 常用来完全自定义下拉刷新, 参考案例【淘宝 v6.8.0】
    showLoading: null, // 显示下拉刷新进度的回调
    afterLoading: null, // 准备结束下拉的回调. 返回结束下拉的延时执行时间,默认0ms; 常用于结束下拉之前再显示另外一小段动画,才去隐藏下拉刷新的场景, 参考案例【dotJump】
    endDownScroll: null, // 结束下拉刷新的回调
    callback: function callback(mescroll) {
      // 下拉刷新的回调;默认重置上拉加载列表为第一页
      mescroll.resetUpScroll();
    } });

};

/* 配置参数:上拉加载 */
MeScroll.prototype.extendUpScroll = function (optUp) {
  // 上拉加载的配置
  MeScroll.extend(optUp, {
    use: true, // 是否启用上拉加载; 默认true
    auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
    isLock: false, // 是否锁定上拉加载,默认false;
    isBoth: true, // 上拉加载时,如果滑动到列表顶部是否可以同时触发下拉刷新;默认true,两者可同时触发;
    isBounce: false, // 默认禁止橡皮筋的回弹效果, 必读事项: http://www.mescroll.com/qa.html?v=190725#q25
    callback: null, // 上拉加载的回调;function(page,mescroll){ }
    page: {
      num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
      size: 10, // 每页数据的数量
      time: null // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
    },
    noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
    offset: 80, // 距底部多远时,触发upCallback
    textLoading: '加载中 ...', // 加载中的提示文本
    textNoMore: '没有更多数据了哦~', // 没有更多数据的提示文本
    inited: null, // 初始化完毕的回调
    showLoading: null, // 显示加载中的回调
    showNoMore: null, // 显示无更多数据的回调
    hideUpScroll: null, // 隐藏上拉加载的回调
    errDistance: 60, // endErr的时候需往上滑动一段距离,使其往下滑动时再次触发onReachBottom,仅mescroll-body生效
    toTop: {
      // 回到顶部按钮,需配置src才显示
      src: null, // 图片路径,默认null (绝对路径或网络图)
      offset: 1000, // 列表滚动多少距离才显示回到顶部按钮,默认1000
      duration: 300, // 回到顶部的动画时长,默认300ms (当值为0或300则使用系统自带回到顶部,更流畅; 其他值则通过step模拟,部分机型可能不够流畅,所以非特殊情况不建议修改此项)
      btnClick: null, // 点击按钮的回调
      onShow: null, // 是否显示的回调
      zIndex: 100, // fixed定位z-index值
      left: null, // 到左边的距离, 默认null. 此项有值时,right不生效. (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
      right: 20, // 到右边的距离, 默认20 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
      bottom: 120, // 到底部的距离, 默认120 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
      safearea: false, // bottom的偏移量是否加上底部安全区的距离, 默认false, 需要适配iPhoneX时使用 (具体的界面如果不配置此项,则取本vue的safearea值)
      width: 72, // 回到顶部图标的宽度, 默认72 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
      radius: "50%" // 圆角, 默认"50%" (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
    },
    empty: {
      use: true, // 是否显示空布局
      icon: null, // 图标路径
      tip: '暂无相关数据', // 提示
      btnText: '', // 按钮
      btnClick: null, // 点击按钮的回调
      onShow: null, // 是否显示的回调
      fixed: false, // 是否使用fixed定位,默认false; 配置fixed为true,以下的top和zIndex才生效 (transform会使fixed失效,最终会降级为absolute)
      top: "100rpx", // fixed定位的top值 (完整的单位值,如 "10%"; "100rpx")
      zIndex: 99 // fixed定位z-index值
    },
    onScroll: false // 是否监听滚动事件
  });
};

/* 配置参数 */
MeScroll.extend = function (userOption, defaultOption) {
  if (!userOption) return defaultOption;
  for (var key in defaultOption) {
    if (userOption[key] == null) {
      var def = defaultOption[key];
      if (def != null && typeof def === 'object') {
        userOption[key] = MeScroll.extend({}, def); // 深度匹配
      } else {
        userOption[key] = def;
      }
    } else if (typeof userOption[key] === 'object') {
      MeScroll.extend(userOption[key], defaultOption[key]); // 深度匹配
    }
  }
  return userOption;
};

/* -------初始化下拉刷新------- */
MeScroll.prototype.initDownScroll = function () {
  var me = this;
  // 配置参数
  me.optDown = me.options.down || {};
  me.extendDownScroll(me.optDown);

  // 如果是mescroll-body且配置了native,则禁止自定义的下拉刷新
  if (me.isScrollBody && me.optDown.native) {
    me.optDown.use = false;
  } else {
    me.optDown.native = false; // 仅mescroll-body支持,mescroll-uni不支持
  }

  me.downHight = 0; // 下拉区域的高度

  // 在页面中加入下拉布局
  if (me.optDown.use && me.optDown.inited) {
    // 初始化完毕的回调
    setTimeout(function () {// 待主线程执行完毕再执行,避免new MeScroll未初始化,在回调获取不到mescroll的实例
      me.optDown.inited(me);
    }, 0);
  }
};

/* 列表touchstart事件 */
MeScroll.prototype.touchstartEvent = function (e) {
  if (!this.optDown.use) return;

  this.startPoint = this.getPoint(e); // 记录起点
  this.startTop = this.getScrollTop(); // 记录此时的滚动条位置
  this.lastPoint = this.startPoint; // 重置上次move的点
  this.maxTouchmoveY = this.getBodyHeight() - this.optDown.bottomOffset; // 手指触摸的最大范围(写在touchstart避免body获取高度为0的情况)
  this.inTouchend = false; // 标记不是touchend
};

/* 列表touchmove事件 */
MeScroll.prototype.touchmoveEvent = function (e) {
  if (!this.optDown.use) return;
  if (!this.startPoint) return;
  var me = this;

  // 节流
  var t = new Date().getTime();
  if (me.moveTime && t - me.moveTime < me.moveTimeDiff) {// 小于节流时间,则不处理
    return;
  } else {
    me.moveTime = t;
    if (!me.moveTimeDiff) me.moveTimeDiff = 1000 / me.optDown.fps;
  }

  var scrollTop = me.getScrollTop(); // 当前滚动条的距离
  var curPoint = me.getPoint(e); // 当前点

  var moveY = curPoint.y - me.startPoint.y; // 和起点比,移动的距离,大于0向下拉,小于0向上拉

  // 向下拉 && 在顶部
  // mescroll-body,直接判定在顶部即可
  // scroll-view在滚动时不会触发touchmove,当触顶/底/左/右时,才会触发touchmove
  // scroll-view滚动到顶部时,scrollTop不一定为0; 在iOS的APP中scrollTop可能为负数,不一定和startTop相等
  if (moveY > 0 && (
  me.isScrollBody && scrollTop <= 0 ||

  !me.isScrollBody && (scrollTop <= 0 || scrollTop <= me.optDown.startTop && scrollTop === me.startTop)))
  {
    // 可下拉的条件
    if (!me.inTouchend && !me.isDownScrolling && !me.optDown.isLock && (!me.isUpScrolling || me.isUpScrolling &&
    me.optUp.isBoth)) {

      // 下拉的角度是否在配置的范围内
      var angle = me.getAngle(me.lastPoint, curPoint); // 两点之间的角度,区间 [0,90]
      if (angle < me.optDown.minAngle) return; // 如果小于配置的角度,则不往下执行下拉刷新

      // 如果手指的位置超过配置的距离,则提前结束下拉,避免Webview嵌套导致touchend无法触发
      if (me.maxTouchmoveY > 0 && curPoint.y >= me.maxTouchmoveY) {
        me.inTouchend = true; // 标记执行touchend
        me.touchendEvent(); // 提前触发touchend
        return;
      }

      me.preventDefault(e); // 阻止默认事件

      var diff = curPoint.y - me.lastPoint.y; // 和上次比,移动的距离 (大于0向下,小于0向上)

      // 下拉距离  < 指定距离
      if (me.downHight < me.optDown.offset) {
        if (me.movetype !== 1) {
          me.movetype = 1; // 加入标记,保证只执行一次
          me.optDown.inOffset && me.optDown.inOffset(me); // 进入指定距离范围内那一刻的回调,只执行一次
          me.isMoveDown = true; // 标记下拉区域高度改变,在touchend重置回来
        }
        me.downHight += diff * me.optDown.inOffsetRate; // 越往下,高度变化越小

        // 指定距离  <= 下拉距离
      } else {
        if (me.movetype !== 2) {
          me.movetype = 2; // 加入标记,保证只执行一次
          me.optDown.outOffset && me.optDown.outOffset(me); // 下拉超过指定距离那一刻的回调,只执行一次
          me.isMoveDown = true; // 标记下拉区域高度改变,在touchend重置回来
        }
        if (diff > 0) {// 向下拉
          me.downHight += Math.round(diff * me.optDown.outOffsetRate); // 越往下,高度变化越小
        } else {// 向上收
          me.downHight += diff; // 向上收回高度,则向上滑多少收多少高度
        }
      }

      var rate = me.downHight / me.optDown.offset; // 下拉区域当前高度与指定距离的比值
      me.optDown.onMoving && me.optDown.onMoving(me, rate, me.downHight); // 下拉过程中的回调,一直在执行
    }
  }

  me.lastPoint = curPoint; // 记录本次移动的点
};

/* 列表touchend事件 */
MeScroll.prototype.touchendEvent = function (e) {
  if (!this.optDown.use) return;
  // 如果下拉区域高度已改变,则需重置回来
  if (this.isMoveDown) {
    if (this.downHight >= this.optDown.offset) {
      // 符合触发刷新的条件
      this.triggerDownScroll();
    } else {
      // 不符合的话 则重置
      this.downHight = 0;
      this.optDown.endDownScroll && this.optDown.endDownScroll(this);
    }
    this.movetype = 0;
    this.isMoveDown = false;
  } else if (!this.isScrollBody && this.getScrollTop() === this.startTop) {// scroll-view到顶/左/右/底的滑动事件
    var isScrollUp = this.getPoint(e).y - this.startPoint.y < 0; // 和起点比,移动的距离,大于0向下拉,小于0向上拉
    // 上滑
    if (isScrollUp) {
      // 需检查滑动的角度
      var angle = this.getAngle(this.getPoint(e), this.startPoint); // 两点之间的角度,区间 [0,90]
      if (angle > 80) {
        // 检查并触发上拉
        this.triggerUpScroll(true);
      }
    }
  }
};

/* 根据点击滑动事件获取第一个手指的坐标 */
MeScroll.prototype.getPoint = function (e) {
  if (!e) {
    return {
      x: 0,
      y: 0 };

  }
  if (e.touches && e.touches[0]) {
    return {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY };

  } else if (e.changedTouches && e.changedTouches[0]) {
    return {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY };

  } else {
    return {
      x: e.clientX,
      y: e.clientY };

  }
};

/* 计算两点之间的角度: 区间 [0,90]*/
MeScroll.prototype.getAngle = function (p1, p2) {
  var x = Math.abs(p1.x - p2.x);
  var y = Math.abs(p1.y - p2.y);
  var z = Math.sqrt(x * x + y * y);
  var angle = 0;
  if (z !== 0) {
    angle = Math.asin(y / z) / Math.PI * 180;
  }
  return angle;
};

/* 触发下拉刷新 */
MeScroll.prototype.triggerDownScroll = function () {
  if (this.optDown.beforeLoading && this.optDown.beforeLoading(this)) {
    //return true则处于完全自定义状态
  } else {
    this.showDownScroll(); // 下拉刷新中...
    this.optDown.callback && this.optDown.callback(this); // 执行回调,联网加载数据
  }
};

/* 显示下拉进度布局 */
MeScroll.prototype.showDownScroll = function () {
  this.isDownScrolling = true; // 标记下拉中
  if (this.optDown.native) {
    uni.startPullDownRefresh(); // 系统自带的下拉刷新
    this.optDown.showLoading && this.optDown.showLoading(this, 0); // 仍触发showLoading,因为上拉加载用到
  } else {
    this.downHight = this.optDown.offset; // 更新下拉区域高度
    this.optDown.showLoading && this.optDown.showLoading(this, this.downHight); // 下拉刷新中...
  }
};

/* 显示系统自带的下拉刷新时需要处理的业务 */
MeScroll.prototype.onPullDownRefresh = function () {
  this.isDownScrolling = true; // 标记下拉中
  this.optDown.showLoading && this.optDown.showLoading(this, 0); // 仍触发showLoading,因为上拉加载用到
  this.optDown.callback && this.optDown.callback(this); // 执行回调,联网加载数据
};

/* 结束下拉刷新 */
MeScroll.prototype.endDownScroll = function () {
  if (this.optDown.native) {// 结束原生下拉刷新
    this.isDownScrolling = false;
    this.optDown.endDownScroll && this.optDown.endDownScroll(this);
    uni.stopPullDownRefresh();
    return;
  }
  var me = this;
  // 结束下拉刷新的方法
  var endScroll = function endScroll() {
    me.downHight = 0;
    me.isDownScrolling = false;
    me.optDown.endDownScroll && me.optDown.endDownScroll(me);
    !me.isScrollBody && me.setScrollHeight(0); // scroll-view重置滚动区域,使数据不满屏时仍可检查触发翻页
  };
  // 结束下拉刷新时的回调
  var delay = 0;
  if (me.optDown.afterLoading) delay = me.optDown.afterLoading(me); // 结束下拉刷新的延时,单位ms
  if (typeof delay === 'number' && delay > 0) {
    setTimeout(endScroll, delay);
  } else {
    endScroll();
  }
};

/* 锁定下拉刷新:isLock=ture,null锁定;isLock=false解锁 */
MeScroll.prototype.lockDownScroll = function (isLock) {
  if (isLock == null) isLock = true;
  this.optDown.isLock = isLock;
};

/* 锁定上拉加载:isLock=ture,null锁定;isLock=false解锁 */
MeScroll.prototype.lockUpScroll = function (isLock) {
  if (isLock == null) isLock = true;
  this.optUp.isLock = isLock;
};

/* -------初始化上拉加载------- */
MeScroll.prototype.initUpScroll = function () {
  var me = this;
  // 配置参数
  me.optUp = me.options.up || {
    use: false };

  me.extendUpScroll(me.optUp);

  if (!me.optUp.isBounce) me.setBounce(false); // 不允许bounce时,需禁止window的touchmove事件

  if (me.optUp.use === false) return; // 配置不使用上拉加载时,则不初始化上拉布局
  me.optUp.hasNext = true; // 如果使用上拉,则默认有下一页
  me.startNum = me.optUp.page.num + 1; // 记录page开始的页码

  // 初始化完毕的回调
  if (me.optUp.inited) {
    setTimeout(function () {// 待主线程执行完毕再执行,避免new MeScroll未初始化,在回调获取不到mescroll的实例
      me.optUp.inited(me);
    }, 0);
  }
};

/*滚动到底部的事件 (仅mescroll-body生效)*/
MeScroll.prototype.onReachBottom = function () {
  if (this.isScrollBody && !this.isUpScrolling) {// 只能支持下拉刷新的时候同时可以触发上拉加载,否则滚动到底部就需要上滑一点才能触发onReachBottom
    if (!this.optUp.isLock && this.optUp.hasNext) {
      this.triggerUpScroll();
    }
  }
};

/*列表滚动事件 (仅mescroll-body生效)*/
MeScroll.prototype.onPageScroll = function (e) {
  if (!this.isScrollBody) return;

  // 更新滚动条的位置 (主要用于判断下拉刷新时,滚动条是否在顶部)
  this.setScrollTop(e.scrollTop);

  // 顶部按钮的显示隐藏
  if (e.scrollTop >= this.optUp.toTop.offset) {
    this.showTopBtn();
  } else {
    this.hideTopBtn();
  }
};

/*列表滚动事件*/
MeScroll.prototype.scroll = function (e, onScroll) {
  // 更新滚动条的位置
  this.setScrollTop(e.scrollTop);
  // 更新滚动内容高度
  this.setScrollHeight(e.scrollHeight);

  // 向上滑还是向下滑动
  if (this.preScrollY == null) this.preScrollY = 0;
  this.isScrollUp = e.scrollTop - this.preScrollY > 0;
  this.preScrollY = e.scrollTop;

  // 上滑 && 检查并触发上拉
  this.isScrollUp && this.triggerUpScroll(true);

  // 顶部按钮的显示隐藏
  if (e.scrollTop >= this.optUp.toTop.offset) {
    this.showTopBtn();
  } else {
    this.hideTopBtn();
  }

  // 滑动监听
  this.optUp.onScroll && onScroll && onScroll();
};

/* 触发上拉加载 */
MeScroll.prototype.triggerUpScroll = function (isCheck) {
  if (!this.isUpScrolling && this.optUp.use && this.optUp.callback) {
    // 是否校验在底部; 默认不校验
    if (isCheck === true) {
      var canUp = false;
      // 还有下一页 && 没有锁定 && 不在下拉中
      if (this.optUp.hasNext && !this.optUp.isLock && !this.isDownScrolling) {
        if (this.getScrollBottom() <= this.optUp.offset) {// 到底部
          canUp = true; // 标记可上拉
        }
      }
      if (canUp === false) return;
    }
    this.showUpScroll(); // 上拉加载中...
    this.optUp.page.num++; // 预先加一页,如果失败则减回
    this.isUpAutoLoad = true; // 标记上拉已经自动执行过,避免初始化时多次触发上拉回调
    this.num = this.optUp.page.num; // 把最新的页数赋值在mescroll上,避免对page的影响
    this.size = this.optUp.page.size; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.time = this.optUp.page.time; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.optUp.callback(this); // 执行回调,联网加载数据
  }
};

/* 显示上拉加载中 */
MeScroll.prototype.showUpScroll = function () {
  this.isUpScrolling = true; // 标记上拉加载中
  this.optUp.showLoading && this.optUp.showLoading(this); // 回调
};

/* 显示上拉无更多数据 */
MeScroll.prototype.showNoMore = function () {
  this.optUp.hasNext = false; // 标记无更多数据
  this.optUp.showNoMore && this.optUp.showNoMore(this); // 回调
};

/* 隐藏上拉区域**/
MeScroll.prototype.hideUpScroll = function () {
  this.optUp.hideUpScroll && this.optUp.hideUpScroll(this); // 回调
};

/* 结束上拉加载 */
MeScroll.prototype.endUpScroll = function (isShowNoMore) {
  if (isShowNoMore != null) {// isShowNoMore=null,不处理下拉状态,下拉刷新的时候调用
    if (isShowNoMore) {
      this.showNoMore(); // isShowNoMore=true,显示无更多数据
    } else {
      this.hideUpScroll(); // isShowNoMore=false,隐藏上拉加载
    }
  }
  this.isUpScrolling = false; // 标记结束上拉加载
};

/* 重置上拉加载列表为第一页
    *isShowLoading 是否显示进度布局;
    * 1.默认null,不传参,则显示上拉加载的进度布局
    * 2.传参true, 则显示下拉刷新的进度布局
    * 3.传参false,则不显示上拉和下拉的进度 (常用于静默更新列表数据)
    */
MeScroll.prototype.resetUpScroll = function (isShowLoading) {
  if (this.optUp && this.optUp.use) {
    var page = this.optUp.page;
    this.prePageNum = page.num; // 缓存重置前的页码,加载失败可退回
    this.prePageTime = page.time; // 缓存重置前的时间,加载失败可退回
    page.num = this.startNum; // 重置为第一页
    page.time = null; // 重置时间为空
    if (!this.isDownScrolling && isShowLoading !== false) {// 如果不是下拉刷新触发的resetUpScroll并且不配置列表静默更新,则显示进度;
      if (isShowLoading == null) {
        this.removeEmpty(); // 移除空布局
        this.showUpScroll(); // 不传参,默认显示上拉加载的进度布局
      } else {
        this.showDownScroll(); // 传true,显示下拉刷新的进度布局,不清空列表
      }
    }
    this.isUpAutoLoad = true; // 标记上拉已经自动执行过,避免初始化时多次触发上拉回调
    this.num = page.num; // 把最新的页数赋值在mescroll上,避免对page的影响
    this.size = page.size; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.time = page.time; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.optUp.callback && this.optUp.callback(this); // 执行上拉回调
  }
};

/* 设置page.num的值 */
MeScroll.prototype.setPageNum = function (num) {
  this.optUp.page.num = num - 1;
};

/* 设置page.size的值 */
MeScroll.prototype.setPageSize = function (size) {
  this.optUp.page.size = size;
};

/* 联网回调成功,结束下拉刷新和上拉加载
    * dataSize: 当前页的数据量(必传)
    * totalPage: 总页数(必传)
    * systime: 服务器时间 (可空)
    */
MeScroll.prototype.endByPage = function (dataSize, totalPage, systime) {
  var hasNext;
  if (this.optUp.use && totalPage != null) hasNext = this.optUp.page.num < totalPage; // 是否还有下一页
  this.endSuccess(dataSize, hasNext, systime);
};

/* 联网回调成功,结束下拉刷新和上拉加载
    * dataSize: 当前页的数据量(必传)
    * totalSize: 列表所有数据总数量(必传)
    * systime: 服务器时间 (可空)
    */
MeScroll.prototype.endBySize = function (dataSize, totalSize, systime) {
  var hasNext;
  if (this.optUp.use && totalSize != null) {
    var loadSize = (this.optUp.page.num - 1) * this.optUp.page.size + dataSize; // 已加载的数据总数
    hasNext = loadSize < totalSize; // 是否还有下一页
  }
  this.endSuccess(dataSize, hasNext, systime);
};

/* 联网回调成功,结束下拉刷新和上拉加载
    * dataSize: 当前页的数据个数(不是所有页的数据总和),用于上拉加载判断是否还有下一页.如果不传,则会判断还有下一页
    * hasNext: 是否还有下一页,布尔类型;用来解决这个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据dataSize判断,则需翻到第三页才会知道无更多数据,如果传了hasNext,则翻到第二页即可显示无更多数据.
    * systime: 服务器时间(可空);用来解决这个小问题:当准备翻下一页时,数据库新增了几条记录,此时翻下一页,前面的几条数据会和上一页的重复;这里传入了systime,那么upCallback的page.time就会有值,把page.time传给服务器,让后台过滤新加入的那几条记录
    */
MeScroll.prototype.endSuccess = function (dataSize, hasNext, systime) {
  var me = this;
  // 结束下拉刷新
  if (me.isDownScrolling) me.endDownScroll();

  // 结束上拉加载
  if (me.optUp.use) {
    var isShowNoMore; // 是否已无更多数据
    if (dataSize != null) {
      var pageNum = me.optUp.page.num; // 当前页码
      var pageSize = me.optUp.page.size; // 每页长度
      // 如果是第一页
      if (pageNum === 1) {
        if (systime) me.optUp.page.time = systime; // 设置加载列表数据第一页的时间
      }
      if (dataSize < pageSize || hasNext === false) {
        // 返回的数据不满一页时,则说明已无更多数据
        me.optUp.hasNext = false;
        if (dataSize === 0 && pageNum === 1) {
          // 如果第一页无任何数据且配置了空布局
          isShowNoMore = false;
          me.showEmpty();
        } else {
          // 总列表数少于配置的数量,则不显示无更多数据
          var allDataSize = (pageNum - 1) * pageSize + dataSize;
          if (allDataSize < me.optUp.noMoreSize) {
            isShowNoMore = false;
          } else {
            isShowNoMore = true;
          }
          me.removeEmpty(); // 移除空布局
        }
      } else {
        // 还有下一页
        isShowNoMore = false;
        me.optUp.hasNext = true;
        me.removeEmpty(); // 移除空布局
      }
    }

    // 隐藏上拉
    me.endUpScroll(isShowNoMore);
  }
};

/* 回调失败,结束下拉刷新和上拉加载 */
MeScroll.prototype.endErr = function (errDistance) {
  // 结束下拉,回调失败重置回原来的页码和时间
  if (this.isDownScrolling) {
    var page = this.optUp.page;
    if (page && this.prePageNum) {
      page.num = this.prePageNum;
      page.time = this.prePageTime;
    }
    this.endDownScroll();
  }
  // 结束上拉,回调失败重置回原来的页码
  if (this.isUpScrolling) {
    this.optUp.page.num--;
    this.endUpScroll(false);
    // 如果是mescroll-body,则需往回滚一定距离
    if (this.isScrollBody && errDistance !== 0) {// 不处理0
      if (!errDistance) errDistance = this.optUp.errDistance; // 不传,则取默认
      this.scrollTo(this.getScrollTop() - errDistance, 0); // 往上回滚的距离
    }
  }
};

/* 显示空布局 */
MeScroll.prototype.showEmpty = function () {
  this.optUp.empty.use && this.optUp.empty.onShow && this.optUp.empty.onShow(true);
};

/* 移除空布局 */
MeScroll.prototype.removeEmpty = function () {
  this.optUp.empty.use && this.optUp.empty.onShow && this.optUp.empty.onShow(false);
};

/* 显示回到顶部的按钮 */
MeScroll.prototype.showTopBtn = function () {
  if (!this.topBtnShow) {
    this.topBtnShow = true;
    this.optUp.toTop.onShow && this.optUp.toTop.onShow(true);
  }
};

/* 隐藏回到顶部的按钮 */
MeScroll.prototype.hideTopBtn = function () {
  if (this.topBtnShow) {
    this.topBtnShow = false;
    this.optUp.toTop.onShow && this.optUp.toTop.onShow(false);
  }
};

/* 获取滚动条的位置 */
MeScroll.prototype.getScrollTop = function () {
  return this.scrollTop || 0;
};

/* 记录滚动条的位置 */
MeScroll.prototype.setScrollTop = function (y) {
  this.scrollTop = y;
};

/* 滚动到指定位置 */
MeScroll.prototype.scrollTo = function (y, t) {
  this.myScrollTo && this.myScrollTo(y, t); // scrollview需自定义回到顶部方法
};

/* 自定义scrollTo */
MeScroll.prototype.resetScrollTo = function (myScrollTo) {
  this.myScrollTo = myScrollTo;
};

/* 滚动条到底部的距离 */
MeScroll.prototype.getScrollBottom = function () {
  return this.getScrollHeight() - this.getClientHeight() - this.getScrollTop();
};

/* 计步器
    star: 开始值
    end: 结束值
    callback(step,timer): 回调step值,计步器timer,可自行通过window.clearInterval(timer)结束计步器;
    t: 计步时长,传0则直接回调end值;不传则默认300ms
    rate: 周期;不传则默认30ms计步一次
    * */
MeScroll.prototype.getStep = function (star, end, callback, t, rate) {
  var diff = end - star; // 差值
  if (t === 0 || diff === 0) {
    callback && callback(end);
    return;
  }
  t = t || 300; // 时长 300ms
  rate = rate || 30; // 周期 30ms
  var count = t / rate; // 次数
  var step = diff / count; // 步长
  var i = 0; // 计数
  var timer = setInterval(function () {
    if (i < count - 1) {
      star += step;
      callback && callback(star, timer);
      i++;
    } else {
      callback && callback(end, timer); // 最后一次直接设置end,避免计算误差
      clearInterval(timer);
    }
  }, rate);
};

/* 滚动容器的高度 */
MeScroll.prototype.getClientHeight = function (isReal) {
  var h = this.clientHeight || 0;
  if (h === 0 && isReal !== true) {// 未获取到容器的高度,可临时取body的高度 (可能会有误差)
    h = this.getBodyHeight();
  }
  return h;
};
MeScroll.prototype.setClientHeight = function (h) {
  this.clientHeight = h;
};

/* 滚动内容的高度 */
MeScroll.prototype.getScrollHeight = function () {
  return this.scrollHeight || 0;
};
MeScroll.prototype.setScrollHeight = function (h) {
  this.scrollHeight = h;
};

/* body的高度 */
MeScroll.prototype.getBodyHeight = function () {
  return this.bodyHeight || 0;
};
MeScroll.prototype.setBodyHeight = function (h) {
  this.bodyHeight = h;
};

/* 阻止浏览器默认滚动事件 */
MeScroll.prototype.preventDefault = function (e) {
  // 小程序不支持e.preventDefault
  // app的bounce只能通过配置pages.json的style.app-plus.bounce为"none"来禁止
  // cancelable:是否可以被禁用; defaultPrevented:是否已经被禁用
  if (e && e.cancelable && !e.defaultPrevented) e.preventDefault();
};

/* 是否允许下拉回弹(橡皮筋效果); true或null为允许; false禁止bounce */
MeScroll.prototype.setBounce = function (isBounce) {


































































};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 230:
/*!*****************************************************************************!*\
  !*** D:/UniAppProject/fd/fd/components/mescroll-uni/mescroll-uni-option.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 全局配置
// mescroll-body 和 mescroll-uni 通用
var GlobalOption = {
  down: {
    // 其他down的配置参数也可以写,这里只展示了常用的配置:
    textInOffset: '下拉刷新', // 下拉的距离在offset范围内的提示文本
    textOutOffset: '释放更新', // 下拉的距离大于offset范围的提示文本
    textLoading: '加载中 ...', // 加载中的提示文本
    offset: 80, // 在列表顶部,下拉大于80px,松手即可触发下拉刷新的回调
    native: false // 是否使用系统自带的下拉刷新; 默认false; 仅在mescroll-body生效 (值为true时,还需在pages配置enablePullDownRefresh:true;详请参考mescroll-native的案例)
  },
  up: {
    // 其他up的配置参数也可以写,这里只展示了常用的配置:
    textLoading: '加载中 ...', // 加载中的提示文本
    textNoMore: '没有更多数据了哦~', // 没有更多数据的提示文本
    offset: 80, // 距底部多远时,触发upCallback
    isBounce: false, // 默认禁止橡皮筋的回弹效果, 必读事项: http://www.mescroll.com/qa.html?v=190725#q25
    toTop: {
      // 回到顶部按钮,需配置src才显示
      src: "/static/mescrool/mescroll-totop.png", // 图片路径 (建议放入static目录, 如 /static/img/mescroll-totop.png )
      offset: 1000, // 列表滚动多少距离才显示回到顶部按钮,默认1000px
      right: 20, // 到右边的距离, 默认20 (支持"20rpx", "20px", "20%"格式的值, 纯数字则默认单位rpx)
      bottom: 120, // 到底部的距离, 默认120 (支持"20rpx", "20px", "20%"格式的值, 纯数字则默认单位rpx)
      width: 72 // 回到顶部图标的宽度, 默认72 (支持"20rpx", "20px", "20%"格式的值, 纯数字则默认单位rpx)
    },
    empty: {
      use: true, // 是否显示空布局
      icon: "/static/mescrool/mescroll-empty.png", // 图标路径 (建议放入static目录, 如 /static/img/mescroll-empty.png )
      tip: '暂无相关数据' // 提示
    } } };var _default =



GlobalOption;exports.default = _default;

/***/ }),

/***/ 259:
/*!************************************************************************!*\
  !*** D:/UniAppProject/fd/fd/components/yixuan-selectAddress/city.json ***!
  \************************************************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, default */
/***/ (function(module) {

module.exports = [{"name":"全国","city":[{"name":""}]},{"name":"北京市","city":[{"name":"东城区"},{"name":"西城区"},{"name":"崇文区"},{"name":"宣武区"},{"name":"朝阳区"},{"name":"丰台区"},{"name":"石景山区"},{"name":"海淀区"},{"name":"门头沟区"},{"name":"房山区"},{"name":"通州区"},{"name":"顺义区"},{"name":"昌平区"},{"name":"大兴区"},{"name":"平谷区"},{"name":"怀柔区"},{"name":"密云县"},{"name":"延庆县"}]},{"name":"天津市","city":[{"name":"和平区"},{"name":"河东区"},{"name":"河西区"},{"name":"南开区"},{"name":"河北区"},{"name":"红桥区"},{"name":"塘沽区"},{"name":"汉沽区"},{"name":"大港区"},{"name":"东丽区"},{"name":"西青区"},{"name":"津南区"},{"name":"北辰区"},{"name":"武清区"},{"name":"宝坻区"},{"name":"宁河县"},{"name":"静海县"},{"name":"蓟  县"}]},{"name":"河北省","city":[{"name":"石家庄市","area":[{"name":"长安区"},{"name":"桥东区"},{"name":"桥西区"},{"name":"新华区"},{"name":"郊  区"},{"name":"井陉矿区"},{"name":"井陉县"},{"name":"正定县"},{"name":"栾城县"},{"name":"行唐县"},{"name":"灵寿县"},{"name":"高邑县"},{"name":"深泽县"},{"name":"赞皇县"},{"name":"无极县"},{"name":"平山县"},{"name":"元氏县"},{"name":"赵  县"},{"name":"辛集市"},{"name":"藁"},{"name":"晋州市"},{"name":"新乐市"},{"name":"鹿泉市"}]},{"name":"唐山市","area":[{"name":"路南区"},{"name":"路北区"},{"name":"古冶区"},{"name":"开平区"},{"name":"新  区"},{"name":"丰润县"},{"name":"滦  县"},{"name":"滦南县"},{"name":"乐亭县"},{"name":"迁西县"},{"name":"玉田县"},{"name":"唐海县"},{"name":"遵化市"},{"name":"丰南市"},{"name":"迁安市"}]},{"name":"秦皇岛市","area":[{"name":"海港区"},{"name":"山海关区"},{"name":"北戴河区"},{"name":"青龙满族自治县"},{"name":"昌黎县"},{"name":"抚宁县"},{"name":"卢龙县"}]},{"name":"邯郸市","area":[{"name":"邯山区"},{"name":"丛台区"},{"name":"复兴区"},{"name":"峰峰矿区"},{"name":"邯郸县"},{"name":"临漳县"},{"name":"成安县"},{"name":"大名县"},{"name":"涉  县"},{"name":"磁  县"},{"name":"肥乡县"},{"name":"永年县"},{"name":"邱  县"},{"name":"鸡泽县"},{"name":"广平县"},{"name":"馆陶县"},{"name":"魏  县"},{"name":"曲周县"},{"name":"武安市"}]},{"name":"邢台市","area":[{"name":"桥东区"},{"name":"桥西区"},{"name":"邢台县"},{"name":"临城县"},{"name":"内丘县"},{"name":"柏乡县"},{"name":"隆尧县"},{"name":"任  县"},{"name":"南和县"},{"name":"宁晋县"},{"name":"巨鹿县"},{"name":"新河县"},{"name":"广宗县"},{"name":"平乡县"},{"name":"威  县"},{"name":"清河县"},{"name":"临西县"},{"name":"南宫市"},{"name":"沙河市"}]},{"name":"保定市","area":[{"name":"新市区"},{"name":"北市区"},{"name":"南市区"},{"name":"满城县"},{"name":"清苑县"},{"name":"涞水县"},{"name":"阜平县"},{"name":"徐水县"},{"name":"定兴县"},{"name":"唐  县"},{"name":"高阳县"},{"name":"容城县"},{"name":"涞源县"},{"name":"望都县"},{"name":"安新县"},{"name":"易  县"},{"name":"曲阳县"},{"name":"蠡  县"},{"name":"顺平县"},{"name":"博野"},{"name":"雄县"},{"name":"涿州市"},{"name":"定州市"},{"name":"安国市"},{"name":"高碑店市"}]},{"name":"张家口","area":[{"name":"桥东区"},{"name":"桥西区"},{"name":"宣化区"},{"name":"下花园区"},{"name":"宣化县"},{"name":"张北县"},{"name":"康保县"},{"name":"沽源县"},{"name":"尚义县"},{"name":"蔚  县"},{"name":"阳原县"},{"name":"怀安县"},{"name":"万全县"},{"name":"怀来县"},{"name":"涿鹿县"},{"name":"赤城县"},{"name":"崇礼县"}]},{"name":"承德市","area":[{"name":"双桥区"},{"name":"双滦区"},{"name":"鹰手营子矿区"},{"name":"承德县"},{"name":"兴隆县"},{"name":"平泉县"},{"name":"滦平县"},{"name":"隆化县"},{"name":"丰宁满族自治县"},{"name":"宽城满族自治县"},{"name":"围场满族蒙古族自治县"}]},{"name":"沧州市","area":[{"name":"新华区"},{"name":"运河区"},{"name":"沧  县"},{"name":"青  县"},{"name":"东光县"},{"name":"海兴县"},{"name":"盐山县"},{"name":"肃宁县"},{"name":"南皮县"},{"name":"吴桥县"},{"name":"献  县"},{"name":"孟村回族自治县"},{"name":"泊头市"},{"name":"任丘市"},{"name":"黄骅市"},{"name":"河间市"}]},{"name":"廊坊市","area":[{"name":"安次区"},{"name":"固安县"},{"name":"永清县"},{"name":"香河县"},{"name":"大城县"},{"name":"文安县"},{"name":"大厂回族自治县"},{"name":"霸州市"},{"name":"三河市"}]},{"name":"衡水市","area":[{"name":"桃城区"},{"name":"枣强县"},{"name":"武邑县"},{"name":"武强县"},{"name":"饶阳县"},{"name":"安平县"},{"name":"故城县"},{"name":"景  县"},{"name":"阜城县"},{"name":"冀州市"},{"name":"深州市"}]}]},{"name":"山西省","city":[{"name":"太原市","area":[{"name":"小店区"},{"name":"迎泽区"},{"name":"杏花岭区"},{"name":"尖草坪区"},{"name":"万柏林区"},{"name":"晋源区"},{"name":"清徐县"},{"name":"阳曲县"},{"name":"娄烦县"},{"name":"古交市"}]},{"name":"大同市","area":[{"name":"城  区"},{"name":"矿  区"},{"name":"南郊区"},{"name":"新荣区"},{"name":"阳高县"},{"name":"天镇县"},{"name":"广灵县"},{"name":"灵丘县"},{"name":"浑源县"},{"name":"左云县"},{"name":"大同县"}]},{"name":"阳泉市","area":[{"name":"城  区"},{"name":"矿  区"},{"name":"郊  区"},{"name":"平定县"},{"name":"盂  县"}]},{"name":"长治市","area":[{"name":"城  区"},{"name":"郊  区"},{"name":"长治县"},{"name":"襄垣县"},{"name":"屯留县"},{"name":"平顺县"},{"name":"黎城县"},{"name":"壶关县"},{"name":"长子县"},{"name":"武乡县"},{"name":"沁  县"},{"name":"沁源县"},{"name":"潞城市"}]},{"name":"晋城市","area":[{"name":"城  区"},{"name":"沁水县"},{"name":"阳城县"},{"name":"陵川县"},{"name":"泽州县"},{"name":"高平市"}]},{"name":"朔州市","area":[{"name":"朔城区"},{"name":"平鲁区"},{"name":"山阴县"},{"name":"应  县"},{"name":"右玉县"},{"name":"怀仁县"}]},{"name":"忻州市","area":[{"name":"忻府区"},{"name":"原平市"},{"name":"定襄县"},{"name":"五台县"},{"name":"代  县"},{"name":"繁峙县"},{"name":"宁武县"},{"name":"静乐县"},{"name":"神池县"},{"name":"五寨县"},{"name":"岢岚县"},{"name":"河曲县"},{"name":"保德县"},{"name":"偏关县"}]},{"name":"吕梁市","area":[{"name":"离石区"},{"name":"孝义市"},{"name":"汾阳市"},{"name":"文水县"},{"name":"交城县"},{"name":"兴  县"},{"name":"临  县"},{"name":"柳林县"},{"name":"石楼县"},{"name":"岚  县"},{"name":"方山县"},{"name":"中阳县"},{"name":"交口县"}]},{"name":"晋中市","area":[{"name":"榆次市"},{"name":"介休市"},{"name":"榆社县"},{"name":"左权县"},{"name":"和顺县"},{"name":"昔阳县"},{"name":"寿阳县"},{"name":"太谷县"},{"name":"祁  县"},{"name":"平遥县"},{"name":"灵石县"}]},{"name":"临汾市","area":[{"name":"临汾市"},{"name":"侯马市"},{"name":"霍州市"},{"name":"曲沃县"},{"name":"翼城县"},{"name":"襄汾县"},{"name":"洪洞县"},{"name":"古  县"},{"name":"安泽县"},{"name":"浮山县"},{"name":"吉  县"},{"name":"乡宁县"},{"name":"蒲  县"},{"name":"大宁县"},{"name":"永和县"},{"name":"隰  县"},{"name":"汾西县"}]},{"name":"运城市","area":[{"name":"运城市"},{"name":"永济市"},{"name":"河津市"},{"name":"芮城县"},{"name":"临猗县"},{"name":"万荣县"},{"name":"新绛县"},{"name":"稷山县"},{"name":"闻喜县"},{"name":"夏  县"},{"name":"绛  县"},{"name":"平陆县"},{"name":"垣曲县"}]}]},{"name":"内蒙古","city":[{"name":"呼和浩特市","area":[{"name":"新城区"},{"name":"回民区"},{"name":"玉泉区"},{"name":"郊  区"},{"name":"土默特左旗"},{"name":"托克托县"},{"name":"和林格尔县"},{"name":"清水河县"},{"name":"武川县"}]},{"name":"包头市","area":[{"name":"东河区"},{"name":"昆都伦区"},{"name":"青山区"},{"name":"石拐矿区"},{"name":"白云矿区"},{"name":"郊  区"},{"name":"土默特右旗"},{"name":"固阳县"},{"name":"达尔罕茂明安联合旗"}]},{"name":"乌海市","area":[{"name":"海勃湾区"},{"name":"海南区"},{"name":"乌达区"}]},{"name":"赤峰市","area":[{"name":"红山区"},{"name":"元宝山区"},{"name":"松山区"},{"name":"阿鲁科尔沁旗"},{"name":"巴林左旗"},{"name":"巴林右旗"},{"name":"林西县"},{"name":"克什克腾旗"},{"name":"翁牛特旗"},{"name":"喀喇沁旗"},{"name":"宁城县"},{"name":"敖汉旗"}]},{"name":"呼伦贝尔市","area":[{"name":"海拉尔市"},{"name":"满洲里市"},{"name":"扎兰屯市"},{"name":"牙克石市"},{"name":"根河市"},{"name":"额尔古纳市"},{"name":"阿荣旗"},{"name":"莫力达瓦达斡尔族自治旗"},{"name":"鄂伦春自治旗"},{"name":"鄂温克族自治旗"},{"name":"新巴尔虎右旗"},{"name":"新巴尔虎左旗"},{"name":"陈巴尔虎旗"}]},{"name":"兴安盟","area":[{"name":"乌兰浩特市"},{"name":"阿尔山市"},{"name":"科尔沁右翼前旗"},{"name":"科尔沁右翼中旗"},{"name":"扎赉特旗"},{"name":"突泉县"}]},{"name":"通辽市","area":[{"name":"科尔沁区"},{"name":"霍林郭勒市"},{"name":"科尔沁左翼中旗"},{"name":"科尔沁左翼后旗"},{"name":"开鲁县"},{"name":"库伦旗"},{"name":"奈曼旗"},{"name":"扎鲁特旗"}]},{"name":"锡林郭勒盟","area":[{"name":"二连浩特市"},{"name":"锡林浩特市"},{"name":"阿巴嘎旗"},{"name":"苏尼特左旗"},{"name":"苏尼特右旗"},{"name":"东乌珠穆沁旗"},{"name":"西乌珠穆沁旗"},{"name":"太仆寺旗"},{"name":"镶黄旗"},{"name":"正镶白旗"},{"name":"正蓝旗"},{"name":"多伦县"}]},{"name":"乌兰察布盟","area":[{"name":"集宁市"},{"name":"丰镇市"},{"name":"卓资县"},{"name":"化德县"},{"name":"商都县"},{"name":"兴和县"},{"name":"凉城县"},{"name":"察哈尔右翼前旗"},{"name":"察哈尔右翼中旗"},{"name":"察哈尔右翼后旗"},{"name":"四子王旗"}]},{"name":"伊克昭盟","area":[{"name":"东胜市"},{"name":"达拉特旗"},{"name":"准格尔旗"},{"name":"鄂托克前旗"},{"name":"鄂托克旗"},{"name":"杭锦旗"},{"name":"乌审旗"},{"name":"伊金霍洛旗"}]},{"name":"巴彦淖尔盟","area":[{"name":"临河市"},{"name":"五原县"},{"name":"磴口县"},{"name":"乌拉特前旗"},{"name":"乌拉特中旗"},{"name":"乌拉特后旗"},{"name":"杭锦后旗"}]},{"name":"阿拉善盟","area":[{"name":"阿拉善左旗"},{"name":"阿拉善右旗"},{"name":"额济纳旗"}]}]},{"name":"辽宁省","city":[{"name":"沈阳市","area":[{"name":"沈河区"},{"name":"皇姑区"},{"name":"和平区"},{"name":"大东区"},{"name":"铁西区"},{"name":"苏家屯区"},{"name":"东陵区"},{"name":"于洪区"},{"name":"新民市"},{"name":"法库县"},{"name":"辽中县"},{"name":"康平县"},{"name":"新城子区"},{"name":"其他"}]},{"name":"大连市","area":[{"name":"西岗区"},{"name":"中山区"},{"name":"沙河口区"},{"name":"甘井子区"},{"name":"旅顺口区"},{"name":"金州区"},{"name":"瓦房店市"},{"name":"普兰店市"},{"name":"庄河市"},{"name":"长海县"},{"name":"其他"}]},{"name":"鞍山市","area":[{"name":"铁东区"},{"name":"铁西区"},{"name":"立山区"},{"name":"千山区"},{"name":"海城市"},{"name":"台安县"},{"name":"岫岩满族自治县"},{"name":"其他"}]},{"name":"抚顺市","area":[{"name":"顺城区"},{"name":"新抚区"},{"name":"东洲区"},{"name":"望花区"},{"name":"抚顺县"},{"name":"清原满族自治县"},{"name":"新宾满族自治县"},{"name":"其他"}]},{"name":"本溪市","area":[{"name":"平山区"},{"name":"明山区"},{"name":"溪湖区"},{"name":"南芬区"},{"name":"本溪满族自治县"},{"name":"桓仁满族自治县"},{"name":"其他"}]},{"name":"丹东市","area":[{"name":"振兴区"},{"name":"元宝区"},{"name":"振安区"},{"name":"东港市"},{"name":"凤城市"},{"name":"宽甸满族自治县"},{"name":"其他"}]},{"name":"锦州市","area":[{"name":"太和区"},{"name":"古塔区"},{"name":"凌河区"},{"name":"凌海市"},{"name":"黑山县"},{"name":"义县"},{"name":"北宁市"},{"name":"其他"}]},{"name":"营口市","area":[{"name":"站前区"},{"name":"西市区"},{"name":"鲅鱼圈区"},{"name":"老边区"},{"name":"大石桥市"},{"name":"盖州市"},{"name":"其他"}]},{"name":"阜新市","area":[{"name":"海州区"},{"name":"新邱区"},{"name":"太平区"},{"name":"清河门区"},{"name":"细河区"},{"name":"彰武县"},{"name":"阜新蒙古族自治县"},{"name":"其他"}]},{"name":"辽阳市","area":[{"name":"白塔区"},{"name":"文圣区"},{"name":"宏伟区"},{"name":"太子河区"},{"name":"弓长岭区"},{"name":"灯塔市"},{"name":"辽阳县"},{"name":"其他"}]},{"name":"盘锦","area":[{"name":"双台子区"},{"name":"兴隆台区"},{"name":"盘山县"},{"name":"大洼县"},{"name":"其他"}]},{"name":"铁岭市","area":[{"name":"银州区"},{"name":"清河区"},{"name":"调兵山市"},{"name":"开原市"},{"name":"铁岭县"},{"name":"昌图县"},{"name":"西丰县"},{"name":"其他"}]},{"name":"朝阳市","area":[{"name":"双塔区"},{"name":"龙城区"},{"name":"凌源市"},{"name":"北票市"},{"name":"朝阳县"},{"name":"建平县"},{"name":"喀喇沁左翼蒙古族自治县"},{"name":"其他"}]},{"name":"葫芦岛市","area":[{"name":"龙港区"},{"name":"南票区"},{"name":"连山区"},{"name":"兴城市"},{"name":"绥中县"},{"name":"建昌县"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"吉林省","city":[{"name":"长春市","area":[{"name":"朝阳区"},{"name":"宽城区"},{"name":"二道区"},{"name":"南关区"},{"name":"绿园区"},{"name":"双阳区"},{"name":"九台市"},{"name":"榆树市"},{"name":"德惠市"},{"name":"农安县"},{"name":"其他"}]},{"name":"吉林市","area":[{"name":"船营区"},{"name":"昌邑区"},{"name":"龙潭区"},{"name":"丰满区"},{"name":"舒兰市"},{"name":"桦甸市"},{"name":"蛟河市"},{"name":"磐石市"},{"name":"永吉县"},{"name":"其他"}]},{"name":"四平","area":[{"name":"铁西区"},{"name":"铁东区"},{"name":"公主岭市"},{"name":"双辽市"},{"name":"梨树县"},{"name":"伊通满族自治县"},{"name":"其他"}]},{"name":"辽源市","area":[{"name":"龙山区"},{"name":"西安区"},{"name":"东辽县"},{"name":"东丰县"},{"name":"其他"}]},{"name":"通化市","area":[{"name":"东昌区"},{"name":"二道江区"},{"name":"梅河口市"},{"name":"集安市"},{"name":"通化县"},{"name":"辉南县"},{"name":"柳河县"},{"name":"其他"}]},{"name":"白山市","area":[{"name":"八道江区"},{"name":"江源区"},{"name":"临江市"},{"name":"靖宇县"},{"name":"抚松县"},{"name":"长白朝鲜族自治县"},{"name":"其他"}]},{"name":"松原市","area":[{"name":"宁江区"},{"name":"乾安县"},{"name":"长岭县"},{"name":"扶余县"},{"name":"前郭尔罗斯蒙古族自治县"},{"name":"其他"}]},{"name":"白城市","area":[{"name":"洮北区"},{"name":"大安市"},{"name":"洮南市"},{"name":"镇赉县"},{"name":"通榆县"},{"name":"其他"}]},{"name":"延边朝鲜族自治州","area":[{"name":"延吉市"},{"name":"图们市"},{"name":"敦化市"},{"name":"龙井市"},{"name":"珲春市"},{"name":"和龙市"},{"name":"安图县"},{"name":"汪清县"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"黑龙江省","city":[{"name":"哈尔滨市","area":[{"name":"松北区"},{"name":"道里区"},{"name":"南岗区"},{"name":"平房区"},{"name":"香坊区"},{"name":"道外区"},{"name":"呼兰区"},{"name":"阿城区"},{"name":"双城市"},{"name":"尚志市"},{"name":"五常市"},{"name":"宾县"},{"name":"方正县"},{"name":"通河县"},{"name":"巴彦县"},{"name":"延寿县"},{"name":"木兰县"},{"name":"依兰县"},{"name":"其他"}]},{"name":"齐齐哈尔市","area":[{"name":"龙沙区"},{"name":"昂昂溪区"},{"name":"铁锋区"},{"name":"建华区"},{"name":"富拉尔基区"},{"name":"碾子山区"},{"name":"梅里斯达斡尔族区"},{"name":"讷河市"},{"name":"富裕县"},{"name":"拜泉县"},{"name":"甘南县"},{"name":"依安县"},{"name":"克山县"},{"name":"泰来县"},{"name":"克东县"},{"name":"龙江县"},{"name":"其他"}]},{"name":"鹤岗市","area":[{"name":"兴山区"},{"name":"工农区"},{"name":"南山区"},{"name":"兴安区"},{"name":"向阳区"},{"name":"东山区"},{"name":"萝北县"},{"name":"绥滨县"},{"name":"其他"}]},{"name":"双鸭山","area":[{"name":"尖山区"},{"name":"岭东区"},{"name":"四方台区"},{"name":"宝山区"},{"name":"集贤县"},{"name":"宝清县"},{"name":"友谊县"},{"name":"饶河县"},{"name":"其他"}]},{"name":"鸡西市","area":[{"name":"鸡冠区"},{"name":"恒山区"},{"name":"城子河区"},{"name":"滴道区"},{"name":"梨树区"},{"name":"麻山区"},{"name":"密山市"},{"name":"虎林市"},{"name":"鸡东县"},{"name":"其他"}]},{"name":"大庆市","area":[{"name":"萨尔图区"},{"name":"红岗区"},{"name":"龙凤区"},{"name":"让胡路区"},{"name":"大同区"},{"name":"林甸县"},{"name":"肇州县"},{"name":"肇源县"},{"name":"杜尔伯特蒙古族自治县"},{"name":"其他"}]},{"name":"伊春市","area":[{"name":"伊春区"},{"name":"带岭区"},{"name":"南岔区"},{"name":"金山屯区"},{"name":"西林区"},{"name":"美溪区"},{"name":"乌马河区"},{"name":"翠峦区"},{"name":"友好区"},{"name":"上甘岭区"},{"name":"五营区"},{"name":"红星区"},{"name":"新青区"},{"name":"汤旺河区"},{"name":"乌伊岭区"},{"name":"铁力市"},{"name":"嘉荫县"},{"name":"其他"}]},{"name":"牡丹江市","area":[{"name":"爱民区"},{"name":"东安区"},{"name":"阳明区"},{"name":"西安区"},{"name":"绥芬河市"},{"name":"宁安市"},{"name":"海林市"},{"name":"穆棱市"},{"name":"林口县"},{"name":"东宁县"},{"name":"其他"}]},{"name":"佳木斯市","area":[{"name":"向阳区"},{"name":"前进区"},{"name":"东风区"},{"name":"郊区"},{"name":"同江市"},{"name":"富锦市"},{"name":"桦川县"},{"name":"抚远县"},{"name":"桦南县"},{"name":"汤原县"},{"name":"其他"}]},{"name":"七台河市","area":[{"name":"桃山区"},{"name":"新兴区"},{"name":"茄子河区"},{"name":"勃利县"},{"name":"其他"}]},{"name":"黑河市","area":[{"name":"爱辉区"},{"name":"北安市"},{"name":"五大连池市"},{"name":"逊克县"},{"name":"嫩江县"},{"name":"孙吴县"},{"name":"其他"}]},{"name":"绥化市","area":[{"name":"北林区"},{"name":"安达市"},{"name":"肇东市"},{"name":"海伦市"},{"name":"绥棱县"},{"name":"兰西县"},{"name":"明水县"},{"name":"青冈县"},{"name":"庆安县"},{"name":"望奎县"},{"name":"其他"}]},{"name":"大兴安岭地区","area":[{"name":"呼玛县"},{"name":"塔河县"},{"name":"漠河县"},{"name":"大兴安岭辖区"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"上海市","city":[{"name":"黄浦区"},{"name":"卢湾区"},{"name":"徐汇区"},{"name":"长宁区"},{"name":"静安区"},{"name":"普陀区"},{"name":"闸北区"},{"name":"虹口区"},{"name":"杨浦区"},{"name":"宝山区"},{"name":"闵行区"},{"name":"嘉定区"},{"name":"松江区"},{"name":"金山区"},{"name":"青浦区"},{"name":"南汇区"},{"name":"奉贤区"},{"name":"浦东新区"},{"name":"崇明县"},{"name":"其他"}]},{"name":"江苏省","city":[{"name":"南京市","area":[{"name":"玄武区"},{"name":"白下区"},{"name":"秦淮区"},{"name":"建邺区"},{"name":"鼓楼区"},{"name":"下关区"},{"name":"栖霞区"},{"name":"雨花台区"},{"name":"浦口区"},{"name":"江宁区"},{"name":"六合区"},{"name":"溧水县"},{"name":"高淳县"},{"name":"其他"}]},{"name":"苏州市","area":[{"name":"金阊区"},{"name":"平江区"},{"name":"沧浪区"},{"name":"虎丘区"},{"name":"吴中区"},{"name":"相城区"},{"name":"常熟市"},{"name":"张家港市"},{"name":"昆山市"},{"name":"吴江市"},{"name":"太仓市"},{"name":"其他"}]},{"name":"无锡市","area":[{"name":"崇安区"},{"name":"南长区"},{"name":"北塘区"},{"name":"滨湖区"},{"name":"锡山区"},{"name":"惠山区"},{"name":"江阴市"},{"name":"宜兴市"},{"name":"其他"}]},{"name":"常州市","area":[{"name":"钟楼区"},{"name":"天宁区"},{"name":"戚墅堰区"},{"name":"新北区"},{"name":"武进区"},{"name":"金坛市"},{"name":"溧阳市"},{"name":"其他"}]},{"name":"镇江市","area":[{"name":"京口区"},{"name":"润州区"},{"name":"丹徒区"},{"name":"丹阳市"},{"name":"扬中市"},{"name":"句容市"},{"name":"其他"}]},{"name":"南通市","area":[{"name":"崇川区"},{"name":"港闸区"},{"name":"通州市"},{"name":"如皋市"},{"name":"海门市"},{"name":"启东市"},{"name":"海安县"},{"name":"如东县"},{"name":"其他"}]},{"name":"泰州市","area":[{"name":"海陵区"},{"name":"高港区"},{"name":"姜堰市"},{"name":"泰兴市"},{"name":"靖江市"},{"name":"兴化市"},{"name":"其他"}]},{"name":"扬州市","area":[{"name":"广陵区"},{"name":"维扬区"},{"name":"邗江区"},{"name":"江都市"},{"name":"仪征市"},{"name":"高邮市"},{"name":"宝应县"},{"name":"其他"}]},{"name":"盐城市","area":[{"name":"亭湖区"},{"name":"盐都区"},{"name":"大丰市"},{"name":"东台市"},{"name":"建湖县"},{"name":"射阳县"},{"name":"阜宁县"},{"name":"滨海县"},{"name":"响水县"},{"name":"其他"}]},{"name":"连云港市","area":[{"name":"新浦区"},{"name":"海州区"},{"name":"连云区"},{"name":"东海县"},{"name":"灌云县"},{"name":"赣榆县"},{"name":"灌南县"},{"name":"其他"}]},{"name":"徐州市","area":[{"name":"云龙区"},{"name":"鼓楼区"},{"name":"九里区"},{"name":"泉山区"},{"name":"贾汪区"},{"name":"邳州市"},{"name":"新沂市"},{"name":"铜山县"},{"name":"睢宁县"},{"name":"沛县"},{"name":"丰县"},{"name":"其他"}]},{"name":"淮安市","area":[{"name":"清河区"},{"name":"清浦区"},{"name":"楚州区"},{"name":"淮阴区"},{"name":"涟水县"},{"name":"洪泽县"},{"name":"金湖县"},{"name":"盱眙县"},{"name":"其他"}]},{"name":"宿迁市","area":[{"name":"宿城区"},{"name":"宿豫区"},{"name":"沭阳县"},{"name":"泗阳县"},{"name":"泗洪县"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"浙江省","city":[{"name":"杭州市","area":[{"name":"拱墅区"},{"name":"西湖区"},{"name":"上城区"},{"name":"下城区"},{"name":"江干区"},{"name":"滨江区"},{"name":"余杭区"},{"name":"萧山区"},{"name":"建德市"},{"name":"富阳市"},{"name":"临安市"},{"name":"桐庐县"},{"name":"淳安县"},{"name":"其他"}]},{"name":"宁波市","area":[{"name":"海曙区"},{"name":"江东区"},{"name":"江北区"},{"name":"镇海区"},{"name":"北仑区"},{"name":"鄞州区"},{"name":"余姚市"},{"name":"慈溪市"},{"name":"奉化市"},{"name":"宁海县"},{"name":"象山县"},{"name":"其他"}]},{"name":"温州市","area":[{"name":"鹿城区"},{"name":"龙湾区"},{"name":"瓯海区"},{"name":"瑞安市"},{"name":"乐清市"},{"name":"永嘉县"},{"name":"洞头县"},{"name":"平阳县"},{"name":"苍南县"},{"name":"文成县"},{"name":"泰顺县"},{"name":"其他"}]},{"name":"嘉兴市","area":[{"name":"秀城区"},{"name":"秀洲区"},{"name":"海宁市"},{"name":"平湖市"},{"name":"桐乡市"},{"name":"嘉善县"},{"name":"海盐县"},{"name":"其他"}]},{"name":"湖州市","area":[{"name":"吴兴区"},{"name":"南浔区"},{"name":"长兴县"},{"name":"德清县"},{"name":"安吉县"},{"name":"其他"}]},{"name":"绍兴市","area":[{"name":"越城区"},{"name":"诸暨市"},{"name":"上虞市"},{"name":"嵊州市"},{"name":"绍兴县"},{"name":"新昌县"},{"name":"其他"}]},{"name":"金华市","area":[{"name":"婺城区"},{"name":"金东区"},{"name":"兰溪市"},{"name":"义乌市"},{"name":"东阳市"},{"name":"永康市"},{"name":"武义县"},{"name":"浦江县"},{"name":"磐安县"},{"name":"其他"}]},{"name":"衢州市","area":[{"name":"柯城区"},{"name":"衢江区"},{"name":"江山市"},{"name":"龙游县"},{"name":"常山县"},{"name":"开化县"},{"name":"其他"}]},{"name":"舟山市","area":[{"name":"定海区"},{"name":"普陀区"},{"name":"岱山县"},{"name":"嵊泗县"},{"name":"其他"}]},{"name":"台州市","area":[{"name":"椒江区"},{"name":"黄岩区"},{"name":"路桥区"},{"name":"临海市"},{"name":"温岭市"},{"name":"玉环县"},{"name":"天台县"},{"name":"仙居县"},{"name":"三门县"},{"name":"其他"}]},{"name":"丽水市","area":[{"name":"莲都区"},{"name":"龙泉市"},{"name":"缙云县"},{"name":"青田县"},{"name":"云和县"},{"name":"遂昌县"},{"name":"松阳县"},{"name":"庆元县"},{"name":"景宁畲族自治县"},{"name":"其他"}]},{"name":"其他市","area":[{"name":"其他"}]}]},{"name":"安徽省","city":[{"name":"合肥市","area":[{"name":"庐阳区"},{"name":"瑶海区"},{"name":"蜀山区"},{"name":"包河区"},{"name":"长丰县"},{"name":"肥东县"},{"name":"肥西县"},{"name":"其他"}]},{"name":"芜湖市","area":[{"name":"镜湖区"},{"name":"弋江区"},{"name":"鸠江区"},{"name":"三山区"},{"name":"芜湖县"},{"name":"南陵县"},{"name":"繁昌县"},{"name":"其他"}]},{"name":"蚌埠市","area":[{"name":"蚌山区"},{"name":"龙子湖区"},{"name":"禹会区"},{"name":"淮上区"},{"name":"怀远县"},{"name":"固镇县"},{"name":"五河县"},{"name":"其他"}]},{"name":"淮南市","area":[{"name":"田家庵区"},{"name":"大通区"},{"name":"谢家集区"},{"name":"八公山区"},{"name":"潘集区"},{"name":"凤台县"},{"name":"其他"}]},{"name":"马鞍山市","area":[{"name":"雨山区"},{"name":"花山区"},{"name":"金家庄区"},{"name":"当涂县"},{"name":"其他"}]},{"name":"淮北市","area":[{"name":"相山区"},{"name":"杜集区"},{"name":"烈山区"},{"name":"濉溪县"},{"name":"其他"}]},{"name":"铜陵市","area":[{"name":"铜官山区"},{"name":"狮子山区"},{"name":"郊区"},{"name":"铜陵县"},{"name":"其他"}]},{"name":"安庆市","area":[{"name":"迎江区"},{"name":"大观区"},{"name":"宜秀区"},{"name":"桐城市"},{"name":"宿松县"},{"name":"枞阳县"},{"name":"太湖县"},{"name":"怀宁县"},{"name":"岳西县"},{"name":"望江县"},{"name":"潜山县"},{"name":"其他"}]},{"name":"黄山市","area":[{"name":"屯溪区"},{"name":"黄山区"},{"name":"徽州区"},{"name":"休宁县"},{"name":"歙县"},{"name":"祁门县"},{"name":"黟县"},{"name":"其他"}]},{"name":"滁州市","area":[{"name":"琅琊区"},{"name":"南谯区"},{"name":"天长市"},{"name":"明光市"},{"name":"全椒县"},{"name":"来安县"},{"name":"定远县"},{"name":"凤阳县"},{"name":"其他"}]},{"name":"阜阳市","area":[{"name":"颍州区"},{"name":"颍东区"},{"name":"颍泉区"},{"name":"界首市"},{"name":"临泉县"},{"name":"颍上县"},{"name":"阜南县"},{"name":"太和县"},{"name":"其他"}]},{"name":"宿州市","area":[{"name":"埇桥区"},{"name":"萧县"},{"name":"泗县"},{"name":"砀山县"},{"name":"灵璧县"},{"name":"其他"}]},{"name":"巢湖市","area":[{"name":"居巢区"},{"name":"含山县"},{"name":"无为县"},{"name":"庐江县"},{"name":"和县"},{"name":"其他"}]},{"name":"六安市","area":[{"name":"金安区"},{"name":"裕安区"},{"name":"寿县"},{"name":"霍山县"},{"name":"霍邱县"},{"name":"舒城县"},{"name":"金寨县"},{"name":"其他"}]},{"name":"亳州市","area":[{"name":"谯城区"},{"name":"利辛县"},{"name":"涡阳县"},{"name":"蒙城县"},{"name":"其他"}]},{"name":"池州市","area":[{"name":"贵池区"},{"name":"东至县"},{"name":"石台县"},{"name":"青阳县"},{"name":"其他"}]},{"name":"宣城市","area":[{"name":"宣州区"},{"name":"宁国市"},{"name":"广德县"},{"name":"郎溪县"},{"name":"泾县"},{"name":"旌德县"},{"name":"绩溪县"},{"name":"其他"}]},{"name":"其他市","area":[{"name":"其他"}]}]},{"name":"福建省","city":[{"name":"福州市","area":[{"name":"鼓楼区"},{"name":"台江区"},{"name":"仓山区"},{"name":"马尾区"},{"name":"晋安区"},{"name":"福清市"},{"name":"长乐市"},{"name":"闽侯县"},{"name":"闽清县"},{"name":"永泰县"},{"name":"连江县"},{"name":"罗源县"},{"name":"平潭县"},{"name":"其他"}]},{"name":"厦门市","area":[{"name":"思明区"},{"name":"海沧区"},{"name":"湖里区"},{"name":"集美区"},{"name":"同安区"},{"name":"翔安区"},{"name":"其他"}]},{"name":"莆田市","area":[{"name":"城厢区"},{"name":"涵江区"},{"name":"荔城区"},{"name":"秀屿区"},{"name":"仙游县"},{"name":"其他"}]},{"name":"三明市","area":[{"name":"梅列区"},{"name":"三元区"},{"name":"永安市"},{"name":"明溪县"},{"name":"将乐县"},{"name":"大田县"},{"name":"宁化县"},{"name":"建宁县"},{"name":"沙县"},{"name":"尤溪县"},{"name":"清流县"},{"name":"泰宁县"},{"name":"其他"}]},{"name":"泉州市","area":[{"name":"鲤城区"},{"name":"丰泽区"},{"name":"洛江区"},{"name":"泉港区"},{"name":"石狮市"},{"name":"晋江市"},{"name":"南安市"},{"name":"惠安县"},{"name":"永春县"},{"name":"安溪县"},{"name":"德化县"},{"name":"金门县"},{"name":"其他"}]},{"name":"漳州市","area":[{"name":"芗城区"},{"name":"龙文区"},{"name":"龙海市"},{"name":"平和县"},{"name":"南靖县"},{"name":"诏安县"},{"name":"漳浦县"},{"name":"华安县"},{"name":"东山县"},{"name":"长泰县"},{"name":"云霄县"},{"name":"其他"}]},{"name":"南平市","area":[{"name":"延平区"},{"name":"建瓯市"},{"name":"邵武市"},{"name":"武夷山市"},{"name":"建阳市"},{"name":"松溪县"},{"name":"光泽县"},{"name":"顺昌县"},{"name":"浦城县"},{"name":"政和县"},{"name":"其他"}]},{"name":"龙岩市","area":[{"name":"新罗区"},{"name":"漳平市"},{"name":"长汀县"},{"name":"武平县"},{"name":"上杭县"},{"name":"永定县"},{"name":"连城县"},{"name":"其他"}]},{"name":"宁德市","area":[{"name":"蕉城区"},{"name":"福安市"},{"name":"福鼎市"},{"name":"寿宁县"},{"name":"霞浦县"},{"name":"柘荣县"},{"name":"屏南县"},{"name":"古田县"},{"name":"周宁县"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"江西省","city":[{"name":"南昌市","area":[{"name":"东湖区"},{"name":"西湖区"},{"name":"青云谱区"},{"name":"湾里区"},{"name":"青山湖区"},{"name":"新建县"},{"name":"南昌县"},{"name":"进贤县"},{"name":"安义县"},{"name":"其他"}]},{"name":"景德镇市","area":[{"name":"珠山区"},{"name":"昌江区"},{"name":"乐平市"},{"name":"浮梁县"},{"name":"其他"}]},{"name":"萍乡市","area":[{"name":"安源区"},{"name":"湘东区"},{"name":"莲花县"},{"name":"上栗县"},{"name":"芦溪县"},{"name":"其他"}]},{"name":"九江市","area":[{"name":"浔阳区"},{"name":"庐山区"},{"name":"瑞昌市"},{"name":"九江县"},{"name":"星子县"},{"name":"武宁县"},{"name":"彭泽县"},{"name":"永修县"},{"name":"修水县"},{"name":"湖口县"},{"name":"德安县"},{"name":"都昌县"},{"name":"其他"}]},{"name":"新余市","area":[{"name":"渝水区"},{"name":"分宜县"},{"name":"其他"}]},{"name":"鹰潭市","area":[{"name":"月湖区"},{"name":"贵溪市"},{"name":"余江县"},{"name":"其他"}]},{"name":"赣州市","area":[{"name":"章贡区"},{"name":"瑞金市"},{"name":"南康市"},{"name":"石城县"},{"name":"安远县"},{"name":"赣县"},{"name":"宁都县"},{"name":"寻乌县"},{"name":"兴国县"},{"name":"定南县"},{"name":"上犹县"},{"name":"于都县"},{"name":"龙南县"},{"name":"崇义县"},{"name":"信丰县"},{"name":"全南县"},{"name":"大余县"},{"name":"会昌县"},{"name":"其他"}]},{"name":"吉安市","area":[{"name":"吉州区"},{"name":"青原区"},{"name":"井冈山市"},{"name":"吉安县"},{"name":"永丰县"},{"name":"永新县"},{"name":"新干县"},{"name":"泰和县"},{"name":"峡江县"},{"name":"遂川县"},{"name":"安福县"},{"name":"吉水县"},{"name":"万安县"},{"name":"其他"}]},{"name":"宜春市","area":[{"name":"袁州区"},{"name":"丰城市"},{"name":"樟树市"},{"name":"高安市"},{"name":"铜鼓县"},{"name":"靖安县"},{"name":"宜丰县"},{"name":"奉新县"},{"name":"万载县"},{"name":"上高县"},{"name":"其他"}]},{"name":"抚州市","area":[{"name":"临川区"},{"name":"南丰县"},{"name":"乐安县"},{"name":"金溪县"},{"name":"南城县"},{"name":"东乡县"},{"name":"资溪县"},{"name":"宜黄县"},{"name":"广昌县"},{"name":"黎川县"},{"name":"崇仁县"},{"name":"其他"}]},{"name":"上饶市","area":[{"name":"信州区"},{"name":"德兴市"},{"name":"上饶县"},{"name":"广丰县"},{"name":"鄱阳县"},{"name":"婺源县"},{"name":"铅山县"},{"name":"余干县"},{"name":"横峰县"},{"name":"弋阳县"},{"name":"玉山县"},{"name":"万年县"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"山东省","city":[{"name":"济南市","area":[{"name":"市中区"},{"name":"历下区"},{"name":"天桥区"},{"name":"槐荫区"},{"name":"历城区"},{"name":"长清区"},{"name":"章丘市"},{"name":"平阴县"},{"name":"济阳县"},{"name":"商河县"},{"name":"其他"}]},{"name":"青岛市","area":[{"name":"市南区"},{"name":"市北区"},{"name":"城阳区"},{"name":"四方区"},{"name":"李沧区"},{"name":"黄岛区"},{"name":"崂山区"},{"name":"胶南市"},{"name":"胶州市"},{"name":"平度市"},{"name":"莱西市"},{"name":"即墨市"},{"name":"其他"}]},{"name":"淄博市","area":[{"name":"张店区"},{"name":"临淄区"},{"name":"淄川区"},{"name":"博山区"},{"name":"周村区"},{"name":"桓台县"},{"name":"高青县"},{"name":"沂源县"},{"name":"其他"}]},{"name":"枣庄市","area":[{"name":"市中区"},{"name":"山亭区"},{"name":"峄城区"},{"name":"台儿庄区"},{"name":"薛城区"},{"name":"滕州市"},{"name":"其他"}]},{"name":"东营市","area":[{"name":"东营区"},{"name":"河口区"},{"name":"垦利县"},{"name":"广饶县"},{"name":"利津县"},{"name":"其他"}]},{"name":"烟台市","area":[{"name":"芝罘区"},{"name":"福山区"},{"name":"牟平区"},{"name":"莱山区"},{"name":"龙口市"},{"name":"莱阳市"},{"name":"莱州市"},{"name":"招远市"},{"name":"蓬莱市"},{"name":"栖霞市"},{"name":"海阳市"},{"name":"长岛县"},{"name":"其他"}]},{"name":"潍坊市","area":[{"name":"潍城区"},{"name":"寒亭区"},{"name":"坊子区"},{"name":"奎文区"},{"name":"青州市"},{"name":"诸城市"},{"name":"寿光市"},{"name":"安丘市"},{"name":"高密市"},{"name":"昌邑市"},{"name":"昌乐县"},{"name":"临朐县"},{"name":"其他"}]},{"name":"济宁市","area":[{"name":"市中区"},{"name":"任城区"},{"name":"曲阜市"},{"name":"兖州市"},{"name":"邹城市"},{"name":"鱼台县"},{"name":"金乡县"},{"name":"嘉祥县"},{"name":"微山县"},{"name":"汶上县"},{"name":"泗水县"},{"name":"梁山县"},{"name":"其他"}]},{"name":"泰安市","area":[{"name":"泰山区"},{"name":"岱岳区"},{"name":"新泰市"},{"name":"肥城市"},{"name":"宁阳县"},{"name":"东平县"},{"name":"其他"}]},{"name":"威海市","area":[{"name":"环翠区"},{"name":"乳山市"},{"name":"文登市"},{"name":"荣成市"},{"name":"其他"}]},{"name":"日照市","area":[{"name":"东港区"},{"name":"岚山区"},{"name":"五莲县"},{"name":"莒县"},{"name":"其他"}]},{"name":"莱芜市","area":[{"name":"莱城区"},{"name":"钢城区"},{"name":"其他"}]},{"name":"临沂市","area":[{"name":"兰山区"},{"name":"罗庄区"},{"name":"河东区"},{"name":"沂南县"},{"name":"郯城县"},{"name":"沂水县"},{"name":"苍山县"},{"name":"费县"},{"name":"平邑县"},{"name":"莒南县"},{"name":"蒙阴县"},{"name":"临沭县"},{"name":"其他"}]},{"name":"德州市","area":[{"name":"德城区"},{"name":"乐陵市"},{"name":"禹城市"},{"name":"陵县"},{"name":"宁津县"},{"name":"齐河县"},{"name":"武城县"},{"name":"庆云县"},{"name":"平原县"},{"name":"夏津县"},{"name":"临邑县"},{"name":"其他"}]},{"name":"聊城市","area":[{"name":"东昌府区"},{"name":"临清市"},{"name":"高唐县"},{"name":"阳谷县"},{"name":"茌平县"},{"name":"莘县"},{"name":"东阿县"},{"name":"冠县"},{"name":"其他"}]},{"name":"滨州市","area":[{"name":"滨城区"},{"name":"邹平县"},{"name":"沾化县"},{"name":"惠民县"},{"name":"博兴县"},{"name":"阳信县"},{"name":"无棣县"},{"name":"其他"}]},{"name":"菏泽市","area":[{"name":"牡丹区"},{"name":"鄄城县"},{"name":"单县"},{"name":"郓城县"},{"name":"曹县"},{"name":"定陶县"},{"name":"巨野县"},{"name":"东明县"},{"name":"成武县"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"河南省","city":[{"name":"郑州市","area":[{"name":"中原区"},{"name":"金水区"},{"name":"二七区"},{"name":"管城回族区"},{"name":"上街区"},{"name":"惠济区"},{"name":"巩义市"},{"name":"新郑市"},{"name":"新密市"},{"name":"登封市"},{"name":"荥阳市"},{"name":"中牟县"},{"name":"其他"}]},{"name":"开封市","area":[{"name":"鼓楼区"},{"name":"龙亭区"},{"name":"顺河回族区"},{"name":"禹王台区"},{"name":"金明区"},{"name":"开封县"},{"name":"尉氏县"},{"name":"兰考县"},{"name":"杞县"},{"name":"通许县"},{"name":"其他"}]},{"name":"洛阳市","area":[{"name":"西工区"},{"name":"老城区"},{"name":"涧西区"},{"name":"瀍河回族区"},{"name":"洛龙区"},{"name":"吉利区"},{"name":"偃师市"},{"name":"孟津县"},{"name":"汝阳县"},{"name":"伊川县"},{"name":"洛宁县"},{"name":"嵩县"},{"name":"宜阳县"},{"name":"新安县"},{"name":"栾川县"},{"name":"其他"}]},{"name":"平顶山市","area":[{"name":"新华区"},{"name":"卫东区"},{"name":"湛河区"},{"name":"石龙区"},{"name":"汝州市"},{"name":"舞钢市"},{"name":"宝丰县"},{"name":"叶县"},{"name":"郏县"},{"name":"鲁山县"},{"name":"其他"}]},{"name":"安阳市","area":[{"name":"北关区"},{"name":"文峰区"},{"name":"殷都区"},{"name":"龙安区"},{"name":"林州市"},{"name":"安阳县"},{"name":"滑县"},{"name":"内黄县"},{"name":"汤阴县"},{"name":"其他"}]},{"name":"鹤壁市","area":[{"name":"淇滨区"},{"name":"山城区"},{"name":"鹤山区"},{"name":"浚县"},{"name":"淇县"},{"name":"其他"}]},{"name":"新乡市","area":[{"name":"卫滨区"},{"name":"红旗区"},{"name":"凤泉区"},{"name":"牧野区"},{"name":"卫辉市"},{"name":"辉县市"},{"name":"新乡县"},{"name":"获嘉县"},{"name":"原阳县"},{"name":"长垣县"},{"name":"封丘县"},{"name":"延津县"},{"name":"其他"}]},{"name":"焦作市","area":[{"name":"解放区"},{"name":"中站区"},{"name":"马村区"},{"name":"山阳区"},{"name":"沁阳市"},{"name":"孟州市"},{"name":"修武县"},{"name":"温县"},{"name":"武陟县"},{"name":"博爱县"},{"name":"其他"}]},{"name":"濮阳市","area":[{"name":"华龙区"},{"name":"濮阳县"},{"name":"南乐县"},{"name":"台前县"},{"name":"清丰县"},{"name":"范县"},{"name":"其他"}]},{"name":"许昌市","area":[{"name":"魏都区"},{"name":"禹州市"},{"name":"长葛市"},{"name":"许昌县"},{"name":"鄢陵县"},{"name":"襄城县"},{"name":"其他"}]},{"name":"漯河市","area":[{"name":"源汇区"},{"name":"郾城区"},{"name":"召陵区"},{"name":"临颍县"},{"name":"舞阳县"},{"name":"其他"}]},{"name":"三门峡市","area":[{"name":"湖滨区"},{"name":"义马市"},{"name":"灵宝市"},{"name":"渑池县"},{"name":"卢氏县"},{"name":"陕县"},{"name":"其他"}]},{"name":"南阳市","area":[{"name":"卧龙区"},{"name":"宛城区"},{"name":"邓州市"},{"name":"桐柏县"},{"name":"方城县"},{"name":"淅川县"},{"name":"镇平县"},{"name":"唐河县"},{"name":"南召县"},{"name":"内乡县"},{"name":"新野县"},{"name":"社旗县"},{"name":"西峡县"},{"name":"其他"}]},{"name":"商丘市","area":[{"name":"梁园区"},{"name":"睢阳区"},{"name":"永城市"},{"name":"宁陵县"},{"name":"虞城县"},{"name":"民权县"},{"name":"夏邑县"},{"name":"柘城县"},{"name":"睢县"},{"name":"其他"}]},{"name":"信阳市","area":[{"name":"浉河区"},{"name":"平桥区"},{"name":"潢川县"},{"name":"淮滨县"},{"name":"息县"},{"name":"新县"},{"name":"商城县"},{"name":"固始县"},{"name":"罗山县"},{"name":"光山县"},{"name":"其他"}]},{"name":"周口市","area":[{"name":"川汇区"},{"name":"项城市"},{"name":"商水县"},{"name":"淮阳县"},{"name":"太康县"},{"name":"鹿邑县"},{"name":"西华县"},{"name":"扶沟县"},{"name":"沈丘县"},{"name":"郸城县"},{"name":"其他"}]},{"name":"驻马店市","area":[{"name":"驿城区"},{"name":"确山县"},{"name":"新蔡县"},{"name":"上蔡县"},{"name":"西平县"},{"name":"泌阳县"},{"name":"平舆县"},{"name":"汝南县"},{"name":"遂平县"},{"name":"正阳县"},{"name":"其他"}]},{"name":"焦作市","area":[{"name":"济源市"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"湖北省","city":[{"name":"武汉市","area":[{"name":"江岸区"},{"name":"武昌区"},{"name":"江汉区"},{"name":"硚口区"},{"name":"汉阳区"},{"name":"青山区"},{"name":"洪山区"},{"name":"东西湖区"},{"name":"汉南区"},{"name":"蔡甸区"},{"name":"江夏区"},{"name":"黄陂区"},{"name":"新洲区"},{"name":"其他"}]},{"name":"黄石市","area":[{"name":"黄石港区"},{"name":"西塞山区"},{"name":"下陆区"},{"name":"铁山区"},{"name":"大冶市"},{"name":"阳新县"},{"name":"其他"}]},{"name":"十堰市","area":[{"name":"张湾区"},{"name":"茅箭区"},{"name":"丹江口市"},{"name":"郧县"},{"name":"竹山县"},{"name":"房县"},{"name":"郧西县"},{"name":"竹溪县"},{"name":"其他"}]},{"name":"荆州市","area":[{"name":"沙市区"},{"name":"荆州区"},{"name":"洪湖市"},{"name":"石首市"},{"name":"松滋市"},{"name":"监利县"},{"name":"公安县"},{"name":"江陵县"},{"name":"其他"}]},{"name":"宜昌市","area":[{"name":"西陵区"},{"name":"伍家岗区"},{"name":"点军区"},{"name":"猇亭区"},{"name":"夷陵区"},{"name":"宜都市"},{"name":"当阳市"},{"name":"枝江市"},{"name":"秭归县"},{"name":"远安县"},{"name":"兴山县"},{"name":"五峰土家族自治县"},{"name":"长阳土家族自治县"},{"name":"其他"}]},{"name":"襄阳市","area":[{"name":"襄城区"},{"name":"樊城区"},{"name":"襄阳区"},{"name":"老河口市"},{"name":"枣阳市"},{"name":"宜城市"},{"name":"南漳县"},{"name":"谷城县"},{"name":"保康县"},{"name":"其他"}]},{"name":"鄂州市","area":[{"name":"鄂城区"},{"name":"华容区"},{"name":"梁子湖区"},{"name":"其他"}]},{"name":"荆门市","area":[{"name":"东宝区"},{"name":"掇刀区"},{"name":"钟祥市"},{"name":"京山县"},{"name":"沙洋县"},{"name":"其他"}]},{"name":"孝感市","area":[{"name":"孝南区"},{"name":"应城市"},{"name":"安陆市"},{"name":"汉川市"},{"name":"云梦县"},{"name":"大悟县"},{"name":"孝昌县"},{"name":"其他"}]},{"name":"黄冈市","area":[{"name":"黄州区"},{"name":"麻城市"},{"name":"武穴市"},{"name":"红安县"},{"name":"罗田县"},{"name":"浠水县"},{"name":"蕲春县"},{"name":"黄梅县"},{"name":"英山县"},{"name":"团风县"},{"name":"其他"}]},{"name":"咸宁市","area":[{"name":"咸安区"},{"name":"赤壁市"},{"name":"嘉鱼县"},{"name":"通山县"},{"name":"崇阳县"},{"name":"通城县"},{"name":"其他"}]},{"name":"随州市","area":[{"name":"曾都区"},{"name":"广水市"},{"name":"其他"}]},{"name":"恩施土家族苗族自治州","area":[{"name":"恩施市"},{"name":"利川市"},{"name":"建始县"},{"name":"来凤县"},{"name":"巴东县"},{"name":"鹤峰县"},{"name":"宣恩县"},{"name":"咸丰县"},{"name":"其他"}]},{"name":"仙桃市","area":[{"name":"仙桃"}]},{"name":"天门市","area":[{"name":"天门"}]},{"name":"潜江市","area":[{"name":"潜江"}]},{"name":"神农架林区","area":[{"name":"神农架林区"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"湖南省","city":[{"name":"长沙市","area":[{"name":"岳麓区"},{"name":"芙蓉区"},{"name":"天心区"},{"name":"开福区"},{"name":"雨花区"},{"name":"浏阳市"},{"name":"长沙县"},{"name":"望城县"},{"name":"宁乡县"},{"name":"其他"}]},{"name":"株洲市","area":[{"name":"天元区"},{"name":"荷塘区"},{"name":"芦淞区"},{"name":"石峰区"},{"name":"醴陵市"},{"name":"株洲县"},{"name":"炎陵县"},{"name":"茶陵县"},{"name":"攸县"},{"name":"其他"}]},{"name":"湘潭市","area":[{"name":"岳塘区"},{"name":"雨湖区"},{"name":"湘乡市"},{"name":"韶山市"},{"name":"湘潭县"},{"name":"其他"}]},{"name":"衡阳市","area":[{"name":"雁峰区"},{"name":"珠晖区"},{"name":"石鼓区"},{"name":"蒸湘区"},{"name":"南岳区"},{"name":"耒阳市"},{"name":"常宁市"},{"name":"衡阳县"},{"name":"衡东县"},{"name":"衡山县"},{"name":"衡南县"},{"name":"祁东县"},{"name":"其他"}]},{"name":"邵阳市","area":[{"name":"双清区"},{"name":"大祥区"},{"name":"北塔区"},{"name":"武冈市"},{"name":"邵东县"},{"name":"洞口县"},{"name":"新邵县"},{"name":"绥宁县"},{"name":"新宁县"},{"name":"邵阳县"},{"name":"隆回县"},{"name":"城步苗族自治县"},{"name":"其他"}]},{"name":"岳阳市","area":[{"name":"岳阳楼区"},{"name":"云溪区"},{"name":"君山区"},{"name":"临湘市"},{"name":"汨罗市"},{"name":"岳阳县"},{"name":"湘阴县"},{"name":"平江县"},{"name":"华容县"},{"name":"其他"}]},{"name":"常德市","area":[{"name":"武陵区"},{"name":"鼎城区"},{"name":"津市市"},{"name":"澧县"},{"name":"临澧县"},{"name":"桃源县"},{"name":"汉寿县"},{"name":"安乡县"},{"name":"石门县"},{"name":"其他"}]},{"name":"张家界市","area":[{"name":"永定区"},{"name":"武陵源区"},{"name":"慈利县"},{"name":"桑植县"},{"name":"其他"}]},{"name":"益阳市","area":[{"name":"赫山区"},{"name":"资阳区"},{"name":"沅江市"},{"name":"桃江县"},{"name":"南县"},{"name":"安化县"},{"name":"其他"}]},{"name":"郴州市","area":[{"name":"北湖区"},{"name":"苏仙区"},{"name":"资兴市"},{"name":"宜章县"},{"name":"汝城县"},{"name":"安仁县"},{"name":"嘉禾县"},{"name":"临武县"},{"name":"桂东县"},{"name":"永兴县"},{"name":"桂阳县"},{"name":"其他"}]},{"name":"永州市","area":[{"name":"冷水滩区"},{"name":"零陵区"},{"name":"祁阳县"},{"name":"蓝山县"},{"name":"宁远县"},{"name":"新田县"},{"name":"东安县"},{"name":"江永县"},{"name":"道县"},{"name":"双牌县"},{"name":"江华瑶族自治县"},{"name":"其他"}]},{"name":"怀化市","area":[{"name":"鹤城区"},{"name":"洪江市"},{"name":"会同县"},{"name":"沅陵县"},{"name":"辰溪县"},{"name":"溆浦县"},{"name":"中方县"},{"name":"新晃侗族自治县"},{"name":"芷江侗族自治县"},{"name":"通道侗族自治县"},{"name":"靖州苗族侗族自治县"},{"name":"麻阳苗族自治县"},{"name":"其他"}]},{"name":"娄底市","area":[{"name":"娄星区"},{"name":"冷水江市"},{"name":"涟源市"},{"name":"新化县"},{"name":"双峰县"},{"name":"其他"}]},{"name":"湘西土家族苗族自治州","area":[{"name":"吉首市"},{"name":"古丈县"},{"name":"龙山县"},{"name":"永顺县"},{"name":"凤凰县"},{"name":"泸溪县"},{"name":"保靖县"},{"name":"花垣县"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"广东省","city":[{"name":"广州市","area":[{"name":"越秀区"},{"name":"荔湾区"},{"name":"海珠区"},{"name":"天河区"},{"name":"白云区"},{"name":"黄埔区"},{"name":"番禺区"},{"name":"花都区"},{"name":"南沙区"},{"name":"萝岗区"},{"name":"增城市"},{"name":"从化市"},{"name":"其他"}]},{"name":"深圳市","area":[{"name":"福田区"},{"name":"罗湖区"},{"name":"南山区"},{"name":"宝安区"},{"name":"龙岗区"},{"name":"盐田区"},{"name":"其他"}]},{"name":"东莞市","area":[{"name":"莞城"},{"name":"常平"},{"name":"塘厦"},{"name":"塘厦"},{"name":"塘厦"},{"name":"其他"}]},{"name":"中山市","area":[{"name":"中山"}]},{"name":"潮州市","area":[{"name":"湘桥区"},{"name":"潮安县"},{"name":"饶平县"},{"name":"其他"}]},{"name":"揭阳市","area":[{"name":"榕城区"},{"name":"揭东县"},{"name":"揭西县"},{"name":"惠来县"},{"name":"普宁市"},{"name":"其他"}]},{"name":"云浮市","area":[{"name":"云城区"},{"name":"新兴县"},{"name":"郁南县"},{"name":"云安县"},{"name":"罗定市"},{"name":"其他"}]},{"name":"珠海市","area":[{"name":"香洲区"},{"name":"斗门区"},{"name":"金湾区"},{"name":"其他"}]},{"name":"汕头市","area":[{"name":"金平区"},{"name":"濠江区"},{"name":"龙湖区"},{"name":"潮阳区"},{"name":"潮南区"},{"name":"澄海区"},{"name":"南澳县"},{"name":"其他"}]},{"name":"韶关市","area":[{"name":"浈江区"},{"name":"武江区"},{"name":"曲江区"},{"name":"乐昌市"},{"name":"南雄市"},{"name":"始兴县"},{"name":"仁化县"},{"name":"翁源县"},{"name":"新丰县"},{"name":"乳源瑶族自治县"},{"name":"其他"}]},{"name":"佛山市","area":[{"name":"禅城区"},{"name":"南海区"},{"name":"顺德区"},{"name":"三水区"},{"name":"高明区"},{"name":"其他"}]},{"name":"江门市","area":[{"name":"蓬江区"},{"name":"江海区"},{"name":"新会区"},{"name":"恩平市"},{"name":"台山市"},{"name":"开平市"},{"name":"鹤山市"},{"name":"其他"}]},{"name":"湛江市","area":[{"name":"赤坎区"},{"name":"霞山区"},{"name":"坡头区"},{"name":"麻章区"},{"name":"吴川市"},{"name":"廉江市"},{"name":"雷州市"},{"name":"遂溪县"},{"name":"徐闻县"},{"name":"其他"}]},{"name":"茂名市","area":[{"name":"茂南区"},{"name":"茂港区"},{"name":"化州市"},{"name":"信宜市"},{"name":"高州市"},{"name":"电白县"},{"name":"其他"}]},{"name":"肇庆市","area":[{"name":"端州区"},{"name":"鼎湖区"},{"name":"高要市"},{"name":"四会市"},{"name":"广宁县"},{"name":"怀集县"},{"name":"封开县"},{"name":"德庆县"},{"name":"其他"}]},{"name":"惠州市","area":[{"name":"惠城区"},{"name":"惠阳区"},{"name":"博罗县"},{"name":"惠东县"},{"name":"龙门县"},{"name":"其他"}]},{"name":"梅州市","area":[{"name":"梅江区"},{"name":"兴宁市"},{"name":"梅县"},{"name":"大埔县"},{"name":"丰顺县"},{"name":"五华县"},{"name":"平远县"},{"name":"蕉岭县"},{"name":"其他"}]},{"name":"汕尾市","area":[{"name":"城区"},{"name":"陆丰市"},{"name":"海丰县"},{"name":"陆河县"},{"name":"其他"}]},{"name":"河源市","area":[{"name":"源城区"},{"name":"紫金县"},{"name":"龙川县"},{"name":"连平县"},{"name":"和平县"},{"name":"东源县"},{"name":"其他"}]},{"name":"阳江市","area":[{"name":"江城区"},{"name":"阳春市"},{"name":"阳西县"},{"name":"阳东县"},{"name":"其他"}]},{"name":"清远市","area":[{"name":"清城区"},{"name":"英德市"},{"name":"连州市"},{"name":"佛冈县"},{"name":"阳山县"},{"name":"清新县"},{"name":"连山壮族瑶族自治县"},{"name":"连南瑶族自治县"},{"name":"其他"}]}]},{"name":"广西","city":[{"name":"南宁市","area":[{"name":"青秀区"},{"name":"兴宁区"},{"name":"西乡塘区"},{"name":"良庆区"},{"name":"江南区"},{"name":"邕宁区"},{"name":"武鸣县"},{"name":"隆安县"},{"name":"马山县"},{"name":"上林县"},{"name":"宾阳县"},{"name":"横县"},{"name":"其他"}]},{"name":"柳州市","area":[{"name":"城中区"},{"name":"鱼峰区"},{"name":"柳北区"},{"name":"柳南区"},{"name":"柳江县"},{"name":"柳城县"},{"name":"鹿寨县"},{"name":"融安县"},{"name":"融水苗族自治县"},{"name":"三江侗族自治县"},{"name":"其他"}]},{"name":"桂林市","area":[{"name":"象山区"},{"name":"秀峰区"},{"name":"叠彩区"},{"name":"七星区"},{"name":"雁山区"},{"name":"阳朔县"},{"name":"临桂县"},{"name":"灵川县"},{"name":"全州县"},{"name":"平乐县"},{"name":"兴安县"},{"name":"灌阳县"},{"name":"荔浦县"},{"name":"资源县"},{"name":"永福县"},{"name":"龙胜各族自治县"},{"name":"恭城瑶族自治县"},{"name":"其他"}]},{"name":"梧州市","area":[{"name":"万秀区"},{"name":"蝶山区"},{"name":"长洲区"},{"name":"岑溪市"},{"name":"苍梧县"},{"name":"藤县"},{"name":"蒙山县"},{"name":"其他"}]},{"name":"北海市","area":[{"name":"海城区"},{"name":"银海区"},{"name":"铁山港区"},{"name":"合浦县"},{"name":"其他"}]},{"name":"防城港市","area":[{"name":"港口区"},{"name":"防城区"},{"name":"东兴市"},{"name":"上思县"},{"name":"其他"}]},{"name":"钦州市","area":[{"name":"钦南区"},{"name":"钦北区"},{"name":"灵山县"},{"name":"浦北县"},{"name":"其他"}]},{"name":"贵港市","area":[{"name":"港北区"},{"name":"港南区"},{"name":"覃塘区"},{"name":"桂平市"},{"name":"平南县"},{"name":"其他"}]},{"name":"玉林市","area":[{"name":"玉州区"},{"name":"北流市"},{"name":"容县"},{"name":"陆川县"},{"name":"博白县"},{"name":"兴业县"},{"name":"其他"}]},{"name":"百色市","area":[{"name":"右江区"},{"name":"凌云县"},{"name":"平果县"},{"name":"西林县"},{"name":"乐业县"},{"name":"德保县"},{"name":"田林县"},{"name":"田阳县"},{"name":"靖西县"},{"name":"田东县"},{"name":"那坡县"},{"name":"隆林各族自治县"},{"name":"其他"}]},{"name":"贺州市","area":[{"name":"八步区"},{"name":"钟山县"},{"name":"昭平县"},{"name":"富川瑶族自治县"},{"name":"其他"}]},{"name":"河池市","area":[{"name":"金城江区"},{"name":"宜州市"},{"name":"天峨县"},{"name":"凤山县"},{"name":"南丹县"},{"name":"东兰县"},{"name":"都安瑶族自治县"},{"name":"罗城仫佬族自治县"},{"name":"巴马瑶族自治县"},{"name":"环江毛南族自治县"},{"name":"大化瑶族自治县"},{"name":"其他"}]},{"name":"来宾市","area":[{"name":"兴宾区"},{"name":"合山市"},{"name":"象州县"},{"name":"武宣县"},{"name":"忻城县"},{"name":"金秀瑶族自治县"},{"name":"其他"}]},{"name":"崇左市","area":[{"name":"江州区"},{"name":"凭祥市"},{"name":"宁明县"},{"name":"扶绥县"},{"name":"龙州县"},{"name":"大新县"},{"name":"天等县"},{"name":"其他"}]},{"name":"其他市","area":[{"name":"其他"}]}]},{"name":"海南省","city":[{"name":"海口市","area":[{"name":"龙华区"},{"name":"秀英区"},{"name":"琼山区"},{"name":"美兰区"},{"name":"其他"}]},{"name":"三亚市","area":[{"name":"三亚市"},{"name":"其他"}]},{"name":"五指山市","area":[{"name":"五指山"}]},{"name":"琼海市","area":[{"name":"琼海"}]},{"name":"儋州市","area":[{"name":"儋州"}]},{"name":"文昌市","area":[{"name":"文昌"}]},{"name":"万宁市","area":[{"name":"万宁"}]},{"name":"东方市","area":[{"name":"东方"}]},{"name":"澄迈县","area":[{"name":"澄迈县"}]},{"name":"定安县","area":[{"name":"定安县"}]},{"name":"屯昌县","area":[{"name":"屯昌县"}]},{"name":"临高县","area":[{"name":"临高县"}]},{"name":"白沙黎族自治县","area":[{"name":"白沙黎族自治县"}]},{"name":"昌江黎族自治县","area":[{"name":"昌江黎族自治县"}]},{"name":"乐东黎族自治县","area":[{"name":"乐东黎族自治县"}]},{"name":"陵水黎族自治县","area":[{"name":"陵水黎族自治县"}]},{"name":"保亭黎族苗族自治县","area":[{"name":"保亭黎族苗族自治县"}]},{"name":"琼中黎族苗族自治县","area":[{"name":"琼中黎族苗族自治县"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"重庆市","city":[{"name":"重庆市","area":[{"name":"渝中区"},{"name":"大渡口区"},{"name":"江北区"},{"name":"南岸区"},{"name":"北碚区"},{"name":"渝北区"},{"name":"巴南区"},{"name":"长寿区"},{"name":"双桥区"},{"name":"沙坪坝区"},{"name":"万盛区"},{"name":"万州区"},{"name":"涪陵区"},{"name":"黔江区"},{"name":"永川区"},{"name":"合川区"},{"name":"江津区"},{"name":"九龙坡区"},{"name":"南川区"},{"name":"綦江县"},{"name":"潼南县"},{"name":"荣昌县"},{"name":"璧山县"},{"name":"大足县"},{"name":"铜梁县"},{"name":"梁平县"},{"name":"开县"},{"name":"忠县"},{"name":"城口县"},{"name":"垫江县"},{"name":"武隆县"},{"name":"丰都县"},{"name":"奉节县"},{"name":"云阳县"},{"name":"巫溪县"},{"name":"巫山县"},{"name":"石柱土家族自治县"},{"name":"秀山土家族苗族自治县"},{"name":"酉阳土家族苗族自治县"},{"name":"彭水苗族土家族自治县"},{"name":"其他"}]}]},{"name":"四川省","city":[{"name":"成都市","area":[{"name":"青羊区"},{"name":"锦江区"},{"name":"金牛区"},{"name":"武侯区"},{"name":"成华区"},{"name":"龙泉驿区"},{"name":"青白江区"},{"name":"新都区"},{"name":"温江区"},{"name":"都江堰市"},{"name":"彭州市"},{"name":"邛崃市"},{"name":"崇州市"},{"name":"金堂县"},{"name":"郫县"},{"name":"新津县"},{"name":"双流县"},{"name":"蒲江县"},{"name":"大邑县"},{"name":"其他"}]},{"name":"自贡市","area":[{"name":"大安区"},{"name":"自流井区"},{"name":"贡井区"},{"name":"沿滩区"},{"name":"荣县"},{"name":"富顺县"},{"name":"其他"}]},{"name":"攀枝花市","area":[{"name":"仁和区"},{"name":"米易县"},{"name":"盐边县"},{"name":"东区"},{"name":"西区"},{"name":"其他"}]},{"name":"泸州市","area":[{"name":"江阳区"},{"name":"纳溪区"},{"name":"龙马潭区"},{"name":"泸县"},{"name":"合江县"},{"name":"叙永县"},{"name":"古蔺县"},{"name":"其他"}]},{"name":"德阳市","area":[{"name":"旌阳区"},{"name":"广汉市"},{"name":"什邡市"},{"name":"绵竹市"},{"name":"罗江县"},{"name":"中江县"},{"name":"其他"}]},{"name":"绵阳市","area":[{"name":"涪城区"},{"name":"游仙区"},{"name":"江油市"},{"name":"盐亭县"},{"name":"三台县"},{"name":"平武县"},{"name":"安县"},{"name":"梓潼县"},{"name":"北川羌族自治县"},{"name":"其他"}]},{"name":"广元市","area":[{"name":"元坝区"},{"name":"朝天区"},{"name":"青川县"},{"name":"旺苍县"},{"name":"剑阁县"},{"name":"苍溪县"},{"name":"市中区"},{"name":"其他"}]},{"name":"遂宁市","area":[{"name":"船山区"},{"name":"安居区"},{"name":"射洪县"},{"name":"蓬溪县"},{"name":"大英县"},{"name":"其他"}]},{"name":"内江市","area":[{"name":"市中区"},{"name":"东兴区"},{"name":"资中县"},{"name":"隆昌县"},{"name":"威远县"},{"name":"其他"}]},{"name":"乐山市","area":[{"name":"市中区"},{"name":"五通桥区"},{"name":"沙湾区"},{"name":"金口河区"},{"name":"峨眉山市"},{"name":"夹江县"},{"name":"井研县"},{"name":"犍为县"},{"name":"沐川县"},{"name":"马边彝族自治县"},{"name":"峨边彝族自治县"},{"name":"其他"}]},{"name":"南充","area":[{"name":"顺庆区"},{"name":"高坪区"},{"name":"嘉陵区"},{"name":"阆中市"},{"name":"营山县"},{"name":"蓬安县"},{"name":"仪陇县"},{"name":"南部县"},{"name":"西充县"},{"name":"其他"}]},{"name":"眉山市","area":[{"name":"东坡区"},{"name":"仁寿县"},{"name":"彭山县"},{"name":"洪雅县"},{"name":"丹棱县"},{"name":"青神县"},{"name":"其他"}]},{"name":"宜宾市","area":[{"name":"翠屏区"},{"name":"宜宾县"},{"name":"兴文县"},{"name":"南溪县"},{"name":"珙县"},{"name":"长宁县"},{"name":"高县"},{"name":"江安县"},{"name":"筠连县"},{"name":"屏山县"},{"name":"其他"}]},{"name":"广安市","area":[{"name":"广安区"},{"name":"华蓥市"},{"name":"岳池县"},{"name":"邻水县"},{"name":"武胜县"},{"name":"其他"}]},{"name":"达州市","area":[{"name":"通川区"},{"name":"万源市"},{"name":"达县"},{"name":"渠县"},{"name":"宣汉县"},{"name":"开江县"},{"name":"大竹县"},{"name":"其他"}]},{"name":"雅安市","area":[{"name":"雨城区"},{"name":"芦山县"},{"name":"石棉县"},{"name":"名山县"},{"name":"天全县"},{"name":"荥经县"},{"name":"宝兴县"},{"name":"汉源县"},{"name":"其他"}]},{"name":"巴中市","area":[{"name":"巴州区"},{"name":"南江县"},{"name":"平昌县"},{"name":"通江县"},{"name":"其他"}]},{"name":"资阳市","area":[{"name":"雁江区"},{"name":"简阳市"},{"name":"安岳县"},{"name":"乐至县"},{"name":"其他"}]},{"name":"阿坝藏族羌族自治州","area":[{"name":"马尔康县"},{"name":"九寨沟县"},{"name":"红原县"},{"name":"汶川县"},{"name":"阿坝县"},{"name":"理县"},{"name":"若尔盖县"},{"name":"小金县"},{"name":"黑水县"},{"name":"金川县"},{"name":"松潘县"},{"name":"壤塘县"},{"name":"茂县"},{"name":"其他"}]},{"name":"甘孜藏族自治州","area":[{"name":"康定县"},{"name":"丹巴县"},{"name":"炉霍县"},{"name":"九龙县"},{"name":"甘孜县"},{"name":"雅江县"},{"name":"新龙县"},{"name":"道孚县"},{"name":"白玉县"},{"name":"理塘县"},{"name":"德格县"},{"name":"乡城县"},{"name":"石渠县"},{"name":"稻城县"},{"name":"色达县"},{"name":"巴塘县"},{"name":"泸定县"},{"name":"得荣县"},{"name":"其他"}]},{"name":"凉山彝族自治州","area":[{"name":"西昌市"},{"name":"美姑县"},{"name":"昭觉县"},{"name":"金阳县"},{"name":"甘洛县"},{"name":"布拖县"},{"name":"雷波县"},{"name":"普格县"},{"name":"宁南县"},{"name":"喜德县"},{"name":"会东县"},{"name":"越西县"},{"name":"会理县"},{"name":"盐源县"},{"name":"德昌县"},{"name":"冕宁县"},{"name":"木里藏族自治县"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"贵州省","city":[{"name":"贵阳市","area":[{"name":"南明区"},{"name":"云岩区"},{"name":"花溪区"},{"name":"乌当区"},{"name":"白云区"},{"name":"小河区"},{"name":"清镇市"},{"name":"开阳县"},{"name":"修文县"},{"name":"息烽县"},{"name":"其他"}]},{"name":"六盘水市","area":[{"name":"钟山区"},{"name":"水城县"},{"name":"盘县"},{"name":"六枝特区"},{"name":"其他"}]},{"name":"遵义市","area":[{"name":"红花岗区"},{"name":"汇川区"},{"name":"赤水市"},{"name":"仁怀市"},{"name":"遵义县"},{"name":"绥阳县"},{"name":"桐梓县"},{"name":"习水县"},{"name":"凤冈县"},{"name":"正安县"},{"name":"余庆县"},{"name":"湄潭县"},{"name":"道真仡佬族苗族自治县"},{"name":"务川仡佬族苗族自治县"},{"name":"其他"}]},{"name":"安顺市","area":[{"name":"西秀区"},{"name":"普定县"},{"name":"平坝县"},{"name":"镇宁布依族苗族自治县"},{"name":"紫云苗族布依族自治县"},{"name":"关岭布依族苗族自治县"},{"name":"其他"}]},{"name":"铜仁地区","area":[{"name":"铜仁市"},{"name":"德江县"},{"name":"江口县"},{"name":"思南县"},{"name":"石阡县"},{"name":"玉屏侗族自治县"},{"name":"松桃苗族自治县"},{"name":"印江土家族苗族自治县"},{"name":"沿河土家族自治县"},{"name":"万山特区"},{"name":"其他"}]},{"name":"毕节地区","area":[{"name":"毕节市"},{"name":"黔西县"},{"name":"大方县"},{"name":"织金县"},{"name":"金沙县"},{"name":"赫章县"},{"name":"纳雍县"},{"name":"威宁彝族回族苗族自治县"},{"name":"其他"}]},{"name":"黔西南布依族苗族自治州","area":[{"name":"兴义市"},{"name":"望谟县"},{"name":"兴仁县"},{"name":"普安县"},{"name":"册亨县"},{"name":"晴隆县"},{"name":"贞丰县"},{"name":"安龙县"},{"name":"其他"}]},{"name":"黔东南苗族侗族自治州","area":[{"name":"凯里市"},{"name":"施秉县"},{"name":"从江县"},{"name":"锦屏县"},{"name":"镇远县"},{"name":"麻江县"},{"name":"台江县"},{"name":"天柱县"},{"name":"黄平县"},{"name":"榕江县"},{"name":"剑河县"},{"name":"三穗县"},{"name":"雷山县"},{"name":"黎平县"},{"name":"岑巩县"},{"name":"丹寨县"},{"name":"其他"}]},{"name":"黔南布依族苗族自治州","area":[{"name":"都匀市"},{"name":"福泉市"},{"name":"贵定县"},{"name":"惠水县"},{"name":"罗甸县"},{"name":"瓮安县"},{"name":"荔波县"},{"name":"龙里县"},{"name":"平塘县"},{"name":"长顺县"},{"name":"独山县"},{"name":"三都水族自治县"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"云南省","city":[{"name":"昆明市","area":[{"name":"盘龙区"},{"name":"五华区"},{"name":"官渡区"},{"name":"西山区"},{"name":"东川区"},{"name":"安宁市"},{"name":"呈贡县"},{"name":"晋宁县"},{"name":"富民县"},{"name":"宜良县"},{"name":"嵩明县"},{"name":"石林彝族自治县"},{"name":"禄劝彝族苗族自治县"},{"name":"寻甸回族彝族自治县"},{"name":"其他"}]},{"name":"曲靖市","area":[{"name":"麒麟区"},{"name":"宣威市"},{"name":"马龙县"},{"name":"沾益县"},{"name":"富源县"},{"name":"罗平县"},{"name":"师宗县"},{"name":"陆良县"},{"name":"会泽县"},{"name":"其他"}]},{"name":"玉溪市","area":[{"name":"红塔区"},{"name":"江川县"},{"name":"澄江县"},{"name":"通海县"},{"name":"华宁县"},{"name":"易门县"},{"name":"峨山彝族自治县"},{"name":"新平彝族傣族自治县"},{"name":"元江哈尼族彝族傣族自治县"},{"name":"其他"}]},{"name":"保山市","area":[{"name":"隆阳区"},{"name":"施甸县"},{"name":"腾冲县"},{"name":"龙陵县"},{"name":"昌宁县"},{"name":"其他"}]},{"name":"昭通市","area":[{"name":"昭阳区"},{"name":"鲁甸县"},{"name":"巧家县"},{"name":"盐津县"},{"name":"大关县"},{"name":"永善县"},{"name":"绥江县"},{"name":"镇雄县"},{"name":"彝良县"},{"name":"威信县"},{"name":"水富县"},{"name":"其他"}]},{"name":"丽江市","area":[{"name":"古城区"},{"name":"永胜县"},{"name":"华坪县"},{"name":"玉龙纳西族自治县"},{"name":"宁蒗彝族自治县"},{"name":"其他"}]},{"name":"普洱市","area":[{"name":"思茅区"},{"name":"普洱哈尼族彝族自治县"},{"name":"墨江哈尼族自治县"},{"name":"景东彝族自治县"},{"name":"景谷傣族彝族自治县"},{"name":"镇沅彝族哈尼族拉祜族自治县"},{"name":"江城哈尼族彝族自治县"},{"name":"孟连傣族拉祜族佤族自治县"},{"name":"澜沧拉祜族自治县"},{"name":"西盟佤族自治县"},{"name":"其他"}]},{"name":"临沧市","area":[{"name":"临翔区"},{"name":"凤庆县"},{"name":"云县"},{"name":"永德县"},{"name":"镇康县"},{"name":"双江拉祜族佤族布朗族傣族自治县"},{"name":"耿马傣族佤族自治县"},{"name":"沧源佤族自治县"},{"name":"其他"}]},{"name":"德宏傣族景颇族自治州","area":[{"name":"潞西市"},{"name":"瑞丽市"},{"name":"梁河县"},{"name":"盈江县"},{"name":"陇川县"},{"name":"其他"}]},{"name":"怒江傈僳族自治州","area":[{"name":"泸水县"},{"name":"福贡县"},{"name":"贡山独龙族怒族自治县"},{"name":"兰坪白族普米族自治县"},{"name":"其他"}]},{"name":"迪庆藏族自治州","area":[{"name":"香格里拉县"},{"name":"德钦县"},{"name":"维西傈僳族自治县"},{"name":"其他"}]},{"name":"大理白族自治州","area":[{"name":"大理市"},{"name":"祥云县"},{"name":"宾川县"},{"name":"弥渡县"},{"name":"永平县"},{"name":"云龙县"},{"name":"洱源县"},{"name":"剑川县"},{"name":"鹤庆县"},{"name":"漾濞彝族自治县"},{"name":"南涧彝族自治县"},{"name":"巍山彝族回族自治县"},{"name":"其他"}]},{"name":"楚雄彝族自治州","area":[{"name":"楚雄市"},{"name":"双柏县"},{"name":"牟定县"},{"name":"南华县"},{"name":"姚安县"},{"name":"大姚县"},{"name":"永仁县"},{"name":"元谋县"},{"name":"武定县"},{"name":"禄丰县"},{"name":"其他"}]},{"name":"红河哈尼族彝族自治州","area":[{"name":"蒙自县"},{"name":"个旧市"},{"name":"开远市"},{"name":"绿春县"},{"name":"建水县"},{"name":"石屏县"},{"name":"弥勒县"},{"name":"泸西县"},{"name":"元阳县"},{"name":"红河县"},{"name":"金平苗族瑶族傣族自治县"},{"name":"河口瑶族自治县"},{"name":"屏边苗族自治县"},{"name":"其他"}]},{"name":"文山壮族苗族自治州","area":[{"name":"文山县"},{"name":"砚山县"},{"name":"西畴县"},{"name":"麻栗坡县"},{"name":"马关县"},{"name":"丘北县"},{"name":"广南县"},{"name":"富宁县"},{"name":"其他"}]},{"name":"西双版纳傣族自治州","area":[{"name":"景洪市"},{"name":"勐海县"},{"name":"勐腊县"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"西藏","city":[{"name":"拉萨市","area":[{"name":"城关区"},{"name":"林周县"},{"name":"当雄县"},{"name":"尼木县"},{"name":"曲水县"},{"name":"堆龙德庆县"},{"name":"达孜县"},{"name":"墨竹工卡县"},{"name":"其他"}]},{"name":"那曲地区","area":[{"name":"那曲县"},{"name":"嘉黎县"},{"name":"比如县"},{"name":"聂荣县"},{"name":"安多县"},{"name":"申扎县"},{"name":"索县"},{"name":"班戈县"},{"name":"巴青县"},{"name":"尼玛县"},{"name":"其他"}]},{"name":"昌都地区","area":[{"name":"昌都县"},{"name":"江达县"},{"name":"贡觉县"},{"name":"类乌齐县"},{"name":"丁青县"},{"name":"察雅县"},{"name":"八宿县"},{"name":"左贡县"},{"name":"芒康县"},{"name":"洛隆县"},{"name":"边坝县"},{"name":"其他"}]},{"name":"林芝地区","area":[{"name":"林芝县"},{"name":"工布江达县"},{"name":"米林县"},{"name":"墨脱县"},{"name":"波密县"},{"name":"察隅县"},{"name":"朗县"},{"name":"其他"}]},{"name":"山南地区","area":[{"name":"乃东县"},{"name":"扎囊县"},{"name":"贡嘎县"},{"name":"桑日县"},{"name":"琼结县"},{"name":"曲松县"},{"name":"措美县"},{"name":"洛扎县"},{"name":"加查县"},{"name":"隆子县"},{"name":"错那县"},{"name":"浪卡子县"},{"name":"其他"}]},{"name":"日喀则地区","area":[{"name":"日喀则市"},{"name":"南木林县"},{"name":"江孜县"},{"name":"定日县"},{"name":"萨迦县"},{"name":"拉孜县"},{"name":"昂仁县"},{"name":"谢通门县"},{"name":"白朗县"},{"name":"仁布县"},{"name":"康马县"},{"name":"定结县"},{"name":"仲巴县"},{"name":"亚东县"},{"name":"吉隆县"},{"name":"聂拉木县"},{"name":"萨嘎县"},{"name":"岗巴县"},{"name":"其他"}]},{"name":"阿里地区","area":[{"name":"噶尔县"},{"name":"普兰县"},{"name":"札达县"},{"name":"日土县"},{"name":"革吉县"},{"name":"改则县"},{"name":"措勤县"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"陕西省","city":[{"name":"西安市","area":[{"name":"莲湖区"},{"name":"新城区"},{"name":"碑林区"},{"name":"雁塔区"},{"name":"灞桥区"},{"name":"未央区"},{"name":"阎良区"},{"name":"临潼区"},{"name":"长安区"},{"name":"高陵县"},{"name":"蓝田县"},{"name":"户县"},{"name":"周至县"},{"name":"其他"}]},{"name":"铜川市","area":[{"name":"耀州区"},{"name":"王益区"},{"name":"印台区"},{"name":"宜君县"},{"name":"其他"}]},{"name":"宝鸡市","area":[{"name":"渭滨区"},{"name":"金台区"},{"name":"陈仓区"},{"name":"岐山县"},{"name":"凤翔县"},{"name":"陇县"},{"name":"太白县"},{"name":"麟游县"},{"name":"扶风县"},{"name":"千阳县"},{"name":"眉县"},{"name":"凤县"},{"name":"其他"}]},{"name":"咸阳市","area":[{"name":"秦都区"},{"name":"渭城区"},{"name":"杨陵区"},{"name":"兴平市"},{"name":"礼泉县"},{"name":"泾阳县"},{"name":"永寿县"},{"name":"三原县"},{"name":"彬县"},{"name":"旬邑县"},{"name":"长武县"},{"name":"乾县"},{"name":"武功县"},{"name":"淳化县"},{"name":"其他"}]},{"name":"渭南市","area":[{"name":"临渭区"},{"name":"韩城市"},{"name":"华阴市"},{"name":"蒲城县"},{"name":"潼关县"},{"name":"白水县"},{"name":"澄城县"},{"name":"华县"},{"name":"合阳县"},{"name":"富平县"},{"name":"大荔县"},{"name":"其他"}]},{"name":"延安市","area":[{"name":"宝塔区"},{"name":"安塞县"},{"name":"洛川县"},{"name":"子长县"},{"name":"黄陵县"},{"name":"延川县"},{"name":"富县"},{"name":"延长县"},{"name":"甘泉县"},{"name":"宜川县"},{"name":"志丹县"},{"name":"黄龙县"},{"name":"吴起县"},{"name":"其他"}]},{"name":"汉中市","area":[{"name":"汉台区"},{"name":"留坝县"},{"name":"镇巴县"},{"name":"城固县"},{"name":"南郑县"},{"name":"洋县"},{"name":"宁强县"},{"name":"佛坪县"},{"name":"勉县"},{"name":"西乡县"},{"name":"略阳县"},{"name":"其他"}]},{"name":"榆林市","area":[{"name":"榆阳区"},{"name":"清涧县"},{"name":"绥德县"},{"name":"神木县"},{"name":"佳县"},{"name":"府谷县"},{"name":"子洲县"},{"name":"靖边县"},{"name":"横山县"},{"name":"米脂县"},{"name":"吴堡县"},{"name":"定边县"},{"name":"其他"}]},{"name":"安康市","area":[{"name":"汉滨区"},{"name":"紫阳县"},{"name":"岚皋县"},{"name":"旬阳县"},{"name":"镇坪县"},{"name":"平利县"},{"name":"石泉县"},{"name":"宁陕县"},{"name":"白河县"},{"name":"汉阴县"},{"name":"其他"}]},{"name":"商洛市","area":[{"name":"商州区"},{"name":"镇安县"},{"name":"山阳县"},{"name":"洛南县"},{"name":"商南县"},{"name":"丹凤县"},{"name":"柞水县"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"甘肃省","city":[{"name":"兰州市","area":[{"name":"城关区"},{"name":"七里河区"},{"name":"西固区"},{"name":"安宁区"},{"name":"红古区"},{"name":"永登县"},{"name":"皋兰县"},{"name":"榆中县"},{"name":"其他"}]},{"name":"嘉峪关市","area":[{"name":"嘉峪关市"},{"name":"其他"}]},{"name":"金昌市","area":[{"name":"金川区"},{"name":"永昌县"},{"name":"其他"}]},{"name":"白银市","area":[{"name":"白银区"},{"name":"平川区"},{"name":"靖远县"},{"name":"会宁县"},{"name":"景泰县"},{"name":"其他"}]},{"name":"天水市","area":[{"name":"清水县"},{"name":"秦安县"},{"name":"甘谷县"},{"name":"武山县"},{"name":"张家川回族自治县"},{"name":"北道区"},{"name":"秦城区"},{"name":"其他"}]},{"name":"武威市","area":[{"name":"凉州区"},{"name":"民勤县"},{"name":"古浪县"},{"name":"天祝藏族自治县"},{"name":"其他"}]},{"name":"酒泉市","area":[{"name":"肃州区"},{"name":"玉门市"},{"name":"敦煌市"},{"name":"金塔县"},{"name":"肃北蒙古族自治县"},{"name":"阿克塞哈萨克族自治县"},{"name":"安西县"},{"name":"其他"}]},{"name":"张掖市","area":[{"name":"甘州区"},{"name":"民乐县"},{"name":"临泽县"},{"name":"高台县"},{"name":"山丹县"},{"name":"肃南裕固族自治县"},{"name":"其他"}]},{"name":"庆阳市","area":[{"name":"西峰区"},{"name":"庆城县"},{"name":"环县"},{"name":"华池县"},{"name":"合水县"},{"name":"正宁县"},{"name":"宁县"},{"name":"镇原县"},{"name":"其他"}]},{"name":"平凉市","area":[{"name":"崆峒区"},{"name":"泾川县"},{"name":"灵台县"},{"name":"崇信县"},{"name":"华亭县"},{"name":"庄浪县"},{"name":"静宁县"},{"name":"其他"}]},{"name":"定西市","area":[{"name":"安定区"},{"name":"通渭县"},{"name":"临洮县"},{"name":"漳县"},{"name":"岷县"},{"name":"渭源县"},{"name":"陇西县"},{"name":"其他"}]},{"name":"陇南市","area":[{"name":"武都区"},{"name":"成县"},{"name":"宕昌县"},{"name":"康县"},{"name":"文县"},{"name":"西和县"},{"name":"礼县"},{"name":"两当县"},{"name":"徽县"},{"name":"其他"}]},{"name":"临夏回族自治州","area":[{"name":"临夏市"},{"name":"临夏县"},{"name":"康乐县"},{"name":"永靖县"},{"name":"广河县"},{"name":"和政县"},{"name":"东乡族自治县"},{"name":"积石山保安族东乡族撒拉族自治县"},{"name":"其他"}]},{"name":"甘南藏族自治州","area":[{"name":"合作市"},{"name":"临潭县"},{"name":"卓尼县"},{"name":"舟曲县"},{"name":"迭部县"},{"name":"玛曲县"},{"name":"碌曲县"},{"name":"夏河县"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"青海省","city":[{"name":"西宁市","area":[{"name":"城中区"},{"name":"城东区"},{"name":"城西区"},{"name":"城北区"},{"name":"湟源县"},{"name":"湟中县"},{"name":"大通回族土族自治县"},{"name":"其他"}]},{"name":"海东地区","area":[{"name":"平安县"},{"name":"乐都县"},{"name":"民和回族土族自治县"},{"name":"互助土族自治县"},{"name":"化隆回族自治县"},{"name":"循化撒拉族自治县"},{"name":"其他"}]},{"name":"海北藏族自治州","area":[{"name":"海晏县"},{"name":"祁连县"},{"name":"刚察县"},{"name":"门源回族自治县"},{"name":"其他"}]},{"name":"海南藏族自治州","area":[{"name":"共和县"},{"name":"同德县"},{"name":"贵德县"},{"name":"兴海县"},{"name":"贵南县"},{"name":"其他"}]},{"name":"黄南藏族自治州","area":[{"name":"同仁县"},{"name":"尖扎县"},{"name":"泽库县"},{"name":"河南蒙古族自治县"},{"name":"其他"}]},{"name":"果洛藏族自治州","area":[{"name":"玛沁县"},{"name":"班玛县"},{"name":"甘德县"},{"name":"达日县"},{"name":"久治县"},{"name":"玛多县"},{"name":"其他"}]},{"name":"玉树藏族自治州","area":[{"name":"玉树县"},{"name":"杂多县"},{"name":"称多县"},{"name":"治多县"},{"name":"囊谦县"},{"name":"曲麻莱县"},{"name":"其他"}]},{"name":"海西蒙古族藏族自治州","area":[{"name":"德令哈市"},{"name":"格尔木市"},{"name":"乌兰县"},{"name":"都兰县"},{"name":"天峻县"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"宁夏","city":[{"name":"银川市","area":[{"name":"兴庆区"},{"name":"西夏区"},{"name":"金凤区"},{"name":"灵武市"},{"name":"永宁县"},{"name":"贺兰县"},{"name":"其他"}]},{"name":"石嘴山市","area":[{"name":"大武口区"},{"name":"惠农区"},{"name":"平罗县"},{"name":"其他"}]},{"name":"吴忠市","area":[{"name":"利通区"},{"name":"青铜峡市"},{"name":"盐池县"},{"name":"同心县"},{"name":"其他"}]},{"name":"固原市","area":[{"name":"原州区"},{"name":"西吉县"},{"name":"隆德县"},{"name":"泾源县"},{"name":"彭阳县"},{"name":"其他"}]},{"name":"中卫市","area":[{"name":"沙坡头区"},{"name":"中宁县"},{"name":"海原县"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"新疆","city":[{"name":"乌鲁木齐市","area":[{"name":"天山区"},{"name":"沙依巴克区"},{"name":"新市区"},{"name":"水磨沟区"},{"name":"头屯河区"},{"name":"达坂城区"},{"name":"东山区"},{"name":"乌鲁木齐县"},{"name":"其他"}]},{"name":"克拉玛依市","area":[{"name":"克拉玛依区"},{"name":"独山子区"},{"name":"白碱滩区"},{"name":"乌尔禾区"},{"name":"其他"}]},{"name":"吐鲁番地区","area":[{"name":"吐鲁番市"},{"name":"托克逊县"},{"name":"鄯善县"},{"name":"其他"}]},{"name":"哈密地区","area":[{"name":"哈密市"},{"name":"伊吾县"},{"name":"巴里坤哈萨克自治县"},{"name":"其他"}]},{"name":"和田地区","area":[{"name":"和田市"},{"name":"和田县"},{"name":"洛浦县"},{"name":"民丰县"},{"name":"皮山县"},{"name":"策勒县"},{"name":"于田县"},{"name":"墨玉县"},{"name":"其他"}]},{"name":"阿克苏地区","area":[{"name":"阿克苏市"},{"name":"温宿县"},{"name":"沙雅县"},{"name":"拜城县"},{"name":"阿瓦提县"},{"name":"库车县"},{"name":"柯坪县"},{"name":"新和县"},{"name":"乌什县"},{"name":"其他"}]},{"name":"喀什地区","area":[{"name":"喀什市"},{"name":"巴楚县"},{"name":"泽普县"},{"name":"伽师县"},{"name":"叶城县"},{"name":"岳普湖县"},{"name":"疏勒县"},{"name":"麦盖提县"},{"name":"英吉沙县"},{"name":"莎车县"},{"name":"疏附县"},{"name":"塔什库尔干塔吉克自治县"},{"name":"其他"}]},{"name":"克孜勒苏柯尔克孜自治州","area":[{"name":"阿图什市"},{"name":"阿合奇县"},{"name":"乌恰县"},{"name":"阿克陶县"},{"name":"其他"}]},{"name":"巴音郭楞蒙古自治州","area":[{"name":"库尔勒市"},{"name":"和静县"},{"name":"尉犁县"},{"name":"和硕县"},{"name":"且末县"},{"name":"博湖县"},{"name":"轮台县"},{"name":"若羌县"},{"name":"焉耆回族自治县"},{"name":"其他"}]},{"name":"昌吉回族自治州","area":[{"name":"昌吉市"},{"name":"阜康市"},{"name":"奇台县"},{"name":"玛纳斯县"},{"name":"吉木萨尔县"},{"name":"呼图壁县"},{"name":"木垒哈萨克自治县"},{"name":"米泉市"},{"name":"其他"}]},{"name":"博尔塔拉蒙古自治州","area":[{"name":"博乐市"},{"name":"精河县"},{"name":"温泉县"},{"name":"其他"}]},{"name":"石河子","area":[{"name":"石河子"}]},{"name":"阿拉尔","area":[{"name":"阿拉尔"}]},{"name":"图木舒克","area":[{"name":"图木舒克"}]},{"name":"五家渠","area":[{"name":"五家渠"}]},{"name":"伊犁哈萨克自治州","area":[{"name":"伊宁市"},{"name":"奎屯市"},{"name":"伊宁县"},{"name":"特克斯县"},{"name":"尼勒克县"},{"name":"昭苏县"},{"name":"新源县"},{"name":"霍城县"},{"name":"巩留县"},{"name":"察布查尔锡伯自治县"},{"name":"塔城地区"},{"name":"阿勒泰地区"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"台湾省","city":[{"name":"台北市","area":[{"name":"内湖区"},{"name":"南港区"},{"name":"中正区"},{"name":"万华区"},{"name":"大同区"},{"name":"中山区"},{"name":"松山区"},{"name":"大安区"},{"name":"信义区"},{"name":"文山区"},{"name":"士林区"},{"name":"北投区"}]},{"name":"新北市","area":[{"name":"板桥区"},{"name":"汐止区"},{"name":"新店区"},{"name":"其他"}]},{"name":"桃园市","area":[{"name":"其他"}]},{"name":"台中市","area":[{"name":"其他"}]},{"name":"台南市","area":[{"name":"其他"}]},{"name":"高雄市","area":[{"name":"其他"}]}]},{"name":"澳门","city":[{"name":"花地玛堂区"},{"name":"圣安多尼堂区"},{"name":"大堂区"},{"name":"望德堂区"},{"name":"风顺堂区"},{"name":"嘉模堂区"},{"name":"圣方济各堂区"},{"name":"路凼"},{"name":"其他"}]},{"name":"香港","city":[{"name":"深水埗区"},{"name":"油尖旺区"},{"name":"九龙城区"},{"name":"黄大仙区"},{"name":"观塘区"},{"name":"北区"},{"name":"大埔区"},{"name":"沙田区"},{"name":"西贡区"},{"name":"元朗区"},{"name":"屯门区"},{"name":"荃湾区"},{"name":"葵青区"},{"name":"离岛区"},{"name":"中西区"},{"name":"湾仔区"},{"name":"东区"},{"name":"南区"},{"name":"其他"}]}];

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!*****************************************!*\
  !*** D:/UniAppProject/fd/fd/pages.json ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 48:
/*!******************************************************!*\
  !*** D:/UniAppProject/fd/fd/components/city.area.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var areaData = [{
  "code": "110000",
  "name": "北京市",
  "cityList": [{
    "code": "110000",
    "name": "北京市",
    "areaList": [{
      "code": "110101",
      "name": "东城区" },

    {
      "code": "110102",
      "name": "西城区" },

    {
      "code": "110105",
      "name": "朝阳区" },

    {
      "code": "110106",
      "name": "丰台区" },

    {
      "code": "110107",
      "name": "石景山区" },

    {
      "code": "110108",
      "name": "海淀区" },

    {
      "code": "110109",
      "name": "门头沟区" },

    {
      "code": "110111",
      "name": "房山区" },

    {
      "code": "110112",
      "name": "通州区" },

    {
      "code": "110113",
      "name": "顺义区" },

    {
      "code": "110114",
      "name": "昌平区" },

    {
      "code": "110115",
      "name": "大兴区" },

    {
      "code": "110116",
      "name": "怀柔区" },

    {
      "code": "110117",
      "name": "平谷区" },

    {
      "code": "110118",
      "name": "密云区" },

    {
      "code": "110119",
      "name": "延庆区" }] }] },




{
  "code": "120000",
  "name": "天津市",
  "cityList": [{
    "code": "120000",
    "name": "天津市",
    "areaList": [{
      "code": "120101",
      "name": "和平区" },

    {
      "code": "120102",
      "name": "河东区" },

    {
      "code": "120103",
      "name": "河西区" },

    {
      "code": "120104",
      "name": "南开区" },

    {
      "code": "120105",
      "name": "河北区" },

    {
      "code": "120106",
      "name": "红桥区" },

    {
      "code": "120110",
      "name": "东丽区" },

    {
      "code": "120111",
      "name": "西青区" },

    {
      "code": "120112",
      "name": "津南区" },

    {
      "code": "120113",
      "name": "北辰区" },

    {
      "code": "120114",
      "name": "武清区" },

    {
      "code": "120115",
      "name": "宝坻区" },

    {
      "code": "120116",
      "name": "滨海新区" },

    {
      "code": "120117",
      "name": "宁河区" },

    {
      "code": "120118",
      "name": "静海区" },

    {
      "code": "120119",
      "name": "蓟州区" }] }] },




{
  "code": "130000",
  "name": "河北省",
  "cityList": [{
    "code": "130100",
    "name": "石家庄市",
    "areaList": [{
      "code": "130102",
      "name": "长安区" },

    {
      "code": "130104",
      "name": "桥西区" },

    {
      "code": "130105",
      "name": "新华区" },

    {
      "code": "130107",
      "name": "井陉矿区" },

    {
      "code": "130108",
      "name": "裕华区" },

    {
      "code": "130109",
      "name": "藁城区" },

    {
      "code": "130110",
      "name": "鹿泉区" },

    {
      "code": "130111",
      "name": "栾城区" },

    {
      "code": "130121",
      "name": "井陉县" },

    {
      "code": "130123",
      "name": "正定县" },

    {
      "code": "130125",
      "name": "行唐县" },

    {
      "code": "130126",
      "name": "灵寿县" },

    {
      "code": "130127",
      "name": "高邑县" },

    {
      "code": "130128",
      "name": "深泽县" },

    {
      "code": "130129",
      "name": "赞皇县" },

    {
      "code": "130130",
      "name": "无极县" },

    {
      "code": "130131",
      "name": "平山县" },

    {
      "code": "130132",
      "name": "元氏县" },

    {
      "code": "130133",
      "name": "赵县" },

    {
      "code": "130181",
      "name": "辛集市" },

    {
      "code": "130183",
      "name": "晋州市" },

    {
      "code": "130184",
      "name": "新乐市" }] },



  {
    "code": "130200",
    "name": "唐山市",
    "areaList": [{
      "code": "130202",
      "name": "路南区" },

    {
      "code": "130203",
      "name": "路北区" },

    {
      "code": "130204",
      "name": "古冶区" },

    {
      "code": "130205",
      "name": "开平区" },

    {
      "code": "130207",
      "name": "丰南区" },

    {
      "code": "130208",
      "name": "丰润区" },

    {
      "code": "130209",
      "name": "曹妃甸区" },

    {
      "code": "130224",
      "name": "滦南县" },

    {
      "code": "130225",
      "name": "乐亭县" },

    {
      "code": "130227",
      "name": "迁西县" },

    {
      "code": "130229",
      "name": "玉田县" },

    {
      "code": "130281",
      "name": "遵化市" },

    {
      "code": "130283",
      "name": "迁安市" },

    {
      "code": "130284",
      "name": "滦州市" }] },



  {
    "code": "130300",
    "name": "秦皇岛市",
    "areaList": [{
      "code": "130302",
      "name": "海港区" },

    {
      "code": "130303",
      "name": "山海关区" },

    {
      "code": "130304",
      "name": "北戴河区" },

    {
      "code": "130306",
      "name": "抚宁区" },

    {
      "code": "130321",
      "name": "青龙满族自治县" },

    {
      "code": "130322",
      "name": "昌黎县" },

    {
      "code": "130324",
      "name": "卢龙县" }] },



  {
    "code": "130400",
    "name": "邯郸市",
    "areaList": [{
      "code": "130402",
      "name": "邯山区" },

    {
      "code": "130403",
      "name": "丛台区" },

    {
      "code": "130404",
      "name": "复兴区" },

    {
      "code": "130406",
      "name": "峰峰矿区" },

    {
      "code": "130407",
      "name": "肥乡区" },

    {
      "code": "130408",
      "name": "永年区" },

    {
      "code": "130423",
      "name": "临漳县" },

    {
      "code": "130424",
      "name": "成安县" },

    {
      "code": "130425",
      "name": "大名县" },

    {
      "code": "130426",
      "name": "涉县" },

    {
      "code": "130427",
      "name": "磁县" },

    {
      "code": "130430",
      "name": "邱县" },

    {
      "code": "130431",
      "name": "鸡泽县" },

    {
      "code": "130432",
      "name": "广平县" },

    {
      "code": "130433",
      "name": "馆陶县" },

    {
      "code": "130434",
      "name": "魏县" },

    {
      "code": "130435",
      "name": "曲周县" },

    {
      "code": "130481",
      "name": "武安市" }] },



  {
    "code": "130500",
    "name": "邢台市",
    "areaList": [{
      "code": "130502",
      "name": "桥东区" },

    {
      "code": "130503",
      "name": "桥西区" },

    {
      "code": "130521",
      "name": "邢台县" },

    {
      "code": "130522",
      "name": "临城县" },

    {
      "code": "130523",
      "name": "内丘县" },

    {
      "code": "130524",
      "name": "柏乡县" },

    {
      "code": "130525",
      "name": "隆尧县" },

    {
      "code": "130526",
      "name": "任县" },

    {
      "code": "130527",
      "name": "南和县" },

    {
      "code": "130528",
      "name": "宁晋县" },

    {
      "code": "130529",
      "name": "巨鹿县" },

    {
      "code": "130530",
      "name": "新河县" },

    {
      "code": "130531",
      "name": "广宗县" },

    {
      "code": "130532",
      "name": "平乡县" },

    {
      "code": "130533",
      "name": "威县" },

    {
      "code": "130534",
      "name": "清河县" },

    {
      "code": "130535",
      "name": "临西县" },

    {
      "code": "130581",
      "name": "南宫市" },

    {
      "code": "130582",
      "name": "沙河市" }] },



  {
    "code": "130600",
    "name": "保定市",
    "areaList": [{
      "code": "130602",
      "name": "竞秀区" },

    {
      "code": "130606",
      "name": "莲池区" },

    {
      "code": "130607",
      "name": "满城区" },

    {
      "code": "130608",
      "name": "清苑区" },

    {
      "code": "130609",
      "name": "徐水区" },

    {
      "code": "130623",
      "name": "涞水县" },

    {
      "code": "130624",
      "name": "阜平县" },

    {
      "code": "130626",
      "name": "定兴县" },

    {
      "code": "130627",
      "name": "唐县" },

    {
      "code": "130628",
      "name": "高阳县" },

    {
      "code": "130629",
      "name": "容城县" },

    {
      "code": "130630",
      "name": "涞源县" },

    {
      "code": "130631",
      "name": "望都县" },

    {
      "code": "130632",
      "name": "安新县" },

    {
      "code": "130633",
      "name": "易县" },

    {
      "code": "130634",
      "name": "曲阳县" },

    {
      "code": "130635",
      "name": "蠡县" },

    {
      "code": "130636",
      "name": "顺平县" },

    {
      "code": "130637",
      "name": "博野县" },

    {
      "code": "130638",
      "name": "雄县" },

    {
      "code": "130681",
      "name": "涿州市" },

    {
      "code": "130682",
      "name": "定州市" },

    {
      "code": "130683",
      "name": "安国市" },

    {
      "code": "130684",
      "name": "高碑店市" }] },



  {
    "code": "130700",
    "name": "张家口市",
    "areaList": [{
      "code": "130702",
      "name": "桥东区" },

    {
      "code": "130703",
      "name": "桥西区" },

    {
      "code": "130705",
      "name": "宣化区" },

    {
      "code": "130706",
      "name": "下花园区" },

    {
      "code": "130708",
      "name": "万全区" },

    {
      "code": "130709",
      "name": "崇礼区" },

    {
      "code": "130722",
      "name": "张北县" },

    {
      "code": "130723",
      "name": "康保县" },

    {
      "code": "130724",
      "name": "沽源县" },

    {
      "code": "130725",
      "name": "尚义县" },

    {
      "code": "130726",
      "name": "蔚县" },

    {
      "code": "130727",
      "name": "阳原县" },

    {
      "code": "130728",
      "name": "怀安县" },

    {
      "code": "130730",
      "name": "怀来县" },

    {
      "code": "130731",
      "name": "涿鹿县" },

    {
      "code": "130732",
      "name": "赤城县" }] },



  {
    "code": "130800",
    "name": "承德市",
    "areaList": [{
      "code": "130802",
      "name": "双桥区" },

    {
      "code": "130803",
      "name": "双滦区" },

    {
      "code": "130804",
      "name": "鹰手营子矿区" },

    {
      "code": "130821",
      "name": "承德县" },

    {
      "code": "130822",
      "name": "兴隆县" },

    {
      "code": "130824",
      "name": "滦平县" },

    {
      "code": "130825",
      "name": "隆化县" },

    {
      "code": "130826",
      "name": "丰宁满族自治县" },

    {
      "code": "130827",
      "name": "宽城满族自治县" },

    {
      "code": "130828",
      "name": "围场满族蒙古族自治县" },

    {
      "code": "130881",
      "name": "平泉市" }] },



  {
    "code": "130900",
    "name": "沧州市",
    "areaList": [{
      "code": "130902",
      "name": "新华区" },

    {
      "code": "130903",
      "name": "运河区" },

    {
      "code": "130921",
      "name": "沧县" },

    {
      "code": "130922",
      "name": "青县" },

    {
      "code": "130923",
      "name": "东光县" },

    {
      "code": "130924",
      "name": "海兴县" },

    {
      "code": "130925",
      "name": "盐山县" },

    {
      "code": "130926",
      "name": "肃宁县" },

    {
      "code": "130927",
      "name": "南皮县" },

    {
      "code": "130928",
      "name": "吴桥县" },

    {
      "code": "130929",
      "name": "献县" },

    {
      "code": "130930",
      "name": "孟村回族自治县" },

    {
      "code": "130981",
      "name": "泊头市" },

    {
      "code": "130982",
      "name": "任丘市" },

    {
      "code": "130983",
      "name": "黄骅市" },

    {
      "code": "130984",
      "name": "河间市" }] },



  {
    "code": "131000",
    "name": "廊坊市",
    "areaList": [{
      "code": "131002",
      "name": "安次区" },

    {
      "code": "131003",
      "name": "广阳区" },

    {
      "code": "131022",
      "name": "固安县" },

    {
      "code": "131023",
      "name": "永清县" },

    {
      "code": "131024",
      "name": "香河县" },

    {
      "code": "131025",
      "name": "大城县" },

    {
      "code": "131026",
      "name": "文安县" },

    {
      "code": "131028",
      "name": "大厂回族自治县" },

    {
      "code": "131081",
      "name": "霸州市" },

    {
      "code": "131082",
      "name": "三河市" }] },



  {
    "code": "131100",
    "name": "衡水市",
    "areaList": [{
      "code": "131102",
      "name": "桃城区" },

    {
      "code": "131103",
      "name": "冀州区" },

    {
      "code": "131121",
      "name": "枣强县" },

    {
      "code": "131122",
      "name": "武邑县" },

    {
      "code": "131123",
      "name": "武强县" },

    {
      "code": "131124",
      "name": "饶阳县" },

    {
      "code": "131125",
      "name": "安平县" },

    {
      "code": "131126",
      "name": "故城县" },

    {
      "code": "131127",
      "name": "景县" },

    {
      "code": "131128",
      "name": "阜城县" },

    {
      "code": "131182",
      "name": "深州市" }] }] },





{
  "code": "140000",
  "name": "山西省",
  "cityList": [{
    "code": "140100",
    "name": "太原市",
    "areaList": [{
      "code": "140105",
      "name": "小店区" },

    {
      "code": "140106",
      "name": "迎泽区" },

    {
      "code": "140107",
      "name": "杏花岭区" },

    {
      "code": "140108",
      "name": "尖草坪区" },

    {
      "code": "140109",
      "name": "万柏林区" },

    {
      "code": "140110",
      "name": "晋源区" },

    {
      "code": "140121",
      "name": "清徐县" },

    {
      "code": "140122",
      "name": "阳曲县" },

    {
      "code": "140123",
      "name": "娄烦县" },

    {
      "code": "140181",
      "name": "古交市" }] },



  {
    "code": "140200",
    "name": "大同市",
    "areaList": [{
      "code": "140212",
      "name": "新荣区" },

    {
      "code": "140213",
      "name": "平城区" },

    {
      "code": "140214",
      "name": "云冈区" },

    {
      "code": "140215",
      "name": "云州区" },

    {
      "code": "140221",
      "name": "阳高县" },

    {
      "code": "140222",
      "name": "天镇县" },

    {
      "code": "140223",
      "name": "广灵县" },

    {
      "code": "140224",
      "name": "灵丘县" },

    {
      "code": "140225",
      "name": "浑源县" },

    {
      "code": "140226",
      "name": "左云县" }] },



  {
    "code": "140300",
    "name": "阳泉市",
    "areaList": [{
      "code": "140302",
      "name": "城区" },

    {
      "code": "140303",
      "name": "矿区" },

    {
      "code": "140311",
      "name": "郊区" },

    {
      "code": "140321",
      "name": "平定县" },

    {
      "code": "140322",
      "name": "盂县" }] },



  {
    "code": "140400",
    "name": "长治市",
    "areaList": [{
      "code": "140403",
      "name": "潞州区" },

    {
      "code": "140404",
      "name": "上党区" },

    {
      "code": "140405",
      "name": "屯留区" },

    {
      "code": "140406",
      "name": "潞城区" },

    {
      "code": "140423",
      "name": "襄垣县" },

    {
      "code": "140425",
      "name": "平顺县" },

    {
      "code": "140426",
      "name": "黎城县" },

    {
      "code": "140427",
      "name": "壶关县" },

    {
      "code": "140428",
      "name": "长子县" },

    {
      "code": "140429",
      "name": "武乡县" },

    {
      "code": "140430",
      "name": "沁县" },

    {
      "code": "140431",
      "name": "沁源县" }] },



  {
    "code": "140500",
    "name": "晋城市",
    "areaList": [{
      "code": "140502",
      "name": "城区" },

    {
      "code": "140521",
      "name": "沁水县" },

    {
      "code": "140522",
      "name": "阳城县" },

    {
      "code": "140524",
      "name": "陵川县" },

    {
      "code": "140525",
      "name": "泽州县" },

    {
      "code": "140581",
      "name": "高平市" }] },



  {
    "code": "140600",
    "name": "朔州市",
    "areaList": [{
      "code": "140602",
      "name": "朔城区" },

    {
      "code": "140603",
      "name": "平鲁区" },

    {
      "code": "140621",
      "name": "山阴县" },

    {
      "code": "140622",
      "name": "应县" },

    {
      "code": "140623",
      "name": "右玉县" },

    {
      "code": "140681",
      "name": "怀仁市" }] },



  {
    "code": "140700",
    "name": "晋中市",
    "areaList": [{
      "code": "140702",
      "name": "榆次区" },

    {
      "code": "140721",
      "name": "榆社县" },

    {
      "code": "140722",
      "name": "左权县" },

    {
      "code": "140723",
      "name": "和顺县" },

    {
      "code": "140724",
      "name": "昔阳县" },

    {
      "code": "140725",
      "name": "寿阳县" },

    {
      "code": "140726",
      "name": "太谷县" },

    {
      "code": "140727",
      "name": "祁县" },

    {
      "code": "140728",
      "name": "平遥县" },

    {
      "code": "140729",
      "name": "灵石县" },

    {
      "code": "140781",
      "name": "介休市" }] },



  {
    "code": "140800",
    "name": "运城市",
    "areaList": [{
      "code": "140802",
      "name": "盐湖区" },

    {
      "code": "140821",
      "name": "临猗县" },

    {
      "code": "140822",
      "name": "万荣县" },

    {
      "code": "140823",
      "name": "闻喜县" },

    {
      "code": "140824",
      "name": "稷山县" },

    {
      "code": "140825",
      "name": "新绛县" },

    {
      "code": "140826",
      "name": "绛县" },

    {
      "code": "140827",
      "name": "垣曲县" },

    {
      "code": "140828",
      "name": "夏县" },

    {
      "code": "140829",
      "name": "平陆县" },

    {
      "code": "140830",
      "name": "芮城县" },

    {
      "code": "140881",
      "name": "永济市" },

    {
      "code": "140882",
      "name": "河津市" }] },



  {
    "code": "140900",
    "name": "忻州市",
    "areaList": [{
      "code": "140902",
      "name": "忻府区" },

    {
      "code": "140921",
      "name": "定襄县" },

    {
      "code": "140922",
      "name": "五台县" },

    {
      "code": "140923",
      "name": "代县" },

    {
      "code": "140924",
      "name": "繁峙县" },

    {
      "code": "140925",
      "name": "宁武县" },

    {
      "code": "140926",
      "name": "静乐县" },

    {
      "code": "140927",
      "name": "神池县" },

    {
      "code": "140928",
      "name": "五寨县" },

    {
      "code": "140929",
      "name": "岢岚县" },

    {
      "code": "140930",
      "name": "河曲县" },

    {
      "code": "140931",
      "name": "保德县" },

    {
      "code": "140932",
      "name": "偏关县" },

    {
      "code": "140981",
      "name": "原平市" }] },



  {
    "code": "141000",
    "name": "临汾市",
    "areaList": [{
      "code": "141002",
      "name": "尧都区" },

    {
      "code": "141021",
      "name": "曲沃县" },

    {
      "code": "141022",
      "name": "翼城县" },

    {
      "code": "141023",
      "name": "襄汾县" },

    {
      "code": "141024",
      "name": "洪洞县" },

    {
      "code": "141025",
      "name": "古县" },

    {
      "code": "141026",
      "name": "安泽县" },

    {
      "code": "141027",
      "name": "浮山县" },

    {
      "code": "141028",
      "name": "吉县" },

    {
      "code": "141029",
      "name": "乡宁县" },

    {
      "code": "141030",
      "name": "大宁县" },

    {
      "code": "141031",
      "name": "隰县" },

    {
      "code": "141032",
      "name": "永和县" },

    {
      "code": "141033",
      "name": "蒲县" },

    {
      "code": "141034",
      "name": "汾西县" },

    {
      "code": "141081",
      "name": "侯马市" },

    {
      "code": "141082",
      "name": "霍州市" }] },



  {
    "code": "141100",
    "name": "吕梁市",
    "areaList": [{
      "code": "141102",
      "name": "离石区" },

    {
      "code": "141121",
      "name": "文水县" },

    {
      "code": "141122",
      "name": "交城县" },

    {
      "code": "141123",
      "name": "兴县" },

    {
      "code": "141124",
      "name": "临县" },

    {
      "code": "141125",
      "name": "柳林县" },

    {
      "code": "141126",
      "name": "石楼县" },

    {
      "code": "141127",
      "name": "岚县" },

    {
      "code": "141128",
      "name": "方山县" },

    {
      "code": "141129",
      "name": "中阳县" },

    {
      "code": "141130",
      "name": "交口县" },

    {
      "code": "141181",
      "name": "孝义市" },

    {
      "code": "141182",
      "name": "汾阳市" }] }] },





{
  "code": "150000",
  "name": "内蒙古自治区",
  "cityList": [{
    "code": "150100",
    "name": "呼和浩特市",
    "areaList": [{
      "code": "150102",
      "name": "新城区" },

    {
      "code": "150103",
      "name": "回民区" },

    {
      "code": "150104",
      "name": "玉泉区" },

    {
      "code": "150105",
      "name": "赛罕区" },

    {
      "code": "150121",
      "name": "土默特左旗" },

    {
      "code": "150122",
      "name": "托克托县" },

    {
      "code": "150123",
      "name": "和林格尔县" },

    {
      "code": "150124",
      "name": "清水河县" },

    {
      "code": "150125",
      "name": "武川县" }] },



  {
    "code": "150200",
    "name": "包头市",
    "areaList": [{
      "code": "150202",
      "name": "东河区" },

    {
      "code": "150203",
      "name": "昆都仑区" },

    {
      "code": "150204",
      "name": "青山区" },

    {
      "code": "150205",
      "name": "石拐区" },

    {
      "code": "150206",
      "name": "白云鄂博矿区" },

    {
      "code": "150207",
      "name": "九原区" },

    {
      "code": "150221",
      "name": "土默特右旗" },

    {
      "code": "150222",
      "name": "固阳县" },

    {
      "code": "150223",
      "name": "达尔罕茂明安联合旗" }] },



  {
    "code": "150300",
    "name": "乌海市",
    "areaList": [{
      "code": "150302",
      "name": "海勃湾区" },

    {
      "code": "150303",
      "name": "海南区" },

    {
      "code": "150304",
      "name": "乌达区" }] },



  {
    "code": "150400",
    "name": "赤峰市",
    "areaList": [{
      "code": "150402",
      "name": "红山区" },

    {
      "code": "150403",
      "name": "元宝山区" },

    {
      "code": "150404",
      "name": "松山区" },

    {
      "code": "150421",
      "name": "阿鲁科尔沁旗" },

    {
      "code": "150422",
      "name": "巴林左旗" },

    {
      "code": "150423",
      "name": "巴林右旗" },

    {
      "code": "150424",
      "name": "林西县" },

    {
      "code": "150425",
      "name": "克什克腾旗" },

    {
      "code": "150426",
      "name": "翁牛特旗" },

    {
      "code": "150428",
      "name": "喀喇沁旗" },

    {
      "code": "150429",
      "name": "宁城县" },

    {
      "code": "150430",
      "name": "敖汉旗" }] },



  {
    "code": "150500",
    "name": "通辽市",
    "areaList": [{
      "code": "150502",
      "name": "科尔沁区" },

    {
      "code": "150521",
      "name": "科尔沁左翼中旗" },

    {
      "code": "150522",
      "name": "科尔沁左翼后旗" },

    {
      "code": "150523",
      "name": "开鲁县" },

    {
      "code": "150524",
      "name": "库伦旗" },

    {
      "code": "150525",
      "name": "奈曼旗" },

    {
      "code": "150526",
      "name": "扎鲁特旗" },

    {
      "code": "150581",
      "name": "霍林郭勒市" }] },



  {
    "code": "150600",
    "name": "鄂尔多斯市",
    "areaList": [{
      "code": "150602",
      "name": "东胜区" },

    {
      "code": "150603",
      "name": "康巴什区" },

    {
      "code": "150621",
      "name": "达拉特旗" },

    {
      "code": "150622",
      "name": "准格尔旗" },

    {
      "code": "150623",
      "name": "鄂托克前旗" },

    {
      "code": "150624",
      "name": "鄂托克旗" },

    {
      "code": "150625",
      "name": "杭锦旗" },

    {
      "code": "150626",
      "name": "乌审旗" },

    {
      "code": "150627",
      "name": "伊金霍洛旗" }] },



  {
    "code": "150700",
    "name": "呼伦贝尔市",
    "areaList": [{
      "code": "150702",
      "name": "海拉尔区" },

    {
      "code": "150703",
      "name": "扎赉诺尔区" },

    {
      "code": "150721",
      "name": "阿荣旗" },

    {
      "code": "150722",
      "name": "莫力达瓦达斡尔族自治旗" },

    {
      "code": "150723",
      "name": "鄂伦春自治旗" },

    {
      "code": "150724",
      "name": "鄂温克族自治旗" },

    {
      "code": "150725",
      "name": "陈巴尔虎旗" },

    {
      "code": "150726",
      "name": "新巴尔虎左旗" },

    {
      "code": "150727",
      "name": "新巴尔虎右旗" },

    {
      "code": "150781",
      "name": "满洲里市" },

    {
      "code": "150782",
      "name": "牙克石市" },

    {
      "code": "150783",
      "name": "扎兰屯市" },

    {
      "code": "150784",
      "name": "额尔古纳市" },

    {
      "code": "150785",
      "name": "根河市" }] },



  {
    "code": "150800",
    "name": "巴彦淖尔市",
    "areaList": [{
      "code": "150802",
      "name": "临河区" },

    {
      "code": "150821",
      "name": "五原县" },

    {
      "code": "150822",
      "name": "磴口县" },

    {
      "code": "150823",
      "name": "乌拉特前旗" },

    {
      "code": "150824",
      "name": "乌拉特中旗" },

    {
      "code": "150825",
      "name": "乌拉特后旗" },

    {
      "code": "150826",
      "name": "杭锦后旗" }] },



  {
    "code": "150900",
    "name": "乌兰察布市",
    "areaList": [{
      "code": "150902",
      "name": "集宁区" },

    {
      "code": "150921",
      "name": "卓资县" },

    {
      "code": "150922",
      "name": "化德县" },

    {
      "code": "150923",
      "name": "商都县" },

    {
      "code": "150924",
      "name": "兴和县" },

    {
      "code": "150925",
      "name": "凉城县" },

    {
      "code": "150926",
      "name": "察哈尔右翼前旗" },

    {
      "code": "150927",
      "name": "察哈尔右翼中旗" },

    {
      "code": "150928",
      "name": "察哈尔右翼后旗" },

    {
      "code": "150929",
      "name": "四子王旗" },

    {
      "code": "150981",
      "name": "丰镇市" }] },



  {
    "code": "152200",
    "name": "兴安盟",
    "areaList": [{
      "code": "152201",
      "name": "乌兰浩特市" },

    {
      "code": "152202",
      "name": "阿尔山市" },

    {
      "code": "152221",
      "name": "科尔沁右翼前旗" },

    {
      "code": "152222",
      "name": "科尔沁右翼中旗" },

    {
      "code": "152223",
      "name": "扎赉特旗" },

    {
      "code": "152224",
      "name": "突泉县" }] },



  {
    "code": "152500",
    "name": "锡林郭勒盟",
    "areaList": [{
      "code": "152501",
      "name": "二连浩特市" },

    {
      "code": "152502",
      "name": "锡林浩特市" },

    {
      "code": "152522",
      "name": "阿巴嘎旗" },

    {
      "code": "152523",
      "name": "苏尼特左旗" },

    {
      "code": "152524",
      "name": "苏尼特右旗" },

    {
      "code": "152525",
      "name": "东乌珠穆沁旗" },

    {
      "code": "152526",
      "name": "西乌珠穆沁旗" },

    {
      "code": "152527",
      "name": "太仆寺旗" },

    {
      "code": "152528",
      "name": "镶黄旗" },

    {
      "code": "152529",
      "name": "正镶白旗" },

    {
      "code": "152530",
      "name": "正蓝旗" },

    {
      "code": "152531",
      "name": "多伦县" }] },



  {
    "code": "152900",
    "name": "阿拉善盟",
    "areaList": [{
      "code": "152921",
      "name": "阿拉善左旗" },

    {
      "code": "152922",
      "name": "阿拉善右旗" },

    {
      "code": "152923",
      "name": "额济纳旗" }] }] },





{
  "code": "210000",
  "name": "辽宁省",
  "cityList": [{
    "code": "210100",
    "name": "沈阳市",
    "areaList": [{
      "code": "210102",
      "name": "和平区" },

    {
      "code": "210103",
      "name": "沈河区" },

    {
      "code": "210104",
      "name": "大东区" },

    {
      "code": "210105",
      "name": "皇姑区" },

    {
      "code": "210106",
      "name": "铁西区" },

    {
      "code": "210111",
      "name": "苏家屯区" },

    {
      "code": "210112",
      "name": "浑南区" },

    {
      "code": "210113",
      "name": "沈北新区" },

    {
      "code": "210114",
      "name": "于洪区" },

    {
      "code": "210115",
      "name": "辽中区" },

    {
      "code": "210123",
      "name": "康平县" },

    {
      "code": "210124",
      "name": "法库县" },

    {
      "code": "210181",
      "name": "新民市" }] },



  {
    "code": "210200",
    "name": "大连市",
    "areaList": [{
      "code": "210202",
      "name": "中山区" },

    {
      "code": "210203",
      "name": "西岗区" },

    {
      "code": "210204",
      "name": "沙河口区" },

    {
      "code": "210211",
      "name": "甘井子区" },

    {
      "code": "210212",
      "name": "旅顺口区" },

    {
      "code": "210213",
      "name": "金州区" },

    {
      "code": "210214",
      "name": "普兰店区" },

    {
      "code": "210224",
      "name": "长海县" },

    {
      "code": "210281",
      "name": "瓦房店市" },

    {
      "code": "210283",
      "name": "庄河市" }] },



  {
    "code": "210300",
    "name": "鞍山市",
    "areaList": [{
      "code": "210302",
      "name": "铁东区" },

    {
      "code": "210303",
      "name": "铁西区" },

    {
      "code": "210304",
      "name": "立山区" },

    {
      "code": "210311",
      "name": "千山区" },

    {
      "code": "210321",
      "name": "台安县" },

    {
      "code": "210323",
      "name": "岫岩满族自治县" },

    {
      "code": "210381",
      "name": "海城市" }] },



  {
    "code": "210400",
    "name": "抚顺市",
    "areaList": [{
      "code": "210402",
      "name": "新抚区" },

    {
      "code": "210403",
      "name": "东洲区" },

    {
      "code": "210404",
      "name": "望花区" },

    {
      "code": "210411",
      "name": "顺城区" },

    {
      "code": "210421",
      "name": "抚顺县" },

    {
      "code": "210422",
      "name": "新宾满族自治县" },

    {
      "code": "210423",
      "name": "清原满族自治县" }] },



  {
    "code": "210500",
    "name": "本溪市",
    "areaList": [{
      "code": "210502",
      "name": "平山区" },

    {
      "code": "210503",
      "name": "溪湖区" },

    {
      "code": "210504",
      "name": "明山区" },

    {
      "code": "210505",
      "name": "南芬区" },

    {
      "code": "210521",
      "name": "本溪满族自治县" },

    {
      "code": "210522",
      "name": "桓仁满族自治县" }] },



  {
    "code": "210600",
    "name": "丹东市",
    "areaList": [{
      "code": "210602",
      "name": "元宝区" },

    {
      "code": "210603",
      "name": "振兴区" },

    {
      "code": "210604",
      "name": "振安区" },

    {
      "code": "210624",
      "name": "宽甸满族自治县" },

    {
      "code": "210681",
      "name": "东港市" },

    {
      "code": "210682",
      "name": "凤城市" }] },



  {
    "code": "210700",
    "name": "锦州市",
    "areaList": [{
      "code": "210702",
      "name": "古塔区" },

    {
      "code": "210703",
      "name": "凌河区" },

    {
      "code": "210711",
      "name": "太和区" },

    {
      "code": "210726",
      "name": "黑山县" },

    {
      "code": "210727",
      "name": "义县" },

    {
      "code": "210781",
      "name": "凌海市" },

    {
      "code": "210782",
      "name": "北镇市" }] },



  {
    "code": "210800",
    "name": "营口市",
    "areaList": [{
      "code": "210802",
      "name": "站前区" },

    {
      "code": "210803",
      "name": "西市区" },

    {
      "code": "210804",
      "name": "鲅鱼圈区" },

    {
      "code": "210811",
      "name": "老边区" },

    {
      "code": "210881",
      "name": "盖州市" },

    {
      "code": "210882",
      "name": "大石桥市" }] },



  {
    "code": "210900",
    "name": "阜新市",
    "areaList": [{
      "code": "210902",
      "name": "海州区" },

    {
      "code": "210903",
      "name": "新邱区" },

    {
      "code": "210904",
      "name": "太平区" },

    {
      "code": "210905",
      "name": "清河门区" },

    {
      "code": "210911",
      "name": "细河区" },

    {
      "code": "210921",
      "name": "阜新蒙古族自治县" },

    {
      "code": "210922",
      "name": "彰武县" }] },



  {
    "code": "211000",
    "name": "辽阳市",
    "areaList": [{
      "code": "211002",
      "name": "白塔区" },

    {
      "code": "211003",
      "name": "文圣区" },

    {
      "code": "211004",
      "name": "宏伟区" },

    {
      "code": "211005",
      "name": "弓长岭区" },

    {
      "code": "211011",
      "name": "太子河区" },

    {
      "code": "211021",
      "name": "辽阳县" },

    {
      "code": "211081",
      "name": "灯塔市" }] },



  {
    "code": "211100",
    "name": "盘锦市",
    "areaList": [{
      "code": "211102",
      "name": "双台子区" },

    {
      "code": "211103",
      "name": "兴隆台区" },

    {
      "code": "211104",
      "name": "大洼区" },

    {
      "code": "211122",
      "name": "盘山县" }] },



  {
    "code": "211200",
    "name": "铁岭市",
    "areaList": [{
      "code": "211202",
      "name": "银州区" },

    {
      "code": "211204",
      "name": "清河区" },

    {
      "code": "211221",
      "name": "铁岭县" },

    {
      "code": "211223",
      "name": "西丰县" },

    {
      "code": "211224",
      "name": "昌图县" },

    {
      "code": "211281",
      "name": "调兵山市" },

    {
      "code": "211282",
      "name": "开原市" }] },



  {
    "code": "211300",
    "name": "朝阳市",
    "areaList": [{
      "code": "211302",
      "name": "双塔区" },

    {
      "code": "211303",
      "name": "龙城区" },

    {
      "code": "211321",
      "name": "朝阳县" },

    {
      "code": "211322",
      "name": "建平县" },

    {
      "code": "211324",
      "name": "喀喇沁左翼蒙古族自治县" },

    {
      "code": "211381",
      "name": "北票市" },

    {
      "code": "211382",
      "name": "凌源市" }] },



  {
    "code": "211400",
    "name": "葫芦岛市",
    "areaList": [{
      "code": "211402",
      "name": "连山区" },

    {
      "code": "211403",
      "name": "龙港区" },

    {
      "code": "211404",
      "name": "南票区" },

    {
      "code": "211421",
      "name": "绥中县" },

    {
      "code": "211422",
      "name": "建昌县" },

    {
      "code": "211481",
      "name": "兴城市" }] }] },





{
  "code": "220000",
  "name": "吉林省",
  "cityList": [{
    "code": "220100",
    "name": "长春市",
    "areaList": [{
      "code": "220102",
      "name": "南关区" },

    {
      "code": "220103",
      "name": "宽城区" },

    {
      "code": "220104",
      "name": "朝阳区" },

    {
      "code": "220105",
      "name": "二道区" },

    {
      "code": "220106",
      "name": "绿园区" },

    {
      "code": "220112",
      "name": "双阳区" },

    {
      "code": "220113",
      "name": "九台区" },

    {
      "code": "220122",
      "name": "农安县" },

    {
      "code": "220182",
      "name": "榆树市" },

    {
      "code": "220183",
      "name": "德惠市" }] },



  {
    "code": "220200",
    "name": "吉林市",
    "areaList": [{
      "code": "220202",
      "name": "昌邑区" },

    {
      "code": "220203",
      "name": "龙潭区" },

    {
      "code": "220204",
      "name": "船营区" },

    {
      "code": "220211",
      "name": "丰满区" },

    {
      "code": "220221",
      "name": "永吉县" },

    {
      "code": "220281",
      "name": "蛟河市" },

    {
      "code": "220282",
      "name": "桦甸市" },

    {
      "code": "220283",
      "name": "舒兰市" },

    {
      "code": "220284",
      "name": "磐石市" }] },



  {
    "code": "220300",
    "name": "四平市",
    "areaList": [{
      "code": "220302",
      "name": "铁西区" },

    {
      "code": "220303",
      "name": "铁东区" },

    {
      "code": "220322",
      "name": "梨树县" },

    {
      "code": "220323",
      "name": "伊通满族自治县" },

    {
      "code": "220381",
      "name": "公主岭市" },

    {
      "code": "220382",
      "name": "双辽市" }] },



  {
    "code": "220400",
    "name": "辽源市",
    "areaList": [{
      "code": "220402",
      "name": "龙山区" },

    {
      "code": "220403",
      "name": "西安区" },

    {
      "code": "220421",
      "name": "东丰县" },

    {
      "code": "220422",
      "name": "东辽县" }] },



  {
    "code": "220500",
    "name": "通化市",
    "areaList": [{
      "code": "220502",
      "name": "东昌区" },

    {
      "code": "220503",
      "name": "二道江区" },

    {
      "code": "220521",
      "name": "通化县" },

    {
      "code": "220523",
      "name": "辉南县" },

    {
      "code": "220524",
      "name": "柳河县" },

    {
      "code": "220581",
      "name": "梅河口市" },

    {
      "code": "220582",
      "name": "集安市" }] },



  {
    "code": "220600",
    "name": "白山市",
    "areaList": [{
      "code": "220602",
      "name": "浑江区" },

    {
      "code": "220605",
      "name": "江源区" },

    {
      "code": "220621",
      "name": "抚松县" },

    {
      "code": "220622",
      "name": "靖宇县" },

    {
      "code": "220623",
      "name": "长白朝鲜族自治县" },

    {
      "code": "220681",
      "name": "临江市" }] },



  {
    "code": "220700",
    "name": "松原市",
    "areaList": [{
      "code": "220702",
      "name": "宁江区" },

    {
      "code": "220721",
      "name": "前郭尔罗斯蒙古族自治县" },

    {
      "code": "220722",
      "name": "长岭县" },

    {
      "code": "220723",
      "name": "乾安县" },

    {
      "code": "220781",
      "name": "扶余市" }] },



  {
    "code": "220800",
    "name": "白城市",
    "areaList": [{
      "code": "220802",
      "name": "洮北区" },

    {
      "code": "220821",
      "name": "镇赉县" },

    {
      "code": "220822",
      "name": "通榆县" },

    {
      "code": "220881",
      "name": "洮南市" },

    {
      "code": "220882",
      "name": "大安市" }] },



  {
    "code": "222400",
    "name": "延边朝鲜族自治州",
    "areaList": [{
      "code": "222401",
      "name": "延吉市" },

    {
      "code": "222402",
      "name": "图们市" },

    {
      "code": "222403",
      "name": "敦化市" },

    {
      "code": "222404",
      "name": "珲春市" },

    {
      "code": "222405",
      "name": "龙井市" },

    {
      "code": "222406",
      "name": "和龙市" },

    {
      "code": "222424",
      "name": "汪清县" },

    {
      "code": "222426",
      "name": "安图县" }] }] },





{
  "code": "230000",
  "name": "黑龙江省",
  "cityList": [{
    "code": "230100",
    "name": "哈尔滨市",
    "areaList": [{
      "code": "230102",
      "name": "道里区" },

    {
      "code": "230103",
      "name": "南岗区" },

    {
      "code": "230104",
      "name": "道外区" },

    {
      "code": "230108",
      "name": "平房区" },

    {
      "code": "230109",
      "name": "松北区" },

    {
      "code": "230110",
      "name": "香坊区" },

    {
      "code": "230111",
      "name": "呼兰区" },

    {
      "code": "230112",
      "name": "阿城区" },

    {
      "code": "230113",
      "name": "双城区" },

    {
      "code": "230123",
      "name": "依兰县" },

    {
      "code": "230124",
      "name": "方正县" },

    {
      "code": "230125",
      "name": "宾县" },

    {
      "code": "230126",
      "name": "巴彦县" },

    {
      "code": "230127",
      "name": "木兰县" },

    {
      "code": "230128",
      "name": "通河县" },

    {
      "code": "230129",
      "name": "延寿县" },

    {
      "code": "230183",
      "name": "尚志市" },

    {
      "code": "230184",
      "name": "五常市" }] },



  {
    "code": "230200",
    "name": "齐齐哈尔市",
    "areaList": [{
      "code": "230202",
      "name": "龙沙区" },

    {
      "code": "230203",
      "name": "建华区" },

    {
      "code": "230204",
      "name": "铁锋区" },

    {
      "code": "230205",
      "name": "昂昂溪区" },

    {
      "code": "230206",
      "name": "富拉尔基区" },

    {
      "code": "230207",
      "name": "碾子山区" },

    {
      "code": "230208",
      "name": "梅里斯达斡尔族区" },

    {
      "code": "230221",
      "name": "龙江县" },

    {
      "code": "230223",
      "name": "依安县" },

    {
      "code": "230224",
      "name": "泰来县" },

    {
      "code": "230225",
      "name": "甘南县" },

    {
      "code": "230227",
      "name": "富裕县" },

    {
      "code": "230229",
      "name": "克山县" },

    {
      "code": "230230",
      "name": "克东县" },

    {
      "code": "230231",
      "name": "拜泉县" },

    {
      "code": "230281",
      "name": "讷河市" }] },



  {
    "code": "230300",
    "name": "鸡西市",
    "areaList": [{
      "code": "230302",
      "name": "鸡冠区" },

    {
      "code": "230303",
      "name": "恒山区" },

    {
      "code": "230304",
      "name": "滴道区" },

    {
      "code": "230305",
      "name": "梨树区" },

    {
      "code": "230306",
      "name": "城子河区" },

    {
      "code": "230307",
      "name": "麻山区" },

    {
      "code": "230321",
      "name": "鸡东县" },

    {
      "code": "230381",
      "name": "虎林市" },

    {
      "code": "230382",
      "name": "密山市" }] },



  {
    "code": "230400",
    "name": "鹤岗市",
    "areaList": [{
      "code": "230402",
      "name": "向阳区" },

    {
      "code": "230403",
      "name": "工农区" },

    {
      "code": "230404",
      "name": "南山区" },

    {
      "code": "230405",
      "name": "兴安区" },

    {
      "code": "230406",
      "name": "东山区" },

    {
      "code": "230407",
      "name": "兴山区" },

    {
      "code": "230421",
      "name": "萝北县" },

    {
      "code": "230422",
      "name": "绥滨县" }] },



  {
    "code": "230500",
    "name": "双鸭山市",
    "areaList": [{
      "code": "230502",
      "name": "尖山区" },

    {
      "code": "230503",
      "name": "岭东区" },

    {
      "code": "230505",
      "name": "四方台区" },

    {
      "code": "230506",
      "name": "宝山区" },

    {
      "code": "230521",
      "name": "集贤县" },

    {
      "code": "230522",
      "name": "友谊县" },

    {
      "code": "230523",
      "name": "宝清县" },

    {
      "code": "230524",
      "name": "饶河县" }] },



  {
    "code": "230600",
    "name": "大庆市",
    "areaList": [{
      "code": "230602",
      "name": "萨尔图区" },

    {
      "code": "230603",
      "name": "龙凤区" },

    {
      "code": "230604",
      "name": "让胡路区" },

    {
      "code": "230605",
      "name": "红岗区" },

    {
      "code": "230606",
      "name": "大同区" },

    {
      "code": "230621",
      "name": "肇州县" },

    {
      "code": "230622",
      "name": "肇源县" },

    {
      "code": "230623",
      "name": "林甸县" },

    {
      "code": "230624",
      "name": "杜尔伯特蒙古族自治县" }] },



  {
    "code": "230700",
    "name": "伊春市",
    "areaList": [{
      "code": "230702",
      "name": "伊春区" },

    {
      "code": "230703",
      "name": "南岔区" },

    {
      "code": "230704",
      "name": "友好区" },

    {
      "code": "230705",
      "name": "西林区" },

    {
      "code": "230706",
      "name": "翠峦区" },

    {
      "code": "230707",
      "name": "新青区" },

    {
      "code": "230708",
      "name": "美溪区" },

    {
      "code": "230709",
      "name": "金山屯区" },

    {
      "code": "230710",
      "name": "五营区" },

    {
      "code": "230711",
      "name": "乌马河区" },

    {
      "code": "230712",
      "name": "汤旺河区" },

    {
      "code": "230713",
      "name": "带岭区" },

    {
      "code": "230714",
      "name": "乌伊岭区" },

    {
      "code": "230715",
      "name": "红星区" },

    {
      "code": "230716",
      "name": "上甘岭区" },

    {
      "code": "230722",
      "name": "嘉荫县" },

    {
      "code": "230781",
      "name": "铁力市" }] },



  {
    "code": "230800",
    "name": "佳木斯市",
    "areaList": [{
      "code": "230803",
      "name": "向阳区" },

    {
      "code": "230804",
      "name": "前进区" },

    {
      "code": "230805",
      "name": "东风区" },

    {
      "code": "230811",
      "name": "郊区" },

    {
      "code": "230822",
      "name": "桦南县" },

    {
      "code": "230826",
      "name": "桦川县" },

    {
      "code": "230828",
      "name": "汤原县" },

    {
      "code": "230881",
      "name": "同江市" },

    {
      "code": "230882",
      "name": "富锦市" },

    {
      "code": "230883",
      "name": "抚远市" }] },



  {
    "code": "230900",
    "name": "七台河市",
    "areaList": [{
      "code": "230902",
      "name": "新兴区" },

    {
      "code": "230903",
      "name": "桃山区" },

    {
      "code": "230904",
      "name": "茄子河区" },

    {
      "code": "230921",
      "name": "勃利县" }] },



  {
    "code": "231000",
    "name": "牡丹江市",
    "areaList": [{
      "code": "231002",
      "name": "东安区" },

    {
      "code": "231003",
      "name": "阳明区" },

    {
      "code": "231004",
      "name": "爱民区" },

    {
      "code": "231005",
      "name": "西安区" },

    {
      "code": "231025",
      "name": "林口县" },

    {
      "code": "231081",
      "name": "绥芬河市" },

    {
      "code": "231083",
      "name": "海林市" },

    {
      "code": "231084",
      "name": "宁安市" },

    {
      "code": "231085",
      "name": "穆棱市" },

    {
      "code": "231086",
      "name": "东宁市" }] },



  {
    "code": "231100",
    "name": "黑河市",
    "areaList": [{
      "code": "231102",
      "name": "爱辉区" },

    {
      "code": "231121",
      "name": "嫩江县" },

    {
      "code": "231123",
      "name": "逊克县" },

    {
      "code": "231124",
      "name": "孙吴县" },

    {
      "code": "231181",
      "name": "北安市" },

    {
      "code": "231182",
      "name": "五大连池市" }] },



  {
    "code": "231200",
    "name": "绥化市",
    "areaList": [{
      "code": "231202",
      "name": "北林区" },

    {
      "code": "231221",
      "name": "望奎县" },

    {
      "code": "231222",
      "name": "兰西县" },

    {
      "code": "231223",
      "name": "青冈县" },

    {
      "code": "231224",
      "name": "庆安县" },

    {
      "code": "231225",
      "name": "明水县" },

    {
      "code": "231226",
      "name": "绥棱县" },

    {
      "code": "231281",
      "name": "安达市" },

    {
      "code": "231282",
      "name": "肇东市" },

    {
      "code": "231283",
      "name": "海伦市" }] },



  {
    "code": "232700",
    "name": "大兴安岭地区",
    "areaList": [{
      "code": "232701",
      "name": "漠河市" },

    {
      "code": "232721",
      "name": "呼玛县" },

    {
      "code": "232722",
      "name": "塔河县" }] }] },





{
  "code": "310000",
  "name": "上海市",
  "cityList": [{
    "code": "310000",
    "name": "上海市",
    "areaList": [{
      "code": "310101",
      "name": "黄浦区" },

    {
      "code": "310104",
      "name": "徐汇区" },

    {
      "code": "310105",
      "name": "长宁区" },

    {
      "code": "310106",
      "name": "静安区" },

    {
      "code": "310107",
      "name": "普陀区" },

    {
      "code": "310109",
      "name": "虹口区" },

    {
      "code": "310110",
      "name": "杨浦区" },

    {
      "code": "310112",
      "name": "闵行区" },

    {
      "code": "310113",
      "name": "宝山区" },

    {
      "code": "310114",
      "name": "嘉定区" },

    {
      "code": "310115",
      "name": "浦东新区" },

    {
      "code": "310116",
      "name": "金山区" },

    {
      "code": "310117",
      "name": "松江区" },

    {
      "code": "310118",
      "name": "青浦区" },

    {
      "code": "310120",
      "name": "奉贤区" },

    {
      "code": "310151",
      "name": "崇明区" }] }] },




{
  "code": "320000",
  "name": "江苏省",
  "cityList": [{
    "code": "320100",
    "name": "南京市",
    "areaList": [{
      "code": "320102",
      "name": "玄武区" },

    {
      "code": "320104",
      "name": "秦淮区" },

    {
      "code": "320105",
      "name": "建邺区" },

    {
      "code": "320106",
      "name": "鼓楼区" },

    {
      "code": "320111",
      "name": "浦口区" },

    {
      "code": "320113",
      "name": "栖霞区" },

    {
      "code": "320114",
      "name": "雨花台区" },

    {
      "code": "320115",
      "name": "江宁区" },

    {
      "code": "320116",
      "name": "六合区" },

    {
      "code": "320117",
      "name": "溧水区" },

    {
      "code": "320118",
      "name": "高淳区" }] },



  {
    "code": "320200",
    "name": "无锡市",
    "areaList": [{
      "code": "320205",
      "name": "锡山区" },

    {
      "code": "320206",
      "name": "惠山区" },

    {
      "code": "320211",
      "name": "滨湖区" },

    {
      "code": "320213",
      "name": "梁溪区" },

    {
      "code": "320214",
      "name": "新吴区" },

    {
      "code": "320281",
      "name": "江阴市" },

    {
      "code": "320282",
      "name": "宜兴市" }] },



  {
    "code": "320300",
    "name": "徐州市",
    "areaList": [{
      "code": "320302",
      "name": "鼓楼区" },

    {
      "code": "320303",
      "name": "云龙区" },

    {
      "code": "320305",
      "name": "贾汪区" },

    {
      "code": "320311",
      "name": "泉山区" },

    {
      "code": "320312",
      "name": "铜山区" },

    {
      "code": "320321",
      "name": "丰县" },

    {
      "code": "320322",
      "name": "沛县" },

    {
      "code": "320324",
      "name": "睢宁县" },

    {
      "code": "320381",
      "name": "新沂市" },

    {
      "code": "320382",
      "name": "邳州市" }] },



  {
    "code": "320400",
    "name": "常州市",
    "areaList": [{
      "code": "320402",
      "name": "天宁区" },

    {
      "code": "320404",
      "name": "钟楼区" },

    {
      "code": "320411",
      "name": "新北区" },

    {
      "code": "320412",
      "name": "武进区" },

    {
      "code": "320413",
      "name": "金坛区" },

    {
      "code": "320481",
      "name": "溧阳市" }] },



  {
    "code": "320500",
    "name": "苏州市",
    "areaList": [{
      "code": "320505",
      "name": "虎丘区" },

    {
      "code": "320506",
      "name": "吴中区" },

    {
      "code": "320507",
      "name": "相城区" },

    {
      "code": "320508",
      "name": "姑苏区" },

    {
      "code": "320509",
      "name": "吴江区" },

    {
      "code": "320581",
      "name": "常熟市" },

    {
      "code": "320582",
      "name": "张家港市" },

    {
      "code": "320583",
      "name": "昆山市" },

    {
      "code": "320585",
      "name": "太仓市" }] },



  {
    "code": "320600",
    "name": "南通市",
    "areaList": [{
      "code": "320602",
      "name": "崇川区" },

    {
      "code": "320611",
      "name": "港闸区" },

    {
      "code": "320612",
      "name": "通州区" },

    {
      "code": "320623",
      "name": "如东县" },

    {
      "code": "320681",
      "name": "启东市" },

    {
      "code": "320682",
      "name": "如皋市" },

    {
      "code": "320684",
      "name": "海门市" },

    {
      "code": "320685",
      "name": "海安市" }] },



  {
    "code": "320700",
    "name": "连云港市",
    "areaList": [{
      "code": "320703",
      "name": "连云区" },

    {
      "code": "320706",
      "name": "海州区" },

    {
      "code": "320707",
      "name": "赣榆区" },

    {
      "code": "320722",
      "name": "东海县" },

    {
      "code": "320723",
      "name": "灌云县" },

    {
      "code": "320724",
      "name": "灌南县" }] },



  {
    "code": "320800",
    "name": "淮安市",
    "areaList": [{
      "code": "320803",
      "name": "淮安区" },

    {
      "code": "320804",
      "name": "淮阴区" },

    {
      "code": "320812",
      "name": "清江浦区" },

    {
      "code": "320813",
      "name": "洪泽区" },

    {
      "code": "320826",
      "name": "涟水县" },

    {
      "code": "320830",
      "name": "盱眙县" },

    {
      "code": "320831",
      "name": "金湖县" }] },



  {
    "code": "320900",
    "name": "盐城市",
    "areaList": [{
      "code": "320902",
      "name": "亭湖区" },

    {
      "code": "320903",
      "name": "盐都区" },

    {
      "code": "320904",
      "name": "大丰区" },

    {
      "code": "320921",
      "name": "响水县" },

    {
      "code": "320922",
      "name": "滨海县" },

    {
      "code": "320923",
      "name": "阜宁县" },

    {
      "code": "320924",
      "name": "射阳县" },

    {
      "code": "320925",
      "name": "建湖县" },

    {
      "code": "320981",
      "name": "东台市" }] },



  {
    "code": "321000",
    "name": "扬州市",
    "areaList": [{
      "code": "321002",
      "name": "广陵区" },

    {
      "code": "321003",
      "name": "邗江区" },

    {
      "code": "321012",
      "name": "江都区" },

    {
      "code": "321023",
      "name": "宝应县" },

    {
      "code": "321081",
      "name": "仪征市" },

    {
      "code": "321084",
      "name": "高邮市" }] },



  {
    "code": "321100",
    "name": "镇江市",
    "areaList": [{
      "code": "321102",
      "name": "京口区" },

    {
      "code": "321111",
      "name": "润州区" },

    {
      "code": "321112",
      "name": "丹徒区" },

    {
      "code": "321181",
      "name": "丹阳市" },

    {
      "code": "321182",
      "name": "扬中市" },

    {
      "code": "321183",
      "name": "句容市" }] },



  {
    "code": "321200",
    "name": "泰州市",
    "areaList": [{
      "code": "321202",
      "name": "海陵区" },

    {
      "code": "321203",
      "name": "高港区" },

    {
      "code": "321204",
      "name": "姜堰区" },

    {
      "code": "321281",
      "name": "兴化市" },

    {
      "code": "321282",
      "name": "靖江市" },

    {
      "code": "321283",
      "name": "泰兴市" }] },



  {
    "code": "321300",
    "name": "宿迁市",
    "areaList": [{
      "code": "321302",
      "name": "宿城区" },

    {
      "code": "321311",
      "name": "宿豫区" },

    {
      "code": "321322",
      "name": "沭阳县" },

    {
      "code": "321323",
      "name": "泗阳县" },

    {
      "code": "321324",
      "name": "泗洪县" }] }] },





{
  "code": "330000",
  "name": "浙江省",
  "cityList": [{
    "code": "330100",
    "name": "杭州市",
    "areaList": [{
      "code": "330102",
      "name": "上城区" },

    {
      "code": "330103",
      "name": "下城区" },

    {
      "code": "330104",
      "name": "江干区" },

    {
      "code": "330105",
      "name": "拱墅区" },

    {
      "code": "330106",
      "name": "西湖区" },

    {
      "code": "330108",
      "name": "滨江区" },

    {
      "code": "330109",
      "name": "萧山区" },

    {
      "code": "330110",
      "name": "余杭区" },

    {
      "code": "330111",
      "name": "富阳区" },

    {
      "code": "330112",
      "name": "临安区" },

    {
      "code": "330122",
      "name": "桐庐县" },

    {
      "code": "330127",
      "name": "淳安县" },

    {
      "code": "330182",
      "name": "建德市" }] },



  {
    "code": "330200",
    "name": "宁波市",
    "areaList": [{
      "code": "330203",
      "name": "海曙区" },

    {
      "code": "330205",
      "name": "江北区" },

    {
      "code": "330206",
      "name": "北仑区" },

    {
      "code": "330211",
      "name": "镇海区" },

    {
      "code": "330212",
      "name": "鄞州区" },

    {
      "code": "330213",
      "name": "奉化区" },

    {
      "code": "330225",
      "name": "象山县" },

    {
      "code": "330226",
      "name": "宁海县" },

    {
      "code": "330281",
      "name": "余姚市" },

    {
      "code": "330282",
      "name": "慈溪市" }] },



  {
    "code": "330300",
    "name": "温州市",
    "areaList": [{
      "code": "330302",
      "name": "鹿城区" },

    {
      "code": "330303",
      "name": "龙湾区" },

    {
      "code": "330304",
      "name": "瓯海区" },

    {
      "code": "330305",
      "name": "洞头区" },

    {
      "code": "330324",
      "name": "永嘉县" },

    {
      "code": "330326",
      "name": "平阳县" },

    {
      "code": "330327",
      "name": "苍南县" },

    {
      "code": "330328",
      "name": "文成县" },

    {
      "code": "330329",
      "name": "泰顺县" },

    {
      "code": "330381",
      "name": "瑞安市" },

    {
      "code": "330382",
      "name": "乐清市" }] },



  {
    "code": "330400",
    "name": "嘉兴市",
    "areaList": [{
      "code": "330402",
      "name": "南湖区" },

    {
      "code": "330411",
      "name": "秀洲区" },

    {
      "code": "330421",
      "name": "嘉善县" },

    {
      "code": "330424",
      "name": "海盐县" },

    {
      "code": "330481",
      "name": "海宁市" },

    {
      "code": "330482",
      "name": "平湖市" },

    {
      "code": "330483",
      "name": "桐乡市" }] },



  {
    "code": "330500",
    "name": "湖州市",
    "areaList": [{
      "code": "330502",
      "name": "吴兴区" },

    {
      "code": "330503",
      "name": "南浔区" },

    {
      "code": "330521",
      "name": "德清县" },

    {
      "code": "330522",
      "name": "长兴县" },

    {
      "code": "330523",
      "name": "安吉县" }] },



  {
    "code": "330600",
    "name": "绍兴市",
    "areaList": [{
      "code": "330602",
      "name": "越城区" },

    {
      "code": "330603",
      "name": "柯桥区" },

    {
      "code": "330604",
      "name": "上虞区" },

    {
      "code": "330624",
      "name": "新昌县" },

    {
      "code": "330681",
      "name": "诸暨市" },

    {
      "code": "330683",
      "name": "嵊州市" }] },



  {
    "code": "330700",
    "name": "金华市",
    "areaList": [{
      "code": "330702",
      "name": "婺城区" },

    {
      "code": "330703",
      "name": "金东区" },

    {
      "code": "330723",
      "name": "武义县" },

    {
      "code": "330726",
      "name": "浦江县" },

    {
      "code": "330727",
      "name": "磐安县" },

    {
      "code": "330781",
      "name": "兰溪市" },

    {
      "code": "330782",
      "name": "义乌市" },

    {
      "code": "330783",
      "name": "东阳市" },

    {
      "code": "330784",
      "name": "永康市" }] },



  {
    "code": "330800",
    "name": "衢州市",
    "areaList": [{
      "code": "330802",
      "name": "柯城区" },

    {
      "code": "330803",
      "name": "衢江区" },

    {
      "code": "330822",
      "name": "常山县" },

    {
      "code": "330824",
      "name": "开化县" },

    {
      "code": "330825",
      "name": "龙游县" },

    {
      "code": "330881",
      "name": "江山市" }] },



  {
    "code": "330900",
    "name": "舟山市",
    "areaList": [{
      "code": "330902",
      "name": "定海区" },

    {
      "code": "330903",
      "name": "普陀区" },

    {
      "code": "330921",
      "name": "岱山县" },

    {
      "code": "330922",
      "name": "嵊泗县" }] },



  {
    "code": "331000",
    "name": "台州市",
    "areaList": [{
      "code": "331002",
      "name": "椒江区" },

    {
      "code": "331003",
      "name": "黄岩区" },

    {
      "code": "331004",
      "name": "路桥区" },

    {
      "code": "331022",
      "name": "三门县" },

    {
      "code": "331023",
      "name": "天台县" },

    {
      "code": "331024",
      "name": "仙居县" },

    {
      "code": "331081",
      "name": "温岭市" },

    {
      "code": "331082",
      "name": "临海市" },

    {
      "code": "331083",
      "name": "玉环市" }] },



  {
    "code": "331100",
    "name": "丽水市",
    "areaList": [{
      "code": "331102",
      "name": "莲都区" },

    {
      "code": "331121",
      "name": "青田县" },

    {
      "code": "331122",
      "name": "缙云县" },

    {
      "code": "331123",
      "name": "遂昌县" },

    {
      "code": "331124",
      "name": "松阳县" },

    {
      "code": "331125",
      "name": "云和县" },

    {
      "code": "331126",
      "name": "庆元县" },

    {
      "code": "331127",
      "name": "景宁畲族自治县" },

    {
      "code": "331181",
      "name": "龙泉市" }] }] },





{
  "code": "340000",
  "name": "安徽省",
  "cityList": [{
    "code": "340100",
    "name": "合肥市",
    "areaList": [{
      "code": "340102",
      "name": "瑶海区" },

    {
      "code": "340103",
      "name": "庐阳区" },

    {
      "code": "340104",
      "name": "蜀山区" },

    {
      "code": "340111",
      "name": "包河区" },

    {
      "code": "340121",
      "name": "长丰县" },

    {
      "code": "340122",
      "name": "肥东县" },

    {
      "code": "340123",
      "name": "肥西县" },

    {
      "code": "340124",
      "name": "庐江县" },

    {
      "code": "340181",
      "name": "巢湖市" }] },



  {
    "code": "340200",
    "name": "芜湖市",
    "areaList": [{
      "code": "340202",
      "name": "镜湖区" },

    {
      "code": "340203",
      "name": "弋江区" },

    {
      "code": "340207",
      "name": "鸠江区" },

    {
      "code": "340208",
      "name": "三山区" },

    {
      "code": "340221",
      "name": "芜湖县" },

    {
      "code": "340222",
      "name": "繁昌县" },

    {
      "code": "340223",
      "name": "南陵县" },

    {
      "code": "340225",
      "name": "无为县" }] },



  {
    "code": "340300",
    "name": "蚌埠市",
    "areaList": [{
      "code": "340302",
      "name": "龙子湖区" },

    {
      "code": "340303",
      "name": "蚌山区" },

    {
      "code": "340304",
      "name": "禹会区" },

    {
      "code": "340311",
      "name": "淮上区" },

    {
      "code": "340321",
      "name": "怀远县" },

    {
      "code": "340322",
      "name": "五河县" },

    {
      "code": "340323",
      "name": "固镇县" }] },



  {
    "code": "340400",
    "name": "淮南市",
    "areaList": [{
      "code": "340402",
      "name": "大通区" },

    {
      "code": "340403",
      "name": "田家庵区" },

    {
      "code": "340404",
      "name": "谢家集区" },

    {
      "code": "340405",
      "name": "八公山区" },

    {
      "code": "340406",
      "name": "潘集区" },

    {
      "code": "340421",
      "name": "凤台县" },

    {
      "code": "340422",
      "name": "寿县" }] },



  {
    "code": "340500",
    "name": "马鞍山市",
    "areaList": [{
      "code": "340503",
      "name": "花山区" },

    {
      "code": "340504",
      "name": "雨山区" },

    {
      "code": "340506",
      "name": "博望区" },

    {
      "code": "340521",
      "name": "当涂县" },

    {
      "code": "340522",
      "name": "含山县" },

    {
      "code": "340523",
      "name": "和县" }] },



  {
    "code": "340600",
    "name": "淮北市",
    "areaList": [{
      "code": "340602",
      "name": "杜集区" },

    {
      "code": "340603",
      "name": "相山区" },

    {
      "code": "340604",
      "name": "烈山区" },

    {
      "code": "340621",
      "name": "濉溪县" }] },



  {
    "code": "340700",
    "name": "铜陵市",
    "areaList": [{
      "code": "340705",
      "name": "铜官区" },

    {
      "code": "340706",
      "name": "义安区" },

    {
      "code": "340711",
      "name": "郊区" },

    {
      "code": "340722",
      "name": "枞阳县" }] },



  {
    "code": "340800",
    "name": "安庆市",
    "areaList": [{
      "code": "340802",
      "name": "迎江区" },

    {
      "code": "340803",
      "name": "大观区" },

    {
      "code": "340811",
      "name": "宜秀区" },

    {
      "code": "340822",
      "name": "怀宁县" },

    {
      "code": "340825",
      "name": "太湖县" },

    {
      "code": "340826",
      "name": "宿松县" },

    {
      "code": "340827",
      "name": "望江县" },

    {
      "code": "340828",
      "name": "岳西县" },

    {
      "code": "340881",
      "name": "桐城市" },

    {
      "code": "340882",
      "name": "潜山市" }] },



  {
    "code": "341000",
    "name": "黄山市",
    "areaList": [{
      "code": "341002",
      "name": "屯溪区" },

    {
      "code": "341003",
      "name": "黄山区" },

    {
      "code": "341004",
      "name": "徽州区" },

    {
      "code": "341021",
      "name": "歙县" },

    {
      "code": "341022",
      "name": "休宁县" },

    {
      "code": "341023",
      "name": "黟县" },

    {
      "code": "341024",
      "name": "祁门县" }] },



  {
    "code": "341100",
    "name": "滁州市",
    "areaList": [{
      "code": "341102",
      "name": "琅琊区" },

    {
      "code": "341103",
      "name": "南谯区" },

    {
      "code": "341122",
      "name": "来安县" },

    {
      "code": "341124",
      "name": "全椒县" },

    {
      "code": "341125",
      "name": "定远县" },

    {
      "code": "341126",
      "name": "凤阳县" },

    {
      "code": "341181",
      "name": "天长市" },

    {
      "code": "341182",
      "name": "明光市" }] },



  {
    "code": "341200",
    "name": "阜阳市",
    "areaList": [{
      "code": "341202",
      "name": "颍州区" },

    {
      "code": "341203",
      "name": "颍东区" },

    {
      "code": "341204",
      "name": "颍泉区" },

    {
      "code": "341221",
      "name": "临泉县" },

    {
      "code": "341222",
      "name": "太和县" },

    {
      "code": "341225",
      "name": "阜南县" },

    {
      "code": "341226",
      "name": "颍上县" },

    {
      "code": "341282",
      "name": "界首市" }] },



  {
    "code": "341300",
    "name": "宿州市",
    "areaList": [{
      "code": "341302",
      "name": "埇桥区" },

    {
      "code": "341321",
      "name": "砀山县" },

    {
      "code": "341322",
      "name": "萧县" },

    {
      "code": "341323",
      "name": "灵璧县" },

    {
      "code": "341324",
      "name": "泗县" }] },



  {
    "code": "341500",
    "name": "六安市",
    "areaList": [{
      "code": "341502",
      "name": "金安区" },

    {
      "code": "341503",
      "name": "裕安区" },

    {
      "code": "341504",
      "name": "叶集区" },

    {
      "code": "341522",
      "name": "霍邱县" },

    {
      "code": "341523",
      "name": "舒城县" },

    {
      "code": "341524",
      "name": "金寨县" },

    {
      "code": "341525",
      "name": "霍山县" }] },



  {
    "code": "341600",
    "name": "亳州市",
    "areaList": [{
      "code": "341602",
      "name": "谯城区" },

    {
      "code": "341621",
      "name": "涡阳县" },

    {
      "code": "341622",
      "name": "蒙城县" },

    {
      "code": "341623",
      "name": "利辛县" }] },



  {
    "code": "341700",
    "name": "池州市",
    "areaList": [{
      "code": "341702",
      "name": "贵池区" },

    {
      "code": "341721",
      "name": "东至县" },

    {
      "code": "341722",
      "name": "石台县" },

    {
      "code": "341723",
      "name": "青阳县" }] },



  {
    "code": "341800",
    "name": "宣城市",
    "areaList": [{
      "code": "341802",
      "name": "宣州区" },

    {
      "code": "341821",
      "name": "郎溪县" },

    {
      "code": "341822",
      "name": "广德县" },

    {
      "code": "341823",
      "name": "泾县" },

    {
      "code": "341824",
      "name": "绩溪县" },

    {
      "code": "341825",
      "name": "旌德县" },

    {
      "code": "341881",
      "name": "宁国市" }] }] },





{
  "code": "350000",
  "name": "福建省",
  "cityList": [{
    "code": "350100",
    "name": "福州市",
    "areaList": [{
      "code": "350102",
      "name": "鼓楼区" },

    {
      "code": "350103",
      "name": "台江区" },

    {
      "code": "350104",
      "name": "仓山区" },

    {
      "code": "350105",
      "name": "马尾区" },

    {
      "code": "350111",
      "name": "晋安区" },

    {
      "code": "350112",
      "name": "长乐区" },

    {
      "code": "350121",
      "name": "闽侯县" },

    {
      "code": "350122",
      "name": "连江县" },

    {
      "code": "350123",
      "name": "罗源县" },

    {
      "code": "350124",
      "name": "闽清县" },

    {
      "code": "350125",
      "name": "永泰县" },

    {
      "code": "350128",
      "name": "平潭县" },

    {
      "code": "350181",
      "name": "福清市" }] },



  {
    "code": "350200",
    "name": "厦门市",
    "areaList": [{
      "code": "350203",
      "name": "思明区" },

    {
      "code": "350205",
      "name": "海沧区" },

    {
      "code": "350206",
      "name": "湖里区" },

    {
      "code": "350211",
      "name": "集美区" },

    {
      "code": "350212",
      "name": "同安区" },

    {
      "code": "350213",
      "name": "翔安区" }] },



  {
    "code": "350300",
    "name": "莆田市",
    "areaList": [{
      "code": "350302",
      "name": "城厢区" },

    {
      "code": "350303",
      "name": "涵江区" },

    {
      "code": "350304",
      "name": "荔城区" },

    {
      "code": "350305",
      "name": "秀屿区" },

    {
      "code": "350322",
      "name": "仙游县" }] },



  {
    "code": "350400",
    "name": "三明市",
    "areaList": [{
      "code": "350402",
      "name": "梅列区" },

    {
      "code": "350403",
      "name": "三元区" },

    {
      "code": "350421",
      "name": "明溪县" },

    {
      "code": "350423",
      "name": "清流县" },

    {
      "code": "350424",
      "name": "宁化县" },

    {
      "code": "350425",
      "name": "大田县" },

    {
      "code": "350426",
      "name": "尤溪县" },

    {
      "code": "350427",
      "name": "沙县" },

    {
      "code": "350428",
      "name": "将乐县" },

    {
      "code": "350429",
      "name": "泰宁县" },

    {
      "code": "350430",
      "name": "建宁县" },

    {
      "code": "350481",
      "name": "永安市" }] },



  {
    "code": "350500",
    "name": "泉州市",
    "areaList": [{
      "code": "350502",
      "name": "鲤城区" },

    {
      "code": "350503",
      "name": "丰泽区" },

    {
      "code": "350504",
      "name": "洛江区" },

    {
      "code": "350505",
      "name": "泉港区" },

    {
      "code": "350521",
      "name": "惠安县" },

    {
      "code": "350524",
      "name": "安溪县" },

    {
      "code": "350525",
      "name": "永春县" },

    {
      "code": "350526",
      "name": "德化县" },

    {
      "code": "350527",
      "name": "金门县" },

    {
      "code": "350581",
      "name": "石狮市" },

    {
      "code": "350582",
      "name": "晋江市" },

    {
      "code": "350583",
      "name": "南安市" }] },



  {
    "code": "350600",
    "name": "漳州市",
    "areaList": [{
      "code": "350602",
      "name": "芗城区" },

    {
      "code": "350603",
      "name": "龙文区" },

    {
      "code": "350622",
      "name": "云霄县" },

    {
      "code": "350623",
      "name": "漳浦县" },

    {
      "code": "350624",
      "name": "诏安县" },

    {
      "code": "350625",
      "name": "长泰县" },

    {
      "code": "350626",
      "name": "东山县" },

    {
      "code": "350627",
      "name": "南靖县" },

    {
      "code": "350628",
      "name": "平和县" },

    {
      "code": "350629",
      "name": "华安县" },

    {
      "code": "350681",
      "name": "龙海市" }] },



  {
    "code": "350700",
    "name": "南平市",
    "areaList": [{
      "code": "350702",
      "name": "延平区" },

    {
      "code": "350703",
      "name": "建阳区" },

    {
      "code": "350721",
      "name": "顺昌县" },

    {
      "code": "350722",
      "name": "浦城县" },

    {
      "code": "350723",
      "name": "光泽县" },

    {
      "code": "350724",
      "name": "松溪县" },

    {
      "code": "350725",
      "name": "政和县" },

    {
      "code": "350781",
      "name": "邵武市" },

    {
      "code": "350782",
      "name": "武夷山市" },

    {
      "code": "350783",
      "name": "建瓯市" }] },



  {
    "code": "350800",
    "name": "龙岩市",
    "areaList": [{
      "code": "350802",
      "name": "新罗区" },

    {
      "code": "350803",
      "name": "永定区" },

    {
      "code": "350821",
      "name": "长汀县" },

    {
      "code": "350823",
      "name": "上杭县" },

    {
      "code": "350824",
      "name": "武平县" },

    {
      "code": "350825",
      "name": "连城县" },

    {
      "code": "350881",
      "name": "漳平市" }] },



  {
    "code": "350900",
    "name": "宁德市",
    "areaList": [{
      "code": "350902",
      "name": "蕉城区" },

    {
      "code": "350921",
      "name": "霞浦县" },

    {
      "code": "350922",
      "name": "古田县" },

    {
      "code": "350923",
      "name": "屏南县" },

    {
      "code": "350924",
      "name": "寿宁县" },

    {
      "code": "350925",
      "name": "周宁县" },

    {
      "code": "350926",
      "name": "柘荣县" },

    {
      "code": "350981",
      "name": "福安市" },

    {
      "code": "350982",
      "name": "福鼎市" }] }] },





{
  "code": "360000",
  "name": "江西省",
  "cityList": [{
    "code": "360100",
    "name": "南昌市",
    "areaList": [{
      "code": "360102",
      "name": "东湖区" },

    {
      "code": "360103",
      "name": "西湖区" },

    {
      "code": "360104",
      "name": "青云谱区" },

    {
      "code": "360105",
      "name": "湾里区" },

    {
      "code": "360111",
      "name": "青山湖区" },

    {
      "code": "360112",
      "name": "新建区" },

    {
      "code": "360121",
      "name": "南昌县" },

    {
      "code": "360123",
      "name": "安义县" },

    {
      "code": "360124",
      "name": "进贤县" }] },



  {
    "code": "360200",
    "name": "景德镇市",
    "areaList": [{
      "code": "360202",
      "name": "昌江区" },

    {
      "code": "360203",
      "name": "珠山区" },

    {
      "code": "360222",
      "name": "浮梁县" },

    {
      "code": "360281",
      "name": "乐平市" }] },



  {
    "code": "360300",
    "name": "萍乡市",
    "areaList": [{
      "code": "360302",
      "name": "安源区" },

    {
      "code": "360313",
      "name": "湘东区" },

    {
      "code": "360321",
      "name": "莲花县" },

    {
      "code": "360322",
      "name": "上栗县" },

    {
      "code": "360323",
      "name": "芦溪县" }] },



  {
    "code": "360400",
    "name": "九江市",
    "areaList": [{
      "code": "360402",
      "name": "濂溪区" },

    {
      "code": "360403",
      "name": "浔阳区" },

    {
      "code": "360404",
      "name": "柴桑区" },

    {
      "code": "360423",
      "name": "武宁县" },

    {
      "code": "360424",
      "name": "修水县" },

    {
      "code": "360425",
      "name": "永修县" },

    {
      "code": "360426",
      "name": "德安县" },

    {
      "code": "360428",
      "name": "都昌县" },

    {
      "code": "360429",
      "name": "湖口县" },

    {
      "code": "360430",
      "name": "彭泽县" },

    {
      "code": "360481",
      "name": "瑞昌市" },

    {
      "code": "360482",
      "name": "共青城市" },

    {
      "code": "360483",
      "name": "庐山市" }] },



  {
    "code": "360500",
    "name": "新余市",
    "areaList": [{
      "code": "360502",
      "name": "渝水区" },

    {
      "code": "360521",
      "name": "分宜县" }] },



  {
    "code": "360600",
    "name": "鹰潭市",
    "areaList": [{
      "code": "360602",
      "name": "月湖区" },

    {
      "code": "360603",
      "name": "余江区" },

    {
      "code": "360681",
      "name": "贵溪市" }] },



  {
    "code": "360700",
    "name": "赣州市",
    "areaList": [{
      "code": "360702",
      "name": "章贡区" },

    {
      "code": "360703",
      "name": "南康区" },

    {
      "code": "360704",
      "name": "赣县区" },

    {
      "code": "360722",
      "name": "信丰县" },

    {
      "code": "360723",
      "name": "大余县" },

    {
      "code": "360724",
      "name": "上犹县" },

    {
      "code": "360725",
      "name": "崇义县" },

    {
      "code": "360726",
      "name": "安远县" },

    {
      "code": "360727",
      "name": "龙南县" },

    {
      "code": "360728",
      "name": "定南县" },

    {
      "code": "360729",
      "name": "全南县" },

    {
      "code": "360730",
      "name": "宁都县" },

    {
      "code": "360731",
      "name": "于都县" },

    {
      "code": "360732",
      "name": "兴国县" },

    {
      "code": "360733",
      "name": "会昌县" },

    {
      "code": "360734",
      "name": "寻乌县" },

    {
      "code": "360735",
      "name": "石城县" },

    {
      "code": "360781",
      "name": "瑞金市" }] },



  {
    "code": "360800",
    "name": "吉安市",
    "areaList": [{
      "code": "360802",
      "name": "吉州区" },

    {
      "code": "360803",
      "name": "青原区" },

    {
      "code": "360821",
      "name": "吉安县" },

    {
      "code": "360822",
      "name": "吉水县" },

    {
      "code": "360823",
      "name": "峡江县" },

    {
      "code": "360824",
      "name": "新干县" },

    {
      "code": "360825",
      "name": "永丰县" },

    {
      "code": "360826",
      "name": "泰和县" },

    {
      "code": "360827",
      "name": "遂川县" },

    {
      "code": "360828",
      "name": "万安县" },

    {
      "code": "360829",
      "name": "安福县" },

    {
      "code": "360830",
      "name": "永新县" },

    {
      "code": "360881",
      "name": "井冈山市" }] },



  {
    "code": "360900",
    "name": "宜春市",
    "areaList": [{
      "code": "360902",
      "name": "袁州区" },

    {
      "code": "360921",
      "name": "奉新县" },

    {
      "code": "360922",
      "name": "万载县" },

    {
      "code": "360923",
      "name": "上高县" },

    {
      "code": "360924",
      "name": "宜丰县" },

    {
      "code": "360925",
      "name": "靖安县" },

    {
      "code": "360926",
      "name": "铜鼓县" },

    {
      "code": "360981",
      "name": "丰城市" },

    {
      "code": "360982",
      "name": "樟树市" },

    {
      "code": "360983",
      "name": "高安市" }] },



  {
    "code": "361000",
    "name": "抚州市",
    "areaList": [{
      "code": "361002",
      "name": "临川区" },

    {
      "code": "361003",
      "name": "东乡区" },

    {
      "code": "361021",
      "name": "南城县" },

    {
      "code": "361022",
      "name": "黎川县" },

    {
      "code": "361023",
      "name": "南丰县" },

    {
      "code": "361024",
      "name": "崇仁县" },

    {
      "code": "361025",
      "name": "乐安县" },

    {
      "code": "361026",
      "name": "宜黄县" },

    {
      "code": "361027",
      "name": "金溪县" },

    {
      "code": "361028",
      "name": "资溪县" },

    {
      "code": "361030",
      "name": "广昌县" }] },



  {
    "code": "361100",
    "name": "上饶市",
    "areaList": [{
      "code": "361102",
      "name": "信州区" },

    {
      "code": "361103",
      "name": "广丰区" },

    {
      "code": "361121",
      "name": "上饶县" },

    {
      "code": "361123",
      "name": "玉山县" },

    {
      "code": "361124",
      "name": "铅山县" },

    {
      "code": "361125",
      "name": "横峰县" },

    {
      "code": "361126",
      "name": "弋阳县" },

    {
      "code": "361127",
      "name": "余干县" },

    {
      "code": "361128",
      "name": "鄱阳县" },

    {
      "code": "361129",
      "name": "万年县" },

    {
      "code": "361130",
      "name": "婺源县" },

    {
      "code": "361181",
      "name": "德兴市" }] }] },





{
  "code": "370000",
  "name": "山东省",
  "cityList": [{
    "code": "370100",
    "name": "济南市",
    "areaList": [{
      "code": "370102",
      "name": "历下区" },

    {
      "code": "370103",
      "name": "市中区" },

    {
      "code": "370104",
      "name": "槐荫区" },

    {
      "code": "370105",
      "name": "天桥区" },

    {
      "code": "370112",
      "name": "历城区" },

    {
      "code": "370113",
      "name": "长清区" },

    {
      "code": "370114",
      "name": "章丘区" },

    {
      "code": "370115",
      "name": "济阳区" },

    {
      "code": "370116",
      "name": "莱芜区" },

    {
      "code": "370117",
      "name": "钢城区" },

    {
      "code": "370124",
      "name": "平阴县" },

    {
      "code": "370126",
      "name": "商河县" }] },



  {
    "code": "370200",
    "name": "青岛市",
    "areaList": [{
      "code": "370202",
      "name": "市南区" },

    {
      "code": "370203",
      "name": "市北区" },

    {
      "code": "370211",
      "name": "黄岛区" },

    {
      "code": "370212",
      "name": "崂山区" },

    {
      "code": "370213",
      "name": "李沧区" },

    {
      "code": "370214",
      "name": "城阳区" },

    {
      "code": "370215",
      "name": "即墨区" },

    {
      "code": "370281",
      "name": "胶州市" },

    {
      "code": "370283",
      "name": "平度市" },

    {
      "code": "370285",
      "name": "莱西市" }] },



  {
    "code": "370300",
    "name": "淄博市",
    "areaList": [{
      "code": "370302",
      "name": "淄川区" },

    {
      "code": "370303",
      "name": "张店区" },

    {
      "code": "370304",
      "name": "博山区" },

    {
      "code": "370305",
      "name": "临淄区" },

    {
      "code": "370306",
      "name": "周村区" },

    {
      "code": "370321",
      "name": "桓台县" },

    {
      "code": "370322",
      "name": "高青县" },

    {
      "code": "370323",
      "name": "沂源县" }] },



  {
    "code": "370400",
    "name": "枣庄市",
    "areaList": [{
      "code": "370402",
      "name": "市中区" },

    {
      "code": "370403",
      "name": "薛城区" },

    {
      "code": "370404",
      "name": "峄城区" },

    {
      "code": "370405",
      "name": "台儿庄区" },

    {
      "code": "370406",
      "name": "山亭区" },

    {
      "code": "370481",
      "name": "滕州市" }] },



  {
    "code": "370500",
    "name": "东营市",
    "areaList": [{
      "code": "370502",
      "name": "东营区" },

    {
      "code": "370503",
      "name": "河口区" },

    {
      "code": "370505",
      "name": "垦利区" },

    {
      "code": "370522",
      "name": "利津县" },

    {
      "code": "370523",
      "name": "广饶县" }] },



  {
    "code": "370600",
    "name": "烟台市",
    "areaList": [{
      "code": "370602",
      "name": "芝罘区" },

    {
      "code": "370611",
      "name": "福山区" },

    {
      "code": "370612",
      "name": "牟平区" },

    {
      "code": "370613",
      "name": "莱山区" },

    {
      "code": "370634",
      "name": "长岛县" },

    {
      "code": "370681",
      "name": "龙口市" },

    {
      "code": "370682",
      "name": "莱阳市" },

    {
      "code": "370683",
      "name": "莱州市" },

    {
      "code": "370684",
      "name": "蓬莱市" },

    {
      "code": "370685",
      "name": "招远市" },

    {
      "code": "370686",
      "name": "栖霞市" },

    {
      "code": "370687",
      "name": "海阳市" }] },



  {
    "code": "370700",
    "name": "潍坊市",
    "areaList": [{
      "code": "370702",
      "name": "潍城区" },

    {
      "code": "370703",
      "name": "寒亭区" },

    {
      "code": "370704",
      "name": "坊子区" },

    {
      "code": "370705",
      "name": "奎文区" },

    {
      "code": "370724",
      "name": "临朐县" },

    {
      "code": "370725",
      "name": "昌乐县" },

    {
      "code": "370781",
      "name": "青州市" },

    {
      "code": "370782",
      "name": "诸城市" },

    {
      "code": "370783",
      "name": "寿光市" },

    {
      "code": "370784",
      "name": "安丘市" },

    {
      "code": "370785",
      "name": "高密市" },

    {
      "code": "370786",
      "name": "昌邑市" }] },



  {
    "code": "370800",
    "name": "济宁市",
    "areaList": [{
      "code": "370811",
      "name": "任城区" },

    {
      "code": "370812",
      "name": "兖州区" },

    {
      "code": "370826",
      "name": "微山县" },

    {
      "code": "370827",
      "name": "鱼台县" },

    {
      "code": "370828",
      "name": "金乡县" },

    {
      "code": "370829",
      "name": "嘉祥县" },

    {
      "code": "370830",
      "name": "汶上县" },

    {
      "code": "370831",
      "name": "泗水县" },

    {
      "code": "370832",
      "name": "梁山县" },

    {
      "code": "370881",
      "name": "曲阜市" },

    {
      "code": "370883",
      "name": "邹城市" }] },



  {
    "code": "370900",
    "name": "泰安市",
    "areaList": [{
      "code": "370902",
      "name": "泰山区" },

    {
      "code": "370911",
      "name": "岱岳区" },

    {
      "code": "370921",
      "name": "宁阳县" },

    {
      "code": "370923",
      "name": "东平县" },

    {
      "code": "370982",
      "name": "新泰市" },

    {
      "code": "370983",
      "name": "肥城市" }] },



  {
    "code": "371000",
    "name": "威海市",
    "areaList": [{
      "code": "371002",
      "name": "环翠区" },

    {
      "code": "371003",
      "name": "文登区" },

    {
      "code": "371082",
      "name": "荣成市" },

    {
      "code": "371083",
      "name": "乳山市" }] },



  {
    "code": "371100",
    "name": "日照市",
    "areaList": [{
      "code": "371102",
      "name": "东港区" },

    {
      "code": "371103",
      "name": "岚山区" },

    {
      "code": "371121",
      "name": "五莲县" },

    {
      "code": "371122",
      "name": "莒县" }] },



  {
    "code": "371300",
    "name": "临沂市",
    "areaList": [{
      "code": "371302",
      "name": "兰山区" },

    {
      "code": "371311",
      "name": "罗庄区" },

    {
      "code": "371312",
      "name": "河东区" },

    {
      "code": "371321",
      "name": "沂南县" },

    {
      "code": "371322",
      "name": "郯城县" },

    {
      "code": "371323",
      "name": "沂水县" },

    {
      "code": "371324",
      "name": "兰陵县" },

    {
      "code": "371325",
      "name": "费县" },

    {
      "code": "371326",
      "name": "平邑县" },

    {
      "code": "371327",
      "name": "莒南县" },

    {
      "code": "371328",
      "name": "蒙阴县" },

    {
      "code": "371329",
      "name": "临沭县" }] },



  {
    "code": "371400",
    "name": "德州市",
    "areaList": [{
      "code": "371402",
      "name": "德城区" },

    {
      "code": "371403",
      "name": "陵城区" },

    {
      "code": "371422",
      "name": "宁津县" },

    {
      "code": "371423",
      "name": "庆云县" },

    {
      "code": "371424",
      "name": "临邑县" },

    {
      "code": "371425",
      "name": "齐河县" },

    {
      "code": "371426",
      "name": "平原县" },

    {
      "code": "371427",
      "name": "夏津县" },

    {
      "code": "371428",
      "name": "武城县" },

    {
      "code": "371481",
      "name": "乐陵市" },

    {
      "code": "371482",
      "name": "禹城市" }] },



  {
    "code": "371500",
    "name": "聊城市",
    "areaList": [{
      "code": "371502",
      "name": "东昌府区" },

    {
      "code": "371521",
      "name": "阳谷县" },

    {
      "code": "371522",
      "name": "莘县" },

    {
      "code": "371523",
      "name": "茌平县" },

    {
      "code": "371524",
      "name": "东阿县" },

    {
      "code": "371525",
      "name": "冠县" },

    {
      "code": "371526",
      "name": "高唐县" },

    {
      "code": "371581",
      "name": "临清市" }] },



  {
    "code": "371600",
    "name": "滨州市",
    "areaList": [{
      "code": "371602",
      "name": "滨城区" },

    {
      "code": "371603",
      "name": "沾化区" },

    {
      "code": "371621",
      "name": "惠民县" },

    {
      "code": "371622",
      "name": "阳信县" },

    {
      "code": "371623",
      "name": "无棣县" },

    {
      "code": "371625",
      "name": "博兴县" },

    {
      "code": "371681",
      "name": "邹平市" }] },



  {
    "code": "371700",
    "name": "菏泽市",
    "areaList": [{
      "code": "371702",
      "name": "牡丹区" },

    {
      "code": "371703",
      "name": "定陶区" },

    {
      "code": "371721",
      "name": "曹县" },

    {
      "code": "371722",
      "name": "单县" },

    {
      "code": "371723",
      "name": "成武县" },

    {
      "code": "371724",
      "name": "巨野县" },

    {
      "code": "371725",
      "name": "郓城县" },

    {
      "code": "371726",
      "name": "鄄城县" },

    {
      "code": "371728",
      "name": "东明县" }] }] },





{
  "code": "410000",
  "name": "河南省",
  "cityList": [{
    "code": "410100",
    "name": "郑州市",
    "areaList": [{
      "code": "410102",
      "name": "中原区" },

    {
      "code": "410103",
      "name": "二七区" },

    {
      "code": "410104",
      "name": "管城回族区" },

    {
      "code": "410105",
      "name": "金水区" },

    {
      "code": "410106",
      "name": "上街区" },

    {
      "code": "410108",
      "name": "惠济区" },

    {
      "code": "410122",
      "name": "中牟县" },

    {
      "code": "410181",
      "name": "巩义市" },

    {
      "code": "410182",
      "name": "荥阳市" },

    {
      "code": "410183",
      "name": "新密市" },

    {
      "code": "410184",
      "name": "新郑市" },

    {
      "code": "410185",
      "name": "登封市" }] },



  {
    "code": "410200",
    "name": "开封市",
    "areaList": [{
      "code": "410202",
      "name": "龙亭区" },

    {
      "code": "410203",
      "name": "顺河回族区" },

    {
      "code": "410204",
      "name": "鼓楼区" },

    {
      "code": "410205",
      "name": "禹王台区" },

    {
      "code": "410212",
      "name": "祥符区" },

    {
      "code": "410221",
      "name": "杞县" },

    {
      "code": "410222",
      "name": "通许县" },

    {
      "code": "410223",
      "name": "尉氏县" },

    {
      "code": "410225",
      "name": "兰考县" }] },



  {
    "code": "410300",
    "name": "洛阳市",
    "areaList": [{
      "code": "410302",
      "name": "老城区" },

    {
      "code": "410303",
      "name": "西工区" },

    {
      "code": "410304",
      "name": "瀍河回族区" },

    {
      "code": "410305",
      "name": "涧西区" },

    {
      "code": "410306",
      "name": "吉利区" },

    {
      "code": "410311",
      "name": "洛龙区" },

    {
      "code": "410322",
      "name": "孟津县" },

    {
      "code": "410323",
      "name": "新安县" },

    {
      "code": "410324",
      "name": "栾川县" },

    {
      "code": "410325",
      "name": "嵩县" },

    {
      "code": "410326",
      "name": "汝阳县" },

    {
      "code": "410327",
      "name": "宜阳县" },

    {
      "code": "410328",
      "name": "洛宁县" },

    {
      "code": "410329",
      "name": "伊川县" },

    {
      "code": "410381",
      "name": "偃师市" }] },



  {
    "code": "410400",
    "name": "平顶山市",
    "areaList": [{
      "code": "410402",
      "name": "新华区" },

    {
      "code": "410403",
      "name": "卫东区" },

    {
      "code": "410404",
      "name": "石龙区" },

    {
      "code": "410411",
      "name": "湛河区" },

    {
      "code": "410421",
      "name": "宝丰县" },

    {
      "code": "410422",
      "name": "叶县" },

    {
      "code": "410423",
      "name": "鲁山县" },

    {
      "code": "410425",
      "name": "郏县" },

    {
      "code": "410481",
      "name": "舞钢市" },

    {
      "code": "410482",
      "name": "汝州市" }] },



  {
    "code": "410500",
    "name": "安阳市",
    "areaList": [{
      "code": "410502",
      "name": "文峰区" },

    {
      "code": "410503",
      "name": "北关区" },

    {
      "code": "410505",
      "name": "殷都区" },

    {
      "code": "410506",
      "name": "龙安区" },

    {
      "code": "410522",
      "name": "安阳县" },

    {
      "code": "410523",
      "name": "汤阴县" },

    {
      "code": "410526",
      "name": "滑县" },

    {
      "code": "410527",
      "name": "内黄县" },

    {
      "code": "410581",
      "name": "林州市" }] },



  {
    "code": "410600",
    "name": "鹤壁市",
    "areaList": [{
      "code": "410602",
      "name": "鹤山区" },

    {
      "code": "410603",
      "name": "山城区" },

    {
      "code": "410611",
      "name": "淇滨区" },

    {
      "code": "410621",
      "name": "浚县" },

    {
      "code": "410622",
      "name": "淇县" }] },



  {
    "code": "410700",
    "name": "新乡市",
    "areaList": [{
      "code": "410702",
      "name": "红旗区" },

    {
      "code": "410703",
      "name": "卫滨区" },

    {
      "code": "410704",
      "name": "凤泉区" },

    {
      "code": "410711",
      "name": "牧野区" },

    {
      "code": "410721",
      "name": "新乡县" },

    {
      "code": "410724",
      "name": "获嘉县" },

    {
      "code": "410725",
      "name": "原阳县" },

    {
      "code": "410726",
      "name": "延津县" },

    {
      "code": "410727",
      "name": "封丘县" },

    {
      "code": "410728",
      "name": "长垣县" },

    {
      "code": "410781",
      "name": "卫辉市" },

    {
      "code": "410782",
      "name": "辉县市" }] },



  {
    "code": "410800",
    "name": "焦作市",
    "areaList": [{
      "code": "410802",
      "name": "解放区" },

    {
      "code": "410803",
      "name": "中站区" },

    {
      "code": "410804",
      "name": "马村区" },

    {
      "code": "410811",
      "name": "山阳区" },

    {
      "code": "410821",
      "name": "修武县" },

    {
      "code": "410822",
      "name": "博爱县" },

    {
      "code": "410823",
      "name": "武陟县" },

    {
      "code": "410825",
      "name": "温县" },

    {
      "code": "410882",
      "name": "沁阳市" },

    {
      "code": "410883",
      "name": "孟州市" }] },



  {
    "code": "410900",
    "name": "濮阳市",
    "areaList": [{
      "code": "410902",
      "name": "华龙区" },

    {
      "code": "410922",
      "name": "清丰县" },

    {
      "code": "410923",
      "name": "南乐县" },

    {
      "code": "410926",
      "name": "范县" },

    {
      "code": "410927",
      "name": "台前县" },

    {
      "code": "410928",
      "name": "濮阳县" }] },



  {
    "code": "411000",
    "name": "许昌市",
    "areaList": [{
      "code": "411002",
      "name": "魏都区" },

    {
      "code": "411003",
      "name": "建安区" },

    {
      "code": "411024",
      "name": "鄢陵县" },

    {
      "code": "411025",
      "name": "襄城县" },

    {
      "code": "411081",
      "name": "禹州市" },

    {
      "code": "411082",
      "name": "长葛市" }] },



  {
    "code": "411100",
    "name": "漯河市",
    "areaList": [{
      "code": "411102",
      "name": "源汇区" },

    {
      "code": "411103",
      "name": "郾城区" },

    {
      "code": "411104",
      "name": "召陵区" },

    {
      "code": "411121",
      "name": "舞阳县" },

    {
      "code": "411122",
      "name": "临颍县" }] },



  {
    "code": "411200",
    "name": "三门峡市",
    "areaList": [{
      "code": "411202",
      "name": "湖滨区" },

    {
      "code": "411203",
      "name": "陕州区" },

    {
      "code": "411221",
      "name": "渑池县" },

    {
      "code": "411224",
      "name": "卢氏县" },

    {
      "code": "411281",
      "name": "义马市" },

    {
      "code": "411282",
      "name": "灵宝市" }] },



  {
    "code": "411300",
    "name": "南阳市",
    "areaList": [{
      "code": "411302",
      "name": "宛城区" },

    {
      "code": "411303",
      "name": "卧龙区" },

    {
      "code": "411321",
      "name": "南召县" },

    {
      "code": "411322",
      "name": "方城县" },

    {
      "code": "411323",
      "name": "西峡县" },

    {
      "code": "411324",
      "name": "镇平县" },

    {
      "code": "411325",
      "name": "内乡县" },

    {
      "code": "411326",
      "name": "淅川县" },

    {
      "code": "411327",
      "name": "社旗县" },

    {
      "code": "411328",
      "name": "唐河县" },

    {
      "code": "411329",
      "name": "新野县" },

    {
      "code": "411330",
      "name": "桐柏县" },

    {
      "code": "411381",
      "name": "邓州市" }] },



  {
    "code": "411400",
    "name": "商丘市",
    "areaList": [{
      "code": "411402",
      "name": "梁园区" },

    {
      "code": "411403",
      "name": "睢阳区" },

    {
      "code": "411421",
      "name": "民权县" },

    {
      "code": "411422",
      "name": "睢县" },

    {
      "code": "411423",
      "name": "宁陵县" },

    {
      "code": "411424",
      "name": "柘城县" },

    {
      "code": "411425",
      "name": "虞城县" },

    {
      "code": "411426",
      "name": "夏邑县" },

    {
      "code": "411481",
      "name": "永城市" }] },



  {
    "code": "411500",
    "name": "信阳市",
    "areaList": [{
      "code": "411502",
      "name": "浉河区" },

    {
      "code": "411503",
      "name": "平桥区" },

    {
      "code": "411521",
      "name": "罗山县" },

    {
      "code": "411522",
      "name": "光山县" },

    {
      "code": "411523",
      "name": "新县" },

    {
      "code": "411524",
      "name": "商城县" },

    {
      "code": "411525",
      "name": "固始县" },

    {
      "code": "411526",
      "name": "潢川县" },

    {
      "code": "411527",
      "name": "淮滨县" },

    {
      "code": "411528",
      "name": "息县" }] },



  {
    "code": "411600",
    "name": "周口市",
    "areaList": [{
      "code": "411602",
      "name": "川汇区" },

    {
      "code": "411621",
      "name": "扶沟县" },

    {
      "code": "411622",
      "name": "西华县" },

    {
      "code": "411623",
      "name": "商水县" },

    {
      "code": "411624",
      "name": "沈丘县" },

    {
      "code": "411625",
      "name": "郸城县" },

    {
      "code": "411626",
      "name": "淮阳县" },

    {
      "code": "411627",
      "name": "太康县" },

    {
      "code": "411628",
      "name": "鹿邑县" },

    {
      "code": "411681",
      "name": "项城市" }] },



  {
    "code": "411700",
    "name": "驻马店市",
    "areaList": [{
      "code": "411702",
      "name": "驿城区" },

    {
      "code": "411721",
      "name": "西平县" },

    {
      "code": "411722",
      "name": "上蔡县" },

    {
      "code": "411723",
      "name": "平舆县" },

    {
      "code": "411724",
      "name": "正阳县" },

    {
      "code": "411725",
      "name": "确山县" },

    {
      "code": "411726",
      "name": "泌阳县" },

    {
      "code": "411727",
      "name": "汝南县" },

    {
      "code": "411728",
      "name": "遂平县" },

    {
      "code": "411729",
      "name": "新蔡县" }] }] },





{
  "code": "420000",
  "name": "湖北省",
  "cityList": [{
    "code": "420100",
    "name": "武汉市",
    "areaList": [{
      "code": "420102",
      "name": "江岸区" },

    {
      "code": "420103",
      "name": "江汉区" },

    {
      "code": "420104",
      "name": "硚口区" },

    {
      "code": "420105",
      "name": "汉阳区" },

    {
      "code": "420106",
      "name": "武昌区" },

    {
      "code": "420107",
      "name": "青山区" },

    {
      "code": "420111",
      "name": "洪山区" },

    {
      "code": "420112",
      "name": "东西湖区" },

    {
      "code": "420113",
      "name": "汉南区" },

    {
      "code": "420114",
      "name": "蔡甸区" },

    {
      "code": "420115",
      "name": "江夏区" },

    {
      "code": "420116",
      "name": "黄陂区" },

    {
      "code": "420117",
      "name": "新洲区" }] },



  {
    "code": "420200",
    "name": "黄石市",
    "areaList": [{
      "code": "420202",
      "name": "黄石港区" },

    {
      "code": "420203",
      "name": "西塞山区" },

    {
      "code": "420204",
      "name": "下陆区" },

    {
      "code": "420205",
      "name": "铁山区" },

    {
      "code": "420222",
      "name": "阳新县" },

    {
      "code": "420281",
      "name": "大冶市" }] },



  {
    "code": "420300",
    "name": "十堰市",
    "areaList": [{
      "code": "420302",
      "name": "茅箭区" },

    {
      "code": "420303",
      "name": "张湾区" },

    {
      "code": "420304",
      "name": "郧阳区" },

    {
      "code": "420322",
      "name": "郧西县" },

    {
      "code": "420323",
      "name": "竹山县" },

    {
      "code": "420324",
      "name": "竹溪县" },

    {
      "code": "420325",
      "name": "房县" },

    {
      "code": "420381",
      "name": "丹江口市" }] },



  {
    "code": "420500",
    "name": "宜昌市",
    "areaList": [{
      "code": "420502",
      "name": "西陵区" },

    {
      "code": "420503",
      "name": "伍家岗区" },

    {
      "code": "420504",
      "name": "点军区" },

    {
      "code": "420505",
      "name": "猇亭区" },

    {
      "code": "420506",
      "name": "夷陵区" },

    {
      "code": "420525",
      "name": "远安县" },

    {
      "code": "420526",
      "name": "兴山县" },

    {
      "code": "420527",
      "name": "秭归县" },

    {
      "code": "420528",
      "name": "长阳土家族自治县" },

    {
      "code": "420529",
      "name": "五峰土家族自治县" },

    {
      "code": "420581",
      "name": "宜都市" },

    {
      "code": "420582",
      "name": "当阳市" },

    {
      "code": "420583",
      "name": "枝江市" }] },



  {
    "code": "420600",
    "name": "襄阳市",
    "areaList": [{
      "code": "420602",
      "name": "襄城区" },

    {
      "code": "420606",
      "name": "樊城区" },

    {
      "code": "420607",
      "name": "襄州区" },

    {
      "code": "420624",
      "name": "南漳县" },

    {
      "code": "420625",
      "name": "谷城县" },

    {
      "code": "420626",
      "name": "保康县" },

    {
      "code": "420682",
      "name": "老河口市" },

    {
      "code": "420683",
      "name": "枣阳市" },

    {
      "code": "420684",
      "name": "宜城市" }] },



  {
    "code": "420700",
    "name": "鄂州市",
    "areaList": [{
      "code": "420702",
      "name": "梁子湖区" },

    {
      "code": "420703",
      "name": "华容区" },

    {
      "code": "420704",
      "name": "鄂城区" }] },



  {
    "code": "420800",
    "name": "荆门市",
    "areaList": [{
      "code": "420802",
      "name": "东宝区" },

    {
      "code": "420804",
      "name": "掇刀区" },

    {
      "code": "420822",
      "name": "沙洋县" },

    {
      "code": "420881",
      "name": "钟祥市" },

    {
      "code": "420882",
      "name": "京山市" }] },



  {
    "code": "420900",
    "name": "孝感市",
    "areaList": [{
      "code": "420902",
      "name": "孝南区" },

    {
      "code": "420921",
      "name": "孝昌县" },

    {
      "code": "420922",
      "name": "大悟县" },

    {
      "code": "420923",
      "name": "云梦县" },

    {
      "code": "420981",
      "name": "应城市" },

    {
      "code": "420982",
      "name": "安陆市" },

    {
      "code": "420984",
      "name": "汉川市" }] },



  {
    "code": "421000",
    "name": "荆州市",
    "areaList": [{
      "code": "421002",
      "name": "沙市区" },

    {
      "code": "421003",
      "name": "荆州区" },

    {
      "code": "421022",
      "name": "公安县" },

    {
      "code": "421023",
      "name": "监利县" },

    {
      "code": "421024",
      "name": "江陵县" },

    {
      "code": "421081",
      "name": "石首市" },

    {
      "code": "421083",
      "name": "洪湖市" },

    {
      "code": "421087",
      "name": "松滋市" }] },



  {
    "code": "421100",
    "name": "黄冈市",
    "areaList": [{
      "code": "421102",
      "name": "黄州区" },

    {
      "code": "421121",
      "name": "团风县" },

    {
      "code": "421122",
      "name": "红安县" },

    {
      "code": "421123",
      "name": "罗田县" },

    {
      "code": "421124",
      "name": "英山县" },

    {
      "code": "421125",
      "name": "浠水县" },

    {
      "code": "421126",
      "name": "蕲春县" },

    {
      "code": "421127",
      "name": "黄梅县" },

    {
      "code": "421181",
      "name": "麻城市" },

    {
      "code": "421182",
      "name": "武穴市" }] },



  {
    "code": "421200",
    "name": "咸宁市",
    "areaList": [{
      "code": "421202",
      "name": "咸安区" },

    {
      "code": "421221",
      "name": "嘉鱼县" },

    {
      "code": "421222",
      "name": "通城县" },

    {
      "code": "421223",
      "name": "崇阳县" },

    {
      "code": "421224",
      "name": "通山县" },

    {
      "code": "421281",
      "name": "赤壁市" }] },



  {
    "code": "421300",
    "name": "随州市",
    "areaList": [{
      "code": "421303",
      "name": "曾都区" },

    {
      "code": "421321",
      "name": "随县" },

    {
      "code": "421381",
      "name": "广水市" }] },



  {
    "code": "422800",
    "name": "恩施土家族苗族自治州",
    "areaList": [{
      "code": "422801",
      "name": "恩施市" },

    {
      "code": "422802",
      "name": "利川市" },

    {
      "code": "422822",
      "name": "建始县" },

    {
      "code": "422823",
      "name": "巴东县" },

    {
      "code": "422825",
      "name": "宣恩县" },

    {
      "code": "422826",
      "name": "咸丰县" },

    {
      "code": "422827",
      "name": "来凤县" },

    {
      "code": "422828",
      "name": "鹤峰县" }] }] },





{
  "code": "430000",
  "name": "湖南省",
  "cityList": [{
    "code": "430100",
    "name": "长沙市",
    "areaList": [{
      "code": "430102",
      "name": "芙蓉区" },

    {
      "code": "430103",
      "name": "天心区" },

    {
      "code": "430104",
      "name": "岳麓区" },

    {
      "code": "430105",
      "name": "开福区" },

    {
      "code": "430111",
      "name": "雨花区" },

    {
      "code": "430112",
      "name": "望城区" },

    {
      "code": "430121",
      "name": "长沙县" },

    {
      "code": "430181",
      "name": "浏阳市" },

    {
      "code": "430182",
      "name": "宁乡市" }] },



  {
    "code": "430200",
    "name": "株洲市",
    "areaList": [{
      "code": "430202",
      "name": "荷塘区" },

    {
      "code": "430203",
      "name": "芦淞区" },

    {
      "code": "430204",
      "name": "石峰区" },

    {
      "code": "430211",
      "name": "天元区" },

    {
      "code": "430212",
      "name": "渌口区" },

    {
      "code": "430223",
      "name": "攸县" },

    {
      "code": "430224",
      "name": "茶陵县" },

    {
      "code": "430225",
      "name": "炎陵县" },

    {
      "code": "430281",
      "name": "醴陵市" }] },



  {
    "code": "430300",
    "name": "湘潭市",
    "areaList": [{
      "code": "430302",
      "name": "雨湖区" },

    {
      "code": "430304",
      "name": "岳塘区" },

    {
      "code": "430321",
      "name": "湘潭县" },

    {
      "code": "430381",
      "name": "湘乡市" },

    {
      "code": "430382",
      "name": "韶山市" }] },



  {
    "code": "430400",
    "name": "衡阳市",
    "areaList": [{
      "code": "430405",
      "name": "珠晖区" },

    {
      "code": "430406",
      "name": "雁峰区" },

    {
      "code": "430407",
      "name": "石鼓区" },

    {
      "code": "430408",
      "name": "蒸湘区" },

    {
      "code": "430412",
      "name": "南岳区" },

    {
      "code": "430421",
      "name": "衡阳县" },

    {
      "code": "430422",
      "name": "衡南县" },

    {
      "code": "430423",
      "name": "衡山县" },

    {
      "code": "430424",
      "name": "衡东县" },

    {
      "code": "430426",
      "name": "祁东县" },

    {
      "code": "430481",
      "name": "耒阳市" },

    {
      "code": "430482",
      "name": "常宁市" }] },



  {
    "code": "430500",
    "name": "邵阳市",
    "areaList": [{
      "code": "430502",
      "name": "双清区" },

    {
      "code": "430503",
      "name": "大祥区" },

    {
      "code": "430511",
      "name": "北塔区" },

    {
      "code": "430521",
      "name": "邵东县" },

    {
      "code": "430522",
      "name": "新邵县" },

    {
      "code": "430523",
      "name": "邵阳县" },

    {
      "code": "430524",
      "name": "隆回县" },

    {
      "code": "430525",
      "name": "洞口县" },

    {
      "code": "430527",
      "name": "绥宁县" },

    {
      "code": "430528",
      "name": "新宁县" },

    {
      "code": "430529",
      "name": "城步苗族自治县" },

    {
      "code": "430581",
      "name": "武冈市" }] },



  {
    "code": "430600",
    "name": "岳阳市",
    "areaList": [{
      "code": "430602",
      "name": "岳阳楼区" },

    {
      "code": "430603",
      "name": "云溪区" },

    {
      "code": "430611",
      "name": "君山区" },

    {
      "code": "430621",
      "name": "岳阳县" },

    {
      "code": "430623",
      "name": "华容县" },

    {
      "code": "430624",
      "name": "湘阴县" },

    {
      "code": "430626",
      "name": "平江县" },

    {
      "code": "430681",
      "name": "汨罗市" },

    {
      "code": "430682",
      "name": "临湘市" }] },



  {
    "code": "430700",
    "name": "常德市",
    "areaList": [{
      "code": "430702",
      "name": "武陵区" },

    {
      "code": "430703",
      "name": "鼎城区" },

    {
      "code": "430721",
      "name": "安乡县" },

    {
      "code": "430722",
      "name": "汉寿县" },

    {
      "code": "430723",
      "name": "澧县" },

    {
      "code": "430724",
      "name": "临澧县" },

    {
      "code": "430725",
      "name": "桃源县" },

    {
      "code": "430726",
      "name": "石门县" },

    {
      "code": "430781",
      "name": "津市市" }] },



  {
    "code": "430800",
    "name": "张家界市",
    "areaList": [{
      "code": "430802",
      "name": "永定区" },

    {
      "code": "430811",
      "name": "武陵源区" },

    {
      "code": "430821",
      "name": "慈利县" },

    {
      "code": "430822",
      "name": "桑植县" }] },



  {
    "code": "430900",
    "name": "益阳市",
    "areaList": [{
      "code": "430902",
      "name": "资阳区" },

    {
      "code": "430903",
      "name": "赫山区" },

    {
      "code": "430921",
      "name": "南县" },

    {
      "code": "430922",
      "name": "桃江县" },

    {
      "code": "430923",
      "name": "安化县" },

    {
      "code": "430981",
      "name": "沅江市" }] },



  {
    "code": "431000",
    "name": "郴州市",
    "areaList": [{
      "code": "431002",
      "name": "北湖区" },

    {
      "code": "431003",
      "name": "苏仙区" },

    {
      "code": "431021",
      "name": "桂阳县" },

    {
      "code": "431022",
      "name": "宜章县" },

    {
      "code": "431023",
      "name": "永兴县" },

    {
      "code": "431024",
      "name": "嘉禾县" },

    {
      "code": "431025",
      "name": "临武县" },

    {
      "code": "431026",
      "name": "汝城县" },

    {
      "code": "431027",
      "name": "桂东县" },

    {
      "code": "431028",
      "name": "安仁县" },

    {
      "code": "431081",
      "name": "资兴市" }] },



  {
    "code": "431100",
    "name": "永州市",
    "areaList": [{
      "code": "431102",
      "name": "零陵区" },

    {
      "code": "431103",
      "name": "冷水滩区" },

    {
      "code": "431121",
      "name": "祁阳县" },

    {
      "code": "431122",
      "name": "东安县" },

    {
      "code": "431123",
      "name": "双牌县" },

    {
      "code": "431124",
      "name": "道县" },

    {
      "code": "431125",
      "name": "江永县" },

    {
      "code": "431126",
      "name": "宁远县" },

    {
      "code": "431127",
      "name": "蓝山县" },

    {
      "code": "431128",
      "name": "新田县" },

    {
      "code": "431129",
      "name": "江华瑶族自治县" }] },



  {
    "code": "431200",
    "name": "怀化市",
    "areaList": [{
      "code": "431202",
      "name": "鹤城区" },

    {
      "code": "431221",
      "name": "中方县" },

    {
      "code": "431222",
      "name": "沅陵县" },

    {
      "code": "431223",
      "name": "辰溪县" },

    {
      "code": "431224",
      "name": "溆浦县" },

    {
      "code": "431225",
      "name": "会同县" },

    {
      "code": "431226",
      "name": "麻阳苗族自治县" },

    {
      "code": "431227",
      "name": "新晃侗族自治县" },

    {
      "code": "431228",
      "name": "芷江侗族自治县" },

    {
      "code": "431229",
      "name": "靖州苗族侗族自治县" },

    {
      "code": "431230",
      "name": "通道侗族自治县" },

    {
      "code": "431281",
      "name": "洪江市" }] },



  {
    "code": "431300",
    "name": "娄底市",
    "areaList": [{
      "code": "431302",
      "name": "娄星区" },

    {
      "code": "431321",
      "name": "双峰县" },

    {
      "code": "431322",
      "name": "新化县" },

    {
      "code": "431381",
      "name": "冷水江市" },

    {
      "code": "431382",
      "name": "涟源市" }] },



  {
    "code": "433100",
    "name": "湘西土家族苗族自治州",
    "areaList": [{
      "code": "433101",
      "name": "吉首市" },

    {
      "code": "433122",
      "name": "泸溪县" },

    {
      "code": "433123",
      "name": "凤凰县" },

    {
      "code": "433124",
      "name": "花垣县" },

    {
      "code": "433125",
      "name": "保靖县" },

    {
      "code": "433126",
      "name": "古丈县" },

    {
      "code": "433127",
      "name": "永顺县" },

    {
      "code": "433130",
      "name": "龙山县" }] }] },





{
  "code": "440000",
  "name": "广东省",
  "cityList": [{
    "code": "440100",
    "name": "广州市",
    "areaList": [{
      "code": "440103",
      "name": "荔湾区" },

    {
      "code": "440104",
      "name": "越秀区" },

    {
      "code": "440105",
      "name": "海珠区" },

    {
      "code": "440106",
      "name": "天河区" },

    {
      "code": "440111",
      "name": "白云区" },

    {
      "code": "440112",
      "name": "黄埔区" },

    {
      "code": "440113",
      "name": "番禺区" },

    {
      "code": "440114",
      "name": "花都区" },

    {
      "code": "440115",
      "name": "南沙区" },

    {
      "code": "440117",
      "name": "从化区" },

    {
      "code": "440118",
      "name": "增城区" }] },



  {
    "code": "440200",
    "name": "韶关市",
    "areaList": [{
      "code": "440203",
      "name": "武江区" },

    {
      "code": "440204",
      "name": "浈江区" },

    {
      "code": "440205",
      "name": "曲江区" },

    {
      "code": "440222",
      "name": "始兴县" },

    {
      "code": "440224",
      "name": "仁化县" },

    {
      "code": "440229",
      "name": "翁源县" },

    {
      "code": "440232",
      "name": "乳源瑶族自治县" },

    {
      "code": "440233",
      "name": "新丰县" },

    {
      "code": "440281",
      "name": "乐昌市" },

    {
      "code": "440282",
      "name": "南雄市" }] },



  {
    "code": "440300",
    "name": "深圳市",
    "areaList": [{
      "code": "440303",
      "name": "罗湖区" },

    {
      "code": "440304",
      "name": "福田区" },

    {
      "code": "440305",
      "name": "南山区" },

    {
      "code": "440306",
      "name": "宝安区" },

    {
      "code": "440307",
      "name": "龙岗区" },

    {
      "code": "440308",
      "name": "盐田区" },

    {
      "code": "440309",
      "name": "龙华区" },

    {
      "code": "440310",
      "name": "坪山区" },

    {
      "code": "440311",
      "name": "光明区" }] },



  {
    "code": "440400",
    "name": "珠海市",
    "areaList": [{
      "code": "440402",
      "name": "香洲区" },

    {
      "code": "440403",
      "name": "斗门区" },

    {
      "code": "440404",
      "name": "金湾区" }] },



  {
    "code": "440500",
    "name": "汕头市",
    "areaList": [{
      "code": "440507",
      "name": "龙湖区" },

    {
      "code": "440511",
      "name": "金平区" },

    {
      "code": "440512",
      "name": "濠江区" },

    {
      "code": "440513",
      "name": "潮阳区" },

    {
      "code": "440514",
      "name": "潮南区" },

    {
      "code": "440515",
      "name": "澄海区" },

    {
      "code": "440523",
      "name": "南澳县" }] },



  {
    "code": "440600",
    "name": "佛山市",
    "areaList": [{
      "code": "440604",
      "name": "禅城区" },

    {
      "code": "440605",
      "name": "南海区" },

    {
      "code": "440606",
      "name": "顺德区" },

    {
      "code": "440607",
      "name": "三水区" },

    {
      "code": "440608",
      "name": "高明区" }] },



  {
    "code": "440700",
    "name": "江门市",
    "areaList": [{
      "code": "440703",
      "name": "蓬江区" },

    {
      "code": "440704",
      "name": "江海区" },

    {
      "code": "440705",
      "name": "新会区" },

    {
      "code": "440781",
      "name": "台山市" },

    {
      "code": "440783",
      "name": "开平市" },

    {
      "code": "440784",
      "name": "鹤山市" },

    {
      "code": "440785",
      "name": "恩平市" }] },



  {
    "code": "440800",
    "name": "湛江市",
    "areaList": [{
      "code": "440802",
      "name": "赤坎区" },

    {
      "code": "440803",
      "name": "霞山区" },

    {
      "code": "440804",
      "name": "坡头区" },

    {
      "code": "440811",
      "name": "麻章区" },

    {
      "code": "440823",
      "name": "遂溪县" },

    {
      "code": "440825",
      "name": "徐闻县" },

    {
      "code": "440881",
      "name": "廉江市" },

    {
      "code": "440882",
      "name": "雷州市" },

    {
      "code": "440883",
      "name": "吴川市" }] },



  {
    "code": "440900",
    "name": "茂名市",
    "areaList": [{
      "code": "440902",
      "name": "茂南区" },

    {
      "code": "440904",
      "name": "电白区" },

    {
      "code": "440981",
      "name": "高州市" },

    {
      "code": "440982",
      "name": "化州市" },

    {
      "code": "440983",
      "name": "信宜市" }] },



  {
    "code": "441200",
    "name": "肇庆市",
    "areaList": [{
      "code": "441202",
      "name": "端州区" },

    {
      "code": "441203",
      "name": "鼎湖区" },

    {
      "code": "441204",
      "name": "高要区" },

    {
      "code": "441223",
      "name": "广宁县" },

    {
      "code": "441224",
      "name": "怀集县" },

    {
      "code": "441225",
      "name": "封开县" },

    {
      "code": "441226",
      "name": "德庆县" },

    {
      "code": "441284",
      "name": "四会市" }] },



  {
    "code": "441300",
    "name": "惠州市",
    "areaList": [{
      "code": "441302",
      "name": "惠城区" },

    {
      "code": "441303",
      "name": "惠阳区" },

    {
      "code": "441322",
      "name": "博罗县" },

    {
      "code": "441323",
      "name": "惠东县" },

    {
      "code": "441324",
      "name": "龙门县" }] },



  {
    "code": "441400",
    "name": "梅州市",
    "areaList": [{
      "code": "441402",
      "name": "梅江区" },

    {
      "code": "441403",
      "name": "梅县区" },

    {
      "code": "441422",
      "name": "大埔县" },

    {
      "code": "441423",
      "name": "丰顺县" },

    {
      "code": "441424",
      "name": "五华县" },

    {
      "code": "441426",
      "name": "平远县" },

    {
      "code": "441427",
      "name": "蕉岭县" },

    {
      "code": "441481",
      "name": "兴宁市" }] },



  {
    "code": "441500",
    "name": "汕尾市",
    "areaList": [{
      "code": "441502",
      "name": "城区" },

    {
      "code": "441521",
      "name": "海丰县" },

    {
      "code": "441523",
      "name": "陆河县" },

    {
      "code": "441581",
      "name": "陆丰市" }] },



  {
    "code": "441600",
    "name": "河源市",
    "areaList": [{
      "code": "441602",
      "name": "源城区" },

    {
      "code": "441621",
      "name": "紫金县" },

    {
      "code": "441622",
      "name": "龙川县" },

    {
      "code": "441623",
      "name": "连平县" },

    {
      "code": "441624",
      "name": "和平县" },

    {
      "code": "441625",
      "name": "东源县" }] },



  {
    "code": "441700",
    "name": "阳江市",
    "areaList": [{
      "code": "441702",
      "name": "江城区" },

    {
      "code": "441704",
      "name": "阳东区" },

    {
      "code": "441721",
      "name": "阳西县" },

    {
      "code": "441781",
      "name": "阳春市" }] },



  {
    "code": "441800",
    "name": "清远市",
    "areaList": [{
      "code": "441802",
      "name": "清城区" },

    {
      "code": "441803",
      "name": "清新区" },

    {
      "code": "441821",
      "name": "佛冈县" },

    {
      "code": "441823",
      "name": "阳山县" },

    {
      "code": "441825",
      "name": "连山壮族瑶族自治县" },

    {
      "code": "441826",
      "name": "连南瑶族自治县" },

    {
      "code": "441881",
      "name": "英德市" },

    {
      "code": "441882",
      "name": "连州市" }] },



  {
    "code": "441900",
    "name": "东莞市",
    "areaList": [] },

  {
    "code": "442000",
    "name": "中山市",
    "areaList": [] },

  {
    "code": "445100",
    "name": "潮州市",
    "areaList": [{
      "code": "445102",
      "name": "湘桥区" },

    {
      "code": "445103",
      "name": "潮安区" },

    {
      "code": "445122",
      "name": "饶平县" }] },



  {
    "code": "445200",
    "name": "揭阳市",
    "areaList": [{
      "code": "445202",
      "name": "榕城区" },

    {
      "code": "445203",
      "name": "揭东区" },

    {
      "code": "445222",
      "name": "揭西县" },

    {
      "code": "445224",
      "name": "惠来县" },

    {
      "code": "445281",
      "name": "普宁市" }] },



  {
    "code": "445300",
    "name": "云浮市",
    "areaList": [{
      "code": "445302",
      "name": "云城区" },

    {
      "code": "445303",
      "name": "云安区" },

    {
      "code": "445321",
      "name": "新兴县" },

    {
      "code": "445322",
      "name": "郁南县" },

    {
      "code": "445381",
      "name": "罗定市" }] }] },





{
  "code": "450000",
  "name": "广西壮族自治区",
  "cityList": [{
    "code": "450100",
    "name": "南宁市",
    "areaList": [{
      "code": "450102",
      "name": "兴宁区" },

    {
      "code": "450103",
      "name": "青秀区" },

    {
      "code": "450105",
      "name": "江南区" },

    {
      "code": "450107",
      "name": "西乡塘区" },

    {
      "code": "450108",
      "name": "良庆区" },

    {
      "code": "450109",
      "name": "邕宁区" },

    {
      "code": "450110",
      "name": "武鸣区" },

    {
      "code": "450123",
      "name": "隆安县" },

    {
      "code": "450124",
      "name": "马山县" },

    {
      "code": "450125",
      "name": "上林县" },

    {
      "code": "450126",
      "name": "宾阳县" },

    {
      "code": "450127",
      "name": "横县" }] },



  {
    "code": "450200",
    "name": "柳州市",
    "areaList": [{
      "code": "450202",
      "name": "城中区" },

    {
      "code": "450203",
      "name": "鱼峰区" },

    {
      "code": "450204",
      "name": "柳南区" },

    {
      "code": "450205",
      "name": "柳北区" },

    {
      "code": "450206",
      "name": "柳江区" },

    {
      "code": "450222",
      "name": "柳城县" },

    {
      "code": "450223",
      "name": "鹿寨县" },

    {
      "code": "450224",
      "name": "融安县" },

    {
      "code": "450225",
      "name": "融水苗族自治县" },

    {
      "code": "450226",
      "name": "三江侗族自治县" }] },



  {
    "code": "450300",
    "name": "桂林市",
    "areaList": [{
      "code": "450302",
      "name": "秀峰区" },

    {
      "code": "450303",
      "name": "叠彩区" },

    {
      "code": "450304",
      "name": "象山区" },

    {
      "code": "450305",
      "name": "七星区" },

    {
      "code": "450311",
      "name": "雁山区" },

    {
      "code": "450312",
      "name": "临桂区" },

    {
      "code": "450321",
      "name": "阳朔县" },

    {
      "code": "450323",
      "name": "灵川县" },

    {
      "code": "450324",
      "name": "全州县" },

    {
      "code": "450325",
      "name": "兴安县" },

    {
      "code": "450326",
      "name": "永福县" },

    {
      "code": "450327",
      "name": "灌阳县" },

    {
      "code": "450328",
      "name": "龙胜各族自治县" },

    {
      "code": "450329",
      "name": "资源县" },

    {
      "code": "450330",
      "name": "平乐县" },

    {
      "code": "450381",
      "name": "荔浦市" },

    {
      "code": "450332",
      "name": "恭城瑶族自治县" }] },



  {
    "code": "450400",
    "name": "梧州市",
    "areaList": [{
      "code": "450403",
      "name": "万秀区" },

    {
      "code": "450405",
      "name": "长洲区" },

    {
      "code": "450406",
      "name": "龙圩区" },

    {
      "code": "450421",
      "name": "苍梧县" },

    {
      "code": "450422",
      "name": "藤县" },

    {
      "code": "450423",
      "name": "蒙山县" },

    {
      "code": "450481",
      "name": "岑溪市" }] },



  {
    "code": "450500",
    "name": "北海市",
    "areaList": [{
      "code": "450502",
      "name": "海城区" },

    {
      "code": "450503",
      "name": "银海区" },

    {
      "code": "450512",
      "name": "铁山港区" },

    {
      "code": "450521",
      "name": "合浦县" }] },



  {
    "code": "450600",
    "name": "防城港市",
    "areaList": [{
      "code": "450602",
      "name": "港口区" },

    {
      "code": "450603",
      "name": "防城区" },

    {
      "code": "450621",
      "name": "上思县" },

    {
      "code": "450681",
      "name": "东兴市" }] },



  {
    "code": "450700",
    "name": "钦州市",
    "areaList": [{
      "code": "450702",
      "name": "钦南区" },

    {
      "code": "450703",
      "name": "钦北区" },

    {
      "code": "450721",
      "name": "灵山县" },

    {
      "code": "450722",
      "name": "浦北县" }] },



  {
    "code": "450800",
    "name": "贵港市",
    "areaList": [{
      "code": "450802",
      "name": "港北区" },

    {
      "code": "450803",
      "name": "港南区" },

    {
      "code": "450804",
      "name": "覃塘区" },

    {
      "code": "450821",
      "name": "平南县" },

    {
      "code": "450881",
      "name": "桂平市" }] },



  {
    "code": "450900",
    "name": "玉林市",
    "areaList": [{
      "code": "450902",
      "name": "玉州区" },

    {
      "code": "450903",
      "name": "福绵区" },

    {
      "code": "450921",
      "name": "容县" },

    {
      "code": "450922",
      "name": "陆川县" },

    {
      "code": "450923",
      "name": "博白县" },

    {
      "code": "450924",
      "name": "兴业县" },

    {
      "code": "450981",
      "name": "北流市" }] },



  {
    "code": "451000",
    "name": "百色市",
    "areaList": [{
      "code": "451002",
      "name": "右江区" },

    {
      "code": "451021",
      "name": "田阳县" },

    {
      "code": "451022",
      "name": "田东县" },

    {
      "code": "451023",
      "name": "平果县" },

    {
      "code": "451024",
      "name": "德保县" },

    {
      "code": "451026",
      "name": "那坡县" },

    {
      "code": "451027",
      "name": "凌云县" },

    {
      "code": "451028",
      "name": "乐业县" },

    {
      "code": "451029",
      "name": "田林县" },

    {
      "code": "451030",
      "name": "西林县" },

    {
      "code": "451031",
      "name": "隆林各族自治县" },

    {
      "code": "451081",
      "name": "靖西市" }] },



  {
    "code": "451100",
    "name": "贺州市",
    "areaList": [{
      "code": "451102",
      "name": "八步区" },

    {
      "code": "451103",
      "name": "平桂区" },

    {
      "code": "451121",
      "name": "昭平县" },

    {
      "code": "451122",
      "name": "钟山县" },

    {
      "code": "451123",
      "name": "富川瑶族自治县" }] },



  {
    "code": "451200",
    "name": "河池市",
    "areaList": [{
      "code": "451202",
      "name": "金城江区" },

    {
      "code": "451203",
      "name": "宜州区" },

    {
      "code": "451221",
      "name": "南丹县" },

    {
      "code": "451222",
      "name": "天峨县" },

    {
      "code": "451223",
      "name": "凤山县" },

    {
      "code": "451224",
      "name": "东兰县" },

    {
      "code": "451225",
      "name": "罗城仫佬族自治县" },

    {
      "code": "451226",
      "name": "环江毛南族自治县" },

    {
      "code": "451227",
      "name": "巴马瑶族自治县" },

    {
      "code": "451228",
      "name": "都安瑶族自治县" },

    {
      "code": "451229",
      "name": "大化瑶族自治县" }] },



  {
    "code": "451300",
    "name": "来宾市",
    "areaList": [{
      "code": "451302",
      "name": "兴宾区" },

    {
      "code": "451321",
      "name": "忻城县" },

    {
      "code": "451322",
      "name": "象州县" },

    {
      "code": "451323",
      "name": "武宣县" },

    {
      "code": "451324",
      "name": "金秀瑶族自治县" },

    {
      "code": "451381",
      "name": "合山市" }] },



  {
    "code": "451400",
    "name": "崇左市",
    "areaList": [{
      "code": "451402",
      "name": "江州区" },

    {
      "code": "451421",
      "name": "扶绥县" },

    {
      "code": "451422",
      "name": "宁明县" },

    {
      "code": "451423",
      "name": "龙州县" },

    {
      "code": "451424",
      "name": "大新县" },

    {
      "code": "451425",
      "name": "天等县" },

    {
      "code": "451481",
      "name": "凭祥市" }] }] },





{
  "code": "460000",
  "name": "海南省",
  "cityList": [{
    "code": "460100",
    "name": "海口市",
    "areaList": [{
      "code": "460105",
      "name": "秀英区" },

    {
      "code": "460106",
      "name": "龙华区" },

    {
      "code": "460107",
      "name": "琼山区" },

    {
      "code": "460108",
      "name": "美兰区" }] },



  {
    "code": "460200",
    "name": "三亚市",
    "areaList": [{
      "code": "460202",
      "name": "海棠区" },

    {
      "code": "460203",
      "name": "吉阳区" },

    {
      "code": "460204",
      "name": "天涯区" },

    {
      "code": "460205",
      "name": "崖州区" }] },



  {
    "code": "460300",
    "name": "三沙市",
    "areaList": [] },

  {
    "code": "460400",
    "name": "儋州市",
    "areaList": [] }] },



{
  "code": "500000",
  "name": "重庆市",
  "cityList": [{
    "code": "500000",
    "name": "重庆市",
    "areaList": [{
      "code": "500101",
      "name": "万州区" },

    {
      "code": "500102",
      "name": "涪陵区" },

    {
      "code": "500103",
      "name": "渝中区" },

    {
      "code": "500104",
      "name": "大渡口区" },

    {
      "code": "500105",
      "name": "江北区" },

    {
      "code": "500106",
      "name": "沙坪坝区" },

    {
      "code": "500107",
      "name": "九龙坡区" },

    {
      "code": "500108",
      "name": "南岸区" },

    {
      "code": "500109",
      "name": "北碚区" },

    {
      "code": "500110",
      "name": "綦江区" },

    {
      "code": "500111",
      "name": "大足区" },

    {
      "code": "500112",
      "name": "渝北区" },

    {
      "code": "500113",
      "name": "巴南区" },

    {
      "code": "500114",
      "name": "黔江区" },

    {
      "code": "500115",
      "name": "长寿区" },

    {
      "code": "500116",
      "name": "江津区" },

    {
      "code": "500117",
      "name": "合川区" },

    {
      "code": "500118",
      "name": "永川区" },

    {
      "code": "500119",
      "name": "南川区" },

    {
      "code": "500120",
      "name": "璧山区" },

    {
      "code": "500151",
      "name": "铜梁区" },

    {
      "code": "500152",
      "name": "潼南区" },

    {
      "code": "500153",
      "name": "荣昌区" },

    {
      "code": "500154",
      "name": "开州区" },

    {
      "code": "500155",
      "name": "梁平区" },

    {
      "code": "500156",
      "name": "武隆区" },

    {
      "code": "500229",
      "name": "城口县" },

    {
      "code": "500230",
      "name": "丰都县" },

    {
      "code": "500231",
      "name": "垫江县" },

    {
      "code": "500233",
      "name": "忠县" },

    {
      "code": "500235",
      "name": "云阳县" },

    {
      "code": "500236",
      "name": "奉节县" },

    {
      "code": "500237",
      "name": "巫山县" },

    {
      "code": "500238",
      "name": "巫溪县" },

    {
      "code": "500240",
      "name": "石柱土家族自治县" },

    {
      "code": "500241",
      "name": "秀山土家族苗族自治县" },

    {
      "code": "500242",
      "name": "酉阳土家族苗族自治县" },

    {
      "code": "500243",
      "name": "彭水苗族土家族自治县" }] }] },




{
  "code": "510000",
  "name": "四川省",
  "cityList": [{
    "code": "510100",
    "name": "成都市",
    "areaList": [{
      "code": "510104",
      "name": "锦江区" },

    {
      "code": "510105",
      "name": "青羊区" },

    {
      "code": "510106",
      "name": "金牛区" },

    {
      "code": "510107",
      "name": "武侯区" },

    {
      "code": "510108",
      "name": "成华区" },

    {
      "code": "510112",
      "name": "龙泉驿区" },

    {
      "code": "510113",
      "name": "青白江区" },

    {
      "code": "510114",
      "name": "新都区" },

    {
      "code": "510115",
      "name": "温江区" },

    {
      "code": "510116",
      "name": "双流区" },

    {
      "code": "510117",
      "name": "郫都区" },

    {
      "code": "510121",
      "name": "金堂县" },

    {
      "code": "510129",
      "name": "大邑县" },

    {
      "code": "510131",
      "name": "蒲江县" },

    {
      "code": "510132",
      "name": "新津县" },

    {
      "code": "510181",
      "name": "都江堰市" },

    {
      "code": "510182",
      "name": "彭州市" },

    {
      "code": "510183",
      "name": "邛崃市" },

    {
      "code": "510184",
      "name": "崇州市" },

    {
      "code": "510185",
      "name": "简阳市" }] },



  {
    "code": "510300",
    "name": "自贡市",
    "areaList": [{
      "code": "510302",
      "name": "自流井区" },

    {
      "code": "510303",
      "name": "贡井区" },

    {
      "code": "510304",
      "name": "大安区" },

    {
      "code": "510311",
      "name": "沿滩区" },

    {
      "code": "510321",
      "name": "荣县" },

    {
      "code": "510322",
      "name": "富顺县" }] },



  {
    "code": "510400",
    "name": "攀枝花市",
    "areaList": [{
      "code": "510402",
      "name": "东区" },

    {
      "code": "510403",
      "name": "西区" },

    {
      "code": "510411",
      "name": "仁和区" },

    {
      "code": "510421",
      "name": "米易县" },

    {
      "code": "510422",
      "name": "盐边县" }] },



  {
    "code": "510500",
    "name": "泸州市",
    "areaList": [{
      "code": "510502",
      "name": "江阳区" },

    {
      "code": "510503",
      "name": "纳溪区" },

    {
      "code": "510504",
      "name": "龙马潭区" },

    {
      "code": "510521",
      "name": "泸县" },

    {
      "code": "510522",
      "name": "合江县" },

    {
      "code": "510524",
      "name": "叙永县" },

    {
      "code": "510525",
      "name": "古蔺县" }] },



  {
    "code": "510600",
    "name": "德阳市",
    "areaList": [{
      "code": "510603",
      "name": "旌阳区" },

    {
      "code": "510604",
      "name": "罗江区" },

    {
      "code": "510623",
      "name": "中江县" },

    {
      "code": "510681",
      "name": "广汉市" },

    {
      "code": "510682",
      "name": "什邡市" },

    {
      "code": "510683",
      "name": "绵竹市" }] },



  {
    "code": "510700",
    "name": "绵阳市",
    "areaList": [{
      "code": "510703",
      "name": "涪城区" },

    {
      "code": "510704",
      "name": "游仙区" },

    {
      "code": "510705",
      "name": "安州区" },

    {
      "code": "510722",
      "name": "三台县" },

    {
      "code": "510723",
      "name": "盐亭县" },

    {
      "code": "510725",
      "name": "梓潼县" },

    {
      "code": "510726",
      "name": "北川羌族自治县" },

    {
      "code": "510727",
      "name": "平武县" },

    {
      "code": "510781",
      "name": "江油市" }] },



  {
    "code": "510800",
    "name": "广元市",
    "areaList": [{
      "code": "510802",
      "name": "利州区" },

    {
      "code": "510811",
      "name": "昭化区" },

    {
      "code": "510812",
      "name": "朝天区" },

    {
      "code": "510821",
      "name": "旺苍县" },

    {
      "code": "510822",
      "name": "青川县" },

    {
      "code": "510823",
      "name": "剑阁县" },

    {
      "code": "510824",
      "name": "苍溪县" }] },



  {
    "code": "510900",
    "name": "遂宁市",
    "areaList": [{
      "code": "510903",
      "name": "船山区" },

    {
      "code": "510904",
      "name": "安居区" },

    {
      "code": "510921",
      "name": "蓬溪县" },

    {
      "code": "510922",
      "name": "射洪县" },

    {
      "code": "510923",
      "name": "大英县" }] },



  {
    "code": "511000",
    "name": "内江市",
    "areaList": [{
      "code": "511002",
      "name": "市中区" },

    {
      "code": "511011",
      "name": "东兴区" },

    {
      "code": "511024",
      "name": "威远县" },

    {
      "code": "511025",
      "name": "资中县" },

    {
      "code": "511083",
      "name": "隆昌市" }] },



  {
    "code": "511100",
    "name": "乐山市",
    "areaList": [{
      "code": "511102",
      "name": "市中区" },

    {
      "code": "511111",
      "name": "沙湾区" },

    {
      "code": "511112",
      "name": "五通桥区" },

    {
      "code": "511113",
      "name": "金口河区" },

    {
      "code": "511123",
      "name": "犍为县" },

    {
      "code": "511124",
      "name": "井研县" },

    {
      "code": "511126",
      "name": "夹江县" },

    {
      "code": "511129",
      "name": "沐川县" },

    {
      "code": "511132",
      "name": "峨边彝族自治县" },

    {
      "code": "511133",
      "name": "马边彝族自治县" },

    {
      "code": "511181",
      "name": "峨眉山市" }] },



  {
    "code": "511300",
    "name": "南充市",
    "areaList": [{
      "code": "511302",
      "name": "顺庆区" },

    {
      "code": "511303",
      "name": "高坪区" },

    {
      "code": "511304",
      "name": "嘉陵区" },

    {
      "code": "511321",
      "name": "南部县" },

    {
      "code": "511322",
      "name": "营山县" },

    {
      "code": "511323",
      "name": "蓬安县" },

    {
      "code": "511324",
      "name": "仪陇县" },

    {
      "code": "511325",
      "name": "西充县" },

    {
      "code": "511381",
      "name": "阆中市" }] },



  {
    "code": "511400",
    "name": "眉山市",
    "areaList": [{
      "code": "511402",
      "name": "东坡区" },

    {
      "code": "511403",
      "name": "彭山区" },

    {
      "code": "511421",
      "name": "仁寿县" },

    {
      "code": "511423",
      "name": "洪雅县" },

    {
      "code": "511424",
      "name": "丹棱县" },

    {
      "code": "511425",
      "name": "青神县" }] },



  {
    "code": "511500",
    "name": "宜宾市",
    "areaList": [{
      "code": "511502",
      "name": "翠屏区" },

    {
      "code": "511503",
      "name": "南溪区" },

    {
      "code": "511504",
      "name": "叙州区" },

    {
      "code": "511523",
      "name": "江安县" },

    {
      "code": "511524",
      "name": "长宁县" },

    {
      "code": "511525",
      "name": "高县" },

    {
      "code": "511526",
      "name": "珙县" },

    {
      "code": "511527",
      "name": "筠连县" },

    {
      "code": "511528",
      "name": "兴文县" },

    {
      "code": "511529",
      "name": "屏山县" }] },



  {
    "code": "511600",
    "name": "广安市",
    "areaList": [{
      "code": "511602",
      "name": "广安区" },

    {
      "code": "511603",
      "name": "前锋区" },

    {
      "code": "511621",
      "name": "岳池县" },

    {
      "code": "511622",
      "name": "武胜县" },

    {
      "code": "511623",
      "name": "邻水县" },

    {
      "code": "511681",
      "name": "华蓥市" }] },



  {
    "code": "511700",
    "name": "达州市",
    "areaList": [{
      "code": "511702",
      "name": "通川区" },

    {
      "code": "511703",
      "name": "达川区" },

    {
      "code": "511722",
      "name": "宣汉县" },

    {
      "code": "511723",
      "name": "开江县" },

    {
      "code": "511724",
      "name": "大竹县" },

    {
      "code": "511725",
      "name": "渠县" },

    {
      "code": "511781",
      "name": "万源市" }] },



  {
    "code": "511800",
    "name": "雅安市",
    "areaList": [{
      "code": "511802",
      "name": "雨城区" },

    {
      "code": "511803",
      "name": "名山区" },

    {
      "code": "511822",
      "name": "荥经县" },

    {
      "code": "511823",
      "name": "汉源县" },

    {
      "code": "511824",
      "name": "石棉县" },

    {
      "code": "511825",
      "name": "天全县" },

    {
      "code": "511826",
      "name": "芦山县" },

    {
      "code": "511827",
      "name": "宝兴县" }] },



  {
    "code": "511900",
    "name": "巴中市",
    "areaList": [{
      "code": "511902",
      "name": "巴州区" },

    {
      "code": "511903",
      "name": "恩阳区" },

    {
      "code": "511921",
      "name": "通江县" },

    {
      "code": "511922",
      "name": "南江县" },

    {
      "code": "511923",
      "name": "平昌县" }] },



  {
    "code": "512000",
    "name": "资阳市",
    "areaList": [{
      "code": "512002",
      "name": "雁江区" },

    {
      "code": "512021",
      "name": "安岳县" },

    {
      "code": "512022",
      "name": "乐至县" }] },



  {
    "code": "513200",
    "name": "阿坝藏族羌族自治州",
    "areaList": [{
      "code": "513201",
      "name": "马尔康市" },

    {
      "code": "513221",
      "name": "汶川县" },

    {
      "code": "513222",
      "name": "理县" },

    {
      "code": "513223",
      "name": "茂县" },

    {
      "code": "513224",
      "name": "松潘县" },

    {
      "code": "513225",
      "name": "九寨沟县" },

    {
      "code": "513226",
      "name": "金川县" },

    {
      "code": "513227",
      "name": "小金县" },

    {
      "code": "513228",
      "name": "黑水县" },

    {
      "code": "513230",
      "name": "壤塘县" },

    {
      "code": "513231",
      "name": "阿坝县" },

    {
      "code": "513232",
      "name": "若尔盖县" },

    {
      "code": "513233",
      "name": "红原县" }] },



  {
    "code": "513300",
    "name": "甘孜藏族自治州",
    "areaList": [{
      "code": "513301",
      "name": "康定市" },

    {
      "code": "513322",
      "name": "泸定县" },

    {
      "code": "513323",
      "name": "丹巴县" },

    {
      "code": "513324",
      "name": "九龙县" },

    {
      "code": "513325",
      "name": "雅江县" },

    {
      "code": "513326",
      "name": "道孚县" },

    {
      "code": "513327",
      "name": "炉霍县" },

    {
      "code": "513328",
      "name": "甘孜县" },

    {
      "code": "513329",
      "name": "新龙县" },

    {
      "code": "513330",
      "name": "德格县" },

    {
      "code": "513331",
      "name": "白玉县" },

    {
      "code": "513332",
      "name": "石渠县" },

    {
      "code": "513333",
      "name": "色达县" },

    {
      "code": "513334",
      "name": "理塘县" },

    {
      "code": "513335",
      "name": "巴塘县" },

    {
      "code": "513336",
      "name": "乡城县" },

    {
      "code": "513337",
      "name": "稻城县" },

    {
      "code": "513338",
      "name": "得荣县" }] },



  {
    "code": "513400",
    "name": "凉山彝族自治州",
    "areaList": [{
      "code": "513401",
      "name": "西昌市" },

    {
      "code": "513422",
      "name": "木里藏族自治县" },

    {
      "code": "513423",
      "name": "盐源县" },

    {
      "code": "513424",
      "name": "德昌县" },

    {
      "code": "513425",
      "name": "会理县" },

    {
      "code": "513426",
      "name": "会东县" },

    {
      "code": "513427",
      "name": "宁南县" },

    {
      "code": "513428",
      "name": "普格县" },

    {
      "code": "513429",
      "name": "布拖县" },

    {
      "code": "513430",
      "name": "金阳县" },

    {
      "code": "513431",
      "name": "昭觉县" },

    {
      "code": "513432",
      "name": "喜德县" },

    {
      "code": "513433",
      "name": "冕宁县" },

    {
      "code": "513434",
      "name": "越西县" },

    {
      "code": "513435",
      "name": "甘洛县" },

    {
      "code": "513436",
      "name": "美姑县" },

    {
      "code": "513437",
      "name": "雷波县" }] }] },





{
  "code": "520000",
  "name": "贵州省",
  "cityList": [{
    "code": "520100",
    "name": "贵阳市",
    "areaList": [{
      "code": "520102",
      "name": "南明区" },

    {
      "code": "520103",
      "name": "云岩区" },

    {
      "code": "520111",
      "name": "花溪区" },

    {
      "code": "520112",
      "name": "乌当区" },

    {
      "code": "520113",
      "name": "白云区" },

    {
      "code": "520115",
      "name": "观山湖区" },

    {
      "code": "520121",
      "name": "开阳县" },

    {
      "code": "520122",
      "name": "息烽县" },

    {
      "code": "520123",
      "name": "修文县" },

    {
      "code": "520181",
      "name": "清镇市" }] },



  {
    "code": "520200",
    "name": "六盘水市",
    "areaList": [{
      "code": "520201",
      "name": "钟山区" },

    {
      "code": "520203",
      "name": "六枝特区" },

    {
      "code": "520221",
      "name": "水城县" },

    {
      "code": "520281",
      "name": "盘州市" }] },



  {
    "code": "520300",
    "name": "遵义市",
    "areaList": [{
      "code": "520302",
      "name": "红花岗区" },

    {
      "code": "520303",
      "name": "汇川区" },

    {
      "code": "520304",
      "name": "播州区" },

    {
      "code": "520322",
      "name": "桐梓县" },

    {
      "code": "520323",
      "name": "绥阳县" },

    {
      "code": "520324",
      "name": "正安县" },

    {
      "code": "520325",
      "name": "道真仡佬族苗族自治县" },

    {
      "code": "520326",
      "name": "务川仡佬族苗族自治县" },

    {
      "code": "520327",
      "name": "凤冈县" },

    {
      "code": "520328",
      "name": "湄潭县" },

    {
      "code": "520329",
      "name": "余庆县" },

    {
      "code": "520330",
      "name": "习水县" },

    {
      "code": "520381",
      "name": "赤水市" },

    {
      "code": "520382",
      "name": "仁怀市" }] },



  {
    "code": "520400",
    "name": "安顺市",
    "areaList": [{
      "code": "520402",
      "name": "西秀区" },

    {
      "code": "520403",
      "name": "平坝区" },

    {
      "code": "520422",
      "name": "普定县" },

    {
      "code": "520423",
      "name": "镇宁布依族苗族自治县" },

    {
      "code": "520424",
      "name": "关岭布依族苗族自治县" },

    {
      "code": "520425",
      "name": "紫云苗族布依族自治县" }] },



  {
    "code": "520500",
    "name": "毕节市",
    "areaList": [{
      "code": "520502",
      "name": "七星关区" },

    {
      "code": "520521",
      "name": "大方县" },

    {
      "code": "520522",
      "name": "黔西县" },

    {
      "code": "520523",
      "name": "金沙县" },

    {
      "code": "520524",
      "name": "织金县" },

    {
      "code": "520525",
      "name": "纳雍县" },

    {
      "code": "520526",
      "name": "威宁彝族回族苗族自治县" },

    {
      "code": "520527",
      "name": "赫章县" }] },



  {
    "code": "520600",
    "name": "铜仁市",
    "areaList": [{
      "code": "520602",
      "name": "碧江区" },

    {
      "code": "520603",
      "name": "万山区" },

    {
      "code": "520621",
      "name": "江口县" },

    {
      "code": "520622",
      "name": "玉屏侗族自治县" },

    {
      "code": "520623",
      "name": "石阡县" },

    {
      "code": "520624",
      "name": "思南县" },

    {
      "code": "520625",
      "name": "印江土家族苗族自治县" },

    {
      "code": "520626",
      "name": "德江县" },

    {
      "code": "520627",
      "name": "沿河土家族自治县" },

    {
      "code": "520628",
      "name": "松桃苗族自治县" }] },



  {
    "code": "522300",
    "name": "黔西南布依族苗族自治州",
    "areaList": [{
      "code": "522301",
      "name": "兴义市" },

    {
      "code": "522302",
      "name": "兴仁市" },

    {
      "code": "522323",
      "name": "普安县" },

    {
      "code": "522324",
      "name": "晴隆县" },

    {
      "code": "522325",
      "name": "贞丰县" },

    {
      "code": "522326",
      "name": "望谟县" },

    {
      "code": "522327",
      "name": "册亨县" },

    {
      "code": "522328",
      "name": "安龙县" }] },



  {
    "code": "522600",
    "name": "黔东南苗族侗族自治州",
    "areaList": [{
      "code": "522601",
      "name": "凯里市" },

    {
      "code": "522622",
      "name": "黄平县" },

    {
      "code": "522623",
      "name": "施秉县" },

    {
      "code": "522624",
      "name": "三穗县" },

    {
      "code": "522625",
      "name": "镇远县" },

    {
      "code": "522626",
      "name": "岑巩县" },

    {
      "code": "522627",
      "name": "天柱县" },

    {
      "code": "522628",
      "name": "锦屏县" },

    {
      "code": "522629",
      "name": "剑河县" },

    {
      "code": "522630",
      "name": "台江县" },

    {
      "code": "522631",
      "name": "黎平县" },

    {
      "code": "522632",
      "name": "榕江县" },

    {
      "code": "522633",
      "name": "从江县" },

    {
      "code": "522634",
      "name": "雷山县" },

    {
      "code": "522635",
      "name": "麻江县" },

    {
      "code": "522636",
      "name": "丹寨县" }] },



  {
    "code": "522700",
    "name": "黔南布依族苗族自治州",
    "areaList": [{
      "code": "522701",
      "name": "都匀市" },

    {
      "code": "522702",
      "name": "福泉市" },

    {
      "code": "522722",
      "name": "荔波县" },

    {
      "code": "522723",
      "name": "贵定县" },

    {
      "code": "522725",
      "name": "瓮安县" },

    {
      "code": "522726",
      "name": "独山县" },

    {
      "code": "522727",
      "name": "平塘县" },

    {
      "code": "522728",
      "name": "罗甸县" },

    {
      "code": "522729",
      "name": "长顺县" },

    {
      "code": "522730",
      "name": "龙里县" },

    {
      "code": "522731",
      "name": "惠水县" },

    {
      "code": "522732",
      "name": "三都水族自治县" }] }] },





{
  "code": "530000",
  "name": "云南省",
  "cityList": [{
    "code": "530100",
    "name": "昆明市",
    "areaList": [{
      "code": "530102",
      "name": "五华区" },

    {
      "code": "530103",
      "name": "盘龙区" },

    {
      "code": "530111",
      "name": "官渡区" },

    {
      "code": "530112",
      "name": "西山区" },

    {
      "code": "530113",
      "name": "东川区" },

    {
      "code": "530114",
      "name": "呈贡区" },

    {
      "code": "530115",
      "name": "晋宁区" },

    {
      "code": "530124",
      "name": "富民县" },

    {
      "code": "530125",
      "name": "宜良县" },

    {
      "code": "530126",
      "name": "石林彝族自治县" },

    {
      "code": "530127",
      "name": "嵩明县" },

    {
      "code": "530128",
      "name": "禄劝彝族苗族自治县" },

    {
      "code": "530129",
      "name": "寻甸回族彝族自治县" },

    {
      "code": "530181",
      "name": "安宁市" }] },



  {
    "code": "530300",
    "name": "曲靖市",
    "areaList": [{
      "code": "530302",
      "name": "麒麟区" },

    {
      "code": "530303",
      "name": "沾益区" },

    {
      "code": "530304",
      "name": "马龙区" },

    {
      "code": "530322",
      "name": "陆良县" },

    {
      "code": "530323",
      "name": "师宗县" },

    {
      "code": "530324",
      "name": "罗平县" },

    {
      "code": "530325",
      "name": "富源县" },

    {
      "code": "530326",
      "name": "会泽县" },

    {
      "code": "530381",
      "name": "宣威市" }] },



  {
    "code": "530400",
    "name": "玉溪市",
    "areaList": [{
      "code": "530402",
      "name": "红塔区" },

    {
      "code": "530403",
      "name": "江川区" },

    {
      "code": "530422",
      "name": "澄江县" },

    {
      "code": "530423",
      "name": "通海县" },

    {
      "code": "530424",
      "name": "华宁县" },

    {
      "code": "530425",
      "name": "易门县" },

    {
      "code": "530426",
      "name": "峨山彝族自治县" },

    {
      "code": "530427",
      "name": "新平彝族傣族自治县" },

    {
      "code": "530428",
      "name": "元江哈尼族彝族傣族自治县" }] },



  {
    "code": "530500",
    "name": "保山市",
    "areaList": [{
      "code": "530502",
      "name": "隆阳区" },

    {
      "code": "530521",
      "name": "施甸县" },

    {
      "code": "530523",
      "name": "龙陵县" },

    {
      "code": "530524",
      "name": "昌宁县" },

    {
      "code": "530581",
      "name": "腾冲市" }] },



  {
    "code": "530600",
    "name": "昭通市",
    "areaList": [{
      "code": "530602",
      "name": "昭阳区" },

    {
      "code": "530621",
      "name": "鲁甸县" },

    {
      "code": "530622",
      "name": "巧家县" },

    {
      "code": "530623",
      "name": "盐津县" },

    {
      "code": "530624",
      "name": "大关县" },

    {
      "code": "530625",
      "name": "永善县" },

    {
      "code": "530626",
      "name": "绥江县" },

    {
      "code": "530627",
      "name": "镇雄县" },

    {
      "code": "530628",
      "name": "彝良县" },

    {
      "code": "530629",
      "name": "威信县" },

    {
      "code": "530681",
      "name": "水富市" }] },



  {
    "code": "530700",
    "name": "丽江市",
    "areaList": [{
      "code": "530702",
      "name": "古城区" },

    {
      "code": "530721",
      "name": "玉龙纳西族自治县" },

    {
      "code": "530722",
      "name": "永胜县" },

    {
      "code": "530723",
      "name": "华坪县" },

    {
      "code": "530724",
      "name": "宁蒗彝族自治县" }] },



  {
    "code": "530800",
    "name": "普洱市",
    "areaList": [{
      "code": "530802",
      "name": "思茅区" },

    {
      "code": "530821",
      "name": "宁洱哈尼族彝族自治县" },

    {
      "code": "530822",
      "name": "墨江哈尼族自治县" },

    {
      "code": "530823",
      "name": "景东彝族自治县" },

    {
      "code": "530824",
      "name": "景谷傣族彝族自治县" },

    {
      "code": "530825",
      "name": "镇沅彝族哈尼族拉祜族自治县" },

    {
      "code": "530826",
      "name": "江城哈尼族彝族自治县" },

    {
      "code": "530827",
      "name": "孟连傣族拉祜族佤族自治县" },

    {
      "code": "530828",
      "name": "澜沧拉祜族自治县" },

    {
      "code": "530829",
      "name": "西盟佤族自治县" }] },



  {
    "code": "530900",
    "name": "临沧市",
    "areaList": [{
      "code": "530902",
      "name": "临翔区" },

    {
      "code": "530921",
      "name": "凤庆县" },

    {
      "code": "530922",
      "name": "云县" },

    {
      "code": "530923",
      "name": "永德县" },

    {
      "code": "530924",
      "name": "镇康县" },

    {
      "code": "530925",
      "name": "双江拉祜族佤族布朗族傣族自治县" },

    {
      "code": "530926",
      "name": "耿马傣族佤族自治县" },

    {
      "code": "530927",
      "name": "沧源佤族自治县" }] },



  {
    "code": "532300",
    "name": "楚雄彝族自治州",
    "areaList": [{
      "code": "532301",
      "name": "楚雄市" },

    {
      "code": "532322",
      "name": "双柏县" },

    {
      "code": "532323",
      "name": "牟定县" },

    {
      "code": "532324",
      "name": "南华县" },

    {
      "code": "532325",
      "name": "姚安县" },

    {
      "code": "532326",
      "name": "大姚县" },

    {
      "code": "532327",
      "name": "永仁县" },

    {
      "code": "532328",
      "name": "元谋县" },

    {
      "code": "532329",
      "name": "武定县" },

    {
      "code": "532331",
      "name": "禄丰县" }] },



  {
    "code": "532500",
    "name": "红河哈尼族彝族自治州",
    "areaList": [{
      "code": "532501",
      "name": "个旧市" },

    {
      "code": "532502",
      "name": "开远市" },

    {
      "code": "532503",
      "name": "蒙自市" },

    {
      "code": "532504",
      "name": "弥勒市" },

    {
      "code": "532523",
      "name": "屏边苗族自治县" },

    {
      "code": "532524",
      "name": "建水县" },

    {
      "code": "532525",
      "name": "石屏县" },

    {
      "code": "532527",
      "name": "泸西县" },

    {
      "code": "532528",
      "name": "元阳县" },

    {
      "code": "532529",
      "name": "红河县" },

    {
      "code": "532530",
      "name": "金平苗族瑶族傣族自治县" },

    {
      "code": "532531",
      "name": "绿春县" },

    {
      "code": "532532",
      "name": "河口瑶族自治县" }] },



  {
    "code": "532600",
    "name": "文山壮族苗族自治州",
    "areaList": [{
      "code": "532601",
      "name": "文山市" },

    {
      "code": "532622",
      "name": "砚山县" },

    {
      "code": "532623",
      "name": "西畴县" },

    {
      "code": "532624",
      "name": "麻栗坡县" },

    {
      "code": "532625",
      "name": "马关县" },

    {
      "code": "532626",
      "name": "丘北县" },

    {
      "code": "532627",
      "name": "广南县" },

    {
      "code": "532628",
      "name": "富宁县" }] },



  {
    "code": "532800",
    "name": "西双版纳傣族自治州",
    "areaList": [{
      "code": "532801",
      "name": "景洪市" },

    {
      "code": "532822",
      "name": "勐海县" },

    {
      "code": "532823",
      "name": "勐腊县" }] },



  {
    "code": "532900",
    "name": "大理白族自治州",
    "areaList": [{
      "code": "532901",
      "name": "大理市" },

    {
      "code": "532922",
      "name": "漾濞彝族自治县" },

    {
      "code": "532923",
      "name": "祥云县" },

    {
      "code": "532924",
      "name": "宾川县" },

    {
      "code": "532925",
      "name": "弥渡县" },

    {
      "code": "532926",
      "name": "南涧彝族自治县" },

    {
      "code": "532927",
      "name": "巍山彝族回族自治县" },

    {
      "code": "532928",
      "name": "永平县" },

    {
      "code": "532929",
      "name": "云龙县" },

    {
      "code": "532930",
      "name": "洱源县" },

    {
      "code": "532931",
      "name": "剑川县" },

    {
      "code": "532932",
      "name": "鹤庆县" }] },



  {
    "code": "533100",
    "name": "德宏傣族景颇族自治州",
    "areaList": [{
      "code": "533102",
      "name": "瑞丽市" },

    {
      "code": "533103",
      "name": "芒市" },

    {
      "code": "533122",
      "name": "梁河县" },

    {
      "code": "533123",
      "name": "盈江县" },

    {
      "code": "533124",
      "name": "陇川县" }] },



  {
    "code": "533300",
    "name": "怒江傈僳族自治州",
    "areaList": [{
      "code": "533301",
      "name": "泸水市" },

    {
      "code": "533323",
      "name": "福贡县" },

    {
      "code": "533324",
      "name": "贡山独龙族怒族自治县" },

    {
      "code": "533325",
      "name": "兰坪白族普米族自治县" }] },



  {
    "code": "533400",
    "name": "迪庆藏族自治州",
    "areaList": [{
      "code": "533401",
      "name": "香格里拉市" },

    {
      "code": "533422",
      "name": "德钦县" },

    {
      "code": "533423",
      "name": "维西傈僳族自治县" }] }] },





{
  "code": "540000",
  "name": "西藏自治区",
  "cityList": [{
    "code": "540100",
    "name": "拉萨市",
    "areaList": [{
      "code": "540102",
      "name": "城关区" },

    {
      "code": "540103",
      "name": "堆龙德庆区" },

    {
      "code": "540104",
      "name": "达孜区" },

    {
      "code": "540121",
      "name": "林周县" },

    {
      "code": "540122",
      "name": "当雄县" },

    {
      "code": "540123",
      "name": "尼木县" },

    {
      "code": "540124",
      "name": "曲水县" },

    {
      "code": "540127",
      "name": "墨竹工卡县" }] },



  {
    "code": "540200",
    "name": "日喀则市",
    "areaList": [{
      "code": "540202",
      "name": "桑珠孜区" },

    {
      "code": "540221",
      "name": "南木林县" },

    {
      "code": "540222",
      "name": "江孜县" },

    {
      "code": "540223",
      "name": "定日县" },

    {
      "code": "540224",
      "name": "萨迦县" },

    {
      "code": "540225",
      "name": "拉孜县" },

    {
      "code": "540226",
      "name": "昂仁县" },

    {
      "code": "540227",
      "name": "谢通门县" },

    {
      "code": "540228",
      "name": "白朗县" },

    {
      "code": "540229",
      "name": "仁布县" },

    {
      "code": "540230",
      "name": "康马县" },

    {
      "code": "540231",
      "name": "定结县" },

    {
      "code": "540232",
      "name": "仲巴县" },

    {
      "code": "540233",
      "name": "亚东县" },

    {
      "code": "540234",
      "name": "吉隆县" },

    {
      "code": "540235",
      "name": "聂拉木县" },

    {
      "code": "540236",
      "name": "萨嘎县" },

    {
      "code": "540237",
      "name": "岗巴县" }] },



  {
    "code": "540300",
    "name": "昌都市",
    "areaList": [{
      "code": "540302",
      "name": "卡若区" },

    {
      "code": "540321",
      "name": "江达县" },

    {
      "code": "540322",
      "name": "贡觉县" },

    {
      "code": "540323",
      "name": "类乌齐县" },

    {
      "code": "540324",
      "name": "丁青县" },

    {
      "code": "540325",
      "name": "察雅县" },

    {
      "code": "540326",
      "name": "八宿县" },

    {
      "code": "540327",
      "name": "左贡县" },

    {
      "code": "540328",
      "name": "芒康县" },

    {
      "code": "540329",
      "name": "洛隆县" },

    {
      "code": "540330",
      "name": "边坝县" }] },



  {
    "code": "540400",
    "name": "林芝市",
    "areaList": [{
      "code": "540402",
      "name": "巴宜区" },

    {
      "code": "540421",
      "name": "工布江达县" },

    {
      "code": "540422",
      "name": "米林县" },

    {
      "code": "540423",
      "name": "墨脱县" },

    {
      "code": "540424",
      "name": "波密县" },

    {
      "code": "540425",
      "name": "察隅县" },

    {
      "code": "540426",
      "name": "朗县" }] },



  {
    "code": "540500",
    "name": "山南市",
    "areaList": [{
      "code": "540502",
      "name": "乃东区" },

    {
      "code": "540521",
      "name": "扎囊县" },

    {
      "code": "540522",
      "name": "贡嘎县" },

    {
      "code": "540523",
      "name": "桑日县" },

    {
      "code": "540524",
      "name": "琼结县" },

    {
      "code": "540525",
      "name": "曲松县" },

    {
      "code": "540526",
      "name": "措美县" },

    {
      "code": "540527",
      "name": "洛扎县" },

    {
      "code": "540528",
      "name": "加查县" },

    {
      "code": "540529",
      "name": "隆子县" },

    {
      "code": "540530",
      "name": "错那县" },

    {
      "code": "540531",
      "name": "浪卡子县" }] },



  {
    "code": "540600",
    "name": "那曲市",
    "areaList": [{
      "code": "540602",
      "name": "色尼区" },

    {
      "code": "540621",
      "name": "嘉黎县" },

    {
      "code": "540622",
      "name": "比如县" },

    {
      "code": "540623",
      "name": "聂荣县" },

    {
      "code": "540624",
      "name": "安多县" },

    {
      "code": "540625",
      "name": "申扎县" },

    {
      "code": "540626",
      "name": "索县" },

    {
      "code": "540627",
      "name": "班戈县" },

    {
      "code": "540628",
      "name": "巴青县" },

    {
      "code": "540629",
      "name": "尼玛县" },

    {
      "code": "540630",
      "name": "双湖县" }] },



  {
    "code": "542500",
    "name": "阿里地区",
    "areaList": [{
      "code": "542521",
      "name": "普兰县" },

    {
      "code": "542522",
      "name": "札达县" },

    {
      "code": "542523",
      "name": "噶尔县" },

    {
      "code": "542524",
      "name": "日土县" },

    {
      "code": "542525",
      "name": "革吉县" },

    {
      "code": "542526",
      "name": "改则县" },

    {
      "code": "542527",
      "name": "措勤县" }] }] },





{
  "code": "610000",
  "name": "陕西省",
  "cityList": [{
    "code": "610100",
    "name": "西安市",
    "areaList": [{
      "code": "610102",
      "name": "新城区" },

    {
      "code": "610103",
      "name": "碑林区" },

    {
      "code": "610104",
      "name": "莲湖区" },

    {
      "code": "610111",
      "name": "灞桥区" },

    {
      "code": "610112",
      "name": "未央区" },

    {
      "code": "610113",
      "name": "雁塔区" },

    {
      "code": "610114",
      "name": "阎良区" },

    {
      "code": "610115",
      "name": "临潼区" },

    {
      "code": "610116",
      "name": "长安区" },

    {
      "code": "610117",
      "name": "高陵区" },

    {
      "code": "610118",
      "name": "鄠邑区" },

    {
      "code": "610122",
      "name": "蓝田县" },

    {
      "code": "610124",
      "name": "周至县" }] },



  {
    "code": "610200",
    "name": "铜川市",
    "areaList": [{
      "code": "610202",
      "name": "王益区" },

    {
      "code": "610203",
      "name": "印台区" },

    {
      "code": "610204",
      "name": "耀州区" },

    {
      "code": "610222",
      "name": "宜君县" }] },



  {
    "code": "610300",
    "name": "宝鸡市",
    "areaList": [{
      "code": "610302",
      "name": "渭滨区" },

    {
      "code": "610303",
      "name": "金台区" },

    {
      "code": "610304",
      "name": "陈仓区" },

    {
      "code": "610322",
      "name": "凤翔县" },

    {
      "code": "610323",
      "name": "岐山县" },

    {
      "code": "610324",
      "name": "扶风县" },

    {
      "code": "610326",
      "name": "眉县" },

    {
      "code": "610327",
      "name": "陇县" },

    {
      "code": "610328",
      "name": "千阳县" },

    {
      "code": "610329",
      "name": "麟游县" },

    {
      "code": "610330",
      "name": "凤县" },

    {
      "code": "610331",
      "name": "太白县" }] },



  {
    "code": "610400",
    "name": "咸阳市",
    "areaList": [{
      "code": "610402",
      "name": "秦都区" },

    {
      "code": "610403",
      "name": "杨陵区" },

    {
      "code": "610404",
      "name": "渭城区" },

    {
      "code": "610422",
      "name": "三原县" },

    {
      "code": "610423",
      "name": "泾阳县" },

    {
      "code": "610424",
      "name": "乾县" },

    {
      "code": "610425",
      "name": "礼泉县" },

    {
      "code": "610426",
      "name": "永寿县" },

    {
      "code": "610428",
      "name": "长武县" },

    {
      "code": "610429",
      "name": "旬邑县" },

    {
      "code": "610430",
      "name": "淳化县" },

    {
      "code": "610431",
      "name": "武功县" },

    {
      "code": "610481",
      "name": "兴平市" },

    {
      "code": "610482",
      "name": "彬州市" }] },



  {
    "code": "610500",
    "name": "渭南市",
    "areaList": [{
      "code": "610502",
      "name": "临渭区" },

    {
      "code": "610503",
      "name": "华州区" },

    {
      "code": "610522",
      "name": "潼关县" },

    {
      "code": "610523",
      "name": "大荔县" },

    {
      "code": "610524",
      "name": "合阳县" },

    {
      "code": "610525",
      "name": "澄城县" },

    {
      "code": "610526",
      "name": "蒲城县" },

    {
      "code": "610527",
      "name": "白水县" },

    {
      "code": "610528",
      "name": "富平县" },

    {
      "code": "610581",
      "name": "韩城市" },

    {
      "code": "610582",
      "name": "华阴市" }] },



  {
    "code": "610600",
    "name": "延安市",
    "areaList": [{
      "code": "610602",
      "name": "宝塔区" },

    {
      "code": "610603",
      "name": "安塞区" },

    {
      "code": "610621",
      "name": "延长县" },

    {
      "code": "610622",
      "name": "延川县" },

    {
      "code": "610623",
      "name": "子长县" },

    {
      "code": "610625",
      "name": "志丹县" },

    {
      "code": "610626",
      "name": "吴起县" },

    {
      "code": "610627",
      "name": "甘泉县" },

    {
      "code": "610628",
      "name": "富县" },

    {
      "code": "610629",
      "name": "洛川县" },

    {
      "code": "610630",
      "name": "宜川县" },

    {
      "code": "610631",
      "name": "黄龙县" },

    {
      "code": "610632",
      "name": "黄陵县" }] },



  {
    "code": "610700",
    "name": "汉中市",
    "areaList": [{
      "code": "610702",
      "name": "汉台区" },

    {
      "code": "610703",
      "name": "南郑区" },

    {
      "code": "610722",
      "name": "城固县" },

    {
      "code": "610723",
      "name": "洋县" },

    {
      "code": "610724",
      "name": "西乡县" },

    {
      "code": "610725",
      "name": "勉县" },

    {
      "code": "610726",
      "name": "宁强县" },

    {
      "code": "610727",
      "name": "略阳县" },

    {
      "code": "610728",
      "name": "镇巴县" },

    {
      "code": "610729",
      "name": "留坝县" },

    {
      "code": "610730",
      "name": "佛坪县" }] },



  {
    "code": "610800",
    "name": "榆林市",
    "areaList": [{
      "code": "610802",
      "name": "榆阳区" },

    {
      "code": "610803",
      "name": "横山区" },

    {
      "code": "610822",
      "name": "府谷县" },

    {
      "code": "610824",
      "name": "靖边县" },

    {
      "code": "610825",
      "name": "定边县" },

    {
      "code": "610826",
      "name": "绥德县" },

    {
      "code": "610827",
      "name": "米脂县" },

    {
      "code": "610828",
      "name": "佳县" },

    {
      "code": "610829",
      "name": "吴堡县" },

    {
      "code": "610830",
      "name": "清涧县" },

    {
      "code": "610831",
      "name": "子洲县" },

    {
      "code": "610881",
      "name": "神木市" }] },



  {
    "code": "610900",
    "name": "安康市",
    "areaList": [{
      "code": "610902",
      "name": "汉滨区" },

    {
      "code": "610921",
      "name": "汉阴县" },

    {
      "code": "610922",
      "name": "石泉县" },

    {
      "code": "610923",
      "name": "宁陕县" },

    {
      "code": "610924",
      "name": "紫阳县" },

    {
      "code": "610925",
      "name": "岚皋县" },

    {
      "code": "610926",
      "name": "平利县" },

    {
      "code": "610927",
      "name": "镇坪县" },

    {
      "code": "610928",
      "name": "旬阳县" },

    {
      "code": "610929",
      "name": "白河县" }] },



  {
    "code": "611000",
    "name": "商洛市",
    "areaList": [{
      "code": "611002",
      "name": "商州区" },

    {
      "code": "611021",
      "name": "洛南县" },

    {
      "code": "611022",
      "name": "丹凤县" },

    {
      "code": "611023",
      "name": "商南县" },

    {
      "code": "611024",
      "name": "山阳县" },

    {
      "code": "611025",
      "name": "镇安县" },

    {
      "code": "611026",
      "name": "柞水县" }] }] },





{
  "code": "620000",
  "name": "甘肃省",
  "cityList": [{
    "code": "620100",
    "name": "兰州市",
    "areaList": [{
      "code": "620102",
      "name": "城关区" },

    {
      "code": "620103",
      "name": "七里河区" },

    {
      "code": "620104",
      "name": "西固区" },

    {
      "code": "620105",
      "name": "安宁区" },

    {
      "code": "620111",
      "name": "红古区" },

    {
      "code": "620121",
      "name": "永登县" },

    {
      "code": "620122",
      "name": "皋兰县" },

    {
      "code": "620123",
      "name": "榆中县" }] },



  {
    "code": "620200",
    "name": "嘉峪关市",
    "areaList": [] },

  {
    "code": "620300",
    "name": "金昌市",
    "areaList": [{
      "code": "620302",
      "name": "金川区" },

    {
      "code": "620321",
      "name": "永昌县" }] },



  {
    "code": "620400",
    "name": "白银市",
    "areaList": [{
      "code": "620402",
      "name": "白银区" },

    {
      "code": "620403",
      "name": "平川区" },

    {
      "code": "620421",
      "name": "靖远县" },

    {
      "code": "620422",
      "name": "会宁县" },

    {
      "code": "620423",
      "name": "景泰县" }] },



  {
    "code": "620500",
    "name": "天水市",
    "areaList": [{
      "code": "620502",
      "name": "秦州区" },

    {
      "code": "620503",
      "name": "麦积区" },

    {
      "code": "620521",
      "name": "清水县" },

    {
      "code": "620522",
      "name": "秦安县" },

    {
      "code": "620523",
      "name": "甘谷县" },

    {
      "code": "620524",
      "name": "武山县" },

    {
      "code": "620525",
      "name": "张家川回族自治县" }] },



  {
    "code": "620600",
    "name": "武威市",
    "areaList": [{
      "code": "620602",
      "name": "凉州区" },

    {
      "code": "620621",
      "name": "民勤县" },

    {
      "code": "620622",
      "name": "古浪县" },

    {
      "code": "620623",
      "name": "天祝藏族自治县" }] },



  {
    "code": "620700",
    "name": "张掖市",
    "areaList": [{
      "code": "620702",
      "name": "甘州区" },

    {
      "code": "620721",
      "name": "肃南裕固族自治县" },

    {
      "code": "620722",
      "name": "民乐县" },

    {
      "code": "620723",
      "name": "临泽县" },

    {
      "code": "620724",
      "name": "高台县" },

    {
      "code": "620725",
      "name": "山丹县" }] },



  {
    "code": "620800",
    "name": "平凉市",
    "areaList": [{
      "code": "620802",
      "name": "崆峒区" },

    {
      "code": "620821",
      "name": "泾川县" },

    {
      "code": "620822",
      "name": "灵台县" },

    {
      "code": "620823",
      "name": "崇信县" },

    {
      "code": "620825",
      "name": "庄浪县" },

    {
      "code": "620826",
      "name": "静宁县" },

    {
      "code": "620881",
      "name": "华亭市" }] },



  {
    "code": "620900",
    "name": "酒泉市",
    "areaList": [{
      "code": "620902",
      "name": "肃州区" },

    {
      "code": "620921",
      "name": "金塔县" },

    {
      "code": "620922",
      "name": "瓜州县" },

    {
      "code": "620923",
      "name": "肃北蒙古族自治县" },

    {
      "code": "620924",
      "name": "阿克塞哈萨克族自治县" },

    {
      "code": "620981",
      "name": "玉门市" },

    {
      "code": "620982",
      "name": "敦煌市" }] },



  {
    "code": "621000",
    "name": "庆阳市",
    "areaList": [{
      "code": "621002",
      "name": "西峰区" },

    {
      "code": "621021",
      "name": "庆城县" },

    {
      "code": "621022",
      "name": "环县" },

    {
      "code": "621023",
      "name": "华池县" },

    {
      "code": "621024",
      "name": "合水县" },

    {
      "code": "621025",
      "name": "正宁县" },

    {
      "code": "621026",
      "name": "宁县" },

    {
      "code": "621027",
      "name": "镇原县" }] },



  {
    "code": "621100",
    "name": "定西市",
    "areaList": [{
      "code": "621102",
      "name": "安定区" },

    {
      "code": "621121",
      "name": "通渭县" },

    {
      "code": "621122",
      "name": "陇西县" },

    {
      "code": "621123",
      "name": "渭源县" },

    {
      "code": "621124",
      "name": "临洮县" },

    {
      "code": "621125",
      "name": "漳县" },

    {
      "code": "621126",
      "name": "岷县" }] },



  {
    "code": "621200",
    "name": "陇南市",
    "areaList": [{
      "code": "621202",
      "name": "武都区" },

    {
      "code": "621221",
      "name": "成县" },

    {
      "code": "621222",
      "name": "文县" },

    {
      "code": "621223",
      "name": "宕昌县" },

    {
      "code": "621224",
      "name": "康县" },

    {
      "code": "621225",
      "name": "西和县" },

    {
      "code": "621226",
      "name": "礼县" },

    {
      "code": "621227",
      "name": "徽县" },

    {
      "code": "621228",
      "name": "两当县" }] },



  {
    "code": "622900",
    "name": "临夏回族自治州",
    "areaList": [{
      "code": "622901",
      "name": "临夏市" },

    {
      "code": "622921",
      "name": "临夏县" },

    {
      "code": "622922",
      "name": "康乐县" },

    {
      "code": "622923",
      "name": "永靖县" },

    {
      "code": "622924",
      "name": "广河县" },

    {
      "code": "622925",
      "name": "和政县" },

    {
      "code": "622926",
      "name": "东乡族自治县" },

    {
      "code": "622927",
      "name": "积石山保安族东乡族撒拉族自治县" }] },



  {
    "code": "623000",
    "name": "甘南藏族自治州",
    "areaList": [{
      "code": "623001",
      "name": "合作市" },

    {
      "code": "623021",
      "name": "临潭县" },

    {
      "code": "623022",
      "name": "卓尼县" },

    {
      "code": "623023",
      "name": "舟曲县" },

    {
      "code": "623024",
      "name": "迭部县" },

    {
      "code": "623025",
      "name": "玛曲县" },

    {
      "code": "623026",
      "name": "碌曲县" },

    {
      "code": "623027",
      "name": "夏河县" }] }] },





{
  "code": "630000",
  "name": "青海省",
  "cityList": [{
    "code": "630100",
    "name": "西宁市",
    "areaList": [{
      "code": "630102",
      "name": "城东区" },

    {
      "code": "630103",
      "name": "城中区" },

    {
      "code": "630104",
      "name": "城西区" },

    {
      "code": "630105",
      "name": "城北区" },

    {
      "code": "630121",
      "name": "大通回族土族自治县" },

    {
      "code": "630122",
      "name": "湟中县" },

    {
      "code": "630123",
      "name": "湟源县" }] },



  {
    "code": "630200",
    "name": "海东市",
    "areaList": [{
      "code": "630202",
      "name": "乐都区" },

    {
      "code": "630203",
      "name": "平安区" },

    {
      "code": "630222",
      "name": "民和回族土族自治县" },

    {
      "code": "630223",
      "name": "互助土族自治县" },

    {
      "code": "630224",
      "name": "化隆回族自治县" },

    {
      "code": "630225",
      "name": "循化撒拉族自治县" }] },



  {
    "code": "632200",
    "name": "海北藏族自治州",
    "areaList": [{
      "code": "632221",
      "name": "门源回族自治县" },

    {
      "code": "632222",
      "name": "祁连县" },

    {
      "code": "632223",
      "name": "海晏县" },

    {
      "code": "632224",
      "name": "刚察县" }] },



  {
    "code": "632300",
    "name": "黄南藏族自治州",
    "areaList": [{
      "code": "632321",
      "name": "同仁县" },

    {
      "code": "632322",
      "name": "尖扎县" },

    {
      "code": "632323",
      "name": "泽库县" },

    {
      "code": "632324",
      "name": "河南蒙古族自治县" }] },



  {
    "code": "632500",
    "name": "海南藏族自治州",
    "areaList": [{
      "code": "632521",
      "name": "共和县" },

    {
      "code": "632522",
      "name": "同德县" },

    {
      "code": "632523",
      "name": "贵德县" },

    {
      "code": "632524",
      "name": "兴海县" },

    {
      "code": "632525",
      "name": "贵南县" }] },



  {
    "code": "632600",
    "name": "果洛藏族自治州",
    "areaList": [{
      "code": "632621",
      "name": "玛沁县" },

    {
      "code": "632622",
      "name": "班玛县" },

    {
      "code": "632623",
      "name": "甘德县" },

    {
      "code": "632624",
      "name": "达日县" },

    {
      "code": "632625",
      "name": "久治县" },

    {
      "code": "632626",
      "name": "玛多县" }] },



  {
    "code": "632700",
    "name": "玉树藏族自治州",
    "areaList": [{
      "code": "632701",
      "name": "玉树市" },

    {
      "code": "632722",
      "name": "杂多县" },

    {
      "code": "632723",
      "name": "称多县" },

    {
      "code": "632724",
      "name": "治多县" },

    {
      "code": "632725",
      "name": "囊谦县" },

    {
      "code": "632726",
      "name": "曲麻莱县" }] },



  {
    "code": "632800",
    "name": "海西蒙古族藏族自治州",
    "areaList": [{
      "code": "632801",
      "name": "格尔木市" },

    {
      "code": "632802",
      "name": "德令哈市" },

    {
      "code": "632803",
      "name": "茫崖市" },

    {
      "code": "632821",
      "name": "乌兰县" },

    {
      "code": "632822",
      "name": "都兰县" },

    {
      "code": "632823",
      "name": "天峻县" }] }] },





{
  "code": "640000",
  "name": "宁夏回族自治区",
  "cityList": [{
    "code": "640100",
    "name": "银川市",
    "areaList": [{
      "code": "640104",
      "name": "兴庆区" },

    {
      "code": "640105",
      "name": "西夏区" },

    {
      "code": "640106",
      "name": "金凤区" },

    {
      "code": "640121",
      "name": "永宁县" },

    {
      "code": "640122",
      "name": "贺兰县" },

    {
      "code": "640181",
      "name": "灵武市" }] },



  {
    "code": "640200",
    "name": "石嘴山市",
    "areaList": [{
      "code": "640202",
      "name": "大武口区" },

    {
      "code": "640205",
      "name": "惠农区" },

    {
      "code": "640221",
      "name": "平罗县" }] },



  {
    "code": "640300",
    "name": "吴忠市",
    "areaList": [{
      "code": "640302",
      "name": "利通区" },

    {
      "code": "640303",
      "name": "红寺堡区" },

    {
      "code": "640323",
      "name": "盐池县" },

    {
      "code": "640324",
      "name": "同心县" },

    {
      "code": "640381",
      "name": "青铜峡市" }] },



  {
    "code": "640400",
    "name": "固原市",
    "areaList": [{
      "code": "640402",
      "name": "原州区" },

    {
      "code": "640422",
      "name": "西吉县" },

    {
      "code": "640423",
      "name": "隆德县" },

    {
      "code": "640424",
      "name": "泾源县" },

    {
      "code": "640425",
      "name": "彭阳县" }] },



  {
    "code": "640500",
    "name": "中卫市",
    "areaList": [{
      "code": "640502",
      "name": "沙坡头区" },

    {
      "code": "640521",
      "name": "中宁县" },

    {
      "code": "640522",
      "name": "海原县" }] }] },





{
  "code": "650000",
  "name": "新疆维吾尔自治区",
  "cityList": [{
    "code": "650100",
    "name": "乌鲁木齐市",
    "areaList": [{
      "code": "650102",
      "name": "天山区" },

    {
      "code": "650103",
      "name": "沙依巴克区" },

    {
      "code": "650104",
      "name": "新市区" },

    {
      "code": "650105",
      "name": "水磨沟区" },

    {
      "code": "650106",
      "name": "头屯河区" },

    {
      "code": "650107",
      "name": "达坂城区" },

    {
      "code": "650109",
      "name": "米东区" },

    {
      "code": "650121",
      "name": "乌鲁木齐县" }] },



  {
    "code": "650200",
    "name": "克拉玛依市",
    "areaList": [{
      "code": "650202",
      "name": "独山子区" },

    {
      "code": "650203",
      "name": "克拉玛依区" },

    {
      "code": "650204",
      "name": "白碱滩区" },

    {
      "code": "650205",
      "name": "乌尔禾区" }] },



  {
    "code": "650400",
    "name": "吐鲁番市",
    "areaList": [{
      "code": "650402",
      "name": "高昌区" },

    {
      "code": "650421",
      "name": "鄯善县" },

    {
      "code": "650422",
      "name": "托克逊县" }] },



  {
    "code": "650500",
    "name": "哈密市",
    "areaList": [{
      "code": "650502",
      "name": "伊州区" },

    {
      "code": "650521",
      "name": "巴里坤哈萨克自治县" },

    {
      "code": "650522",
      "name": "伊吾县" }] },



  {
    "code": "652300",
    "name": "昌吉回族自治州",
    "areaList": [{
      "code": "652301",
      "name": "昌吉市" },

    {
      "code": "652302",
      "name": "阜康市" },

    {
      "code": "652323",
      "name": "呼图壁县" },

    {
      "code": "652324",
      "name": "玛纳斯县" },

    {
      "code": "652325",
      "name": "奇台县" },

    {
      "code": "652327",
      "name": "吉木萨尔县" },

    {
      "code": "652328",
      "name": "木垒哈萨克自治县" }] },



  {
    "code": "652700",
    "name": "博尔塔拉蒙古自治州",
    "areaList": [{
      "code": "652701",
      "name": "博乐市" },

    {
      "code": "652702",
      "name": "阿拉山口市" },

    {
      "code": "652722",
      "name": "精河县" },

    {
      "code": "652723",
      "name": "温泉县" }] },



  {
    "code": "652800",
    "name": "巴音郭楞蒙古自治州",
    "areaList": [{
      "code": "652801",
      "name": "库尔勒市" },

    {
      "code": "652822",
      "name": "轮台县" },

    {
      "code": "652823",
      "name": "尉犁县" },

    {
      "code": "652824",
      "name": "若羌县" },

    {
      "code": "652825",
      "name": "且末县" },

    {
      "code": "652826",
      "name": "焉耆回族自治县" },

    {
      "code": "652827",
      "name": "和静县" },

    {
      "code": "652828",
      "name": "和硕县" },

    {
      "code": "652829",
      "name": "博湖县" }] },



  {
    "code": "652900",
    "name": "阿克苏地区",
    "areaList": [{
      "code": "652901",
      "name": "阿克苏市" },

    {
      "code": "652922",
      "name": "温宿县" },

    {
      "code": "652923",
      "name": "库车县" },

    {
      "code": "652924",
      "name": "沙雅县" },

    {
      "code": "652925",
      "name": "新和县" },

    {
      "code": "652926",
      "name": "拜城县" },

    {
      "code": "652927",
      "name": "乌什县" },

    {
      "code": "652928",
      "name": "阿瓦提县" },

    {
      "code": "652929",
      "name": "柯坪县" }] },



  {
    "code": "653000",
    "name": "克孜勒苏柯尔克孜自治州",
    "areaList": [{
      "code": "653001",
      "name": "阿图什市" },

    {
      "code": "653022",
      "name": "阿克陶县" },

    {
      "code": "653023",
      "name": "阿合奇县" },

    {
      "code": "653024",
      "name": "乌恰县" }] },



  {
    "code": "653100",
    "name": "喀什地区",
    "areaList": [{
      "code": "653101",
      "name": "喀什市" },

    {
      "code": "653121",
      "name": "疏附县" },

    {
      "code": "653122",
      "name": "疏勒县" },

    {
      "code": "653123",
      "name": "英吉沙县" },

    {
      "code": "653124",
      "name": "泽普县" },

    {
      "code": "653125",
      "name": "莎车县" },

    {
      "code": "653126",
      "name": "叶城县" },

    {
      "code": "653127",
      "name": "麦盖提县" },

    {
      "code": "653128",
      "name": "岳普湖县" },

    {
      "code": "653129",
      "name": "伽师县" },

    {
      "code": "653130",
      "name": "巴楚县" },

    {
      "code": "653131",
      "name": "塔什库尔干塔吉克自治县" }] },



  {
    "code": "653200",
    "name": "和田地区",
    "areaList": [{
      "code": "653201",
      "name": "和田市" },

    {
      "code": "653221",
      "name": "和田县" },

    {
      "code": "653222",
      "name": "墨玉县" },

    {
      "code": "653223",
      "name": "皮山县" },

    {
      "code": "653224",
      "name": "洛浦县" },

    {
      "code": "653225",
      "name": "策勒县" },

    {
      "code": "653226",
      "name": "于田县" },

    {
      "code": "653227",
      "name": "民丰县" }] },



  {
    "code": "654000",
    "name": "伊犁哈萨克自治州",
    "areaList": [{
      "code": "654002",
      "name": "伊宁市" },

    {
      "code": "654003",
      "name": "奎屯市" },

    {
      "code": "654004",
      "name": "霍尔果斯市" },

    {
      "code": "654021",
      "name": "伊宁县" },

    {
      "code": "654022",
      "name": "察布查尔锡伯自治县" },

    {
      "code": "654023",
      "name": "霍城县" },

    {
      "code": "654024",
      "name": "巩留县" },

    {
      "code": "654025",
      "name": "新源县" },

    {
      "code": "654026",
      "name": "昭苏县" },

    {
      "code": "654027",
      "name": "特克斯县" },

    {
      "code": "654028",
      "name": "尼勒克县" }] },



  {
    "code": "654200",
    "name": "塔城地区",
    "areaList": [{
      "code": "654201",
      "name": "塔城市" },

    {
      "code": "654202",
      "name": "乌苏市" },

    {
      "code": "654221",
      "name": "额敏县" },

    {
      "code": "654223",
      "name": "沙湾县" },

    {
      "code": "654224",
      "name": "托里县" },

    {
      "code": "654225",
      "name": "裕民县" },

    {
      "code": "654226",
      "name": "和布克赛尔蒙古自治县" }] },



  {
    "code": "654300",
    "name": "阿勒泰地区",
    "areaList": [{
      "code": "654301",
      "name": "阿勒泰市" },

    {
      "code": "654321",
      "name": "布尔津县" },

    {
      "code": "654322",
      "name": "富蕴县" },

    {
      "code": "654323",
      "name": "福海县" },

    {
      "code": "654324",
      "name": "哈巴河县" },

    {
      "code": "654325",
      "name": "青河县" },

    {
      "code": "654326",
      "name": "吉木乃县" }] }] },





{
  "code": "710000",
  "name": "台湾省",
  "cityList": [{
    "code": "710000",
    "name": "台湾省",
    "areaList": [{
      "name": "台北",
      "code": "6601" },

    {
      "name": "高雄",
      "code": "6602" },

    {
      "name": "基隆",
      "code": "6603" },

    {
      "name": "台中",
      "code": "6604" },

    {
      "name": "台南",
      "code": "6605" },

    {
      "name": "新竹",
      "code": "6606" },

    {
      "name": "嘉义",
      "code": "6607" },

    {
      "name": "宜兰",
      "code": "6608" },

    {
      "name": "桃园",
      "code": "6609" },

    {
      "name": "苗栗",
      "code": "6610" },

    {
      "name": "彰化",
      "code": "6611" },

    {
      "name": "南投",
      "code": "6612" },

    {
      "name": "云林",
      "code": "6613" },

    {
      "name": "屏东",
      "code": "6614" },

    {
      "name": "台东",
      "code": "6615" },

    {
      "name": "花莲",
      "code": "6616" },

    {
      "name": "澎湖",
      "code": "6617" }] }] },




{
  "code": "810000",
  "name": "香港特别行政区",
  "cityList": [{
    "code": "810000",
    "name": "香港特别行政区",
    "areaList": [{
      "name": "香港岛",
      "code": "6701" },

    {
      "name": "九龙",
      "code": "6702" },

    {
      "name": "新界",
      "code": "6703" }] }] },




{
  "code": "820000",
  "name": "澳门特别行政区",
  "cityList": [{
    "code": "820000",
    "name": "澳门特别行政区",
    "areaList": [{
      "name": "澳门半岛",
      "code": "6801" },

    {
      "name": "氹仔岛",
      "code": "6802" },

    {
      "name": "路环岛",
      "code": "6803" },

    {
      "name": "路氹城",
      "code": "6804" }] }] }];var _default =





areaData;exports.default = _default;

/***/ }),

/***/ 49:
/*!*************************************************************************!*\
  !*** D:/UniAppProject/fd/fd/components/mescroll-uni/mescroll-mixins.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // mescroll-body 和 mescroll-uni 通用

// import MescrollUni from "./mescroll-uni.vue";
// import MescrollBody from "./mescroll-body.vue";

var MescrollMixin = {
  // components: { // 非H5端无法通过mixin注册组件, 只能在main.js中注册全局组件或具体界面中注册
  // 	MescrollUni,
  // 	MescrollBody
  // },
  data: function data() {
    return {
      mescroll: null //mescroll实例对象
    };
  },
  // 注册系统自带的下拉刷新 (配置down.native为true时生效, 还需在pages配置enablePullDownRefresh:true;详请参考mescroll-native的案例)
  onPullDownRefresh: function onPullDownRefresh() {
    this.mescroll && this.mescroll.onPullDownRefresh();
  },
  // 注册列表滚动事件,用于判定在顶部可下拉刷新,在指定位置可显示隐藏回到顶部按钮 (此方法为页面生命周期,无法在子组件中触发, 仅在mescroll-body生效)
  onPageScroll: function onPageScroll(e) {
    this.mescroll && this.mescroll.onPageScroll(e);
  },
  // 注册滚动到底部的事件,用于上拉加载 (此方法为页面生命周期,无法在子组件中触发, 仅在mescroll-body生效)
  onReachBottom: function onReachBottom() {
    this.mescroll && this.mescroll.onReachBottom();
  },
  methods: {
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit: function mescrollInit(mescroll) {
      this.mescroll = mescroll;
      this.mescrollInitByRef(); // 兼容字节跳动小程序
    },
    // 以ref的方式初始化mescroll对象 (兼容字节跳动小程序: http://www.mescroll.com/qa.html?v=20200107#q26)
    mescrollInitByRef: function mescrollInitByRef() {
      if (!this.mescroll || !this.mescroll.resetUpScroll) {
        var mescrollRef = this.$refs.mescrollRef;
        if (mescrollRef) this.mescroll = mescrollRef.mescroll;
      }
    },
    // 下拉刷新的回调
    downCallback: function downCallback() {
      // mixin默认resetUpScroll
      this.mescroll.resetUpScroll();
    },
    // 上拉加载的回调
    upCallback: function upCallback() {var _this = this;
      // mixin默认延时500自动结束加载
      setTimeout(function () {
        _this.mescroll.endErr();
      }, 500);
    } },

  mounted: function mounted() {
    this.mescrollInitByRef(); // 兼容字节跳动小程序, 避免未设置@init或@init此时未能取到ref的情况
  } };var _default =



MescrollMixin;exports.default = _default;

/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _createSuper(Derived) {return function () {var Super = _getPrototypeOf(Derived),result;if (_isNativeReflectConstruct()) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);var _super = _createSuper(Stat);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _super.call(this);
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 6:
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@next","_id":"@dcloudio/uni-stat@2.0.0-261120200409001","_inBundle":false,"_integrity":"sha512-iM1vsCzUEg80lCM7rSAkh+28ahjS9zQgiGsEoHxawCD9s7rTFnSRIaOuc7WHeQt6EclGUUIrMccYHXsLsNAXZg==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@next","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"next","saveSpec":null,"fetchSpec":"next"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-261120200409001.tgz","_shasum":"e9daeef120f133bf3d4ca0505f5b2abed0e874a7","_spec":"@dcloudio/uni-stat@next","_where":"/Users/guoshengqiang/Documents/dcloud-plugins/release/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"ff0877f516c1cc986cf2d7eae2bf5030c58050f9","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-261120200409001"};

/***/ }),

/***/ 7:
/*!**********************************************************!*\
  !*** D:/UniAppProject/fd/fd/pages.json?{"type":"style"} ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/index1/index": { "navigationStyle": "custom" }, "pages/user/login": { "navigationStyle": "custom" }, "pages/user/register": { "navigationStyle": "custom" }, "pages/show/home": { "navigationBarBackgroundColor": "#0081ff", "navigationBarTitleText": "首页", "navigationStyle": "custom", "navigationBarTextStyle": "white" }, "pages/show/message": { "navigationBarTitleText": "消息", "enablePullDownRefresh": true }, "pages/user/userspace": { "navigationBarTitleText": "我的信息" }, "pages/user/watch": { "navigationBarTitleText": "我的关注", "enablePullDownRefresh": true }, "pages/user/chat": { "navigationBarTitleText": "聊天" }, "components/ksp-image-cutter/ksp-image-cutter": {}, "pages/user/choosephoto": { "navigationBarTitleText": "头像修改" }, "pages/commodity/add": { "navigationBarTitleText": "上传" }, "pages/commodity/update": { "navigationBarTitleText": "修改" }, "pages/commodity/mypublished": { "navigationBarBackgroundColor": "white", "navigationBarTitleText": "已发布" }, "pages/commodity/collect": { "navigationBarBackgroundColor": "white", "navigationBarTitleText": "我的收藏" }, "pages/commodity/watchhistory": { "navigationBarBackgroundColor": "white", "navigationBarTitleText": "我的足迹" }, "pages/user/choose": { "navigationBarTitleText": "头像修改" }, "pages/show/me": { "enablePullDownRefresh": true, "navigationBarTitleText": "" }, "components/config/config": {}, "pages/show/test": {}, "pages/order/add": { "enablePullDownRefresh": true, "navigationBarTitleText": "下单" }, "pages/order/user_dealing": { "enablePullDownRefresh": true, "navigationBarTitleText": "运送中的订单", "navigationBarBackgroundColor": "white" }, "pages/order/businesser_dealing": { "enablePullDownRefresh": true, "navigationBarTitleText": "处理中的订单", "navigationBarBackgroundColor": "white" }, "pages/order/user_finish": { "enablePullDownRefresh": true, "navigationBarTitleText": "已完成的订单", "navigationBarBackgroundColor": "white" }, "pages/order/businesser_finish": { "enablePullDownRefresh": true, "navigationBarTitleText": "已完成的订单", "navigationBarBackgroundColor": "white" }, "pages/order/businesserlogisticsTrack": { "enablePullDownRefresh": true, "navigationBarTitleText": "物流信息", "navigationBarBackgroundColor": "white" }, "pages/order/userlogisticsTrack": { "enablePullDownRefresh": true, "navigationBarTitleText": "物流信息", "navigationBarBackgroundColor": "white" } }, "globalStyle": { "navigationBarTextStyle": "black", "navigationBarTitleText": "uni-app", "navigationBarBackgroundColor": "#F8F8F8", "backgroundColor": "#F8F8F8" } };exports.default = _default;

/***/ }),

/***/ 8:
/*!*********************************************************!*\
  !*** D:/UniAppProject/fd/fd/pages.json?{"type":"stat"} ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__8DFE908" };exports.default = _default;

/***/ }),

/***/ 82:
/*!*********************************************************************************************!*\
  !*** ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 83);

/***/ }),

/***/ 83:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 84);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 84:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map