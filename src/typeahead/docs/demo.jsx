// START
var demo = {};
demo.controller = function() {
  this.countries = m.request({
    method: 'GET',
    url: 'countries.json'
  });
  this.selectedItem = m.prop(undefined);
  this.typeahead = m.u.init(m.ui.typeahead({
    list: this.countries,
    onselect: this.selectedItem,
    label: function(item) {
      return item.name;
    },
    template: function(item) {
      return <div>
        <img src={item.flag}/>&nbsp;
        {item.name}
      </div>;
    }
  }));
};

demo.view = function(ctrl) {
  return INCLUDE('./template');
};
// END

demo.doc =  INCLUDE('./readme');
demo.small = 'm.ui.typeahead';
demo.files = {
  'demo.jsx': CONTENT('./demo.jsx'),
  '_template.jsx': CONTENT('./_template.jsx'),
};
module.exports = demo;
