// START
var demo = {};
demo.controller = function() {
  var ctrl = this;
  ctrl.max = m.prop(200);
  ctrl.dynamic = m.prop(0);
  ctrl.type = m.prop('');

  ctrl.random = function() {
    var value = Math.floor((Math.random() * 100) + 1);

    var type;
    if (value < 25) type = 'success';
    else if (value < 50) type = 'info';
    else if (value < 75) type = 'warning';
    else type = 'danger';

    ctrl.showWarning = (type === 'danger' || type === 'warning');

    ctrl.dynamic(value);
    ctrl.type(type);
  };

  ctrl.randomStacked = function() {
    ctrl.stacked = [];
    var types = ['success', 'info', 'warning', 'danger'];

    for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
      var index = Math.floor((Math.random() * 4));
      ctrl.stacked.push({
        value: Math.floor((Math.random() * 30) + 1),
        type: types[index]
      });
    }
  };

  ctrl.random();
  ctrl.randomStacked();
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
