var tabs = require('home/tabs');
exports.controller = function() {
  this.tabs = m.u.init(m.ui.tabs({
    label: 'Tab 1',
    module: tabs.tab1
  }, {
    label: 'Tab 2',
    module: tabs.tab2
  }));

  // pagination
  this.total = m.u.prop(31);
  this.currentPage = m.u.prop(2);
  this.dataSet = m.u.prop([]);
  this.pagination = m.u.init(m.ui.pagination({
    totalItems: this.total,
    currentPage: this.currentPage,
    itemsPerPage: m.prop(undefined),
  }));

  this.$paginationData = function(){
    var dataSet = [];
    var data = this.dataSet() || [];
    for(var i=0; i < data.length; i++){
      dataSet.push(
        <div class="rows">
            <span class="glyphicon glyphicon-user col-md-6">Name:
            {data[i].name + ' (' + this.currentPage() + ')'} </span>
            <span class="col-md-6">Age: {data[i].age}</span>
            <hr/>
        </div>
      );
    }
    return INCLUDE('home/pagination/pagination.tpl');
  }.bind(this);

  this.currentPage.onchange(function(n, o) {
    // Ajax request

    // assign dataSet
    var dataSet = [{name: "Nam", age: 24}, {name: "Ben", age: 24}, {name: "Vu", age: 25}];
    this.dataSet(dataSet);
  }.bind(this));

  // typeahead
  var data = [{name: "Nam", age: 24}, {name: "NamX", age: 24}, {name: "Ben", age: 24}, {name: "Vu", age: 25}];

  this.selected = m.prop(0);
  this.selectedItem = m.prop({});

  this.typeahead = m.u.init(m.ui.typeahead({
    list: data,
    label: function(item){ return item.name; },
    onselect: this.selectedItem,
    selected: this.selected
  }));

  var menu = {
    controller: function(){},
    view: function(){
      return <ul class="dropdown-menu">
        <li>
          <a href="#">The first choice!</a>
        </li><li>
          <a href="#">And another choice for you.</a>
        </li><li>
          <a href="#">but wait! A third!</a>
        </li>
      </ul>;
    }
  }

  // dropdown
  this.dropdown = m.u.init(m.ui.dropdown({
    module: menu
  }));
};

exports.view = function(ctrl) {
  return INCLUDE('home/demo.tpl');
};
