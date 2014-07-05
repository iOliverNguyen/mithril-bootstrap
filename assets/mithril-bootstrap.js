/** @jsx m */
;(function(m) {

var u = m.u = {};
var ui = m.ui = {};

/** @jsx m */
var shift = Array.prototype.shift;
var unshift = Array.prototype.unshift;
var slice = Array.prototype.slice;

u.eachFunc = function() {
  var funcs = arguments;
  return function() {
    for (var i=0; i < funcs.length; i++) {
      funcs[i].apply(this, arguments);
    }
  };
};

u.init = function($module) {
  var ctrl = {};
  var obj = Object.create(ctrl);
  $module.controller.apply(ctrl, slice.call(arguments, 1));
  obj.$module = $module;
  obj.$view = $module.view.bind({}, ctrl);
  return obj;
};

u.mute = function(cb) {
  return function(e) {
    e.preventDefault();
    if (cb) return cb();
  };
};

u.silence = u.mute;

u.exec = function(expr) {
  if (typeof expr === 'function') return expr();
  return expr;
};

u.save = function(expr, value) {
  if (typeof expr === 'function') return expr(value);
  return expr;
};

u.prop = function(store) {
  if (typeof store === 'function') return store;
  var p = function() {
    if (arguments.length) {
      var newValue = arguments[0];
      var oldValue = store;
      store = arguments[0];
      if (fnSet) fnSet(newValue, oldValue);
      if (fnChange && newValue !== oldValue) fnChange(newValue, oldValue);
    }
    return store;
  };
  var fnChange, fnSet;
  p.onchange = function(fn) { fnChange = fn; }; // bug
  p.onset = function(fn) { fnSet = fn; };
  p.toJSON = function() { return store; };
  return p;
};

function wrapWatch(prop) {
  var fnChanges = [];

  prop = Object.create(prop);
  prop = function() {
    if (arguments.length) {
      var newValue = arguments[0];
      var oldValue = store;
      store = arguments[0];
      // if (fnSet) fnSet(newValue, oldValue);
      if (fnChanges && newValue !== oldValue) fnChange(newValue, oldValue);
    }
    return store;
  };
  prop.$onchange = function(fn) {
    fnChanges.push(fn);
  };
  return prop;
}

u.watch = function(prop, fn) {
  if (typeof prop.$onchange === 'undefined') prop = wrapWatch(prop);
  prop.$onchange(fn);
  return prop;
};

u.bind = function(fn, context) {
  var args = arguments;
  return function() {
    var a = slice.call(args, 2).concat(slice.call(arguments, 0));
    return fn.apply(context, a);
  };
};

function min(a, b) {
  return a < b? a : b;
}

function max(a, b) {
  return a < b? b : a;
}

function def(a, d) {
  return a !== undefined? a : d;
}

/** @jsx m */
ui.tabs = function tabs(configs) {

  function controller() {
    this.index = m.prop(0);

    this.coms = [];
    for (var i=0; i < configs.length; i++) {
      this.coms.push(u.init(configs[i].module));
    }

    this.current = function() {
      return this.coms[this.index()];
    };
  }

  function view(ctrl) {
    var coms = ctrl.coms, tabs = [], panes = [], i;
    for (i=0; i < coms.length; i++) {
      tabs.push(
        m("li", {class:isActive(i)}, [
          m("a", {href:"#", onclick:u.silence(ctrl.index.bind(ctrl,i))}, [configs[i].label])
        ])
      );
    }
    for (i=0; i < coms.length; i++) {
      panes.push(
        m("div", {class:'tab-pane ' + isActive(i)}, [
          coms[i].$view()
        ])
      );
    }

    function isActive(i) {
      return ctrl.index() === i? 'active' : '';
    }
    return m("div", [
  m("ul", {class:"nav nav-tabs"}, [
    tabs
  ]),
  m("div", {class:"tab-content"}, [
    panes
  ])
]);
  }

  return {
    controller: controller,
    view: view
  };
};

/** @jsx m */
ui.tooltip = function() {

  function controller() {

  }

  function view(ctrl) {
    return m("div", ["TODO"]);
  }

  return {
    controller: controller,
    view: view
  };
};

/** @jsx m */
ui.dropdown = function(options) {

  function controller() {
    this.com = u.init(options.module);
    this.opening = m.prop(false);

    this.toggle = function() {
      this.opening(!this.opening());
    }.bind(this);
  }

  function view(ctrl) {
    return m("span", {class:"dropdown " + (ctrl.opening()? 'open':'')}, [
  m("a", {href:"#", class:"dropdown-toggle", onclick:u.mute(ctrl.toggle)}, [
    "Click me for a dropdown, yo!"
  ]),
  ctrl.com.$view()
]);
  }

  return {
    controller: controller,
    view: view
  };
};


/** @jsx m */
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
        m("li", {class:i===page? 'active':''}, [
          m("a", {href:"#", onclick:u.mute(u.bind(ctrl.setPage, ctrl, i))}, [i+1])
        ])
      );
    }
    return m("ul", {class:"pagination"}, [
  
    !ctrl.boundaryLinks()? null :
    m("li", {class:page===0? 'disabled':''}, [
      m("a", {href:"#", onclick:u.mute(u.bind(ctrl.setPage, ctrl, 0))}, [
        ctrl.firstText()
      ])
    ]),
  
  
    !ctrl.directionLinks()? null :
    m("li", {class:page===0? 'disabled':''}, [
      m("a", {href:"#", onclick:u.mute(u.bind(ctrl.setPage, ctrl, page-1))}, [
        ctrl.previousText()
      ])
    ]),
  
  cells,
  
    !ctrl.directionLinks()? null :
    m("li", {class:page===last? 'disabled':''}, [
      m("a", {href:"#", onclick:u.mute(u.bind(ctrl.setPage, ctrl, page+1))}, [
        ctrl.nextText()
      ])
    ]),
  
  
    !ctrl.boundaryLinks()? null :
    m("li", {class:page===last? 'disabled':''}, [
      m("a", {href:"#", onclick:u.mute(u.bind(ctrl.setPage, ctrl, last))}, [
        ctrl.lastText()
      ])
    ])
  
]);
  }

  return {
    controller: controller,
    view: view
  };
};

/** @jsx m */
ui.typeahead = function(options) {
  var eventKeys = {
    down: 40,
    left: 37,
    right: 39,
    up: 38,
    enter: 13
  };

  options = options || {};

  function isEmpty(a) {
    return a === undefined || a === null;
  }

  function controller() {
    var ctrl = this;
    this.list = u.prop(options.list || []);
    this.xlist = u.prop([]);
    this.selected = m.prop(undefined);
    this.highlight = m.prop(0);
    this.text = m.prop("");
    this.maxItems = u.prop(options.maxItems || 5);

    this.label = function(item) {
      if (isEmpty(item)) return '';
      return options.label? options.label(item) : item;
    };

    this.template = options.template || this.label;

    this.change = function(text) {
      ctrl.select(undefined);
      ctrl.text(text);
      ctrl.highlight(0);
      if (text === "") return ctrl.xlist([]);

      text = text.toLowerCase();
      var i, max = ctrl.maxItems();
      var list = ctrl.list(), xlist = [];
      for (i=0; i < list.length; i++) {
        if (ctrl.label(list[i]).toLowerCase().indexOf(text) === 0) {
          xlist.push(list[i]);
          if (xlist.length >= max) return ctrl.xlist(xlist);
        }
      }
      for (i=0; i < list.length; i++) {
        if (ctrl.label(list[i]).toLowerCase().indexOf(text) > 0) {
          xlist.push(list[i]);
          if (xlist.length >= max) return ctrl.xlist(xlist);
        }
      }
      ctrl.xlist(xlist);
    };

    this.select = function(index) {
      if (index !== undefined) {
        if (index >= ctrl.list().length) index = ctrl.list().length-1;
        if (index < 0) index = 0;
        index = ctrl.list().indexOf(ctrl.xlist()[index]);
      }
      ctrl.xlist([]);
      ctrl.selected(index);
      ctrl.text(ctrl.label(ctrl.currentItem()));
      if (options.onselect) options.onselect(ctrl.currentItem());
    };

    this.currentItem = function() {
      var s = ctrl.selected();
      if (isEmpty(s)) return;
      return ctrl.list()[s];
    };
  }

  function view(ctrl){
    var xlist = ctrl.xlist();
    var rows = xlist.map(function(item, i) {
      return m("li", {class:i===ctrl.highlight()? 'active':''}, [
        m("a", {href:"#", onclick:u.mute(u.bind(ctrl.select, ctrl, i))}, [
          ctrl.template(xlist[i])])
        ]);
    });

    var dropdown = xlist.length === 0? [] :
      m("ul", {class:"dropdown-menu", style:"display: block; top: 100%"}, [
        rows
      ]);

    function onkeydown(e) {
      var code = e.keyCode;
      if (code === eventKeys.down) {
        e.preventDefault();
        ctrl.highlight(ctrl.highlight()+1);
        if (ctrl.highlight() >= ctrl.xlist().length) ctrl.highlight(0);
      } else if (code === eventKeys.up) {
        e.preventDefault();
        ctrl.highlight(ctrl.highlight()-1);
        if (ctrl.highlight() < 0) ctrl.highlight(ctrl.xlist().length-1);
      } else if (code === eventKeys.enter) {
        e.preventDefault();
        ctrl.select(ctrl.highlight());
      }
    }

    return m("div", {style:{position: 'relative'}}, [
    m("input", {type:"text", class:"form-control", oninput:m.withAttr("value", ctrl.change),
    value:ctrl.text(), onkeydown:onkeydown}),
    dropdown
]);
  }

  return {
    controller: controller,
    view: view,
  };
};

})(Mithril);
