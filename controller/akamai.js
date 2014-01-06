function AkamaiCtrl($scope, $timeout, $http) {
    var self = this;
	var cpcode = 146650;
	var dateToCheck = new Date();
	dateToCheck.setDate(dateToCheck.getDate() - 7);
	
  	var payload = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><getVisitorBySoftwareForCPCode xmlns="https://control.akamai.com/HttpContentDeliveryReportService.xsd"><cpcode>'+cpcode+'</cpcode><date>'+$.format.date(dateToCheck, 'yyyyMMdd')+'</date></getVisitorBySoftwareForCPCode></soap:Body></soap:Envelope>';
	this.update = function() {
		$http.post('https://control.akamai.com/nmrws/services/HttpContentDeliveryReportService', payload, {
			headers:{
				"Authorization":"Basic " + $.base64.encode( '' + ":" + ''),
				"Content-Type": 'application/soap+xml;charset=UTF-8;',
				"SOAPAction": " "
				}
		}).success(function(data){
			console.log(data);
			var results = jQuery(data).find("getVisitorBySoftwareForCPCodeReturn");
			var csv = jQuery.csv()(results.text());
			var chart = {
				"chart": {
					"bgAlpha":'0,0',
				"canvasBgAlpha":'0',
					        "showvalues": "0",
 					"baseFontColor":"FFF",
"showBorder":"0",
"canvasBorderAlpha":"0",
			    },
			    "data":  buildData(csv)  
			}
			$("#browsers-chart").insertFusionCharts({
			        swfUrl: "FusionCharts/Bar2D.swf",
					renderer: "JavaScript", 
			        width: "230", 
			        height: "200", 
			        id: "myChartId",
					allowTransparent: true,

			        dataFormat: "json", 
			        dataSource: JSON.stringify(chart, null, 2)
			});
			$scope.akamai = data;
				
		});

        $timeout(self.update, 1000 * 60 * 360);
    };

    this.update();
}

function buildData(csv){
	var items = [];
	for(var x=3; x<13; x++) {
		items.push({
			"label": csv[x][0],
            "value": csv[x][4],
		})
	}
	return items
}

function AkamaiUrlCtrl($scope, $timeout, $http) {
    var self = this;
	var cpcode = 146650;
	var dateToCheck = new Date();
	dateToCheck.setDate(dateToCheck.getDate() - 1);
	
  	var payload = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><getURLForCPCode xmlns="https://control.akamai.com/HttpContentDeliveryReportService.xsd"><cpcodes><int>'+cpcode+'</int></cpcodes><startTime>'+$.format.date(dateToCheck, 'yyyy-MM-dd')+'T00:00:00</startTime><endTime>'+$.format.date(dateToCheck, 'yyyy-MM-dd')+'T23:59:00</endTime></getURLForCPCode></soap:Body></soap:Envelope>';
	this.update = function() {
		$http.post('https://control.akamai.com/nmrws/services/HttpContentDeliveryReportService', payload, {
			headers:{
				"Authorization":"Basic " + $.base64.encode( 'paul.fairless@bskyb.com' + ":" + 'n3wsR0cks'),
				"Content-Type": 'application/soap+xml;charset=UTF-8;',
				"SOAPAction": " "
				}
		}).success(function(data){
			console.log(data);
			
			$scope.akamaiUrl = data;	
		});

        $timeout(self.update, 1000 * 60 * 360);
    };

    this.update();
}
// 
// var dash = dash || {};
// 
// dash.Akamai = (function($) {
// 	var cpcode = 153307;
// 	var dateToCheck = new Date();
// 	dateToCheck.setDate(dateToCheck.getDate() - 7);
// 	
// 	var init = function() {
// 		browsers();
// 	}
// 	var browsers = function() {
// 
//       payload = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><getVisitorBySoftwareForCPCode xmlns="https://control.akamai.com/HttpContentDeliveryReportService.xsd"><cpcode>'+cpcode+'</cpcode><date>'+$.format.date(dateToCheck, 'yyyyMMdd')+'</date></getVisitorBySoftwareForCPCode></soap:Body></soap:Envelope>';
// 
//       jQuery.ajax({
//           type:     'POST',
//           url:      "https://control.akamai.com/nmrws/services/HttpContentDeliveryReportService",
//           dataType: "xml",
//           data:     payload,
//           beforeSend: function(req) {
// 			  req.setRequestHeader("Authorization", "Basic " + $.base64.encode( 'paul.fairless@bskyb.com' + ":" + 'n3wsR0cks' ));
//               req.setRequestHeader("Content-Type", 'application/soap+xml;charset=UTF-8;')
// 			  req.setRequestHeader("SOAPAction", "");
//           },
//           success: function(xml) {
// 			console.log(xml);
//             var results = jQuery(xml).find("getVisitorBySoftwareForCPCodeReturn");
// 			var csv = jQuery.csv()(results.text());
// 			console.log(csv)
// 			var sky=collect(csv, 'Sky');
// 			var firefox=collect(csv, 'Firefox');
// 			var chrome=collect(csv, 'Chrome');
// 			var safari=collect(csv, 'Safari');
// 			var ie=collect(csv, 'IE');
// 			var other=(100 - (sky+firefox+chrome+safari+ie));
// 			
// 			console.log(sky, firefox, chrome, safari, ie, other)
// 			console.log(chartData);
//            
//           },
//           error: function() {
//               console.log('ERROR: SOAP call failed!');
//           }
//       	}, "xml");
//    	};
// 
	 function collect(array, browser) {
		return array.filter(function(element, index, array){
			return element[0].indexOf(browser) != -1
		}).reduce(function(previousValue, currentValue, index, array){  
	        return parseFloat(previousValue) + parseFloat(currentValue[4]);  
		}, 0);
	};
// 	
// 	var chartData = function(csv) {
// 		var chart = {
// 		    "chart": {
// 		        "caption": "Browsers",
// 		        "bgcolor": "FFFFFF",
// 		        "pieborderthickness": "2",
// 		        "piebordercolor": "FFFFFF",
// 		        "basefontsize": "9",
// 		        "usehovercolor": "1",
// 		        "hoverfillcolor": "CCCCCC",
// 		        "showlabels": "1",
// 		        "showvalue": "1",
// 		        "showvalueintooltip": "1"
// 		    },
// 		    "category": [
// 		        {
// 		            "label": "Browsers",
// 		            "color": "CCCCCC",
// 		            "alpha": "20",
// 		            "category": [
// 		                {
// 		                    "label": "IE",
// 		                    "value": "41",
// 		                    "color": "AE96A9",
// 		                    "category": function() {
// 								var list = [];
// 								$.each(collect(csv, 'Firefox'), function(index, value) {
// 									list[index] =  {
// 										"label": value[0],
// 										"value": value[4],
// 									}
// 									
// 								});
// 								return list;
// 							},
// 		                },
// 		                {
// 		                    "label": "Firefox",
// 		                    "value": "54",
// 		                    "color": "CFBE7C",
// 		                    "category": [
// 		                        {
// 		                            "label": "Templates",
// 		                            "value": "18",
// 		                            "color": "CFBE7C"
// 		                        },
// 		          
// 		                    ]
// 		                },
// 		                {
// 		                    "label": "Chrome",
// 		                    "value": "25",
// 		                    "color": "ADBE79",
// 		                    "category": [
// 		                        {
// 		                            "label": "SEO",
// 		                            "value": "18",
// 		                            "color": "ADBE79"
// 		                        },
// 		                    ]
// 		                },
// 		                {
// 		                    "label": "Safari",
// 		                    "value": "25",
// 		                    "color": "ADBE79",
// 		                    "category": [
// 		                        {
// 		                            "label": "SEO",
// 		                            "value": "18",
// 		                            "color": "ADBE79"
// 		                        },
// 		                    ]
// 		                }	,
// 		                {
// 		                    "label": "Other",
// 		                    "value": "25",
// 		                    "color": "ADBE79",
// 		                    "category": [
// 		                        {
// 		                            "label": "SEO",
// 		                            "value": "18",
// 		                            "color": "ADBE79"
// 		                        },
// 		                    ]
// 		                }
// 		            ]
// 		        }
// 		    ],
// 		    "styles": {
// 		        "definition": [
// 		            {
// 		                "name": "CaptionFont",
// 		                "type": "font",
// 		                "size": "16"
// 		            }
// 		        ],
// 		        "application": [
// 		            {
// 		                "toobject": "CAPTION",
// 		                "styles": "CaptionFont"
// 		            }
// 		        ]
// 		    }
// 		}
// 	};
// 
// 	$(init);
// 
// }(jQuery));
