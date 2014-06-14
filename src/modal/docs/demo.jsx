// START
var demo = {};
demo.controller = function() {

};

demo.view = function(ctrl) {
  return INCLUDE('./template');
};
// END

demo.doc =  INCLUDE('./readme');
module.exports = demo;
