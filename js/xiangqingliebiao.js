$(function(){
	
	//商品分页

	$.ajax({	  
		url:'../data/xiangqing.json',
		type:"GET",
		success:function(res){	
			//console.log(res);		
			//console.log(res[0].small[1]);
			//console.log(res)  //cs ww
			//计算分页量
			res=eval(res);
			//console.log(res[0].small[0]);
			var showNum=24;
			var resL=res.length;
			var pageNum=Math.ceil(resL/showNum);
			$('.Pagination').pagination(pageNum,{
				num_edge_entries: 1, //边缘页数
                num_display_entries: 4, //主体页数
                items_per_page: 1, //每页显示1项
                prev_text: "上一页",
                next_text: "下一页",
                callback:function(index){
                 	//console.log(showNum*index+"- "+(showNum*index+showNum))
                 		var html=''
                 	for(var i = showNum*index; i < showNum*index+showNum;i++){
                 		
                 		if(i<resL){
                 			var k=0;
						    html+='<li class="item"><div class="goods_content"><div class="goods_pic">';
							html+='<a href="javascript:;" id="'+res[i].id+'"><img src="'+res[i].url+'" alt=""></a></div>';
							html+='<div class="goods_info"><div class="goods_small"><ul>';
							//console.log(res[i].small.length);
							for(var j=0;j<res[i].small.length;j++){
								html+='<li><a href="javascript:;"><img src="'+res[i].small[j]+'" alt=""></a></li>';
							}	
							html+='</ul></div><div class="goods_name">';
							html+='<a href="javascript:;" id="'+res[i].id+'">'+res[i].name+'</a></div>';
							html+='<div class="goods_price">';
							html+='<em class="em1">'+res[i].em1+'</em>';
							html+='<em class="em2">'+res[i].em2+'</em>';
							html+='<span>';
							for(var n=0;n<5;n++){
								if(k<res[i].value){
									html+='<img src="../images/star-on.png" title="'+res[i].pingjia+'">';
									k++;
								}else{
									if(k<5){
										html+='<img src="../images/star-off.png" title="'+res[i].pingjia+'">';
										k++;
									}
								}
							}
							html+='</span></div><div class="sell-start"><ul><li style="border-left:none;">';
							html+='<a href="#">'+res[i].pinglun+'</a>';
							html+='<p>用户评论</p></li><li><a href="##"><img src="../images/qq.png" alt=""></a>';
							html+='<p>在线客服</p></li><li><a href="##"><em></em></a><p>在线客服</p></li></ul>';
							html+='</div><div class="store"><a href="##">官方店铺</a></div><div class="add_cart">';
							html+='<a href="javascript:;" class="tainjia" id="'+res[i].id+'"><i class="che"></i>加入购物车</a></div></div></div></li>';
						}
					}
					$('.dc_list').children('ul').html(html);		
				}
            })			//end pagination


			//动画效果
			$('.dc_list ul').children('.item').mouseenter(function(){
						//alert(1)		cs ww
			$(this).children('.goods_content').stop().animate({
				height:'409px',
			})

								
			$(this).find('.goods_info').stop().animate({
				top:'180px'
				})
			})		//end mouseenter


			$('.dc_list ul').children('.item').mouseleave(function(){
				//alert(1)		cs ww
				$(this).children('.goods_content').stop().animate({
					height:'337px'										
				})					
				$(this).find('.goods_info').stop().animate({
							top:'230px'
					})
				})	

			//地区搜索
			show($('.localtion').find('.holder'),$('.localtion').find('.place'));
			hide($('.localtion').find('.holder'),$('.localtion').find('.place'));
			show($('.localtion').find('.place'),$('.localtion').find('.place'));
			hide($('.localtion').find('.place'),$('.localtion').find('.place'));

			$('.localtion .place').find('a').click(function(){
					//alert($(this).index())  cs ww
				$('.localtion .holder').find('em').html($(this).html())
					
			})

			//添加购物车
			$('.goods_info .add_cart').on('click','a',function(){

				//alert(1); 
					
				var id=this.id;
				//console.log(id)
				var first = $.cookie('goods')==null?true:false;//判断是否有cookie进行添加
				var same=false;
				//第一次添加
				if(first){
					//第一次，建立json结构
					$.cookie('goods','[{id:'+id+',num:1}]',{expires:7,path:'/'});
					$.cookie('first','false',{expires:7,path:'/'});
				}else{
					var str=$.cookie('goods');
					var arr=eval(str);
					//遍历所有对象，如果id相同，则数量增加
					for(var attr in arr){
						if(arr[attr].id == id){
							arr[attr].num =arr[attr].num +1; //数量增加
							var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
							$.cookie('goods',cookieStr,{expires:7,path:'/'});
							same = true;
						}
					}
						//如果id不同，重新建立商品
					if(!same){
						var obj={id:id,num:1};
						arr.push(obj);
						var cookieStr=JSON.stringify(arr);
						$.cookie('goods',cookieStr,{expires:7,path:'/'});
					}
				}
				//console.log($.cookie('goods'));
				sc_car();
					
			})   // end 添加购物车

				//商品跳转详情页
			$('.goods_pic').on('click','a',function(){
				//alert(this.id)
				var id=this.id;
				$.cookie('buyId',id)
				window.location.href="xiangqing.html"
			})

			$('.goods_name').on('click','a',function(){
				//alert(this.id)
				var id=this.id;
				$.cookie('buyId',id)
				window.location.href="xiangqing.html"
			})
		}    // end success
	})   //end ajax

	
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

	






	// 左侧二级菜单
	
	show($('#navWrapper').find('.title'),$('#navWrapper').find('.category'))
	hide($('#navWrapper').find('.title'),$('#navWrapper').find('.category'))
	show($('#navWrapper').find('.category'),$('#navWrapper').find('.category'))
	hide($('#navWrapper').find('.category'),$('#navWrapper').find('.category'))
	for(var i=0;i<$('#navWrapper .menu').find("li").length;i++){
		show($('#navWrapper .menu').find("li").eq(i),$('#navWrapper .category').find('.cont').eq(i));
		hide($('#navWrapper .menu').find("li").eq(i),$('#navWrapper .category').find('.cont').eq(i));
		show($('#navWrapper .category').find('.cont').eq(i),$('#navWrapper .category').find('.cont').eq(i))
		hide($('#navWrapper .category').find('.cont').eq(i),$('#navWrapper .category').find('.cont').eq(i))
	}

	//三级菜单
	var m=0;
	$('.left').find('i').click(function(){
		//alert(1) cs ww
		m++;
		$(this).index=m;
		if(m%2==0){
			$(this).siblings('ul').toggle();
			$(this).css({
				backgroundPositionX:'0',
				backgroundPositionY:'0'
			});
			m=0;
		}else{
			$(this).siblings('ul').toggle();
			$(this).css({
				backgroundPositionX:'-11px',
				backgroundPositionY:'0'
			});
		}
		
	})


	// 上一页  下一页
	$('.right .page').children('a').eq(0).click(function(){
		$('.dc_list .Pagination').find('.prev').click()
	})

	$('.right .page').children('a').eq(1).click(function(){
		$('.dc_list .Pagination').find('.next').click()
	})

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

	$('.right .owner').find('a').mouseenter(function(){
		$(this).children('i').css({
			backgroundPositionX:'-56px',
			backgroundPositionY:'0'
		})
	})

	$('.right .owner').find('a').mouseleave(function(){
		$(this).children('i').css({
			backgroundPositionX:'-44px',
			backgroundPositionY:'0'
		})
	})



})







				// $('.goods_info .add_cart').on('click','a',function(){		//事件委托获取a标签属性
				// 	//console.log(this.id); csww
				// 	 $.cookie('buyId',this.id);
				// 	 window.location.href = 'xiangqing.html'

				// })





				// $('.goods_info .add_cart').find('a').click(function(){ 		//用原生获取a标签属性
				// 	console.log($(this).[0].id)
				// })  
				
				
		//无分页ajax
		// $.ajax({	  
	// 	url:'../data/xiangqing.json',
	// 	type:"GET",
	// 	success:function(res){			
	// 		//console.log(res[0].small[1]);
	// 		//console.log(res)  //cs ww
	// 		console.log(typeof res)
	// 		res=eval(res)				//添加分页插件后，res有object类型变成string类型，需要类型转换
	// 		console.log(res)
	// 		for(var i=0;i<res.length;i++){
	// 			var k=0;
	// 			var html='<li class="item"><div class="goods_content"><div class="goods_pic">';
	// 			html+='<a href="#"><img src="'+res[i].url+'" alt=""></a></div>';
	// 			html+='<div class="goods-info"><div class="goods_small"><ul>';
	// 			for(var j=0;j<res[i].small.length;j++){
	// 				html+='<li><a href="javascript:;"><img src="'+res[i].small[j]+'" alt=""></a></li>'
	// 			}
	// 			html+='</ul></div><div class="goods_name">';
	// 			html+='<a href="#">'+res[i].name+'</a></div>';
	// 			html+='<div class="goods_price">';
	// 			html+='<em class="em1">'+res[i].em1+'</em>';
	// 			html+='<em class="em2">'+res[i].em2+'</em>';
	// 			html+='<span>';
	// 			for(var n=0;n<5;n++){
	// 				if(k<res[i].value){
	// 					html+='<img src="../images/star-on.png" title="'+res[i].pingjia+'">';
	// 					k++;
	// 				}else{
	// 					if(k<5){
	// 						html+='<img src="../images/star-off.png" title="'+res[i].pingjia+'">';
	// 						k++;
	// 					}
	// 				}
	// 			}
	// 			html+='</span></div><div class="sell-start"><ul><li style="border-left:none;">';
	// 			html+='<a href="#">'+res[i].pinglun+'</a>';
	// 			html+='<p>用户评论</p></li><li><a href="#"><img src="../images/qq.png" alt=""></a>';
	// 			html+='<p>在线客服</p></li><li><a href="#"><em></em></a><p>在线客服</p></li></ul>';
	// 			html+='</div><div class="store"><a href="#">官方店铺</a></div><div class="add_cart">';
	// 			html+='<a href="#"><i></i>加入购物车</a></div></div></div></li>';
	// 			$('.dc_list').children('ul').append(html);
	// 		}
	// 	}
	// })