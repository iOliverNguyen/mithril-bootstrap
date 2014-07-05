Typeahead is a Mithril version of [Bootstrap v2's typeahead plugin](http://getbootstrap.com/2.3.2/javascript.html#typeahead).

## Usage

`m.ui.typeahead(settings)`

### Settings

* `list` *(required)*: Source array.

* `selectedItem` *(default undefined)*: Current selected item or undefine.

* `label` *`function(item) string`*: Return string representation of each item for processing filter and displaying.

* `template` *`function(item) virtualDOM`*: Custom template for list item.

* `onselect` *`function(item)`*: Listen to user select event.
