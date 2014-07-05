// START
var demo = {};
demo.controller = function() {
  this.rating = m.u.init(m.ui.rating({
    iconOff: <span class="glyphicon glyphicon-ok-circle"></span>,
    iconOn: <span class="glyphicon glyphicon-ok-sign"></span>,
    max: 10,
    rating: 7,
    hover: true,
    readOnly: false
  }));
};

demo.view = function(ctrl) {
  var clear = function() {
    ctrl.rating.clear();
  };

  var toggle = function() {
    ctrl.rating.readOnly(!ctrl.rating.readOnly());
  };
  return INCLUDE('./template');
};
// END

demo.doc =  INCLUDE('./readme');
demo.small = 'm.ui.rating';
demo.files = {
  'demo.jsx': CONTENT('./demo.jsx'),
  '_template.jsx': CONTENT('./_template.jsx'),
};
module.exports = demo;
