<table tabindex="0">
  <thead>
    <tr>
      <th>
        <button type="button" class="btn btn-default btn-sm pull-left" onclick={changeMonth(-1)} tabindex="-1">
          <i class="glyphicon glyphicon-chevron-left"></i></button>
      </th>
      <th colspan="6">
        <button type="button" class="btn btn-default btn-sm" tabindex="-1" style="width:100%;">
          <strong class="ng-binding">{title}</strong></button>
        </th>
      <th>
        <button type="button" class="btn btn-default btn-sm pull-right" onclick={changeMonth(1)} tabindex="-1">
          <i class="glyphicon glyphicon-chevron-right"></i></button>
      </th>
    </tr>
    <tr>
      <th ng-show="showWeeks" class="text-center"></th>
    </tr>
  </thead>
  <tbody>
    {rows}
  </tbody>
</table>
