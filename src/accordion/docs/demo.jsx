// START
INCLUDE('./module1')
INCLUDE('./module2')

var demo = {};
demo.controller = function() {
  var ctrl = this;
  ctrl.oneAtATime = m.prop(false);
  ctrl.disabled = m.prop(false);

  ctrl.accordion = m.u.init(m.ui.accordion({
    group: [{
      heading: 'Static',
      disabled: ctrl.disabled,
      module: module1
    }, {
      heading: <span>Header can also have markup
        <span class="pull-right glyphicon glyphicon-star"></span></span>,
      module: module1
    }, {
      heading: 'Dynamic',
      module: module2
    }],
    closeOthers: ctrl.oneAtATime
  }));
};

demo.view = function(ctrl) {
  var toggle = function() {
    ctrl.accordion.toggle(0);
  };

  var toggleDisabled = function() {
    ctrl.disabled(!ctrl.disabled());
  };

  return INCLUDE('./template');
};
// END

demo.doc =  INCLUDE('./readme');
demo.small = 'm.ui.accordion';
demo.files = {
  'demo.jsx': CONTENT('./demo.jsx'),
  '_template.jsx': CONTENT('./_template.jsx'),
  '_module1.jsx': CONTENT('./_module1.jsx'),
  '_module2.jsx': CONTENT('./_module2.jsx'),
};
module.exports = demo;
