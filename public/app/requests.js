var Requests = (function () {
	var baseUrl = 'http://94.26.100.87:2222/api';
	// var baseUrl = 'http://localhost:42315/api';

	var getAllParticipantsLocation = function($scope) {
		$.ajax({
		    url: baseUrl + '/getParticipants',
		    method: "get",
		    success: function(data) {
				$scope.$questionsCount = data;
				$scope.$apply();
		    },
		    error: function(error) {
		    	var n = noty({
		    		text: JSON.parse(error.responseText).Message, 
		    		type: 'error', 
		    		layout: 'topCenter',
		    		timeout: 5000
		    	});
		    }
		  });
	}

	return {
		getAllParticipantsLocation : getAllParticipantsLocation,
	}
})();