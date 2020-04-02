/*
    2016.06 ~
    author :  an.hyo-ju ( anoju@cntt.co.kr ) in CNTT
*/

$(function(){	
	headCtl();
	subSwiperInit();
	formStyle();
	layerCtrl();
	tapMotion();
	faqMotion();
	//topBtn();
	scrollItem();
	menuCtrl();	
	
	$('input, textarea').placeholder();
});

function headCtl(){
	var $header = $('#header')
	var gnbTxt = $('#gnb a');
	var lnbTxt = $('#lnb a');
	var title 
	
	if($('#page_tit').length > 0){
		title= $('#page_tit').text();
	}else{
		title= $('.page_top .tit').text();
	}
	if(!title == ''){
		document.title = title + ' | 롯데리아 홈서비스';
	}
	var current = $.trim(title);
	
	//gnb active
	gnbTxt.each(function() {
		 if ( $(this).text() == current) {
			$(this).parents('li').addClass('active');
		}
	});
	
	$('.btn_gnb a').click(function(e){
		e.preventDefault();
		if($('body').hasClass('gnb_open')){
			$('body').removeClass('gnb_open');
			$('.bg_gnb').remove();		
		}else{
			$('#header > div').append('<div class="bg_gnb"></div>')
			$('body').addClass('gnb_open');
		}
	});
	
	$('#header').on('click','.bg_gnb',function(e){
		$('body').removeClass('gnb_open');
		$('.bg_gnb').remove();
	});

	$('.head_member').hover(function(){
		$('.head_member').toggleClass('on');
	},function(){
		$('.head_member').removeClass('on');
	})
}

function subSwiperInit(){
	var $menu = $('.sub_menu');
	if($menu.length > 0){
		var subSwiper = $menu.swiper({
	    	slidesPerView:'auto',
	    	calculateHeight:true
	    });
    }
}


function getBrowserType(){          
	var _ua = navigator.userAgent;
	var rv = -1;
	 
	//IE 11,10,9,8
	var trident = _ua.match(/Trident\/(\d.\d)/i);
	if( trident != null )
	{
		if( trident[1] == "7.0" ) return rv = "IE" + 11;
		if( trident[1] == "6.0" ) return rv = "IE" + 10;
		if( trident[1] == "5.0" ) return rv = "IE" + 9;
		if( trident[1] == "4.0" ) return rv = "IE" + 8;
	}
	 
	//IE 7...
	if( navigator.appName == 'Microsoft Internet Explorer' ) return rv = "IE" + 7;
	 
	/*
	var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	if(re.exec(_ua) != null) rv = parseFloat(RegExp.$1);
	if( rv == 7 ) return rv = "IE" + 7; 
	*/
	 
	//other
	var agt = _ua.toLowerCase();
	if (agt.indexOf("chrome") != -1) return 'Chrome';
	if (agt.indexOf("opera") != -1) return 'Opera'; 
	if (agt.indexOf("staroffice") != -1) return 'Star Office'; 
	if (agt.indexOf("webtv") != -1) return 'WebTV'; 
	if (agt.indexOf("beonex") != -1) return 'Beonex'; 
	if (agt.indexOf("chimera") != -1) return 'Chimera'; 
	if (agt.indexOf("netpositive") != -1) return 'NetPositive'; 
	if (agt.indexOf("phoenix") != -1) return 'Phoenix'; 
	if (agt.indexOf("firefox") != -1) return 'Firefox'; 
	if (agt.indexOf("safari") != -1) return 'Safari'; 
	if (agt.indexOf("skipstone") != -1) return 'SkipStone'; 
	if (agt.indexOf("netscape") != -1) return 'Netscape'; 
	if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
}

/*폼요소*/
function formStyle(){
	//checkbox, radio
	$('label .checkbox, label .radio').focus(function(){
		$(this).parent().addClass('hover');
	}).blur(function(){
		$(this).parent().removeClass('hover');
	});

	//spinner
	if($('.spinner').size() > 0){
		$( '.spinner' ).spinner({
			min: 1,
			create: function( event, ui ) {
				//add custom classes and icons
				$(this)
				.next().html('<i class="icon icon-plus">더하기</i>')
				.next().html('<i class="icon icon-minus">빼기</i>')
			}
		});
	}

	//datepicker
	if($('.datepicker').size() > 0){
		$( '.datepicker' ).datepicker({
			closeText: '닫기',
			prevText: '이전달',
			nextText: '다음달',
			currentText: '오늘',
			monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
			dayNamesMin: ['일','월','화','수','목','금','토'],
			dateFormat: 'yy.mm.dd',
			showMonthAfterYear: true,
			showOn: 'button',
			buttonText: '기간조회'
		});
	}

	//inputFile
	$('.input_file > input').click(function(){
		$('.btn_file input').trigger('click');
	});
	$('.btn_file .btn').click(function(e){
		e.preventDefault();
		$('.btn_file input').trigger('click');
	});	
	$('.btn_file input').change(function(){
		$('.input_file > input').val($(this).val());
	});
}

/* TOP 버튼 */
function topBtn() {
    var settings = {
            button      : '#toTop',
            text        : '컨텐츠 상단으로 이동',
            min         : 100,
            fadeIn      : 400,
            fadeOut     : 400,
            scrollSpeed : 800,
            easingType  : 'easeInOutExpo'
        },
        oldiOS     = false,
        oldAndroid = false;

    if( /(iPhone|iPod|iPad)\sOS\s[0-4][_\d]+/i.test(navigator.userAgent) ) { oldiOS = true; }
    if( /Android\s+([0-2][\.\d]+)/i.test(navigator.userAgent) ) { oldAndroid = true; }
    $('body').append('<a href="#" id="' + settings.button.substring(1) + '" title="' + settings.text + '">' + settings.text + '</a>');
    $( settings.button ).on('click', function( e ){
        $('html, body').animate({ scrollTop : 0 }, settings.scrollSpeed, settings.easingType );
        e.preventDefault();
    })
    .on('mouseenter', function() {
        $( settings.button ).addClass('hover');
    })
    .on('mouseleave', function() {
        $( settings.button ).removeClass('hover');
    });

    $(window).scroll(function() {
        var position = $(window).scrollTop();
        if( oldiOS || oldAndroid ) {
            $( settings.button ).css({
                'position' : 'absolute',
                'top'      : position + $(window).height()
            });
        }
        if ( position > settings.min ) { $( settings.button ).fadeIn( settings.fadeIn );  }
        else { $( settings.button ).fadeOut( settings.fadeOut );  }
    });
}

/* Tap */
function tapMotion(){	
	$('.tabMotion a').click(function() {
		if(!$(this).parent().hasClass('on')){
			var href = $(this).attr('href');		
			$(href).show().siblings('.tab_cont').hide();
			$(this).parent().addClass('on').siblings().removeClass('on');
			$(this).parents('.tabmenu').removeClass('tab_open')
		}else{
			$(this).parents('.tabmenu').toggleClass('tab_open')
		}
		return false;
    });


	$('.tabmenu a').click(function() {
		if($(this).parent().hasClass('on') && !$(this).parents('.tabmenu').hasClass('tabMotion')){
			$(this).parents('.tabmenu').toggleClass('tab_open');
			return false;
		}		
    });
	if($('.tabMotion').size() > 0){
		$('.tabMotion').each(function() {
			$(this).children('li').eq(0).children('a').trigger('click');	
		}); 		
	}
}

/*레이어 팝업*/
function layerCtrl() {
    $('.pop_open').click(function() {
        var _this =$(this);
        var vCont = _this.attr('href');
		
		layerShow(vCont)
		return false;
    });

    $('.pop_close').click(function() {
		var vCont = $(this).parents('.pop_bg');
		layerHide(vCont)
		return false;
	});
}

function layerShow(tar) {
	$(tar).fadeIn(300,function(){
		$(this).children().slideDown(300)
	});
	$('body').addClass('hidden');
}

function layerHide(tar) {
	var layer
	if(tar == undefined){
		layer = '.pop_bg';
	}else{
		layer = tar
	}	
	
	$(layer).children('.pop_wrap').slideUp(300,function(){
		$(this).parent().fadeOut(300)
	})
		
	$('body').removeClass('hidden');
	return false;
}

function layerChange(tar){
	$('.pop_wrap').hide().closest('.pop_bg').hide();
	$(tar).show().find('.pop_wrap').show();
}

/* faq */
function faqMotion(){
	$('.faq_list dt a').click(function() {
		$(this).parent('dt').toggleClass('on').siblings('dt').removeClass('on');
		$(this).parent().next().slideToggle(300).siblings('dd').slideUp(300);
		return false;
	});
}


function scrollItem(){
	var $elements = $( '*[data-animation]' );
	var h = $(window).height()
	$elements.each( function( i, el ) {
		var $el = $( el ),
		    animationClass = $el.data('animation');

		$el.addClass( animationClass );
		$el.addClass( 'animated' );
		var t = $el.offset().top;
		if(t > h){
			$el.addClass('wait-animation');
		}

		$el.one('inview', function(){
			if($el.hasClass('wait-animation')){
				$el.removeClass('wait-animation');
			}
		});
	});
}

function menuCtrl(){
    $('.menu_list').on('click','.sel_list > a',function() {
        $(this).parent().toggleClass('on');
		return false;
    });
     $('.menu_list').on('click','.sel_list li a',function() {
        var $span = $(this).find('span').clone(),
        	$strong = $(this).find('strong').clone();

        $(this).parent().addClass('on').siblings('li').removeClass('on')
        $(this).closest('ul').prev().empty().append($span).append($strong).closest('.sel_list').removeClass('on');
		return false;
    });
    $('.menu_list').on('focus','.img',function() {
        $(this).closest('li').addClass('hover').siblings('li').removeClass('hover');
		return false;
    });
    $('.menu_list').on('blur','a',function() {
        setTimeout(function(){
			if( !$('.menu_list a').is(':focus') ) {
				 $('.menu_list > li').removeClass('hover');
			}
		},10);
		return false;
    });
}
