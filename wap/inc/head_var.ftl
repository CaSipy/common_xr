	<script>
		var json=${json};	<!--页面需要的所有json数据-->
    	var oss_common_url = "${json_config.oss_common_url}";	<!--公共的静态资源-->
    	var oss_image_url = "${json_config.oss_image_url}";		<!--图片-->
    	var oss_static_url = "${json_config.oss_static_url}";	<!--静态资源-->
    	var project_name_login = "${json_config.project_name_login}";	<!--登录-->
    	var project_name_public = "${json_config.project_name_public}";	<!--本地使用-->
    	var project_name_common = "${json_config.project_name_common}";	<!--本地使用-static-->
    	var domain_url = "${json_config.domain_url}";			<!--当前域名 http://域名-->
    	var project_url = "${json_config.project_url}";			<!--当前项目路径	http://域名/项目名-->
    	var pre_url = "${json_config.pre_url}";					<!--当前路径		http://域名/项目名/模块/动作.do-->
    	var pre_url_param = "${json_config.pre_url_param}";		<!--当前页面的完整地址-->
    	var folder_name = "${json_config.folder_name}";			
    	var module = "${json_config.module}";					<!--当前模块-->
    	var action = "${json_config.action}";					<!--当前动作-->
        var page_title = json.json_config.page_title.replace(json.json_config.project_name,'');
        page_title=page_title.replace('-','');
    </script>