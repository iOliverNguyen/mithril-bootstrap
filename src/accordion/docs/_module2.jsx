var module2 = {
  controller: function() {
    var ctrl = this;
    ctrl.data = m.prop([]);
    ctrl.addItem = function() {
      ctrl.data().push('Item' + (ctrl.data().length + 1));
    };
  },
  view: function(ctrl) {
    return <div>
      <p>
        The body of the accordion group grows to fit the contents
      </p>
      <button class="btn btn-default" onclick={ctrl.addItem}>
        Add item
      </button>
      {
        ctrl.data().map(function(item) {
          return <div>{item}</div>;
        })
      }
    </div>;
  }
};
