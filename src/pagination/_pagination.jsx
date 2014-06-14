ui.pagination = function(config) {

  config = config || {};

  function num(n, def) {
    if (typeof n !== 'number' || n < 0) n = def;
    return Math.ceil(n);
  }

  function controller() {
    this.currentPage = u.prop(config.currentPage || 0);
    this.totalItems = u.prop(config.totalItems || 0);
    this.itemsPerPage = u.prop(config.itemsPerPage || 10);
    this.maxSize = u.prop(config.maxSize || 5);

    this.directionLinks = u.prop(def(config.directionLinks, true));
    this.boundaryLinks = u.prop(def(config.boundaryLinks, false));

    this.previousText = u.prop(config.previousText || 'Previous');
    this.nextText = u.prop(config.nextText || 'Next');
    this.firstText = u.prop(config.firstText || 'First');
    this.lastText = u.prop(config.lastText || 'Last');

    this.numPages = function() {
      var itemsPerPage = num(this.itemsPerPage(), 10) || 10;
      return num(this.totalItems() / itemsPerPage, 0);
    };

    this.setPage = function(i) {
      if (i < 0) i = 0;
      if (i >= this.numPages()) i = this.numPages() - 1;
      this.currentPage(i);
    };
  }

  // Zero-based
  function view(ctrl) {
    var cells = [];
    var N = ctrl.numPages();
    var page = min(num(ctrl.currentPage(), 0), N-1);
    var maxSize = num(ctrl.maxSize(), 1000);
    var last = max(N-1, 0);
    var low = page - Math.floor(maxSize/2);
    var high = page + Math.ceil(maxSize/2);
    if (low < 0) { low = 0; high = min(low+maxSize, N); }
    else if (high > N) { high = N; low = max(high-maxSize, 0); }

    for (var i=low; i < high; i++) {
      cells.push(
        <li class={i===page? 'active':''}>
          <a href="#" onclick={u.mute(u.bind(ctrl.setPage, ctrl, i))}>{i+1}</a>
        </li>
      );
    }
    return INCLUDE('pagination/pagination.tpl');
  }

  return {
    controller: controller,
    view: view
  };
};
