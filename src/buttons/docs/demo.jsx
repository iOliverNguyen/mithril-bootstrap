// START
var demo = {};
demo.controller = function() {
  var ctrl = this;
  ctrl.single = m.prop(0);
  ctrl.checks = {
    left: m.prop(false),
    middle: m.prop(false),
    right: m.prop(false)
  };
  ctrl.radio = m.prop('left');
};

demo.view = function(ctrl) {
  return INCLUDE('./template');
};
// END

demo.doc =  INCLUDE('./readme');
demo.small = 'm.ui.configCheckbox, m.ui.configRadio';
demo.files = {
  'demo.jsx': CONTENT('./demo.jsx'),
  '_template.jsx': CONTENT('./_template.jsx'),
};
module.exports = demo;
