$(function(){
	$(".login").click(function(){		//验证登录信息
		//alert("1")  cs ww
		var userID=$(".user").val();
		var password=$('.pw').val();
		//console.log(userID+" "+password)  cs ww
		$.ajax({

			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			type:"POST",
			data:{
				status:"login",
				userID:userID,
				password:password
			},

			success(res){
				//alert(res)
				switch(res){
					case "0": alert("用户名不存在");break;
					case "2": alert("用户名密码不符");break;
					//default:console.log(res);alert("登录成功");break;
					default:
					//$.cookie('user','[{name:'+userID+',password:'+password+'}]',{expires:7,path:'/'});
					$.cookie('user',userID,{expires:7,path:'/'});
					window.location.href='../index.html';
					break;
				}
			}
		})
	})

// 合作伙伴账号背景切换
	$('.r_b').find("a").mouseover(function(){
		//console.log($(this))  cs ww
		$(this).css("background-position-y","-28px")
	})

	$('.r_b').find("a").eq(2).mouseover(function(){
		//console.log($(this))  cs ww
		$(this).css("background-position-y","-228px")
	})
		$('.r_b').find("a").mouseout(function(){
		//console.log($(this))  cs ww
		$(this).css("background-position-y","0")
	})

	$('.r_b').find("a").eq(2).mouseout(function(){
		//console.log($(this))  cs ww
		$(this).css("background-position-y","-200px")
	})
})