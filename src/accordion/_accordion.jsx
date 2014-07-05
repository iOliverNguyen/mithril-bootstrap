ui.accordion = function(options) {

  options = options || {};

  function controller() {
    var ctrl = this;
    ctrl.group = (options.group||[]).map(function(g) {
      var o = {
        heading: u.prop(g.heading||''),
        com: u.init(g.module),
        open: u.prop(g.open||false),
        disabled: u.prop(g.disabled||false),
        animating: u.prop(false),
        animation: function(element, isInit) {
          if (!isInit) element.addEventListener('transitionend',
            function() {
              o.animating(false);
              if (o.open()) element.style.height = 'auto';
              else element.classList.add('collapse');
              element.classList.remove('collapsing');
            });

          if (!o.animating() && !o.open()) element.classList.add('collapse');
          else element.classList.remove('collapse');

          if (o.animating()) {
            element.classList.add('collapsing');

            var height;
            if (o.open()) {
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

        }.bind(o)
      };

      return o;
    });

    ctrl.closeOthers = u.prop(options.closeOthers||false);

    ctrl.toggle = function(index) {
      var g = ctrl.group[index];
      if (!g) throw new Error('index out of range');

      if (g.disabled()) return;
      g.open(!g.open());
      g.animating(true);

      if (g.open() && ctrl.closeOthers()) {
        for (var i=0; i < ctrl.group.length; i++) {
          var other = ctrl.group[i];
          if (other !== g) {
            if (other.open()) other.animating(true);
            other.open(false);
          }
        }
      }
    };
  }

  function view(ctrl) {
    var rows = ctrl.group.map(function(g,i) {
      return INCLUDE('./row.tpl');
    });

    return <div class="panel-group">{rows}</div>;
  }

  return {
    controller: controller,
    view: view
  };
};
