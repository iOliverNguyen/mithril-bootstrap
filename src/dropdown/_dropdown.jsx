ui.dropdown = function(options) {

  function controller() {
    this.com = u.init(options.module);
    this.opening = m.prop(false);

    this.toggle = function() {
      this.opening(!this.opening());
    }.bind(this);
  }

  function view(ctrl) {
    return INCLUDE('dropdown/dropdown.tpl');
  }

  return {
    controller: controller,
    view: view
  };
};

