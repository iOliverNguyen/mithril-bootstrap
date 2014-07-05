var modal = {};
modal.controller = function(params) {
  var ctrl = this;
  ctrl.items = params.items;
  ctrl.selected = m.prop('item1');

  ctrl.ok = function() {
    ctrl.$modal.close(ctrl.selected());
  };

  ctrl.cancel = function() {
    ctrl.$modal.dismiss('Cancel');
  };
};

modal.view = function(ctrl) {
  return INCLUDE('./modal.tpl');
};
