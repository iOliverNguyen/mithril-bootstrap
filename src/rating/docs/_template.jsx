<div>
  <div>
    {ctrl.rating.$view()}
  </div>
  <br/>
  <div>
    Rating: <b>{ctrl.rating.rating()}</b> -
    Read only is <b>{ctrl.rating.readOnly()}</b> -
    Hovering over <b>
      {ctrl.rating.hovering()? ctrl.rating.hovering(): 'none'}
    </b>
  </div>
  <br />
  <button class="btn btn-danger" onclick={clear}
    disabled={ctrl.rating.readOnly()?'disabled':''} >
    Clear
  </button>&nbsp;
  <button class="btn btn-default" onclick={toggle}>
    Toggle Read Only
  </button>
</div>
