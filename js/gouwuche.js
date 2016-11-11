$(function(){


		//页面刷新获取购物车
	sc_car();

	function sc_car(){
		var sc_car=$.cookie('goods');
		if(sc_car){			//如果购物车不为空
			var sc_obj=eval(sc_car);
			var sc_num=0;
			for(var i in sc_obj){
				sc_num = Number(sc_obj[i].num) + sc_num;
			}
			//console.log(sc_num)
			$('.my-cart .addcart-num').html(sc_num);
			$('.my-cart .sl').html(sc_num);
			$('.my-cart .checkout').find('i').html(sc_num)	;	
		}
					
	}
	car();
	function car(){	
		$.ajax({
			url:'../data/wangzhanshangpin.json',
			type:'GET',
			success:function(res){
				//console.log("+")
				var sc_str = $.cookie('goods');
				//console.log(sc_str)
				if(sc_str){
					var sc_obj=eval(sc_str);
					var sc_num=0;
					var html='';
					var pay=0;
					var arr=[];
					for(var i in sc_obj){	
					//console.log('+')		
						html+='<tbody><tr><th colspan="20"><i class="icon-home"></i><a href="##">官方店铺</a>';
						html+='<span><a href="##"></a></span><div class="youhui"><em><i></i>免运费</em>满49免运费 </div></th></tr>'
						html+='<tr><td><input type="checkbox"></td>'
						html+='<td class="w60"><a href="##"><img src="'+res[sc_obj[i].id-1].url+'" alt=""></a></td>';
						html+='<td class="name"><a href="##">'+res[sc_obj[i].id-1].name+'</a></td>';
						html+='<td class="w120">￥<em>'+res[sc_obj[i].id-1].em1+'</em></td>';
						html+='<td class="w120"><a href="##" class="jian">-</a><input type="text" class="w20" value="'+sc_obj[i].num+'"><a href="##" class="add">+</a></td>';
						html+='<td class="w120"><em>￥'+res[sc_obj[i].id-1].em1+'</em></td>';
						html+='<td class="w80"><a href="##">收藏</a><br><a class="delButton" href="##" id="'+sc_obj[i].id+'">删除</a></td></tr>';
						//var str=res[sc_obj[i].id].em1
						//var arr=str.split('¥').join(" ");
						pay+=eval((res[sc_obj[i].id-1].em1)*(sc_obj[i].num))
						var paym=pay.toFixed(2)
						arr.push(paym);
						
						html+='<tr><td class="tr" colspan="20">店铺合计：<span>'+paym+'</span>元</td></tr></tbody>';										
					}
					
					$('.form').find('.tbody').html('')
					//$('form tfoot').before('');			
					$('form tfoot').before(html);
				}
				//console.log(arr)
				var  Altogether=0
				for(var k in arr){
					 Altogether+=eval(arr[k])
				}
				//console.log( Altogether)
				var altogether=Altogether.toFixed(2)
				//console.log(typeof altogether)
				$('.Altogether').html(altogether)


				$('.w80 .delButton').click(function(){
					//alert($(this).get(0).id)
						del();
					})
			


			}		//end success
		})
	}

		function fun1(){
		if($.cookie('goods')=='[{'){
			$.cookie('goods',null,{path:'/'});
			$.cookie('first',null,{path:'/'});
			var html='';
			var html1='0'
			$('.my-cart .incart_box').html(html);
			$('.my-cart .addcart-num').html(html1);
			$('.my-cart .sl').html(html1);
			$('.my-cart .checkout').find('i').html(html1);
			$('.my-cart .checkout').find('.pay').html(html);
			$('form tfoot').before('');					
		}else{
		car();		
		sc_car();
		}	
	}



	function del(){
		var str=$.cookie('goods');
		var id=$(this).get(0).id
		var obj=eval(str);				
		var arr1=str.split('},{');
		var num=0;
		for(var i=0;i<obj.length;i++){
			num++;
			if(obj[i].id==id){
				break;
			}
		}
		if(num-1==0){
			arr1.splice(num-1,1);

			var str1=arr1.join('},{');
			var str2='[{'+str1;

			$.cookie('goods',str2,{expires:7,path:'/'});
			fun1();
			car();
		}else if((num-1)==obj.length-1){
			arr1.splice(num-1,1);
			var str1=arr1.join('},{');
			var str2=str1+'}]';
			$.cookie('goods',str2,{expires:7,path:'/'});
			fun1();
			car();
		}else{
			arr1.splice(num-1,1);
			var str1=arr1.join('},{');
			$.cookie('goods',str1,{expires:7,path:'/'});
			fun1();
			car();
		}
		window.location.href='gouwuche.html'
	}


		if($.cookie('user')){
		var username=$.cookie('user');
		var html='欢迎您:<span>'+username+'</span><a href="#">退出登录</a>'
		$('.top_l').html(html);
		$('.top_l').find('a').click(function(){
			//alert(1)
			$.cookie('user',null,{path:'/'});
			var html1='<a href="html/login.html">登录</a><a href="html/register.html">注册</a>';
			$('.top_l').html(html1);
		})
	}

	// 顶部购物车
	$('#topWrapper').find('.my-cart').mouseenter(function(){
		//console.log("++")
		 cart();
		$('#topWrapper .my-cart').find('.sc_cart').css("display","block");
		
	})
	$('#topWrapper').find('.my-cart').mouseleave(function(){
		$('#topWrapper .my-cart').find('.sc_cart').css("display","none")
	})

	//顶部加载购物车

	function cart(){
	


		$.ajax({
			url:'../data/wangzhanshangpin.json',
			type:'GET',
			success:function(res){
				//console.log("+")
				var sc_str = $.cookie('goods');
				if(sc_str){
					var sc_obj=eval(sc_str);
					var sc_num=0;
					html='';
					var pay=0;
					for(var i in sc_obj){				
						html+='<dl class="clear"><dt><a href="##" id="'+sc_obj[i].id+'">';
						html+='<img src="'+res[sc_obj[i].id-1].url+'" alt=""></a></dt>';
						html+='<dd><a href="##" id="'+sc_obj[i].id+'">'+res[sc_obj[i].id-1].name+'</a></dd>';
						html+='<span class="del">'+res[sc_obj[i].id-1].em1+'×'+sc_obj[i].num+'<br><em><a class="delButton" id="'+sc_obj[i].id+'" href="##">删除</a></em></span></dl>';
						$('.my-cart .incart_box').html(html);
						var str=res[sc_obj[i].id-1].em1
						//console.log(str)
						var arr=str.split('¥').join(" ");
						//console.log(arr)
						pay+=eval(arr*(sc_obj[i].num))
						
					}
					//console.log(typeof res[sc_obj[1].id].em1)
					var paym=pay.toFixed(2)
					$('.my-cart .checkout').find('.pay').html(paym);
				}

				//删除购物车
					$('.incart_box .del').on('click','.delButton',function(){
						
						//alert(1)
			
						var str=$.cookie('goods');
						//console.log(str)
						var id=$(this).get(0).id
						//console.log(id)
						var obj=eval(str);	
						//console.log(obj)				
						var arr1=str.split('},{');
						//console.log(arr1)
						var num=0;
						for(var i=0;i<obj.length;i++){
							num++;
							if(obj[i].id==id){
								break;
							}
						}
						if(num-1==0){
							arr1.splice(num-1,1);
							//console.log(arr1)
							var str1=arr1.join('},{');
							var str2='[{'+str1;
							//console.log(str2)
							$.cookie('goods',str2,{expires:7,path:'/'});
							fun();
							car();
						}else if((num-1)==obj.length-1){
							arr1.splice(num-1,1);
							//console.log(arr1)
							var str1=arr1.join('},{');
							var str2=str1+'}]';
							//console.log(str2)
							$.cookie('goods',str2,{expires:7,path:'/'});
							fun();
							car();
						}else{
							arr1.splice(num-1,1);
							var str1=arr1.join('},{');
							$.cookie('goods',str1,{expires:7,path:'/'});
							fun();
							car();
						}
						window.location.href='gouwuche.html';
						//console.log($.cookie('goods'));
					})
					//console.log($.cookie('goods'))

							

 
			}   // end success
		})
	
	}



	//首页购物车跳转详情页
	
	$('.incart_box').on('click','dt',function(){
		//console.log($(this).find('a').get(0).id);
		$.cookie("buyId",$(this).find('a').get(0).id);
		window.location.href = 'xiangqing.html'
		
	})
	$('.incart_box').on('click','dd',function(){
		//console.log($(this).find('a').get(0).id);
		$.cookie("buyId",$(this).find('a').get(0).id);
		window.location.href = 'xiangqing.html'
		
	})

	



	// 顶部下拉菜单
	//console.log($('#topWrapper .other_menu').find('dl'))  //cs ww
	for(var i=0;i<$('#topWrapper .other_menu').find('dl').length;i++){
		$('#topWrapper .other_menu').find('dl').eq(i).mouseenter(function(){
			 //cart();
			//alert("1")  //cs ww
			//console.log($('#topWrapper .other_menu').find('dl').eq($(this).index()).children('dd').eq(0))
			$('#topWrapper .other_menu').find('dl').eq($(this).index()).children('dd').css("display","block")
		})
		$('#topWrapper .other_menu').find('dl').eq(i).mouseleave(function(){
			$('#topWrapper .other_menu').find('dl').eq($(this).index()).children('dd').css("display","none")
		})
	}

	// 侧边栏
	$('#sideBarWrapper .service').find('li').eq(0).mouseenter(function(){
		//alert("1") //cs ww
		//console.log($('#sideBarWrapper .service').find('.custome')) cs ww
		$('#sideBarWrapper .service').find('.custome').stop().animate({
			'left':'-82px',
			'opacity':'1'
		},800)
	})
	$('#sideBarWrapper .service').find('li').eq(0).mouseleave(function(){
		//alert("1") //cs ww
		//console.log($('#sideBarWrapper .service').find('.custome')) cs ww
		$('#sideBarWrapper .service').find('.custome').stop().animate({
			'left':'100px',
			'opacity':'0'
		},800)
	})
	$('#sideBarWrapper .service').find('li').eq(3).mouseenter(function(){
		//alert("1") //cs ww
		$('#sideBarWrapper .service').find('.QR-Code').stop().animate({
			'left':'-150px',
			'opacity':'1'
		},800)
	})
	$('#sideBarWrapper .service').find('li').eq(3).mouseleave(function(){
		//alert("1") //cs ww
		$('#sideBarWrapper .service').find('.QR-Code').stop().animate({
			'left':'100px',
			'opacity':'0'
		},800)
	})
	$('#sideBarWrapper .sideBar_gototop').find('span').mouseenter(function(){
		//alert("1") //cs ww
		$('#sideBarWrapper .sideBar_gototop').find('.gototop').stop().animate({
			'left':'-82px',
			'opacity':'1'
		},800)
	})
	$('#sideBarWrapper .sideBar_gototop').find('span').mouseleave(function(){
		//alert("1") //cs ww
		$('#sideBarWrapper .sideBar_gototop').find('.gototop').stop().animate({
			'left':'100px',
			'opacity':'0'
		},800)
	})

		//页面刷新获取购物车
	

	function sc_car(){
		var sc_car=$.cookie('goods');
		if(sc_car){			//如果购物车不为空
			var sc_obj=eval(sc_car);
			var sc_num=0;
			for(var i in sc_obj){
				sc_num = Number(sc_obj[i].num) + sc_num;
			}
			//console.log(sc_num)
			$('.my-cart .addcart-num').html(sc_num);
			$('.my-cart .sl').html(sc_num);
			$('.my-cart .checkout').find('i').html(sc_num)	;	
		}
					
	}
	


	function fun(){
		if($.cookie('goods')=='[{'){
			$.cookie('goods',null,{path:'/'});
			$.cookie('first',null,{path:'/'});
			var html0='<img src="../images/loading.gif" alt="">'
			var html='';
			var html1='0'
			$('.my-cart .incart_box').html(html0);
			$('.my-cart .addcart-num').html(html1);
			$('.my-cart .sl').html(html1);
			$('.my-cart .checkout').find('i').html(html1);
			$('.my-cart .checkout').find('.pay').html(html);			
		}else{
		cart();		
		sc_car();
		}	
	}

	
})