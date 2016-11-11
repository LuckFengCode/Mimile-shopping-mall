$(function(){
	//$("form").validate();
	$('.register').find("a").eq(0).click(function(){		//验证码更换
		//alert("1")  cs ww
		var m=Math.ceil(Math.random()*9);
		var	n=Math.ceil(Math.random()*9);
		var x=-7-110*m+"px";
		var y=-4-65*n+"px";
		//console.log(x)
		$('.span1').css({
			backgroundPositionX:x,
			backgroundPositionY:y
		})
	})

	var flag;
	
	//验证手机号
	$('.user').focus(function(){
		var html='请输入十一位有效手机号码';
		$(this).siblings('span').html(html);
	})
	$('.user').blur(function(){
		var user=$('input[name=user]').val()
		//console.log(user)
		if(/^[1][358][0-9]{9}$/.test(user)){
			var html='手机号输入正确';
			$(this).siblings('span').html(html);
			$(this).siblings('span').css('color','green')
			flag=true;
		}else{
			var html='手机号输出错误，如13**，15**，18**';
			$(this).siblings('span').html(html);
			flag=false;
		}
	})

	//验证密码
	$('.password').focus(function(){
		var html='6-20位字符，可由英文、数字、标点符号组成';
		$(this).siblings('span').html(html);
	})
	$('.password').blur(function(){
		var password=$('.password').val()	
		if(/^\w{6,20}$/.test(password)){
			var html='密码输入正确';
			$(this).siblings('span').html(html);
			$(this).siblings('span').css('color','green')
			flag=true;
		}else{
			var html='密码输入错误,请重新输入';
			$(this).siblings('span').html(html);
			flag=false;
		}
	})

	//验证码

	$('.verification').focus(function(){
		var html='请输入图中四位验证码';
		$(this).siblings('strong').html(html);
	})
	$('.verification').blur(function(){
		var verification=$('.verification').val();
		if(/^\w{4}$/.test(verification)){
			var html='本功能尚未实现,纯属摆设';
			$(this).siblings('strong').html(html);
			$(this).siblings('strong').css('color','green')
			flag=true;
		}else{
			var html='验证码输入错误,请重新输入';
			$(this).siblings('strong').html(html);
			flag=false;
		}
	})

	//短信验证码
	var arr=['444368','324353','094943','08123','876424','076984','233004','742455','084627',
			 '7846687','083758','908474','676663','352432','113324','213432','984381','959530','634743','00764'];
		
		$('.huoqu').click(function(){
			//alert(1)
			var n=parseInt(Math.random()*20);
			var html=arr[n];
			//console.log(html)
			$('.message').val(html)
			flag=true;
		})

		
		var user=$('input[name=user]').val();
		var password=$('.password').val();
		var verification=$('.verification').val();
		var message=$('.message').val();
	
		if(user==''){
			flag=false;
		}else if(password==''){
			flag=false;
		}else if(verification==''){
			flag=false;
		}else if(message==''){
			flag=false;
		}else{
			flag=true;
		}
		


	$('.register_cont').find('.sub').click(function(){
		if(flag){
			var password=$('.password').val();
			var user=$('.user').val();
			//console.log(user+"======"+password)
			$.ajax({
				url:'http://datainfo.duapp.com/shopdata/userinfo.php',
				type:"POST",
				data:{status:'register',userID:user,password:password},
				success:function(res){
					console.log(res)
					switch(res){
						case "0":alert("用户重名");break;
						case "1":
						alert("注册成功");
						window.location.href='login.html';
						break;
						case "3":alert("我们系统出现一些错误");break;
					}
				}
			})
		}else{
			alert("请填写完整注册信息")
		}
	})
})
