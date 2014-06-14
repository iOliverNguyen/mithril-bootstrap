ui.tabs = function tabs(configs) {

  function controller() {
    this.index = m.prop(0);

    this.coms = [];
    for (var i=0; i < configs.length; i++) {
      this.coms.push(u.init(configs[i].module));
    }

    this.current = function() {
      return this.coms[this.index()];
    };
  }

  function view(ctrl) {
    var coms = ctrl.coms, tabs = [], panes = [], i;
    for (i=0; i < coms.length; i++) {
      tabs.push(
        <li class={isActive(i)}>
          <a href="#" onclick={u.silence(ctrl.index.bind(ctrl,i))}>{configs[i].label}</a>
        </li>
      );
    }
    for (i=0; i < coms.length; i++) {
      panes.push(
        <div class={'tab-pane ' + isActive(i)}>
          {coms[i].$view()}
        </div>
      );
    }

    function isActive(i) {
      return ctrl.index() === i? 'active' : '';
    }
    return INCLUDE('tabs/tabs.tpl');
  }

  return {
    controller: controller,
    view: view
  };
};
