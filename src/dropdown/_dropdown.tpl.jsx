<span class={"dropdown " + (ctrl.opening()? 'open':'')}>
  <a href="#" class="dropdown-toggle" onclick={u.mute(ctrl.toggle)}>
    Click me for a dropdown, yo!
  </a>
  {ctrl.com.$view()}
</span>
