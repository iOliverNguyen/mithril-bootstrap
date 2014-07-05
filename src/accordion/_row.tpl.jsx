<div class="panel panel-default">
  <div class="panel-heading">
    <h4 class="panel-title">
      <a class="accordion-toggle" onclick={u.mute(u.bind(ctrl.toggle, ctrl, i))} >
        <span class={g.disabled()?'text-muted':''}>{g.heading()}
        </span>
      </a>
    </h4>
  </div>
  <div config={g.animation}>
    <div class="panel-body">
      <span>
      {g.com.$view()}
      </span>
    </div>
  </div>
</div>
