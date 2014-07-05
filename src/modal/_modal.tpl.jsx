[
<div class="modal-backdrop fade in" style={{zIndex: ctrl.zIndex()}}></div>,

<div class="modal" style={{zIndex: ctrl.zIndex()+1, display: 'block'}}>
  <div class={'modal-dialog' + (size? ' modal-' + size: '')}>
    <div class="modal-content">
      <div class="modal-body">
        <div class="modal-body-content">
          {ctrl.com.$view()}
        </div>
      </div>
    </div>
  </div>
</div>
]
