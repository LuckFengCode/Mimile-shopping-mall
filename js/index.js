$(function(){
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
		 cart();
		$('#topWrapper .my-cart').find('.sc_cart').css("display","block");
		
	})
	$('#topWrapper').find('.my-cart').mouseleave(function(){
		$('#topWrapper .my-cart').find('.sc_cart').css("display","none")
	})


	function cart(){
		$.ajax({
			url:'data/indexcart.json',
			type:'GET',
			success:function(res){
				//console.log(res)
				//console.log($.cookie('goods'))
				var sc_str = $.cookie('goods');
				//console.log(sc_str)
				if(sc_str){
					var sc_obj=eval(sc_str);
					//console.log(sc_obj)
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
						var paym=pay.toFixed(2)
					}
					//console.log(typeof res[sc_obj[1].id].em1)
					$('.my-cart .checkout').find('.pay').html(paym)
				}

				//删除购物车
					$('.incart_box .del').on('click','.delButton',function(){
						
						//alert(1)
						sc_car();
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
						}else if((num-1)==obj.length-1){
							arr1.splice(num-1,1);
							//console.log(arr1)
							var str1=arr1.join('},{');
							var str2=str1+'}]';
							//console.log(str2)
							$.cookie('goods',str2,{expires:7,path:'/'});
							fun();
						}else{
							arr1.splice(num-1,1);
							var str1=arr1.join('},{');
							$.cookie('goods',str1,{expires:7,path:'/'});
							fun();
						}
						//window.location.href='shangpinxiangqing.html';
						//console.log($.cookie('goods'));
					})
					//console.log($.cookie('goods'))


			}			//end success
		})
	}



		function fun(){
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
		}else{
		cart();		
		sc_car();
		}	
	}

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


	//首页购物车跳转详情页
	//console.log($('.incart_box dt').find('a').get(0).id);
	$('.incart_box').on('click','dt',function(){
		//console.log($(this).find('a').get(0).id);
		$.cookie("buy",$(this).find('a').get(0).id,{path:'/'});
		window.location.href = 'html/xiangqing.html'
		
	})
	$('.incart_box').on('click','dd',function(){
		//console.log($(this).find('a').get(0).id);
		$.cookie("buyId",$(this).find('a').get(0).id,{path:'/'});
		window.location.href = 'html/xiangqing.html'
		
	})


	//删除购物车
	$('.incart_box').on('click','span',function(){
		
		//alert(1)
		
		
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

	// banner轮播图
	
	var index=0;
	var timer1=setInterval(fun1,2000);
	function fun1(){
		if(index==$('#bannerWrapper .banner_img').children("li").length-1){
			index=0;
		}else{
			index++;
		}
		$('#bannerWrapper .banner_img').children("li").eq(index).fadeIn().siblings().fadeOut();
		$('#bannerWrapper .ad_title').children('a').eq(index).css("background","rgba(255,0,0,0.4)")
		$('#bannerWrapper .ad_title').children('a').eq(index).siblings().css("background","rgba(0,0,0,0.2)")
	}
	$('#bannerWrapper .ad_title').children().mouseover(function(){
		//console.log("+")
		clearInterval(timer1);
		index=$(this).index()-1;
		//console.log(index);
		fun1();
	})
	$('#bannerWrapper .ad_title').children().mouseout(function(){
		//console.log("-")
		timer1=setInterval(fun1,2000);
	})
	// 上一页
	$('#bannerWrapper').find('.pre').click(function(){
		clearInterval(timer1);
		//console.log(index);
		$('#bannerWrapper .banner_img').children("li").eq(index).fadeIn().siblings().fadeOut();
		$('#bannerWrapper .ad_title').children('a').eq(index).css("background","rgba(255,0,0,0.4)")
		$('#bannerWrapper .ad_title').children('a').eq(index).siblings().css("background","rgba(0,0,0,0.2)")
		if(index==0){
			index=$('#bannerWrapper .banner_img').children("li").length-1;
		}else{
			index--;
		}
		timer1=setInterval(fun1,2000);
	})
	//下一页
	$('#bannerWrapper').find('.next').click(function(){
		clearInterval(timer1);
		console.log(index)
		fun1();
		timer1=setInterval(fun1,2000);
	})
	//按钮显示 隐藏
	show($('#bannerWrapper').children('.banner'),$('#bannerWrapper').find('.pre'));
	show($('#bannerWrapper').children('.banner'),$('#bannerWrapper').find('.next'));
	hide($('#bannerWrapper').children('.banner'),$('#bannerWrapper').find('.pre'));
	hide($('#bannerWrapper').children('.banner'),$('#bannerWrapper').find('.next'));


	//一楼楼层左侧轮播
	
	for(var i=3;i<8;i+=2){
		//console.log(i)
		var li=$('.onefloor .recommend ul').children('li').eq(i).clone(true);
		li.prependTo($('.onefloor .recommend ul'));	
	}
	for(var i=3;i<6;i++){
		var li=$('.onefloor .recommend ul').children('li').eq(i).clone(true);
		$('.onefloor .recommend ul').append(li)
	}											
	var index1=3;
	var timer2=setInterval(fun2,1000);
	function fun2(){
		if(index1==8){
			index1=3;
			$('.onefloor .recommend').children('ul').get(0).style.top='-150px';
		}else{
			index1++;
		}
		//console.log(index1)
		var $top=-50*index1+"px";
		$('.onefloor .recommend').children('ul').stop().animate({
			'top':$top
		})
	}


	//一楼中部轮播
		var index2=0;
		var timer3=setInterval(fun3,2000)
		var Oa=$('.onefloor .show_c').children('a').eq(0).clone(true);
		$('.onefloor .show').children('.show_c').append(Oa);
		var Ob=$('.onefloor .show_c').children('a').eq(3).clone(true);
		Ob.prependTo($('.onefloor .show').find('.show_c'));

		function fun3(){
			if(index2==5){
				index2=2;
				$('.onefloor .show').children('.show_c').get(0).style.left="-389px";
			}else{
				index2++;
			}
			var left=-389*index2+"px"
			$('.onefloor .show').children('.show_c').animate({
				'left':left
			})
		}

		//上一页
		$('.onefloor .goods_group1').find('.goods_pre').click(function(){
			clearInterval(timer3);
			//console.log(index2)
			if(index2==0){
				index2=3;  //$('.goods .show_c').children('a').length-3
				$('.onefloor .show').children('.show_c').get(0).style.left="-1556px";
			}else{
				index2--;
			}
			var left=-389*index2+"px"
			$('.onefloor .show').children('.show_c').stop().animate({
				'left':left
			});
			timer3=setInterval(fun3,2000);
		})
		//下一页
		$('.onefloor .goods_group1').find('.goods_next').click(function(){
			clearInterval(timer3);
			//console.log(index2)
			if(index2==5){		//$('.goods .show_c').children('a').length-1
				index2=2;
				$('.onefloor .show').children('.show_c').get(0).style.left="-398px";
			}else{
				index2++;
			}
			var left=-389*index2+"px";
			$('.onefloor .show').children('.show_c').stop().animate({
				'left':left
			});
			timer3=setInterval(fun3,2000);
		})
	

	// 左侧二级菜单
	
	for(var i=0;i<$('#navWrapper .menu').find("li").length;i++){
		show($('#navWrapper .menu').find("li").eq(i),$('#navWrapper .category').find('.cont').eq(i));
		hide($('#navWrapper .menu').find("li").eq(i),$('#navWrapper .category').find('.cont').eq(i));
		show($('#navWrapper .category').find('.cont').eq(i),$('#navWrapper .category').find('.cont').eq(i))
		hide($('#navWrapper .category').find('.cont').eq(i),$('#navWrapper .category').find('.cont').eq(i))
	}








	//推荐商品
	
		$.ajax({
			url:"data/floor1_shangpin.json",
			type:'GET',
			success:function(data){

			//console.log(data);  //cd ww
					
				for(var i=0;i<data.length;i++){
				  	var html="<li><dl>";
					html+='<dt><a href="#"><img src="'+data[i].src+'" alt=""></a></dt>';
					html+='<dd><a href="#">'+data[i].dd+'</a></dd>';
					html+='<strong>'+data[i].price+'</strong> <span>'+data[i].del+'</span>';
					html+='</dl></li>';	
					//console.log(html);
					$('.onefloor .goods_b').append(html);
				}
				//html='<li><dl><dt><a href="#"><img src="images/img1.jpg" alt=""></a></dt><dd><a href="#">联想Lenovo C5030<br/> I35005U4G1TGRW-10(W)(E)</a></dd><strong>￥4299.00</strong>  <span>￥4800.00</span></dl></li><li><dl><dt><a href="#"><img src="images/img2.jpg" alt=""></a></dt><dd><a href="#">得力（deli） 6506 按动圆珠笔 60支/盒 蓝色 0.7mm</a></dd><strong>￥26.80</strong>  <span>￥32.00</span></dl></li><li><dl><dt><a href="#"><img src="images/img3.jpg" alt=""></a></dt><dd><a href="#">得力(deli)8553 32mm彩色长尾夹/长尾票夹 24只/筒</a></dd><strong>￥11.80</strong>  <span>￥13.00</span></dl></li><li><dl><dt><a href="#"><img src="images/img4.png" alt=""></a></dt><dd><a href="#">齐心B2101 办公笔筒 四格分类 配色 个</a></dd><strong>￥10.80</strong>  <span>￥15.00</span></dl></li>'
					
					

			}
		})
	// 楼层导航菜单
	
	change($('.onefloor .floor_menu').children('li').eq(0),$('.onefloor .floor_center').children());
	change($('.onefloor .floor_menu').children('li').eq(1),$('.onefloor .floor_center').children());
	change($('.onefloor .floor_menu').children('li').eq(2),$('.onefloor .floor_center').children());
	change($('.onefloor .floor_menu').children('li').eq(3),$('.onefloor .floor_center').children());

		//促销商品加载
		$.ajax({
			url:"data/floor1_cuxiao.json",
			type:"GET",
			success:function(res){
				//console.log(res)  cs ww
				for(var i=0;i<res.length;i++){
					var html="<li><dl>";
					html+='<dt><a href="#"><img src="'+res[i].src+'" alt=""></a></dt>';
					html+='<dd><a href="#">'+res[i].dd+'</a></dd>';
					html+='<span>'+res[i].span+'</span>';
					$('.onefloor .goods3 ul').append(html);
				}
			}
		})
		// 商品加载5个
		$.ajax({
			url:"data/floor1_tuijian5.json",
			type:"GET",
			success:function(res){
				//console.log(res)  cs ww
				for(var i=0;i<res.length;i++){
					var html="<li><dl>";
					html+='<dt><a href="#"><img src="'+res[i].src+'" alt=""></a></dt>';
					html+='<dd><a href="#">'+res[i].dd+'</a></dd>';
					html+='<span>'+res[i].span+'</span>';
					$('.onefloor .goods4 ul').append(html);
				}
			}
		})


	// 一楼排行榜
		$.ajax({
			url:"data/floor1_paihangbang.json",
			type:"GET",
			success:function(res){
				//console.log(res)  cs ww
				for(var i=0;i<res.length;i++){
					if(i<3){
						var html='<li><div class="p_goods">';
						html+='<span class="one">'+res[i].num+'</span>';
						html+='<p>'+res[i].p+'</p></div>';
						html+='<dl class="clear"><dt><a href="#"><img src="'+res[i].src+'" alt=""></a></dt>';
						html+='<dd class="intro"><a href="#">'+res[i].intro+'</a></dd>';
						html+='<dd class="price">'+res[i].price+'</dd></dl></li>';
						$('.onefloor .goods_group4').find('ul').append(html)
					}else{	
						var html='<li><div class="p_goods">';
						html+='<span class="two">'+res[i].num+'</span>';
						html+='<p>'+res[i].p+'</p></div>';
						html+='<dl class="clear"><dt><a href="#"><img src="'+res[i].src+'" alt=""></a></dt>';
						html+='<dd class="intro"><a href="#">'+res[i].intro+'</a></dd>';
						html+='<dd class="price">'+res[i].price+'</dd></dl></li>';
						$('.onefloor .goods_group4').find('ul').append(html)
					}

				}
				shoufengqin();
			}
		})

				// 二楼数据


// 二楼中部轮播
		var index3=0;
		var timer4=setInterval(fun4,2000)
		var Oa2=$('.twofloor .show_c').children('a').eq(0).clone(true);
		$('.twofloor .show').children('.show_c').append(Oa2);
		var Ob2=$('.twofloor .show_c').children('a').eq(3).clone(true);
		Ob2.prependTo($('.twofloor .show').find('.show_c'));
		function fun4(){
			if(index3==5){
				index3=2;
				$('.twofloor .show').children('.show_c').get(0).style.left="-389px";
			}else{
				index3++;
			}
			var left=-389*index3+"px"
			$('.twofloor .show').children('.show_c').animate({
				'left':left
			})
		}

		//上一页
		$('.twofloor .goods_group1').find('.goods_pre').click(function(){

			clearInterval(timer4);
			//console.log(index2)
			if(index3==0){
				index3=3;  //$('.goods .show_c').children('a').length-3
				$('.twofloor .show').children('.show_c').get(0).style.left="-1556px";
			}else{
				index3--;
			}
			var left=-389*index3+"px"
			$('.twofloor .show').children('.show_c').stop().animate({
				'left':left
			});
			
			timer4=setInterval(fun4,2000);
		})
		//下一页
		$('.twofloor .goods_group1').find('.goods_next').click(function(){
			clearInterval(timer4);
			//console.log(index2)
			if(index3==5){		//$('.goods .show_c').children('a').length-1
				index3=2;
				$('.twofloor .show').children('.show_c').get(0).style.left="-398px";
			}else{
				index3++;
			}
			var left=-389*index3+"px";
			$('.twofloor .show').children('.show_c').stop().animate({
				'left':left
			});
			timer4=setInterval(fun4,2000);
		})

// 二楼左侧轮播图
		
	var index4=3;
	var timer5=setInterval(fun5,1000);
	for(var i=3;i<8;i+=2){
		//console.log(i)
		var li=$('.twofloor .recommend ul').children('li').eq(i).clone(true);
		li.prependTo($('.twofloor .recommend ul'));	
	}
	for(var i=3;i<6;i++){
		var li=$('.twofloor .recommend ul').children('li').eq(i).clone(true);
		$('.twofloor .recommend ul').append(li)
	}	
	function fun5(){
		if(index4==8){
			index4=3;
			$('.twofloor .recommend').children('ul').get(0).style.top='-150px';
		}else{
			index4++;
		}
		
		var $top=-50*index4+"px";
		$('.twofloor .recommend').children('ul').stop().animate({
			'top':$top
		})
	} 
	
		// 二楼排行榜
		$.ajax({
			url:"data/floor2_paihangbang.json",
			type:"GET",
			success:function(res){
				//console.log(res)  cs ww
				for(var i=0;i<res.length;i++){
					if(i<3){
						var html='<li><div class="p_goods">';
						html+='<span class="one">'+res[i].num+'</span>';
						html+='<p>'+res[i].p+'</p></div>';
						html+='<dl class="clear"><dt><a href="#"><img src="'+res[i].src+'" alt=""></a></dt>';
						html+='<dd class="intro"><a href="#">'+res[i].intro+'</a></dd>';
						html+='<dd class="price">'+res[i].price+'</dd></dl></li>';
						$('.twofloor .goods_group4').find('ul').append(html)
					}else{	
						var html='<li><div class="p_goods">';
						html+='<span class="two">'+res[i].num+'</span>';
						html+='<p>'+res[i].p+'</p></div>';
						html+='<dl class="clear"><dt><a href="#"><img src="'+res[i].src+'" alt=""></a></dt>';
						html+='<dd class="intro"><a href="#">'+res[i].intro+'</a></dd>';
						html+='<dd class="price">'+res[i].price+'</dd></dl></li>';
						$('.twofloor .goods_group4').find('ul').append(html)
					}

				}
				shoufengqin();
			}
		})

			// 二楼商品推荐
		$.ajax({
			url:"data/floor2_shangpin.json",
			type:'GET',
			success:function(data){
				//console.log(data)
				for(var i=0;i<data.length;i++){
				  	var html="<li><dl>";
					html+='<dt><a href="#"><img src="'+data[i].src+'" alt=""></a></dt>';
					html+='<dd><a href="#">'+data[i].dd+'</a></dd>';
					html+='<strong>'+data[i].price+'</strong> <span>'+data[i].del+'</span>';
					html+='</dl></li>';	
					$('.twofloor .goods_b').append(html);
				}			
			}
		})

	//营养保健加载
		$.ajax({
			url:"data/floor2_yingyang.json",
			type:"GET",
			success:function(res){
				//console.log(res)  cs ww
				for(var i=0;i<res.length;i++){
					var html="<li><dl>";
					html+='<dt><a href="#"><img src="'+res[i].src+'" alt=""></a></dt>';
					html+='<dd><a href="#">'+res[i].dd+'</a></dd>';
					html+='<span>'+res[i].span+'</span>';
					$('.twofloor .goods3 ul').append(html);
				}
			}
		})

	// 3C数码
		$.ajax({
			url:"data/floor2_3Cshuma.json",
			type:"GET",
			success:function(res){
				//console.log(res)  cs ww
				for(var i=0;i<res.length;i++){
					var html="<li><dl>";
					html+='<dt><a href="#"><img src="'+res[i].src+'" alt=""></a></dt>';
					html+='<dd><a href="#">'+res[i].dd+'</a></dd>';
					html+='<span>'+res[i].span+'</span>';
					$('.twofloor .goods2 ul').append(html);
				}
			}
		})

	//特惠专区
		$.ajax({
			url:"data/floor2_tehui.json",
			type:"GET",
			success:function(res){
				//console.log(res)  cs ww
				for(var i=0;i<res.length;i++){
					var html="<li><dl>";
					html+='<dt><a href="#"><img src="'+res[i].src+'" alt=""></a></dt>';
					html+='<dd><a href="#">'+res[i].dd+'</a></dd>';
					html+='<span>'+res[i].span+'</span>';
					$('.twofloor .goods4 ul').append(html);
				}
			}
		})

	//二楼菜单切换
	change($('.twofloor .floor_menu').children('li').eq(0),$('.twofloor .floor_center').children());
	change($('.twofloor .floor_menu').children('li').eq(1),$('.twofloor .floor_center').children());
	change($('.twofloor .floor_menu').children('li').eq(2),$('.twofloor .floor_center').children());
	change($('.twofloor .floor_menu').children('li').eq(3),$('.twofloor .floor_center').children());




//三楼数据

//三楼中部轮播
		var index5=0;
		var timer6=setInterval(fun6,2000)
		var Oa6=$('.threefloor .show_c').children('a').eq(0).clone(true);
		$('.threefloor .show').children('.show_c').append(Oa6);
		var Ob6=$('.threefloor .show_c').children('a').eq(3).clone(true);
		Ob6.prependTo($('.threefloor .show').find('.show_c'));

		function fun6(){
			if(index5==5){
				index5=2;
				$('.threefloor .show').children('.show_c').get(0).style.left="-389px";
			}else{
				index5++;
			}
			var left=-389*index5+"px"
			$('.threefloor .show').children('.show_c').animate({
				'left':left
			})
		}

		//上一页
		$('.threefloor .goods_group1').find('.goods_pre').click(function(){
			clearInterval(timer6);
			//console.log(index2)
			if(index5==0){
				index5=3;  //$('.goods .show_c').children('a').length-3
				$('.threefloor .show').children('.show_c').get(0).style.left="-1556px";
			}else{
				index5--;
			}
			var left=-389*index5+"px"
			$('.threefloor .show').children('.show_c').stop().animate({
				'left':left
			});
			timer6=setInterval(fun6,2000);
		})
		//下一页
		$('.threefloor .goods_group1').find('.goods_next').click(function(){
			clearInterval(timer6);
			//console.log(index2)
			if(index5==5){		//$('.goods .show_c').children('a').length-1
				index5=2;
				$('.threefloor .show').children('.show_c').get(0).style.left="-398px";
			}else{
				index5++;
			}
			var left=-389*index5+"px";
			$('.threefloor .show').children('.show_c').stop().animate({
				'left':left
			});
			timer6=setInterval(fun6,2000);
		})

		// 三楼左侧轮播

	var index7=3;
	var timer8=setInterval(fun8,1000);
	for(var i=3;i<8;i+=2){
		//console.log(i)
		var li=$('.threefloor .recommend ul').children('li').eq(i).clone(true);
		li.prependTo($('.threefloor .recommend ul'));	
	}
	for(var i=3;i<6;i++){
		var li=$('.threefloor .recommend ul').children('li').eq(i).clone(true);
		$('.threefloor .recommend ul').append(li)
	}	
	function fun8(){
		if(index7==8){
			index7=3;
			$('.threefloor .recommend').children('ul').get(0).style.top='-150px';
		}else{
			index7++;
		}
		
		var $top=-50*index7+"px";
		$('.threefloor .recommend').children('ul').stop().animate({
			'top':$top
		})
	} 
	//三楼排行榜
		$.ajax({
			url:"data/floor3_paihangbang.json",
			type:"GET",
			success:function(res){
				//console.log(res)  cs ww
				for(var i=0;i<res.length;i++){
					if(i<3){
						var html='<li><div class="p_goods">';
						html+='<span class="one">'+res[i].num+'</span>';
						html+='<p>'+res[i].p+'</p></div>';
						html+='<dl class="clear"><dt><a href="#"><img src="'+res[i].src+'" alt=""></a></dt>';
						html+='<dd class="intro"><a href="#">'+res[i].intro+'</a></dd>';
						html+='<dd class="price">'+res[i].price+'</dd></dl></li>';
						$('.threefloor .goods_group4').find('ul').append(html)
					}else{	
						var html='<li><div class="p_goods">';
						html+='<span class="two">'+res[i].num+'</span>';
						html+='<p>'+res[i].p+'</p></div>';
						html+='<dl class="clear"><dt><a href="#"><img src="'+res[i].src+'" alt=""></a></dt>';
						html+='<dd class="intro"><a href="#">'+res[i].intro+'</a></dd>';
						html+='<dd class="price">'+res[i].price+'</dd></dl></li>';
						$('.threefloor .goods_group4').find('ul').append(html)
					}

				}
				shoufengqin();
			}
		})


	// 三楼商品推荐
		$.ajax({
			url:"data/floor3_shangpin.json",
			type:'GET',
			success:function(data){
				//console.log(data)
				for(var i=0;i<data.length;i++){
				  	var html="<li><dl>";
					html+='<dt><a href="#"><img src="'+data[i].src+'" alt=""></a></dt>';
					html+='<dd><a href="#">'+data[i].dd+'</a></dd>';
					html+='<strong>'+data[i].price+'</strong> <span>'+data[i].del+'</span>';
					html+='</dl></li>';	
					$('.threefloor .goods_b').append(html);
				}			
			}
		})
		//手机数码
		$.ajax({
			url:"data/floor3_shoujishuma.json",
			type:"GET",
			success:function(res){
				//console.log(res)  cs ww
				for(var i=0;i<res.length;i++){
					var html="<li><dl>";
					html+='<dt><a href="#"><img src="'+res[i].src+'" alt=""></a></dt>';
					html+='<dd><a href="#">'+res[i].dd+'</a></dd>';
					html+='<span>'+res[i].span+'</span>';
					$('.threefloor .goods2 ul').append(html);
				}
			}
		})
		//电脑外设
			$.ajax({
			url:"data/floor3_diannaowaishe.json",
			type:"GET",
			success:function(res){
				//console.log(res)  cs ww
				for(var i=0;i<res.length;i++){
					var html="<li><dl>";
					html+='<dt><a href="#"><img src="'+res[i].src+'" alt=""></a></dt>';
					html+='<dd><a href="#">'+res[i].dd+'</a></dd>';
					html+='<span>'+res[i].span+'</span>';
					$('.threefloor .goods3 ul').append(html);
				}
			}
		})
		//食品饮酒
			$.ajax({
			url:"data/floor_3shipinyinjiu.json",
			type:"GET",
			success:function(res){
				//console.log(res)  cs ww
				for(var i=0;i<res.length;i++){
					var html="<li><dl>";
					html+='<dt><a href="#"><img src="'+res[i].src+'" alt=""></a></dt>';
					html+='<dd><a href="#">'+res[i].dd+'</a></dd>';
					html+='<span>'+res[i].span+'</span>';
					$('.threefloor .goods4 ul').append(html);
				}
			}
		})

	//三楼菜单切换
	change($('.threefloor .floor_menu').children('li').eq(0),$('.threefloor .floor_center').children());
	change($('.threefloor .floor_menu').children('li').eq(1),$('.threefloor .floor_center').children());
	change($('.threefloor .floor_menu').children('li').eq(2),$('.threefloor .floor_center').children());
	change($('.threefloor .floor_menu').children('li').eq(3),$('.threefloor .floor_center').children());



			// 四楼数据

//三楼中部轮播
		var index9=0;
		var timer10=setInterval(fun10,2000)
		var Oa10=$('.fourfloor .show_c').children('a').eq(0).clone(true);
		$('.fourfloor .show').children('.show_c').append(Oa10);
		var Ob10=$('.fourfloor .show_c').children('a').eq(3).clone(true);
		Ob10.prependTo($('.fourfloor .show').find('.show_c'));

		function fun10(){
			if(index9==5){
				index9=2;
				$('.fourfloor .show').children('.show_c').get(0).style.left="-389px";
			}else{
				index9++;
			}
			var left=-389*index9+"px"
			$('.fourfloor .show').children('.show_c').animate({
				'left':left
			})
		}

		//上一页
		$('.fourfloor .goods_group1').find('.goods_pre').click(function(){
			clearInterval(timer10);
			//console.log(index2)
			if(index9==0){
				index9=3;  //$('.goods .show_c').children('a').length-3
				$('.fourfloor .show').children('.show_c').get(0).style.left="-1556px";
			}else{
				index9--;
			}
			var left=-389*index9+"px"
			$('.fourfloor .show').children('.show_c').stop().animate({
				'left':left
			});
			timer10=setInterval(fun10,2000);
		})
		//下一页
		$('.fourfloor .goods_group1').find('.goods_next').click(function(){
			clearInterval(timer10);
			//console.log(index2)
			if(index9==5){		//$('.goods .show_c').children('a').length-1
				index9=2;
				$('.fourfloor .show').children('.show_c').get(0).style.left="-398px";
			}else{
				index9++;
			}
			var left=-389*index9+"px";
			$('.fourfloor .show').children('.show_c').stop().animate({
				'left':left
			});
			timer10=setInterval(fun10,2000);
		})


	// 四楼左侧轮播

	var index11=3;
	var timer12=setInterval(fun12,1000);
	for(var i=3;i<8;i+=2){
		//console.log(i)
		var li=$('.fourfloor .recommend ul').children('li').eq(i).clone(true);
		li.prependTo($('.fourfloor .recommend ul'));	
	}
	for(var i=3;i<6;i++){
		var li=$('.fourfloor .recommend ul').children('li').eq(i).clone(true);
		$('.threefloor .recommend ul').append(li)
	}	
	function fun12(){
		if(index11==8){
			index11=3;
			$('.fourfloor .recommend').children('ul').get(0).style.top='-150px';
		}else{
			index11++;
		}
		
		var $top=-50*index11+"px";
		$('.fourfloor .recommend').children('ul').stop().animate({
			'top':$top
		})
	} 
	//四楼排行榜
		$.ajax({
			url:"data/floor4_paihangbang.json",
			type:"GET",
			success:function(res){
				//console.log(res)  cs ww
				for(var i=0;i<res.length;i++){
					if(i<3){
						var html='<li><div class="p_goods">';
						html+='<span class="one">'+res[i].num+'</span>';
						html+='<p>'+res[i].p+'</p></div>';
						html+='<dl class="clear"><dt><a href="#"><img src="'+res[i].src+'" alt=""></a></dt>';
						html+='<dd class="intro"><a href="#">'+res[i].intro+'</a></dd>';
						html+='<dd class="price">'+res[i].price+'</dd></dl></li>';
						$('.fourfloor .goods_group4').find('ul').append(html)
					}else{	
						var html='<li><div class="p_goods">';
						html+='<span class="two">'+res[i].num+'</span>';
						html+='<p>'+res[i].p+'</p></div>';
						html+='<dl class="clear"><dt><a href="#"><img src="'+res[i].src+'" alt=""></a></dt>';
						html+='<dd class="intro"><a href="#">'+res[i].intro+'</a></dd>';
						html+='<dd class="price">'+res[i].price+'</dd></dl></li>';
						$('.fourfloor .goods_group4').find('ul').append(html)
					}

				}
				shoufengqin();
			}
		})

	// 四楼商品推荐
		$.ajax({
			url:"data/floor_4shangpintuijian.json",
			type:'GET',
			success:function(data){
				//console.log(data)
				for(var i=0;i<data.length;i++){
				  	var html="<li><dl>";
					html+='<dt><a href="#"><img src="'+data[i].src+'" alt=""></a></dt>';
					html+='<dd><a href="#">'+data[i].dd+'</a></dd>';
					html+='<strong>'+data[i].price+'</strong> <span>'+data[i].del+'</span>';
					html+='</dl></li>';	
					$('.fourfloor .goods_b').append(html);
				}			
			}
		})

		//生食鲜品
		$.ajax({
			url:"data/floor_4shengshixianpin.json",
			type:"GET",
			success:function(res){
				//console.log(res)  cs ww
				for(var i=0;i<res.length;i++){
					var html="<li><dl>";
					html+='<dt><a href="#"><img src="'+res[i].src+'" alt=""></a></dt>';
					html+='<dd><a href="#">'+res[i].dd+'</a></dd>';
					html+='<span>'+res[i].span+'</span>';
					$('.fourfloor .goods2 ul').append(html);
				}
			}
		})
		//母婴玩具
			$.ajax({  
			url:"data/floor_4muyingwanju.json",
			type:"GET",
			success:function(res){
				//console.log(res)  cs ww
				for(var i=0;i<res.length;i++){
					var html="<li><dl>";
					html+='<dt><a href="#"><img src="'+res[i].src+'" alt=""></a></dt>';
					html+='<dd><a href="#">'+res[i].dd+'</a></dd>';
					html+='<span>'+res[i].span+'</span>';
					$('.fourfloor .goods3 ul').append(html);
				}
			}
		})
		//数码配件
			$.ajax({
			url:"data/floor4_shumapeijian.json",
			type:"GET",
			success:function(res){
				//console.log(res)  //cs ww
				for(var i=0;i<res.length;i++){
					var html="<li><dl>";
					html+='<dt><a href="#"><img src="'+res[i].src+'" alt=""></a></dt>';
					html+='<dd><a href="#">'+res[i].dd+'</a></dd>';
					html+='<span>'+res[i].span+'</span>';
					$('.fourfloor .goods4 ul').append(html);
				}
			}
		})


	//四楼菜单切换
	change($('.fourfloor .floor_menu').children('li').eq(0),$('.fourfloor .floor_center').children());
	change($('.fourfloor .floor_menu').children('li').eq(1),$('.fourfloor .floor_center').children());
	change($('.fourfloor .floor_menu').children('li').eq(2),$('.fourfloor .floor_center').children());
	change($('.fourfloor .floor_menu').children('li').eq(3),$('.fourfloor .floor_center').children());



// 调用函数

	// 右侧手风琴
	function shoufengqin(){
		$('.goods_group4 ul').find('li').mouseover(function(){
			//console.log("--")
			$(this).stop().animate({
				'height':'168px'
			}).siblings().stop().animate({
				'height':'35px'
			})
		})
	}
	
	//楼层菜单切换
	function change(source,show){
		source.mouseenter(function(){
			//alert($(this).index())
			for(var i=0;i<4;i++){
				show.eq(i).css('display','none');
			}
			show.eq($(this).index()).css('display','block');		
		})	
	}

	
	//显示   隐藏函数
	function show(source,show){
		source.mouseenter(function(){
			//console.log("+")
			show.css('display','block');
		})
	}
	function hide(source,hide){
		source.mouseleave(function(){
			hide.css('display','none')
		})
	}
})