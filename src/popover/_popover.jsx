ui.popover = function() {

  function controller() {

  }

  function view(ctrl) {
    return INCLUDE('popover/popover.tpl');
  }

  return {
    controller: controller,
    view: view
  };
};
