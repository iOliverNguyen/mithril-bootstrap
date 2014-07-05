// START
var demo = {};
demo.controller = function() {
  var ctrl = this;
  ctrl.date = m.prop(new Date());

  ctrl.datepicker = m.u.init(m.ui.datepicker({
    date: ctrl.date,
    type: 'inline'
  }));

  ctrl.datepicker2 = m.u.init(m.ui.datepicker({
    date: ctrl.date,
    type: 'popup'
  }));

  ctrl.toggle = function() {
    ctrl.datepicker2.opening(!ctrl.datepicker2.opening());
  };

  ctrl.today = function() {
    ctrl.date(new Date());
  };

  ctrl.clear = function() {
    ctrl.date(null);
  };
};

demo.view = function(ctrl) {
  function format(date) {
    return date? date.toDateString(): '';
  }

  return INCLUDE('./template');
};
// END

demo.doc =  INCLUDE('./readme');
demo.small = 'm.ui.datepicker';
demo.files = {
  'demo.jsx': CONTENT('./demo.jsx'),
  '_template.jsx': CONTENT('./_template.jsx'),
};
module.exports = demo;
