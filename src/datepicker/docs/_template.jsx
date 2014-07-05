<div>
  <pre>{ctrl.date()}&nbsp;</pre><br/>
  <h4>Inline</h4>
  <div style="display:inline-block">
    {ctrl.datepicker.$view()}
  </div>
  <h4>Popup</h4>
  <div class="row">
    <div class="col-md-6">
      <p class="input-group">
        <input type="text" class="form-control" value={format(ctrl.date())} />
        {ctrl.datepicker2.$view()}
        <span class="input-group-btn">
          <button type="button" class="btn btn-default" onclick={ctrl.toggle}>
            <i class="glyphicon glyphicon-calendar"></i>
          </button>
        </span>
      </p>
    </div>
  </div>
  <hr/>
  <button class="btn btn-sm btn-info" onclick={ctrl.today}>Today</button>&nbsp;
    <button class="btn btn-sm btn-default" onclick={m.u.bind(ctrl.date, ctrl, new Date('2009-08-24'))}>2009-08-24</button>&nbsp;
    <button class="btn btn-sm btn-danger" onclick={ctrl.clear}>Clear</button>
</div>
