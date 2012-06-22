function StatusCtrl($scope, $timeout, $http) {
    var self = this;
  
	this.update = function() {
		
		$http.get('http://feeds.skynews.com/status.json').success(function(data){
			this.build = data.build;
			this.leg = data.environment;
			$scope.status = {
				"online":'up',
	            "build": this.build,
	            "leg": this.leg
	        };	
		}).error(function(){
			$scope.status = {
				"online":'down',
				"build": this.build,
	            "leg": this.leg,
			};
		});
        $timeout(self.update, 1000 * 60 * 5);
    };

    this.update();
}