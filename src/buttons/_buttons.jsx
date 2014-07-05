ui.configCheckbox = function(prop, options) {
  options = options || {};
  prop = u.prop(prop);
  var valueTrue = u.prop(options.true === undefined? true: options.true);
  var valueFalse = u.prop(options.false === undefined? false: options.false);

  return function(element, isInit) {
    var truth = u.truth(prop(), valueTrue(), valueFalse());

    if (truth) element.classList.add('active');
    else element.classList.remove('active');

    if (!isInit) {
      element.addEventListener('click', function(e) {
        var truth = u.truth(prop(), valueTrue(), valueFalse());
        prop(!truth?valueTrue():valueFalse());
        m.redraw();
      });
    }
  };
};

ui.configRadio = function(prop, value) {
  prop = u.prop(prop);
  value = u.prop(value);

  return function(element, isInit) {
    if (prop() === value()) element.classList.add('active');
    else element.classList.remove('active');

    if (!isInit) {
      element.addEventListener('click', function(e) {
        prop(value());
        m.redraw();
      });
    }
  };
};
