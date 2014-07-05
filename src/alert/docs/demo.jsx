// START
var demo = {};
demo.controller = function() {
  var ctrl = this;
  ctrl.alerts = [
    {type: 'danger', msg: 'Oh! Change something and try again.'},
    {type: 'success', msg: <span>Well done! Alert can also have <b>markup</b>.</span>}
  ];

  ctrl.addAlert = function() {
    ctrl.alerts.push({msg: 'This is sample alert.'});
  };

  ctrl.closeAlert = function(index) {
    ctrl.alerts.splice(index, 1);
  };
};

demo.view = function(ctrl) {
  return INCLUDE('./template');
};
// END

demo.doc = INCLUDE('./readme');
demo.small = 'm.ui.renderAlert';
demo.files = {
  'demo.jsx': CONTENT('./demo.jsx'),
  '_template.jsx': CONTENT('./_template.jsx')
};
module.exports = demo;
