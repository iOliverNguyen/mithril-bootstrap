var section = require('section/section');
var config = require('config');

var sections = config.components.map(function(name) {
  var demo = require(name + '/docs/demo');
  demo.name = name;
  demo.title = name[0].toUpperCase() + name.slice(1);
  demo.compiledUrl = 'demo/' + name + '/docs/demo.js';
  return m.u.init(section(demo));
});

exports.controller = function() {

};

exports.view = function(ctrl) {
  var sectionsView = sections.map(function(s) {
    return s.$view();
  });
  return INCLUDE('./home.tpl');
};
