// START
INCLUDE('./modal')

var demo = {};
demo.controller = function() {
  var ctrl = this;
  ctrl.items = ['item1', 'item2', 'item3'];
  ctrl.selected = m.prop('');
  ctrl.openModal = function(size) {
    return function() {
      ctrl.modalInstance = m.u.init(m.ui.modal({
        size: size,
        params: {
          items: ctrl.items
        },
        module: modal
      }));

      ctrl.modalInstance.result.then(function(selectedItem) {
        ctrl.selected(selectedItem);
      }, function() {
        console.log('Modal dismissed');
      });
    };
  };
};

demo.view = function(ctrl) {
  return INCLUDE('./template');
};
// END

demo.doc =  INCLUDE('./readme');
demo.small = 'm.ui.modal';
demo.files = {
  'demo.jsx': CONTENT('./demo.jsx'),
  '_template.jsx': CONTENT('./_template.jsx'),
  '_modal.jsx': CONTENT('./_modal.jsx'),
  '_modal.tpl.jsx': CONTENT('./_modal.tpl.jsx')
};
module.exports = demo;
