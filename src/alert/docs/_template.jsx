<div>
  {
    ctrl.alerts.map(function(alert, index) {
      return m.ui.renderAlert({
        type: alert.type,
        close: m.u.bind(ctrl.closeAlert, ctrl, index),
        msg: alert.msg
      });
    })
  }
  <button class="btn btn-default" onclick={ctrl.addAlert}>
    Add alert
  </button>
</div>
