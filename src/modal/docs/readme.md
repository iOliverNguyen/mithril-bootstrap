Quickly create Bootstrap's modal in Mithril

**TODO**: animation, params, $modal, keyboard, backdrop

## Usage

`m.ui.modal(settings)`

### Settings

* `module` *(required)*: Modal instance module.

* `size`: Optional size of modal window. Allowed: `'sm'` or `'lg'`.

* `params`: Optional params to pass to modal instance controller as `controller(params)`.

* `onopen` *`function(modalCtrl)`*: Optional callback. If set, it will be called after the modal display and the modal instance callback runs.

* `onclose` *`function(result, reason)`*: Optional callback. If set, it will be called after the modal close as `onclose(result)` or dismiss as `onclose(undefined, reason)`.

### Modal Properties and Methods

These properties and methods are accessible from outside or via `this.$modal` inside modal instance controller.

* `result`: A promise that is resolved when a modal is closed and rejected when a modal is dismissed.

* `opening()`: Boolean value indicates that the modal is opening.

* `open()`: Display the modal. The modal is display by default so you usually do not need to call this method directly.

* `close(result)`: Close a modal and pass a result.

* `dismiss(reason)`: Dismiss a modal and pass a reason.

### Modal Instance

Modal instance controller are call with `controller(params)` where `params` is `settings.params`.

* `$modal`: Access the modal controller and its methods.

* `onopen` *`function(modalCtrl)`*: If set, it will be called when the modal display and before `settings.onopen` is called.

* `onclose` *`function(result, reason)`*: If set, it will be called when the modal close as `onclose(result)` or dismiss as`onclose(undefined, reason)`.
