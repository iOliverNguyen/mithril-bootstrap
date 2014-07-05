There are two methods that can make a group of buttons behave like a set of checkboxes or radio buttons.

## Usage

In element config:

* `m.ui.configCheckbox(prop, settings)`

* `m.ui.configRadio(prop, value)`

### Checkbox

* `prop` *(required)*: Getter and setter returned from `m.prop`.

* `settings`: Optional

  * `true` *(default true)*: Optional value for `true` state.
  * `false` *(default false)*: Optonal value for `false` state.

### Radio

* `prop` *(required)*: Getter and settre returned from `m.prop`.

* `value` *(required)*: Value to assign to `prop(value)` when the button is checked.
