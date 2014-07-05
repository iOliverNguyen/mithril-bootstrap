<div>
  <p>
    <button class="btn btn-default" onclick={toggle}>
      Toggle first panel
    </button>&nbsp;
    <button class="btn btn-default" onclick={toggleDisabled}>
      Enable/Disable first panel
    </button>
  </p>
  <label>
    <input type="checkbox"
    onchange={m.withAttr("checked", ctrl.oneAtATime)} />&nbsp;
    Only one at a time
  </label>
  <br/>
  {ctrl.accordion.$view()}
</div>
