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
      return <li class={i===ctrl.highlight()? 'active':''}>
        <a href="#" onclick={u.mute(u.bind(ctrl.select, ctrl, i))}>
          {ctrl.template(xlist[i])}</a>
        </li>;
    });

    var dropdown = xlist.length === 0? [] :
      <ul class="dropdown-menu" style="display: block; top: 100%">
        {rows}
      </ul>;

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

    return INCLUDE('typeahead/typeahead.tpl');
  }

  return {
    controller: controller,
    view: view,
  };
};
