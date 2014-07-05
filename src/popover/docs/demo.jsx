// START
var demo = {};
demo.controller = function() {
  this.popover = m.u.init(m.ui.popover({

  }));
};

demo.view = function(ctrl) {
  return INCLUDE('./template');
};
// END

demo.doc =  INCLUDE('./readme');
demo.files = {
  'demo.jsx': CONTENT('./demo.jsx'),
  '_template.jsx': CONTENT('./_template.jsx'),
};
module.exports = demo;
