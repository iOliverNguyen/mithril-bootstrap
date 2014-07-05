var datepickerList = [];

document.addEventListener('click', function() {
	for (var i in datepickerList) {
		datepickerList[i].opening(false);
	}
	m.redraw();
});

ui.datepicker = function(options) {

	options = options || {};
	var type = options.type || 'inline';

	var msADay = 86400000;
	var monthNames = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];
	var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function controller() {
  	var ctrl = this;
  	ctrl.date = u.prop(options.date || new Date());
		ctrl.month = m.prop(ctrl.date().getMonth());
		ctrl.year = m.prop(ctrl.date().getFullYear());

		ctrl.opening = (function(store) {
			return function() {
				if (window.event) window.event.stopPropagation();
				if (arguments.length) store = arguments[0];
				return store;
			};
		})(false);

		ctrl.setDate = function(newDate) {
			ctrl.date(new Date(newDate));
			ctrl.month(ctrl.date().getMonth());
			ctrl.year(ctrl.date().getFullYear());
		};

		datepickerList.push(ctrl);
		ctrl.onunload = function() {
      var index = datepickerList.indexOf(ctrl);
      if (index > -1) {
        datepickerList.splice(index, 1);
      }
    };
  }

  function getWeek(date) {
    var Jan_1st = new Date(date.getFullYear(), 0, 1);
    return Math.ceil((((date-Jan_1st)/msADay) + Jan_1st.getDay()) / 7);
	}

	function normalize(date) {
		date = new Date(date);
		return new Date(date.getTime() - date.getTime() % msADay);
	}

	var header = [];
	header.push(<th></th>);
	dayNames.forEach(function(d) {
		header.push(<th class="text-center"><small>{d}</small></th>);
	});
	header = <tr>{header}</tr>;

  function view(ctrl) {

		function changeMonth(delta) {
			return function(e) {
				var month = ctrl.month() + delta;
				ctrl.month((month+12) % 12);
				ctrl.year(ctrl.year() + Math.floor(month / 12));
			};
		}

		function toggle() {
			ctrl.opening(!ctrl.opening());
		}

		var date = normalize(ctrl.date());
		var month = ctrl.month();
		var year = ctrl.year();

		var today = normalize(new Date());
		var firstDay = new Date(year, month, 1);
		var startDate = new Date(firstDay.getTime() - firstDay.getDay()*msADay);

		var rows = [header];
		var title = monthNames[month] + ' ' + year;

		var d = normalize(startDate);
		for (var r = 0; r < 6; r++) {
			var cols = [
				<td class="text-center h6">
					<em>{getWeek(d)}</em>
				</td>
			];

			for (var i = 0; i < 7; i++) {
				var disabled = d < today;
				var active = d.getTime()===date.getTime();

				cols.push(
					<td>
						<button type="button" style="width:100%;"
							class={"btn btn-default btn-sm" + (active?' btn-info active': '')}
							disabled={disabled?'disabled':''}
							onclick={u.bind(ctrl.setDate, ctrl, d)}>
							<span class={d.getMonth() !== month? 'text-muted': ''}>
								{d.getDate()}</span>
						</button>
					</td>
				);

				d = new Date(d.getTime() + msADay);
			}
			rows.push(<tr>{cols}</tr>);
		}

		var picker = INCLUDE('./datepicker.tpl');

		return type === 'inline'?
			<div class="well well-sm">
				{picker}
			</div>:
			ctrl.opening()?
				<ul class="dropdown-menu" style={{display:'block', left:0}}>
					<li>{picker}</li>
				</ul>:
				[];
  }

  return {
    controller: controller,
    view: view
  };
};
