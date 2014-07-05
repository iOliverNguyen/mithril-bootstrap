ui.renderAlert = function(options) {
  options = options || {};
  var type = u.exec(options.type) || 'warning';
  var msg = u.exec(options.msg) || '';

  return <div class={"alert alert-" + type + (options.close? " alert-dismissable": "")}>
    {
      options.close?
      <button class="close" onclick={options.close}>
        <span aria-hidden="true">×</span>
        <span class="sr-only">Close</span>
      </button>:
      []
    }
    <div>{msg}</div>
  </div>;
};
