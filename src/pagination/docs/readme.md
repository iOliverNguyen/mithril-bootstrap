Pagination is a Mithril component that takes care of paging.

## Usage

`m.ui.pagination(settings)`

### Settings

* `currentPage` *(default 0)*: Current page number. First page is 0.

* `totalItems` *(default 0)*: Total number of items in all pages.

* `itemsPerPage` *(default 10)*: Number of items per page.

* `maxSize` *(default 5)*: Limit number for pagination size.

* `directionLinks`*(default true)*: Whether to display Previous / Next buttons.

* `boundaryLinks` *(default false)*: Whether to display First / Last buttons.

* `previousText` *(default 'Previous')* : Text for Previous button.

* `nextText` *(default 'Next')* : Text for Next button.

* `firstText` *(default 'First')* : Text for First button.

* `lastText` *(default 'Last')* : Text for Last button.

### Methods

* `numPages()`: Total number of pages.

* `setPage(page)`: Set current page.
