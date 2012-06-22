function TwitterCtrl($scope, $timeout, $http) {
    var self = this;
  
	this.update = function() {
		
		$http.get('http://www.twitter.com/search.json?q=SkyNews&rpp=50').success(function(data){
			$scope.tweets = data;	
		});
		$('.carousel').carousel({
		  interval: 10000
		})
        $timeout(self.update, 1000 * 60 * 5);
    };

    this.update();
}