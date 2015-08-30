$(function () {
	$('.del').on('click',function () {
		var tr = $(this).parents('tr');
		var id = tr[0].id;
		$.ajax({
			type:"DELETE",
			url:'/admin/list',
			data:{
				id:id
			},
			success:function (data) {
				if (data.status == 200) {
					if (tr.length !=0) {
						tr.remove();
					};
					alert("删除成功")
				}else{
					alert("删除失败")
				}
			},
			error:function () {
				alert('异常');
			}
		})
	})
})