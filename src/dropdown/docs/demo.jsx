// START
var demo = {};
demo.controller = function() {
  var ctrl = this;

  ctrl.items = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];

  ctrl.isOpen = m.prop(false);
  ctrl.isDisabled = m.prop(false);

  ctrl.toggleDropdown = function(e) {
    e.preventDefault();
    e.stopPropagation();
    ctrl.isOpen(!ctrl.isOpen());
  };

  ctrl.disableDropdown = function() {
    ctrl.isDisabled(!ctrl.isDisabled());
  };
};

demo.view = function(ctrl) {
  return INCLUDE('./template');
};
// END

demo.doc =  INCLUDE('./readme');
demo.small = 'm.ui.configDropdown';
demo.files = {
  'demo.jsx': CONTENT('./demo.jsx'),
  '_template.jsx': CONTENT('./_template.jsx'),
};
module.exports = demo;
