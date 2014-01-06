function IcingaCtrl($scope, $timeout, $http) {
    var self = this;

	this.update = function() {
		var numChecks = 0;
		var ok = 0;
		var warn = 0;
		var error = 0;
		
		$http.get('http://icinga/cgi-bin/status.cgi?hostgroup=prod-app-servers&style=detail&nostatusheader&jsonoutput').success(function(data){
			$.each(data.status.service_status, function(index, item) {
				numChecks ++;
				if (item.status == 'OK') ok ++;
				else if (item.status == 'WARNING') warn ++;
				else error ++;
			});

			$scope.icinga = {
				"overall":(error == 0 && warn == 0) ? 'up' : (error == 0) ? 'warn' : 'down',
	            "ok": ok,
	            "warn": warn,
	            "error": error
	        };	
		}).error(function(){
			$scope.icinga = {
				"overall":'warn',
			};
		});
        $timeout(self.update, 1000 * 60 * 5);
    };

    this.update();
}
