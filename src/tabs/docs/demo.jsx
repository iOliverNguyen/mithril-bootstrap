// START
var demo = {};
demo.controller = function() {
  this.tabs = m.u.init(m.ui.tabs([{
    label: 'Tab 1',
    module: tab1
  }, {
    label: 'Tab 2',
    module: tab2
  }]));
};

demo.view = function(ctrl) {
  return INCLUDE('./template');
};

var tab1 = {};
tab1.controller = function(){};
tab1.view = function(ctrl) {
  return INCLUDE('./tab1');
};

var tab2 = {};
tab2.controller = function(){};
tab2.view = function(ctrl) {
  return INCLUDE('./tab2');
};
// END

demo.doc =  INCLUDE('./readme');
demo.extraFiles = ['_tab1.jsx', '_tab2.jsx'];
module.exports = demo;
