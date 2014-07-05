<div>
  <button class="btn btn-default" onclick={ctrl.openModal()}>
    Open me!</button>&nbsp;
  <button class="btn btn-default" onclick={ctrl.openModal('lg')}>
    Large modal</button>&nbsp;
  <button class="btn btn-default" onclick={ctrl.openModal('sm')}>
    Small modal</button>
  {
    ctrl.selected()?
    <div ng-show="selected">
      Selection from a modal: {ctrl.selected()}
    </div>: []
  }
  <div>
  {ctrl.modalInstance? ctrl.modalInstance.$view() : []}
  </div>
</div>
