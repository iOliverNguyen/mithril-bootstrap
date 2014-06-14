// START
var demo = {};
demo.controller = function() {
  this.countries = m.request({
    method: 'GET',
    url: 'countries.json'
  });
  this.totalItems = function() {
    return this.countries()? this.countries().length : 0;
  }.bind(this);

  this.currentPage = m.prop(0);
  this.itemsPerPage = m.prop(5);
  this.maxSize = 7;
  this.directionLinks = true;
  this.boundaryLinks = true;
  this.previousText = '<';
  this.nextText = '>';

  this.pagination = m.u.init(m.ui.pagination(this));
};

demo.view = function(ctrl) {
  var size = ctrl.itemsPerPage();
  var page = ctrl.currentPage();
  var rows = ctrl.countries()
    .slice(size*page, size*(page+1))
    .map(function(item, i) {
      return <tr>
        <td>{size*page + i + 1}</td>
        <td><img src={item.flag}/>&nbsp;{item.name}</td>
      </tr>;
    });

  return INCLUDE('./template');
};
// END

demo.doc =  INCLUDE('./readme');
module.exports = demo;
