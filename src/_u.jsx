var shift = Array.prototype.shift;
var unshift = Array.prototype.unshift;
var slice = Array.prototype.slice;

u.eachFunc = function() {
  var funcs = arguments;
  return function() {
    for (var i=0; i < funcs.length; i++) {
      funcs[i].apply(this, arguments);
    }
  };
};

u.init = function($module) {
  var ctrl = {};
  var obj = Object.create(ctrl);
  $module.controller.apply(ctrl, slice.call(arguments, 1));
  obj.$module = $module;
  obj.$view = $module.view.bind({}, ctrl);
  return obj;
};

u.mute = function(cb) {
  return function(e) {
    e.preventDefault();
    if (cb) return cb();
  };
};

u.silence = u.mute;

u.exec = function(expr) {
  if (typeof expr === 'function') return expr();
  return expr;
};

u.save = function(expr, value) {
  if (typeof expr === 'function') return expr(value);
  return expr;
};

u.prop = function(store) {
  if (typeof store === 'function') return store;
  var p = function() {
    if (arguments.length) {
      var newValue = arguments[0];
      var oldValue = store;
      store = arguments[0];
      if (fnSet) fnSet(newValue, oldValue);
      if (fnChange && newValue !== oldValue) fnChange(newValue, oldValue);
    }
    return store;
  };
  var fnChange, fnSet;
  p.onchange = function(fn) { fnChange = fn; }; // bug
  p.onset = function(fn) { fnSet = fn; };
  p.toJSON = function() { return store; };
  return p;
};

function wrapWatch(prop) {
  var fnChanges = [];

  prop = Object.create(prop);
  prop = function() {
    if (arguments.length) {
      var newValue = arguments[0];
      var oldValue = store;
      store = arguments[0];
      // if (fnSet) fnSet(newValue, oldValue);
      if (fnChanges && newValue !== oldValue) fnChange(newValue, oldValue);
    }
    return store;
  };
  prop.$onchange = function(fn) {
    fnChanges.push(fn);
  };
  return prop;
}

u.watch = function(prop, fn) {
  if (typeof prop.$onchange === 'undefined') prop = wrapWatch(prop);
  prop.$onchange(fn);
  return prop;
};

u.bind = function(fn, context) {
  var args = arguments;
  return function() {
    var a = slice.call(args, 2).concat(slice.call(arguments, 0));
    return fn.apply(context, a);
  };
};

function min(a, b) {
  return a < b? a : b;
}

function max(a, b) {
  return a < b? b : a;
}

function def(a, d) {
  return a !== undefined? a : d;
}
