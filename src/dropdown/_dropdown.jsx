var dropdownList = [];

function dropdownSetOpen(element, opening) {
  if (opening()) {
    dropdownCloseAll();

    element.classList.add('open');
    dropdownList.push({
      element: element,
      opening: opening
    });

  } else {
    for (var i=0; i < dropdownList.length; i++) {
      if (dropdownList[i].element === element) {
        dropdownList[i].opening(false);
        dropdownList[i].element.classList.remove('open');
        dropdownList.splice(i, 1);
      }
    }
  }
}

function dropdownCloseAll(element) {
  for (var i in dropdownList) {
    if (dropdownList[i].element === element) continue;
    dropdownList[i].opening(false);
    dropdownList[i].element.classList.remove('open');
  }
  dropdownList = [];
}

document.addEventListener('click',function() {
  dropdownCloseAll();
});

document.addEventListener('keydown', function(event) {
  if (event.keyCode === 27 ) dropdownCloseAll();
});

m.ui.configDropdown = function(opening) {
  return function(element, isInit) {
    if (!isInit) {
      var toggle = element.querySelector('.dropdown-toggle');
      if (!toggle) return;

      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        var opening = u.prop(opening || element.classList.contains('open'));
        opening(!opening());

        dropdownSetOpen(element, opening);
      });
    }

    dropdownSetOpen(element, u.prop(opening || element.classList.contains('open')));
  };
};
