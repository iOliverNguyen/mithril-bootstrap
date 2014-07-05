<div>
  <div class="modal-header">
    <h3 class="modal-title">I'm a modal!</h3>
  </div>
  <div class="modal-body">
    <ul>
      {
        ctrl.items.map(function(item) {
          return <li>
            <a onclick={m.u.bind(ctrl.selected, ctrl, item)}>{item}</a>
          </li>;
        })
      }
    </ul>
    Selected: <b>{ctrl.selected()}</b>
  </div>
  <div class="modal-footer">
    <button class="btn btn-primary" onclick={ctrl.ok}>OK</button>
    <button class="btn btn-warning" onclick={ctrl.cancel}>Cancel</button>
  </div>
</div>
