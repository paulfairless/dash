function CalendarCtrl($scope, $timeout) {
    var self = this;
    
	this.update = function() {
        $scope.calendar = {
            "date": new Date(),
        };
        $timeout(self.update, 1000);
    };

    this.update();
}