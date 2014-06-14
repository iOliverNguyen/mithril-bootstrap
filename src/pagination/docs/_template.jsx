<div>
  <pre>
    Total: {ctrl.totalItems()}<br/>
    Page: {page}/{ctrl.pagination.numPages()} (zero-based)
  </pre>
  <div>{ctrl.pagination.$view()}</div>
  <button class="btn btn-info"
    onclick={function(){ ctrl.pagination.setPage(10); }}>
    Go to page 10
  </button>
  <table class="table">
    <thead>
      <tr>
        <th class="#">#</th>
        <th>Country</th>
      </tr>
    </thead>
    <tbody>
      {rows}
    </tbody>
  </table>
</div>
