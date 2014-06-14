var u = m.u;

function layout($module) {

  function controller() {
    this.com = u.init($module);
    this.tabs = [{href:'/',label:'Home'}];
  }

  function view(ctrl) {
    var tabs = [];
    for (var i=0; i < ctrl.tabs.length; i++) {
      var tab = ctrl.tabs[i];
      tabs.push(
        <li class={isActive(tab.href)}>
          <a href={tab.href} config={m.route}>{tab.label}</a>
        </li>
      );
    }

    function isActive(r) {
      return m.route() === r? 'active': '';
    }

    return INCLUDE('layout/layout.tpl');
  }

  return {
    controller: controller,
    view: view
  };
}

module.exports = layout;
