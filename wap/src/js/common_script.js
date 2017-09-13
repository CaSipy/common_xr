
/**
 * 获取选中的ID集合
 */
function getSelectionIds(table_id){
	var ids ="";
	var rows = $('#'+table_id).datagrid('getSelections');
	for(var i=0; i<rows.length; i++){
		var row = rows[i];
		ids=ids+row.id+",";
		//ss.push('<span>'+row.itemid+":"+row.productid+":"+row.attr1+'</span>');
	}
	
	if(""==ids){
		return "";
	}else{
		ids=ids.substring(0,ids.length-1);
		return ids;
	}
}

/**
 * 
 * @param title	显示的标题
 * @param func_name
 * @param param
 */
function createWindowOperation(title,func_name,param,width,height){
	var str = '<a href="#" class="l-btn-text" style="margin:3px;color:#000;text-decoration:none;" onclick="'
		+func_name+'(\''+param+'\',\''+width+'\',\''+height+'\')" >'+title+'</a>';
	return str;
}

/**
 * 
 * @param title	显示的标题
 * @param func_name
 * @param param
 */
function createOperation(title,func_name,param){
	var str = '<a href="#" class="l-btn-text" style="margin:3px;color:#000;text-decoration:none;" onclick="'+func_name+'(\''+param+'\')" >'+title+'</a>';
	return str;
}

/**
 * 跳转
 * @param url
 */
function jump_request(url){
	window.location.href=url;
}

/**
 * ajax请求返回json格式
 * @param url	请求地址
 * @param data	参数
 */
function json_request(url,data){
	$.ajax({
		url:url,
		type:'post',
		dataType:"json",
		data:data,
		success:function(rs){
			if(rs.err_code==-1){
				slide_message(rs.err_msg);
				if(datagrid_num==2){
					$('#tt').treegrid('load');
				}else{
					$('#tt').datagrid('load'); 
				}
				//location.reload(); 
			}else{
				slide_message(rs.err_msg);
			}
		}
	});
}


function slide_message(msg){
    $.messager.show({
        title:'温馨提示',
        msg:msg,
        timeout:3000,
        showType:'slide'
    });
}

/**
 * 弹窗编辑用户
 * @param id
 */
function editAjax(id,width,height){
	var url = module_url+"/edit.do?id="+id;
	$('#win').window({    
	    width:width,    
	    height:height, 
	    title:'编辑',
	    collapsible:false,
	    minimizable:false,
	    maximizable:false,
	    modal:true   
	});  
	$('#win').window('refresh', url);  
}

/**
 * 弹窗编辑用户
 * @param id
 */
function copyAjax(id,width,height){
	var url = module_url+"/copy.do?id="+id;
	$('#win').window({    
		width:width,    
	    height:height, 
	    title:'复制',
	    collapsible:false,
	    minimizable:false,
	    maximizable:false,
	    modal:true   
	});  
	$('#win').window('refresh', url);  
}

/**
 * 添加
 * @param id
 */
function addAjax(width,height){
	var url = module_url+"/add.do";
	$('#win').window({    
		width:width,    
	    height:height,  
	    title:'添加',
	    collapsible:false,
	    minimizable:false,
	    maximizable:false,
	    modal:true   
	});  
	$('#win').window('refresh', url);  
}

/**
 * 添加
 * @param id
 */
function add(){
	var url = module_url+"/add.do?";
	jump_request(url);
}

/**
 * 修改
 * @param id
 */
function edit(id){
	var url = module_url+"/edit.do?id="+id;
	jump_request(url);
}

/**
 * 复制
 * @param id
 */
function copy(id){
	var url = module_url+"/copy.do?id="+id;
	jump_request(url);
}

/**
 * 单项删除
 * @param id
 */
function del(id){
	$.messager.confirm('温馨提示', '确定删除选中的数据??', function(r){
		if (r){
			var url = module_url+"/del.do";
			var data = {};
			data['id']=id;
			json_request(url,data);
		}
	});
}

function dels(){
	var ids=getSelectionIds("tt");
	ids.replace("undefined,","");
	if(""==ids){
		slide_message("请先选中再操作");
	}else{
		$.messager.confirm('温馨提示', '确定批量删除选中的数据??', function(r){
			if (r){
				var url = module_url+"/dels.do";
				var data = {};
				data['ids']=ids;
				json_request(url,data);
			}
		});
	}
}

/**
 * 单击编辑===========开始==================
 */
$.extend($.fn.datagrid.methods, {
	editCell: function(jq,param){
		return jq.each(function(){
			//如不可编辑则返回
            if (!$(this).datagrid('IsCellEditable', param.field)) {
                return;
            }
			var opts = $(this).datagrid('options');
			var fields = $(this).datagrid('getColumnFields',true).concat($(this).datagrid('getColumnFields'));
			for(var i=0; i<fields.length; i++){
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor1 = col.editor;
				if (fields[i] != param.field){
					col.editor = null;
				}
			}
			$(this).datagrid('beginEdit', param.index);
			for(var i=0; i<fields.length; i++){
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor = col.editor1;
			}
		});
	},
	 //是否可编辑
    IsCellEditable: function (jq, param) {
        var col = jq.datagrid('getColumnOption', param);
        return col.editor != null && col.editor != undefined;
    },
    //滚动到单元格
    scrollToCell: function (jq, param) {
        return jq.each(function () {
            var body2 = $(this).data('datagrid').dc.body2;

            var fields = $(this).datagrid('getColumnFields', true).concat($(this).datagrid('getColumnFields'));
            var _width = 0;
            var IsStart = false;
            for (var i = 0; i < fields.length; i++) {

                if (fields[i] != param.startfield && IsStart == false) {
                    continue;
                }
                IsStart = true;
                var col = $(this).datagrid('getColumnOption', fields[i]);
                _width += col.width;
                
                if (fields[i] == param.endfield) {
                    break;
                }
            }
            body2.animate({ scrollLeft: _width + 'px' }, 800);
        });
    }
});

var editIndex = undefined;
//var edit_field=undefined;
function endEditing(){
	if (editIndex == undefined){return true}
	if ($('#tt').datagrid('validateRow', editIndex)){
		$('#tt').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}
function onClickCell(index, field){
	if (endEditing()){
		$('#tt').datagrid('selectRow', index)
				.datagrid('editCell', {index:index,field:field});
		editIndex = index;
		//edit_field=field;
	}
}


/**
 * 在用户完成编辑一行的时候触发，参数包括：
 * @param rowIndex	编辑行的索引，索引从0开始。
 * @param rowData	对应于完成编辑的行的记录。	//整个行的记录
 * @param changes	更改后的字段(键)/值对。	//单单修改那部分的值
 */
function onAfterEdit(rowIndex, rowData, changes){
	//alert(rowIndex);
	//alert(JSON.stringify(rowData));
	//alert(JSON.stringify(changes));
	//alert(edit_field);
	changes['id']=rowData['id'];
	$.messager.confirm('温馨提示', '确定修改??', function(r){
		if (r){
			var url = module_url+"/editField.do";
			json_request(url,changes);
		}
	});
	
}

/**
 * 单击编辑===========结束==================
 */