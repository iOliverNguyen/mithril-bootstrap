<div>
  <div>
    <h4>Single toggle</h4>
    <pre>{ctrl.single()}</pre>
    <button class="btn btn-primary"
      config={m.ui.configCheckbox(ctrl.single, {true: 1, false: 0})}>
      Single Toggle
    </button>
  </div>
  <br/>
  <div>
    <h4>Checkbox</h4>
    <pre>{JSON.stringify(ctrl.checks)}</pre>
    <div class="btn-group">
      <button class="btn btn-success"
        config={m.ui.configCheckbox(ctrl.checks.left)}>
        Left
      </button>
      <button class="btn btn-success"
        config={m.ui.configCheckbox(ctrl.checks.middle)}>
        Middle
      </button>
      <button class="btn btn-success"
        config={m.ui.configCheckbox(ctrl.checks.right)}>
        Right
      </button>
    </div>
  </div>
  <br/>
  <div>
    <h4>Radio</h4>
    <pre>{ctrl.radio()}</pre>
    <div class="btn-group">
      <button class="btn btn-danger"
        config={m.ui.configRadio(ctrl.radio, 'left')}>
        Left
      </button>
      <button class="btn btn-danger"
        config={m.ui.configRadio(ctrl.radio, 'middle')}>
        Middle
      </button>
      <button class="btn btn-danger"
        config={m.ui.configRadio(ctrl.radio, 'right')}>
        Right
      </button>
    </div>
  </div>
</div>
