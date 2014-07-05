module.exports = function(code) {

  function controller() {

  }

  function view(ctrl) {
    function highlight(elem, isInit) {
      if (!isInit) {
        hljs.highlightBlock(elem);
      }
    }

    return <pre>
      <code config={highlight}>
        {code}
      </code>
    </pre>;
  }

  return {
    controller: controller,
    view: view
  };
};
