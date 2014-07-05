<div class={'alert alert-' + type + (ctrl.close? ' alert-dismissable':'')}>
  {
  	ctrl.close?
  	<button type="button" class="close" onclick = {ctrl.closeAlert}>&times;</button>:
  	[]
  }
  <p>{ctrl.msg()}</p>
</div>
