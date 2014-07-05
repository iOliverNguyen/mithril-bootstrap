ui.collapse = function(options) {
  options = options||{};
  function controller() {
    var ctrl = this;
    ctrl.content = u.init(options.content);
    ctrl.open = u.prop(false);
    ctrl.disabled = u.prop(options.disabled || false);
    ctrl.animating = u.prop(false);

    ctrl.toggle = function() {
      if (ctrl.disabled()) return;

      ctrl.open(!ctrl.open());
      ctrl.animating(true);
    };

    ctrl.animation = function(element, isInit) {
      if (!isInit) element.addEventListener('transitionend',
        function() {
          ctrl.animating(false);
          if (ctrl.open()) element.style.height = 'auto';
          else element.classList.add('collapse');
          element.classList.remove('collapsing');
        });

      if (!ctrl.animating() && !ctrl.open()) element.classList.add('collapse');
      else element.classList.remove('collapse');

      if (ctrl.animating()) {
        element.classList.add('collapsing');

        var height;
        if (ctrl.open()) {
          element.style.height = 'auto';
          height = element.getBoundingClientRect().height;
          element.style.height = '0';
          setTimeout(function() {
            element.style.height = height + 'px';
          }, 0);

        } else {
          element.style.height = 'auto';
          height = element.getBoundingClientRect().height;
          element.style.height = height + 'px';
          setTimeout(function() {
            element.style.height = '0';
          }, 0);
        }
      }
    };
  }

  function view(ctrl) {
    return INCLUDE('collapse/collapse.tpl');
  }

  return {
    controller: controller,
    view: view
  };
};
