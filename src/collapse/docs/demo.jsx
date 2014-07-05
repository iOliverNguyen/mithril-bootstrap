// START
var demo = {};

demo.controller = function() {
  var module = {
    controller: function() {},
    view: function() {
      return <pre>Sample content</pre>;
    }
  };

  this.collapse = m.u.init(m.ui.collapse({
    content: module,
    disabled: false
  }));
};

demo.view = function(ctrl) {
  return INCLUDE('./template');
};
// END

demo.doc =  INCLUDE('./readme');
demo.small = 'm.ui.collapse';
demo.files = {
  'demo.jsx': CONTENT('./demo.jsx'),
  '_template.jsx': CONTENT('./_template.jsx'),
};
module.exports = demo;
