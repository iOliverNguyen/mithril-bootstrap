<div>
  <span class="dropdown" config={m.ui.configDropdown()}>
    <a href="#" class="dropdown-toggle">
      Click me for a dropdown, yo!
    </a>
    <ul class="dropdown-menu">
      <li>
      {
        ctrl.items.map(function(choice) {
          return <a href>{choice}</a>;
        })
      }
      </li>
    </ul>
  </span>&nbsp;

  <div class="btn-group" config={m.ui.configDropdown(ctrl.isOpen)}>
    <button type="button" class="btn btn-primary dropdown-toggle" disabled={ctrl.isDisabled()}>
      Button dropdown <span class="caret"></span>
    </button>
    <ul class="dropdown-menu">
      <li><a href="#">Action</a></li>
      <li><a href="#">Another action</a></li>
      <li><a href="#">Something else here</a></li>
      <li class="divider"></li>
      <li><a href="#">Separated link</a></li>
    </ul>
  </div>&nbsp;

  <div class="btn-group" config={m.ui.configDropdown()}>
    <button type="button" class="btn btn-danger">Action</button>
    <button type="button" class="btn btn-danger dropdown-toggle">
      <span class="caret"></span>
      <span class="sr-only">Split button!</span>
    </button>
    <ul class="dropdown-menu" role="menu">
      <li><a href="#">Action</a></li>
      <li><a href="#">Another action</a></li>
      <li><a href="#">Something else here</a></li>
      <li class="divider"></li>
      <li><a href="#">Separated link</a></li>
    </ul>
  </div>

  <hr/>
  <p>
    <button class="btn btn-default" onclick={ctrl.toggleDropdown}>
      Toggle dropdown button</button>&nbsp;
    <button class="btn btn-warning" onclick={ctrl.disableDropdown}>
      Enable/Disable</button>
  </p>
</div>
