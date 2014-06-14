var section = require('section/section');
var config = require('config');

// var components = ['pagination', 'datepicker'];

var sections = config.components.map(function(name) {
  var base = '/demo/' + name + '/docs/';
  var demo = require(name + '/docs/demo');
  demo.id = 'm.ui.' + name;
  demo.name = name;
  demo.title = name[0].toUpperCase() + name.slice(1);
  demo.files = [{
    label: 'demo.jsx',
    path: base+'demo.jsx'
  }, {
    label: '_template.jsx',
    path: base+'_template.jsx'
  }];
  if (demo.extraFiles) demo.files = demo.files.concat(
    demo.extraFiles.map(function(file) {
      return {
        label: file,
        path: base+file
      };
  }));
  demo.files.push({
    label: 'Compiled JS',
    path: base+'demo.js'
  });
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
