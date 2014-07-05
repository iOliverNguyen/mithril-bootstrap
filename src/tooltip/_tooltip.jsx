ui.tooltip = function() {

  function controller() {

  }

  function view(ctrl) {
    return INCLUDE('tooltip/tooltip.tpl');
  }

  return {
    controller: controller,
    view: view
  };
};
