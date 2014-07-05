var modalZIndex = 1040;

ui.modal = function(options) {

	options = options || {};
	var size = u.exec(options.size) || '';

	function controller() {
		var ctrl = this;
		ctrl.com = u.init(options.module, {$modal: ctrl}, options.params);

		ctrl.opening = u.prop(options.hidden||false);

		modalZIndex += 10;
		ctrl.zIndex = m.prop(modalZIndex);

		var deferred = m.deferred();
		ctrl.result = deferred.promise;

		ctrl.open = function() {
			ctrl.opening(true);
			document.body.classList.add('modal-open');
			if (ctrl.com.onopen) ctrl.com.onopen(ctrl);
			if (options.onopen) options.onopen(ctrl);
			m.redraw();
		};

		ctrl.close = function(result) {
			ctrl.opening(false);
			document.body.classList.remove('modal-open');
			if (ctrl.com.onclose) ctrl.com.onclose(result);
			if (options.onclose) options.onclose(result);
			deferred.resolve(result);
			m.redraw();
		};

		ctrl.dismiss = function(reason) {
			ctrl.opening(false);
			document.body.classList.remove('modal-open');
			if (ctrl.com.onclose) ctrl.com.onclose(undefined, reason);
			if (options.onclose) options.onclose(undefined, reason);
			deferred.reject(reason);
			m.redraw();
		};

		setTimeout(ctrl.open, 0);
	}

	function view(ctrl) {
		// return <div>M</div>;
		return ctrl.opening()? INCLUDE('./modal.tpl'): [];
		// return INCLUDE('./modal.tpl');
	}

	return {
		controller: controller,
		view: view
	};
};

