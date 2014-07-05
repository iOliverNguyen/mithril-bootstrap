ui.rating = function(options) {

  options = options||{};

  function controller() {
    var ctrl = this;
    ctrl.iconOff = u.prop(options.iconOff||<span class="glyphicon glyphicon-ok-circle"></span>);
    ctrl.iconOn = u.prop(options.iconOn||<span class="glyphicon glyphicon-ok-sign"></span>);
    ctrl.max = u.prop(options.max||5);
    ctrl.rating = u.prop(options.rating||0);
    ctrl.hovering = u.prop(options.rating||undefined);
    ctrl.hover = u.prop(options.hover||false);
    ctrl.readOnly = u.prop(options.readOnly||false);

    ctrl.list = u.prop([]);
    for (var i = 0; i < ctrl.max(); i++) {
      var element = {};
      element.index = i;
      if (i < ctrl.rating()) {
        element.icon = ctrl.iconOn();
      } else {
        element.icon = ctrl.iconOff();
      }

      ctrl.list().push(element);
    }

    ctrl.setHovering = function(index) {
      ctrl.hovering(index + 1);
      ctrl.list = u.prop([]);
      for (var i = 0; i < ctrl.max(); i++) {
        var element = {};
        element.index = i;
        if (i < ctrl.hovering()) {
          element.icon = ctrl.iconOn();
        } else {
          element.icon = ctrl.iconOff();
        }

        ctrl.list().push(element);
      }
    };

    ctrl.setNotHovering = function() {
      ctrl.hovering(undefined);
      ctrl.list = u.prop([]);
      for (var i = 0; i < ctrl.max(); i++) {
        var element = {};
        element.index = i;
        if (i < ctrl.rating()) {
          element.icon = ctrl.iconOn();
        } else {
          element.icon = ctrl.iconOff();
        }

        ctrl.list().push(element);
      }
    };

    ctrl.setRating = function(index) {
      ctrl.rating(index + 1);
      ctrl.list = u.prop([]);
      for (var i = 0; i < ctrl.max(); i++) {
        var element = {};
        element.index = i;
        if (i < ctrl.rating()) {
          element.icon = ctrl.iconOn();
        } else {
          element.icon = ctrl.iconOff();
        }

        ctrl.list().push(element);
      }
      m.redraw();
    };

    ctrl.clear = function() {
      ctrl.list = u.prop([]);
      ctrl.rating(0);
      for (var i = 0; i < ctrl.max(); i++) {
        var element = {};
        element.index = i;
        if (i < ctrl.rating()) {
          element.icon = ctrl.iconOn();
        } else {
          element.icon = ctrl.iconOff();
        }

        ctrl.list().push(element);
      }

      m.redraw();
    };

  }

  function view(ctrl) {

    var rows = [];
    for (var i in ctrl.list()) {
      var attrs = {};

      if (!ctrl.readOnly()) {

        if (ctrl.hover()) {
          attrs.onmouseover= u.mute(u.bind(ctrl.setHovering, ctrl, ctrl.list()[i].index));
          attrs.onmouseout= u.mute(u.bind(ctrl.setNotHovering, ctrl, ctrl.list()[i].index));
        }

        attrs.onclick = u.mute(u.bind(ctrl.setRating, ctrl, ctrl.list()[i].index));
      }

      rows.push(
        m('span', attrs, [ctrl.list()[i].icon])
      );

    }
    return <div>{rows}</div>;
  }

  return {
    controller: controller,
    view: view
  };
};
