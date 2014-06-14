<ul class="pagination">
  {
    !ctrl.boundaryLinks()? null :
    <li class={page===0? 'disabled':''}>
      <a href="#" onclick={u.mute(u.bind(ctrl.setPage, ctrl, 0))}>
        {ctrl.firstText()}
      </a>
    </li>
  }
  {
    !ctrl.directionLinks()? null :
    <li class={page===0? 'disabled':''}>
      <a href="#" onclick={u.mute(u.bind(ctrl.setPage, ctrl, page-1))}>
        {ctrl.previousText()}
      </a>
    </li>
  }
  {cells}
  {
    !ctrl.directionLinks()? null :
    <li class={page===last? 'disabled':''}>
      <a href="#" onclick={u.mute(u.bind(ctrl.setPage, ctrl, page+1))}>
        {ctrl.nextText()}
      </a>
    </li>
  }
  {
    !ctrl.boundaryLinks()? null :
    <li class={page===last? 'disabled':''}>
      <a href="#" onclick={u.mute(u.bind(ctrl.setPage, ctrl, last))}>
        {ctrl.lastText()}
      </a>
    </li>
  }
</ul>

