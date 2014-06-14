module.exports = function(config) {

  function controller() {
    this.index = m.prop(0);

    this.coms = config.map(function(c) {
      return m.u.init(c.module);
    });

    this.current = function() {
      return this.coms[this.index()];
    };
  }

  function view(ctrl) {
    var tabs = [], panes = [];
    config.forEach(function(c,i) {
      var extraClass = c.class || '';
      var active = ctrl.index()===i?' active':'';
      tabs.push(
        <li class={extraClass + active}>
          <a href="#" onclick={m.u.mute(m.u.bind(ctrl.index,ctrl,i))}>
            {config[i].label}
          </a>
        </li>
      );
      panes.push(
        <div class={extraClass + " tab-pane" + active}>
          {ctrl.coms[i].$view()}
        </div>
      );
    });
    return INCLUDE('section/tabs.tpl');
  }

  return {
    controller: controller,
    view: view
  };
};
