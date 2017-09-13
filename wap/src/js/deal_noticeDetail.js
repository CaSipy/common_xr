var app = angular.module('app', [ 'ngSanitize' ]);
app.controller('ctrl', function($scope, $http) {
	if ($.isEmptyObject(json)) {
		var init_url = project_url + "/viewpoint/detail.do?is_json=2";
		$http({
			method : 'post',
			url : init_url,
			headers : {
				'Content-Type' : 'application/x-www/-form-urlencoded'
			}
		}), then(function successCallback(data) {
			// 请求成功执行代码
			json = data.data;
			$scope.json = data.data;
			$scope.json_config = data.data.json_config;

		}, function errorCallback(data) {
			// 请求失败执行代码
			console.log('error:' + data);
		});
	} else {
		$scope.json = json;
		$scope.json_config = json.json_config;

		var id = json.article_id;
		if (id != -1) {
			var url = domain_url + "/" + json.json_config.project_name_weixin
					+ "/cM_Article/getArticles.do";
			var json_param = {};
			json_param['id'] = id;
			$http({
				method : 'post',
				url : url,
				data : $.param(json_param),
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				}
			}).then(
					function successCallback(data) {
						$scope.article = data.data.article.article;
						$scope.json_config.page_title = data.data.article.name
								+ "-" + $scope.json_config.page_title;
					}, function errorCallback(data) {
						// 请求失败执行代码
						console.log(data);
					});
		}
	}

	/**
	 * 拼接地址
	 */
	$scope.combineUrl = function(url, app_module_action_param) {
		if (url == "") {
			var return_url = $scope.json_config.domain_url + "/"
					+ app_module_action_param;
			return return_url;
		} else {
			return url;
		}
	};

	/**
	 * 当前地址是否是当前页面
	 */
	$scope.is_pre_url = function(url, app_module_action_param) {
		var return_url = url;
		if (url == "") {
			return_url = $scope.json_config.domain_url + "/"
					+ app_module_action_param;
		}
		if (return_url == $scope.json_config.pre_url) {
			return true;
		} else {
			return false;
		}
	};
});