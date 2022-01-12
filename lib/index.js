"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.elResize = exports["default"] = void 0;

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/web.timers.js");

// Array{el,rmListener}
var elList = [];

var elResize = function elResize(el, cb, conf) {
  var _conf$initialCall;

  var callback = cb !== null && cb !== void 0 ? cb : function () {};
  var initialCall = (_conf$initialCall = conf === null || conf === void 0 ? void 0 : conf.initialCall) !== null && _conf$initialCall !== void 0 ? _conf$initialCall : false;
  var width = null,
      height = null;

  var sendConf = function sendConf(nWidth, nHeight) {
    if (typeof nWidth === "number" && typeof nHeight === "number") {
      if (width !== nWidth || height !== nHeight) {
        width = nWidth;
        height = nHeight;
        callback({
          width: width,
          height: height
        });
      }
    }
  };

  var rmListener = function rmListener() {};

  if (!!el) {
    var _elList$filter$;

    // rm prev listener
    var existedItem = (_elList$filter$ = elList.filter(function (_ref) {
      var prevEl = _ref.el;
      return prevEl === el;
    })[0]) !== null && _elList$filter$ !== void 0 ? _elList$filter$ : null;

    if (!!existedItem) {
      existedItem.rmListener();
    } // wrapper


    var wrapperEl = document.createElement('div');
    Object.assign(wrapperEl.style, {
      height: '100%',
      opacity: '0'
    });
    var scrollWrapperStyle = {
      width: '20%',
      height: '20%',
      overflow: 'scroll',
      position: 'absolute',
      left: '0',
      top: '0'
    }; // scrollWrapper1 smaller

    var scrollWrapperEl1 = document.createElement('div');
    Object.assign(scrollWrapperEl1.style, scrollWrapperStyle);
    var child1 = document.createElement('div');
    Object.assign(child1.style, {
      width: '300%',
      height: '300%'
    });
    scrollWrapperEl1.appendChild(child1); // scrollWrapper2 larger

    var scrollWrapperEl2 = document.createElement('div');
    Object.assign(scrollWrapperEl2.style, scrollWrapperStyle);
    var child2 = document.createElement('div');
    Object.assign(child2.style, {
      width: '3000px',
      height: '3000px'
    });
    scrollWrapperEl2.appendChild(child2);
    wrapperEl.appendChild(scrollWrapperEl1);
    wrapperEl.appendChild(scrollWrapperEl2);
    el.appendChild(wrapperEl);

    var addListener = function addListener() {
      scrollWrapperEl1.addEventListener('scroll', function () {
        scrollWrapperEl2.scrollTop = 10000;
        scrollWrapperEl2.scrollLeft = 10000;
        var width = wrapperEl.offsetWidth;
        var height = wrapperEl.offsetHeight;
        sendConf(width, height);
      });
      scrollWrapperEl2.addEventListener('scroll', function () {
        scrollWrapperEl1.scrollTop = 10000;
        scrollWrapperEl1.scrollLeft = 10000;
        var width = wrapperEl.offsetWidth;
        var height = wrapperEl.offsetHeight;
        sendConf(width, height);
      });
    };

    if (initialCall) {
      addListener();
    } else {
      setTimeout(addListener, 0);
    }

    scrollWrapperEl1.scrollTop = 10000;
    scrollWrapperEl1.scrollLeft = 10000;
    scrollWrapperEl2.scrollTop = 10000;
    scrollWrapperEl2.scrollLeft = 10000;

    rmListener = function rmListener() {
      el.removeChild(wrapperEl);
      elList = elList.filter(function (_ref2) {
        var existedEl = _ref2.el;
        return existedEl !== el;
      });
    };

    elList.push({
      el: el,
      rmListener: rmListener
    });
  }

  return rmListener;
};

exports.elResize = elResize;
var funcs = {
  elResize: elResize
};
var _default = funcs;
exports["default"] = _default;