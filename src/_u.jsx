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

u.init = function($module, initObj) {

  // NOTE: should we use inheritance or directly modify controller instance

  var ctrl = initObj || {};
  var obj = ctrl;
  // var obj = Object.create(ctrl);

  $module.controller.apply(ctrl, slice.call(arguments, 2));
  obj.$module = $module;
  obj.$view = $module.view.bind({}, ctrl);
  return obj;
};

u.mute = function(cb) {
  return function(e) {
    e.preventDefault();
    if (cb) return cb(e);
  };
};

u.silence = u.mute;

u.exec = function(expr) {
  var args = slice.call(arguments, 1);
  if (typeof expr === 'function') return expr.apply(this, args);
  return expr;
};

u.save = function(expr, value) {
  if (typeof expr === 'function') return expr(value);
  return expr;
};

u.prop = function(store) {
  if (typeof store === 'function') return store;
  var p = function() {
    if (arguments.length) store = arguments[0];
    return store;
  };
  p.toJSON = function() { return store; };
  return p;
};

u.bind = function(fn, context) {
  var args = arguments;
  return function() {
    var a = slice.call(args, 2).concat(slice.call(arguments, 0));
    return fn.apply(context, a);
  };
};

u.truth = function(value, valueTrue, valueFalse) {
  return value === valueTrue? true: value === valueFalse? false: !!value;
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
