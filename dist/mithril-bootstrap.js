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

u.init = function($module, initObj) {

  // NOTE: should we use inheritance or directly modify controller instance

  var ctrl = initObj || {};
  var obj = ctrl;
  // var obj = Object.create(ctrl);

  $module.controller.apply(ctrl, slice.call(arguments, 2));
  obj.$module = $module;
  obj.$view = $module.view.bind({}, ctrl);
  return obj;
};

u.mute = function(cb) {
  return function(e) {
    e.preventDefault();
    if (cb) return cb(e);
  };
};

u.silence = u.mute;

u.exec = function(expr) {
  var args = slice.call(arguments, 1);
  if (typeof expr === 'function') return expr.apply(this, args);
  return expr;
};

u.save = function(expr, value) {
  if (typeof expr === 'function') return expr(value);
  return expr;
};

u.prop = function(store) {
  if (typeof store === 'function') return store;
  var p = function() {
    if (arguments.length) store = arguments[0];
    return store;
  };
  p.toJSON = function() { return store; };
  return p;
};

u.bind = function(fn, context) {
  var args = arguments;
  return function() {
    var a = slice.call(args, 2).concat(slice.call(arguments, 0));
    return fn.apply(context, a);
  };
};

u.truth = function(value, valueTrue, valueFalse) {
  return value === valueTrue? true: value === valueFalse? false: !!value;
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
ui.accordion = function(options) {

  options = options || {};

  function controller() {
    var ctrl = this;
    ctrl.group = (options.group||[]).map(function(g) {
      var o = {
        heading: u.prop(g.heading||''),
        com: u.init(g.module),
        open: u.prop(g.open||false),
        disabled: u.prop(g.disabled||false),
        animating: u.prop(false),
        animation: function(element, isInit) {
          if (!isInit) element.addEventListener('transitionend',
            function() {
              o.animating(false);
              if (o.open()) element.style.height = 'auto';
              else element.classList.add('collapse');
              element.classList.remove('collapsing');
            });

          if (!o.animating() && !o.open()) element.classList.add('collapse');
          else element.classList.remove('collapse');

          if (o.animating()) {
            element.classList.add('collapsing');

            var height;
            if (o.open()) {
              element.style.height = 'auto';
              height = element.getBoundingClientRect().height;
              element.style.height = '0';
              setTimeout(function() {
                element.style.height = height + 'px';
              }, 0);

            } else {
              element.style.height = 'auto';
              height = element.getBoundingClientRect().height;
              element.style.height = height + 'px';
              setTimeout(function() {
                element.style.height = '0';
              }, 0);
            }
          }

        }.bind(o)
      };

      return o;
    });

    ctrl.closeOthers = u.prop(options.closeOthers||false);

    ctrl.toggle = function(index) {
      var g = ctrl.group[index];
      if (!g) throw new Error('index out of range');

      if (g.disabled()) return;
      g.open(!g.open());
      g.animating(true);

      if (g.open() && ctrl.closeOthers()) {
        for (var i=0; i < ctrl.group.length; i++) {
          var other = ctrl.group[i];
          if (other !== g) {
            if (other.open()) other.animating(true);
            other.open(false);
          }
        }
      }
    };
  }

  function view(ctrl) {
    var rows = ctrl.group.map(function(g,i) {
      return m("div", {class:"panel panel-default"}, [
  m("div", {class:"panel-heading"}, [
    m("h4", {class:"panel-title"}, [
      m("a", {class:"accordion-toggle", onclick:u.mute(u.bind(ctrl.toggle, ctrl, i))} , [
        m("span", {class:g.disabled()?'text-muted':''}, [g.heading()
        ])
      ])
    ])
  ]),
  m("div", {config:g.animation}, [
    m("div", {class:"panel-body"}, [
      m("span", [
      g.com.$view()
      ])
    ])
  ])
]);
    });

    return m("div", {class:"panel-group"}, [rows]);
  }

  return {
    controller: controller,
    view: view
  };
};

/** @jsx m */
ui.renderAlert = function(options) {
  options = options || {};
  var type = u.exec(options.type) || 'warning';
  var msg = u.exec(options.msg) || '';

  return m("div", {class:"alert alert-" + type + (options.close? " alert-dismissable": "")}, [
    
      options.close?
      m("button", {class:"close", onclick:options.close}, [
        m("span", {'aria-hidden':"true"}, ["×"]),
        m("span", {class:"sr-only"}, ["Close"])
      ]):
      [],
    
    m("div", [msg])
  ]);
};

/** @jsx m */
ui.configCheckbox = function(prop, options) {
  options = options || {};
  prop = u.prop(prop);
  var valueTrue = u.prop(options.true === undefined? true: options.true);
  var valueFalse = u.prop(options.false === undefined? false: options.false);

  return function(element, isInit) {
    var truth = u.truth(prop(), valueTrue(), valueFalse());

    if (truth) element.classList.add('active');
    else element.classList.remove('active');

    if (!isInit) {
      element.addEventListener('click', function(e) {
        var truth = u.truth(prop(), valueTrue(), valueFalse());
        prop(!truth?valueTrue():valueFalse());
        m.redraw();
      });
    }
  };
};

ui.configRadio = function(prop, value) {
  prop = u.prop(prop);
  value = u.prop(value);

  return function(element, isInit) {
    if (prop() === value()) element.classList.add('active');
    else element.classList.remove('active');

    if (!isInit) {
      element.addEventListener('click', function(e) {
        prop(value());
        m.redraw();
      });
    }
  };
};

/** @jsx m */
ui.carousel = function(options) {

  function controller() {

  }

  function view(ctrl) {
    return m("div", ["12345"]);
  }

  return {
    controller: controller,
    view: view
  };
};

/** @jsx m */
ui.collapse = function(options) {
  options = options||{};
  function controller() {
    var ctrl = this;
    ctrl.content = u.init(options.content);
    ctrl.open = u.prop(false);
    ctrl.disabled = u.prop(options.disabled || false);
    ctrl.animating = u.prop(false);

    ctrl.toggle = function() {
      if (ctrl.disabled()) return;

      ctrl.open(!ctrl.open());
      ctrl.animating(true);
    };

    ctrl.animation = function(element, isInit) {
      if (!isInit) element.addEventListener('transitionend',
        function() {
          ctrl.animating(false);
          if (ctrl.open()) element.style.height = 'auto';
          else element.classList.add('collapse');
          element.classList.remove('collapsing');
        });

      if (!ctrl.animating() && !ctrl.open()) element.classList.add('collapse');
      else element.classList.remove('collapse');

      if (ctrl.animating()) {
        element.classList.add('collapsing');

        var height;
        if (ctrl.open()) {
          element.style.height = 'auto';
          height = element.getBoundingClientRect().height;
          element.style.height = '0';
          setTimeout(function() {
            element.style.height = height + 'px';
          }, 0);

        } else {
          element.style.height = 'auto';
          height = element.getBoundingClientRect().height;
          element.style.height = height + 'px';
          setTimeout(function() {
            element.style.height = '0';
          }, 0);
        }
      }
    };
  }

  function view(ctrl) {
    return m("div", {config:ctrl.animation}, [
	ctrl.content.$view()
]);
  }

  return {
    controller: controller,
    view: view
  };
};

/** @jsx m */
var datepickerList = [];

document.addEventListener('click', function() {
	for (var i in datepickerList) {
		datepickerList[i].opening(false);
	}
	m.redraw();
});

ui.datepicker = function(options) {

	options = options || {};
	var type = options.type || 'inline';

	var msADay = 86400000;
	var monthNames = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];
	var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function controller() {
  	var ctrl = this;
  	ctrl.date = u.prop(options.date || new Date());
		ctrl.month = m.prop(ctrl.date().getMonth());
		ctrl.year = m.prop(ctrl.date().getFullYear());

		ctrl.opening = (function(store) {
			return function() {
				if (window.event) window.event.stopPropagation();
				if (arguments.length) store = arguments[0];
				return store;
			};
		})(false);

		ctrl.setDate = function(newDate) {
			ctrl.date(new Date(newDate));
			ctrl.month(ctrl.date().getMonth());
			ctrl.year(ctrl.date().getFullYear());
		};

		datepickerList.push(ctrl);
		ctrl.onunload = function() {
      var index = datepickerList.indexOf(ctrl);
      if (index > -1) {
        datepickerList.splice(index, 1);
      }
    };
  }

  function getWeek(date) {
    var Jan_1st = new Date(date.getFullYear(), 0, 1);
    return Math.ceil((((date-Jan_1st)/msADay) + Jan_1st.getDay()) / 7);
	}

	function normalize(date) {
		date = new Date(date);
		return new Date(date.getTime() - date.getTime() % msADay);
	}

	var header = [];
	header.push(m("th"));
	dayNames.forEach(function(d) {
		header.push(m("th", {class:"text-center"}, [m("small", [d])]));
	});
	header = m("tr", [header]);

  function view(ctrl) {

		function changeMonth(delta) {
			return function(e) {
				var month = ctrl.month() + delta;
				ctrl.month((month+12) % 12);
				ctrl.year(ctrl.year() + Math.floor(month / 12));
			};
		}

		function toggle() {
			ctrl.opening(!ctrl.opening());
		}

		var date = normalize(ctrl.date());
		var month = ctrl.month();
		var year = ctrl.year();

		var today = normalize(new Date());
		var firstDay = new Date(year, month, 1);
		var startDate = new Date(firstDay.getTime() - firstDay.getDay()*msADay);

		var rows = [header];
		var title = monthNames[month] + ' ' + year;

		var d = normalize(startDate);
		for (var r = 0; r < 6; r++) {
			var cols = [
				m("td", {class:"text-center h6"}, [
					m("em", [getWeek(d)])
				])
			];

			for (var i = 0; i < 7; i++) {
				var disabled = d < today;
				var active = d.getTime()===date.getTime();

				cols.push(
					m("td", [
						m("button", {type:"button", style:"width:100%;",
							class:"btn btn-default btn-sm" + (active?' btn-info active': ''),
							disabled:disabled?'disabled':'',
							onclick:u.bind(ctrl.setDate, ctrl, d)}, [
							m("span", {class:d.getMonth() !== month? 'text-muted': ''}, [
								d.getDate()])
						])
					])
				);

				d = new Date(d.getTime() + msADay);
			}
			rows.push(m("tr", [cols]));
		}

		var picker = m("table", {tabindex:"0"}, [
  m("thead", [
    m("tr", [
      m("th", [
        m("button", {type:"button", class:"btn btn-default btn-sm pull-left", onclick:changeMonth(-1), tabindex:"-1"}, [
          m("i", {class:"glyphicon glyphicon-chevron-left"})])
      ]),
      m("th", {colspan:"6"}, [
        m("button", {type:"button", class:"btn btn-default btn-sm", tabindex:"-1", style:"width:100%;"}, [
          m("strong", {class:"ng-binding"}, [title])])
        ]),
      m("th", [
        m("button", {type:"button", class:"btn btn-default btn-sm pull-right", onclick:changeMonth(1), tabindex:"-1"}, [
          m("i", {class:"glyphicon glyphicon-chevron-right"})])
      ])
    ]),
    m("tr", [
      m("th", {'ng-show':"showWeeks", class:"text-center"})
    ])
  ]),
  m("tbody", [
    rows
  ])
]);

		return type === 'inline'?
			m("div", {class:"well well-sm"}, [
				picker
			]):
			ctrl.opening()?
				m("ul", {class:"dropdown-menu", style:{display:'block', left:0}}, [
					m("li", [picker])
				]):
				[];
  }

  return {
    controller: controller,
    view: view
  };
};

/** @jsx m */
var dropdownList = [];

function dropdownSetOpen(element, opening) {
  if (opening()) {
    dropdownCloseAll();

    element.classList.add('open');
    dropdownList.push({
      element: element,
      opening: opening
    });

  } else {
    for (var i=0; i < dropdownList.length; i++) {
      if (dropdownList[i].element === element) {
        dropdownList[i].opening(false);
        dropdownList[i].element.classList.remove('open');
        dropdownList.splice(i, 1);
      }
    }
  }
}

function dropdownCloseAll(element) {
  for (var i in dropdownList) {
    if (dropdownList[i].element === element) continue;
    dropdownList[i].opening(false);
    dropdownList[i].element.classList.remove('open');
  }
  dropdownList = [];
}

document.addEventListener('click',function() {
  dropdownCloseAll();
});

document.addEventListener('keydown', function(event) {
  if (event.keyCode === 27 ) dropdownCloseAll();
});

m.ui.configDropdown = function(opening) {
  return function(element, isInit) {
    if (!isInit) {
      var toggle = element.querySelector('.dropdown-toggle');
      if (!toggle) return;

      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        var opening = u.prop(opening || element.classList.contains('open'));
        opening(!opening());

        dropdownSetOpen(element, opening);
      });
    }

    dropdownSetOpen(element, u.prop(opening || element.classList.contains('open')));
  };
};

/** @jsx m */
var modalZIndex = 1040;

ui.modal = function(options) {

	options = options || {};
	var size = u.exec(options.size) || '';

	function controller() {
		var ctrl = this;
		ctrl.com = u.init(options.module, {$modal: ctrl}, options.params);

		ctrl.opening = u.prop(options.hidden||false);

		modalZIndex += 10;
		ctrl.zIndex = m.prop(modalZIndex);

		var deferred = m.deferred();
		ctrl.result = deferred.promise;

		ctrl.open = function() {
			ctrl.opening(true);
			document.body.classList.add('modal-open');
			if (ctrl.com.onopen) ctrl.com.onopen(ctrl);
			if (options.onopen) options.onopen(ctrl);
			m.redraw();
		};

		ctrl.close = function(result) {
			ctrl.opening(false);
			document.body.classList.remove('modal-open');
			if (ctrl.com.onclose) ctrl.com.onclose(result);
			if (options.onclose) options.onclose(result);
			deferred.resolve(result);
			m.redraw();
		};

		ctrl.dismiss = function(reason) {
			ctrl.opening(false);
			document.body.classList.remove('modal-open');
			if (ctrl.com.onclose) ctrl.com.onclose(undefined, reason);
			if (options.onclose) options.onclose(undefined, reason);
			deferred.reject(reason);
			m.redraw();
		};

		setTimeout(ctrl.open, 0);
	}

	function view(ctrl) {
		// return <div>M</div>;
		return ctrl.opening()? [
m("div", {class:"modal-backdrop fade in", style:{zIndex: ctrl.zIndex()}}),

m("div", {class:"modal", style:{zIndex: ctrl.zIndex()+1, display: 'block'}}, [
  m("div", {class:'modal-dialog' + (size? ' modal-' + size: '')}, [
    m("div", {class:"modal-content"}, [
      m("div", {class:"modal-body"}, [
        m("div", {class:"modal-body-content"}, [
          ctrl.com.$view()
        ])
      ])
    ])
  ])
])
]: [];
		// return INCLUDE('./modal.tpl');
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
ui.rating = function(options) {

  options = options||{};

  function controller() {
    var ctrl = this;
    ctrl.iconOff = u.prop(options.iconOff||m("span", {class:"glyphicon glyphicon-ok-circle"}));
    ctrl.iconOn = u.prop(options.iconOn||m("span", {class:"glyphicon glyphicon-ok-sign"}));
    ctrl.max = u.prop(options.max||5);
    ctrl.rating = u.prop(options.rating||0);
    ctrl.hovering = u.prop(options.rating||undefined);
    ctrl.hover = u.prop(options.hover||false);
    ctrl.readOnly = u.prop(options.readOnly||false);

    ctrl.list = u.prop([]);
    for (var i = 0; i < ctrl.max(); i++) {
      var element = {};
      element.index = i;
      if (i < ctrl.rating()) {
        element.icon = ctrl.iconOn();
      } else {
        element.icon = ctrl.iconOff();
      }

      ctrl.list().push(element);
    }

    ctrl.setHovering = function(index) {
      ctrl.hovering(index + 1);
      ctrl.list = u.prop([]);
      for (var i = 0; i < ctrl.max(); i++) {
        var element = {};
        element.index = i;
        if (i < ctrl.hovering()) {
          element.icon = ctrl.iconOn();
        } else {
          element.icon = ctrl.iconOff();
        }

        ctrl.list().push(element);
      }
    };

    ctrl.setNotHovering = function() {
      ctrl.hovering(undefined);
      ctrl.list = u.prop([]);
      for (var i = 0; i < ctrl.max(); i++) {
        var element = {};
        element.index = i;
        if (i < ctrl.rating()) {
          element.icon = ctrl.iconOn();
        } else {
          element.icon = ctrl.iconOff();
        }

        ctrl.list().push(element);
      }
    };

    ctrl.setRating = function(index) {
      ctrl.rating(index + 1);
      ctrl.list = u.prop([]);
      for (var i = 0; i < ctrl.max(); i++) {
        var element = {};
        element.index = i;
        if (i < ctrl.rating()) {
          element.icon = ctrl.iconOn();
        } else {
          element.icon = ctrl.iconOff();
        }

        ctrl.list().push(element);
      }
      m.redraw();
    };

    ctrl.clear = function() {
      ctrl.list = u.prop([]);
      ctrl.rating(0);
      for (var i = 0; i < ctrl.max(); i++) {
        var element = {};
        element.index = i;
        if (i < ctrl.rating()) {
          element.icon = ctrl.iconOn();
        } else {
          element.icon = ctrl.iconOff();
        }

        ctrl.list().push(element);
      }

      m.redraw();
    };

  }

  function view(ctrl) {

    var rows = [];
    for (var i in ctrl.list()) {
      var attrs = {};

      if (!ctrl.readOnly()) {

        if (ctrl.hover()) {
          attrs.onmouseover= u.mute(u.bind(ctrl.setHovering, ctrl, ctrl.list()[i].index));
          attrs.onmouseout= u.mute(u.bind(ctrl.setNotHovering, ctrl, ctrl.list()[i].index));
        }

        attrs.onclick = u.mute(u.bind(ctrl.setRating, ctrl, ctrl.list()[i].index));
      }

      rows.push(
        m('span', attrs, [ctrl.list()[i].icon])
      );

    }
    return m("div", [rows]);
  }

  return {
    controller: controller,
    view: view
  };
};

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
ui.timepicker = function() {

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
var typeaheadList = [];

document.addEventListener('click',function(event) {
  for (var i in typeaheadList)  {
    typeaheadList[i].xlist = u.prop([]);
    typeaheadList[i].highlight = m.prop(0);
  }
  m.redraw();
});


document.addEventListener('keydown', function(event) {
  if (event.keyCode === 27 ) {
    for (var i in typeaheadList) {
      typeaheadList[i].xlist = u.prop([]);
      typeaheadList[i].highlight = m.prop(0);
    }
    m.redraw();
  }
});

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
    typeaheadList.push(this);
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

    this.onunload = function() {
      var index = typeaheadList.indexOf(this);
      if (index > -1) {
        dropdownList.splice(index, 1)
      }
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
