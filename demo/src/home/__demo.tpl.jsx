<div class="bootstrap">
  <div class="row">
    <div class="col-md-8">
      <h2>Mithril Bootstrap</h2>
      <p>This is Mithril Bootstrap demo page</p>
    </div>
  </div>
  <hr/>
  <div class="row">
    <div class="col-md-6">
      <h2>Dropdown</h2>
      <p>
        {ctrl.dropdown.$view()}
      </p>
    </div>
  </div>,
  <hr/>
  <div class="row">
    <div class="col-md-6">
      <h2>Tabs</h2>
      <p>
        {ctrl.tabs.$view()}
      </p>
    </div>
  </div>
  <hr/>
  <div class="row">
    <div class="col-md-6">
      <h2>Pagination</h2>
      <div>{ctrl.$paginationData()}</div>
      <div>
        {ctrl.pagination.$view()}
      </div>
    </div>
    <div class="col-md-6">
      <div>{ctrl.currentPage()}</div>
    </div>
  </div>
  <hr/>
  <div class="row">
    <div class="col-md-6">
        <h2>Typeahead</h2>
        <div>{ctrl.typeahead.$view()}</div>
    </div>
    <div class="col-md-6">
      {JSON.stringify(ctrl.selectedItem)}
    </div>
  </div>
</div>
