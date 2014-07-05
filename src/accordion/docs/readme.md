The accordion components provide a list of items, with collapsible bodies that are collapsed or expanded by clicking on the item`s header.

**TODO**: open, close, config

## Usage

`m.ui.accordion(settings)`

### Settings

* `group` *(required)*: List of components including information such as *`heading`* for toggle label, *`module`* for content and *`disabled` (optional, default: false)* for the component working or not

* `closeOthers`: Define that the accordion allows more than one component open at the same time or not.

* `toggle(index)`: To open a component based on its index.
