/**
  config: {
    desc: template,
    files: [string],
    name: string,
    title: string,
    id: string,
    controller: function(),
    view: function(ctrl)
  }
*/
var tabs = require('section/tabs');
var code = require('section/code');

var start = '// START';
var end = '// END';
var r = new RegExp(start+'([\\s\\S]*?)'+end);

module.exports = function (config) {

  function extract(v) {
    v = v.replace(/\/\*\* \@jsx m \*\//g, '')
      .replace(/\n[\t ]*\n[\t ]*\n/g,'\n\n');
    var matches = r.exec(v);
    return matches? matches[1].trim() : v;
  }

  function controller() {
    var codes = [];
    for (var name in config.files) {
      codes.push({
        class: 'code',
        label: name,
        module: code(extract(config.files[name]))
      });
    }

    this.demo = m.u.init(config);
    this.tabs1 = m.u.init(tabs(codes));

    m.request({
      method: 'GET',
      url: config.compiledUrl,
      deserialize: function(v){ return v; }
    })
    .then(function(data) {
      this.tabs2 = m.u.init(tabs([{
        class: 'code',
        label: 'Compiled JS',
        module: code(extract(data))
      }]));
    }.bind(this));
  }

  function view(ctrl) {
    return INCLUDE('section/section.tpl');
  }

  return {
    controller: controller,
    view: view
  };
};
