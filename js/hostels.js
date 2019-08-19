$(function(){    
//스크롤바 ==============================================================
  $('.scrollbar-inner').scrollbar();
//지도 ==============================================================
  $('img[usemap]').rwdImageMaps(); 
    
//메인 페이지============================================================
    $(window).resize(function(){
      var windowWidth=$(window).width();
      $('.btn-tooltip').off('hover click');

      if(windowWidth <= 767){        
        $('body').addClass('mobile');
        $('.btn-tooltip').click(function(e){
          tooltip($(this), event)
        })
      }else{
        $('body').removeClass('mobile');
        $('.btn-tooltip').hover(function(e){
          tooltip($(this), event)         
        })
       
      }     
    }).resize();
    
    //네비게이션
    $('.nav-button li').click(function(e){
      e.preventDefault();
      var id=$(this).find('a').attr('href');
      console.log(id)
      $('.nav-pop').hide()
      $('.nav-pop ul').hide()
      $('.user > *').hide()
     
      $('.nav-pop').slideDown();       
      $(id).slideDown(); 
      
      // 모바일 팝업배경     
      if($('body').hasClass('mobile')){        
        $('.popup-bg').show();
      }else{
        $('.popup-bg').hide();
      }        
    })
    $('.popup-bg').click(function(){
      $('.nav-pop').hide();
      $('.nav-pop ul').hide();
      $(this).hide();
    })

     // 타겟외 클릭시 숨김  
    $('html').click(function(e){
      if(!$(e.target).is('nav *')){
          $('.nav-pop').slideUp();
          // $(id).slideUp();
      }
    })

    //로그인 창 > 사용자 메뉴 연결
    $('.btn-submit').click(function(e){ 
      e.preventDefault();                
      var id=$('#id').val(); 
      var password=$('#password').val();
      //console.log(id, password);                
    
      $('.message').remove();
      
      if(id==''){
          $('#id').after('<p class="message">아이디값을 입력하세요.</p>').focus();
      }else if(password==''){
          $('#password').after('<p class="message">비밀번호를 입력하세요.</p>').focus();
      }else{           
          var id=$('#id').val();
           // 취저 이름 저장
          $('.curation-room .loginId').text(id)
          //사용자 메뉴 연결
          $('#login').hide()
          $('#user-menu').slideDown()
        }
      })
      
      $('#id, #password').keyup(function(){
        var textLength=$(this).val().length;
        if(textLength!=0){
            $(this).next('.message').remove();
        };      
      })
      
//검색창 popup========================================================================= 
    //메인배경
    // $(window).scroll(function(){
    //   var scrollTop=$(this).scrollTop();
    //   if(scrollTop>100){
    //       $('.main-search').css('background-image','1.2em');
    //       if($('body').hasClass('mobile')){
    //         $('.main-search').css('transform','scale(1)')
    //       }
    //   }else{
    //       $('.main-search').css('transform','scale(1.2)');
    //   }       
          
    // }); 
    // 모바일 팝업 배경
    $('.popup-bg').click(function(){
      $('.popup-bg').hide();
      $('.popup-option').hide();
      $('.search .row4 input').prop('checked',false)        
    })        
      
    //인원 선택창 row3
       //보이기
    $('.search .row3 input').click(function(){       
        $('.row3-option').toggle();    
          if($('body').hasClass('mobile')){        
            $('.popup-bg').show();
          }else{
            $('.popup-bg').hide();
          }            
    }) 

    $('.search .row3 .icon-dropdown').click(function(e){
        e.preventDefault();
        $('.row3-option').toggle();
    })    
      //수량 체크       
    $('.row3-option .count-control button').click(function(e){
      e.preventDefault();
      var count=$(this).siblings('span').text(); 
      if($(this).hasClass('icon-minus')){
          count--;   
          if(count<=0){
            count=0;
          }       
      }else{
          count++;          
      }
      $(this).siblings('span').text(count); 
      //val값 넣기
      var room=$('.row3-option .icon-room').parent('li').find('.count-control').children('span').text();
      var adult=$('.row3-option .icon-adult').parent('li').find('.count-control').children('span').text();
      var child=$('.row3-option .icon-child').parent('li').find('.count-control').children('span').text();
      var baby=$('.row3-option .icon-baby').parent('li').find('.count-control').children('span').text();

      $('.search .row3 input').val(`객실${room},성인${adult},아동${child},유아${baby}`)
    })

    //추가옵션창 row4
      //보이기
    $('.search .row4 input').change(function(e){
      e.preventDefault();      
        if($(this).prop('checked')){
          $('.popup .row4-option').fadeIn();
        }else{
          $('.popup .row4-option').fadeOut();         
        };      
             
        if($('body').hasClass('mobile')){        
          $('.popup-bg').show();
        }else{
          $('.popup-bg').hide();
        }   
    })
  
    // 가격 옵션 슬라이드              
    var nonLinearSlider = document.getElementById('slider');
    noUiSlider.create(nonLinearSlider, {
        connect: true,
        start: [ 50000, 120000 ],
        step: 10000,
        tooltips: [true, true],
        range: {
            'min': [ 0 ],
            'max': [ 200000 ]
        },
        format: wNumb({
            decimals: 0
        }),
    });
    // var nodes = [$('#min')[0], $('#max')[0]];
    // nonLinearSlider.noUiSlider.on('update', function ( values, handle) {
    //     nodes[handle].innerHTML = numberWithCommas(values[handle]);                
    // });

    nonLinearSlider.noUiSlider.on('update', function () {                
        $('.noUi-tooltip').each(function(i){
            $(this).text(numberWithCommas($(this).text()));
            //console.log(i, $(this).text());            
                    
            if($(this).text()=='200,000'){
              $(this).text($(this).text()+'~')
            }                      
        })
        
    });
    $('.amount b').each(function(){
        $(this).text(numberWithCommas($(this).text()));
    })

    //numberCommas
    function numberWithCommas(x){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    $('.noUi-handle-lower').addClass('icon-price-start')
    $('.noUi-handle-upper').addClass('icon-price-end')

//핫딜================================================================================== 
  //슬라이드 
    var swiper6 = new Swiper('.hotdeal-contents > .swiper-container', {
      spaceBetween: 30,
      centeredSlides: true,
      autoHeight: true, 
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: true,
      },
      pagination: {
        el: '.hotdeal-contents > .swiper-pagination',
        clickable: true,
      },
    }); 

  //마우스 enter
  $('.hot-deal').on({
    mouseenter:function(){
      swiper6.autoplay.stop();
    },
    mouseleave:function(){
      swiper6.autoplay.start();
    } 
  })       

  //카운트 다운 time1 
  var time1 = new Date('aug 23, 2019 18:00:00').getTime();
  var x1 = setInterval(function() {      
    var now1 = new Date().getTime();       
    var distance1 = time1 - now1;        
    var days1 = Math.floor(distance1 / (1000 * 60 * 60 * 24));
    var hours1 = Math.floor((distance1 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes1 = Math.floor((distance1 % (1000 * 60 * 60)) / (1000 * 60));
    var seconds1 = Math.floor((distance1 % (1000 * 60)) / 1000);
    
    $('#time1').text(`${days1}일 ${hours1}시간 ${minutes1}분 ${seconds1}초 `)
    // document.getElementById('time1').innerHTML = `${days}일 ${hours}시간 ${minutes}분 ${seconds}초 `;
      
      if (distance1 < 0) {
        clearInterval(x1);
        $('#time1').text('0일 0시간 0분 0초');
        $('.time1').addClass('off').text('핫딜종료');    
      }
    }, 1000);

    //카운트 다운 time2
  var time2 = new Date('aug 15, 2019 18:00:00').getTime();
  var x2 = setInterval(function() {     
    var now2 = new Date().getTime();       
    var distance2 = time2 - now2;        
    var days2 = Math.floor(distance2 / (1000 * 60 * 60 * 24));
    var hours2 = Math.floor((distance2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes2 = Math.floor((distance2 % (1000 * 60 * 60)) / (1000 * 60));
    var seconds2 = Math.floor((distance2 % (1000 * 60)) / 1000);
    
    $('#time2').text(`${days2}일 ${hours2}시간 ${minutes2}분 ${seconds2}초 `)
    // document.getElementById('time1').innerHTML = `${days}일 ${hours}시간 ${minutes}분 ${seconds}초 `;
      
      if (distance2 < 0) {
        clearInterval(x2);
        $('#time2').text('0일 0시간 0분 0초');    
        $('.time2').addClass('off').text('핫딜종료');      
      }
    }, 1000);

    //카운트 다운 time3
  var time3 = new Date('aug 21, 2019 18:00:00').getTime();
  var x3 = setInterval(function() {     
    var now3 = new Date().getTime();       
    var distance3 = time3 - now3;        
    var days3 = Math.floor(distance3 / (1000 * 60 * 60 * 24));
    var hours3 = Math.floor((distance3 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes3 = Math.floor((distance3 % (1000 * 60 * 60)) / (1000 * 60));
    var seconds3 = Math.floor((distance3 % (1000 * 60)) / 1000);
    
    $('#time3').text(`${days3}일 ${hours3}시간 ${minutes3}분 ${seconds3}초 `)
    // document.getElementById('time1').innerHTML = `${days}일 ${hours}시간 ${minutes}분 ${seconds}초 `;
      
      if (distance3 < 0) {
        clearInterval(x3);
        $('#time3').text('0일 0시간 0분 0초');
        $('.time3').addClass('off').text('핫딜종료');   
      }
    }, 1000);

  //핫딜 send
  $('.send .switch input').click(function(){
    if($(this).prop('checked')){
      $('.deal-email').hide()
      $('.deal-phone').show()      
    }else{
      $('.deal-email').show()
      $('.deal-phone').hide()
    }
  })
   //핫딜 popup
  $('.deal-email').children('button').click(function(){
    var email=$('#email').val();
    console.log(email);          
    if(email==''){
      $('#email').attr('placeholder', '이메일을 입력하세요.').focus();      
    }else{
      $('.pop-deal-bg').show();
      $('.pop-email1').show();
      $('.pop-email1 .email').text(email); 
    }
  })
  $('.deal-phone').children('button').click(function(){
    var phone=$('#phone').val();
    console.log(phone);
    if(phone==''){
      $('#phone').attr('placeholder', ' 휴대폰번호를 입력하세요.').focus();
    }else{
    $('.pop-deal-bg').show();
    $('.pop-phone1').show();
    $('.pop-phone1 .phone').text(phone);  
    }
  })
  $('.pop-email1').children('button:last-of-type').click(function(){
    $('.pop-email1').hide();
    $('.pop-email2').show();
  }) 
  $('.pop-phone1').children('button:last-of-type').click(function(){
    $('.pop-phone1').hide();
    $('.pop-phone2').show();
  })
  //핫딜 popup-취소, 확인 버튼: 전부 닫기
  $('.pop-deal .hd-pop').click(function(){
      $(this).parent('div').hide();
      $('.pop-deal-bg').hide();
  })


//탭 기능 .room ====================================================================    
    var swiper1; //tab-content1-1
    var innerSwiper1
    var swiper2; //tab-content1-2
    var innerSwiper2;

    $('.tab-nav li').click(function(e){
        e.preventDefault();
        $(this).parent().find('li').removeClass('active');        
        $(this).addClass('active');

        $(this).siblings().find('button').removeClass('on');
        $(this).find('button').addClass('on');

        var id=$(this).find('a').attr('href')
        
        $(id).parent().children('div').hide()
        $(id).show();

        //갱신       
        swiper3.update();
        swiper4.update();  

        //실시간 인기숙소/ 최고의 평정 숙소===============
        if(swiper1!=undefined){swiper1.update();}
        if(swiper2!=undefined){swiper2.update();}
        if(innerSwiper1!=undefined){
            for (const i in innerSwiper1) {
              innerSwiper1[i].update();
            }                
        }
        if(innerSwiper2!=undefined){
            for (const i in innerSwiper2) {
              innerSwiper2[i].update();
            } 
        }

        if(swiper2==undefined){
          swiper2 = new Swiper('.tab-content1-2 > .swiper-container', {
            slidesPerView: 3,
            spaceBetween: 30,
            slidesPerGroup: 3,
            loop: true,
            pagination: {
              el: '.tab-content1-2 > .swiper-pagination',
              clickable: true,
            },
            breakpoints: {                    
              767: {
                  slidesPerView: 1.2,   
                  slidesPerGroup: 1.2,  
                  spaceBetween: 20,   
                        
              }
            },
            navigation: {
                nextEl: '.tab-content1-2 > .swiper-button-next',
                prevEl: '.tab-content1-2 > .swiper-button-prev',
            },
          });
        }
       
        if(innerSwiper2==undefined){
          innerSwiper2 = new Swiper('.inner-swiper2 > .swiper-container', {
            loop: true,
            navigation: {
              nextEl: '.inner-swiper2 .swiper-button-next',
              prevEl: '.inner-swiper2 .swiper-button-prev',
            },
            nested:true
           });            
          }
      });
   
      swiper1 = new Swiper('.tab-content1-1 > .swiper-container', {
        slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 3,
        loop: true,       
        pagination: {
          el: '.tab-content1-1 > .swiper-pagination',
          clickable: true,
        },
        breakpoints: {                    
          767: {
              slidesPerView: 1.2,   
              slidesPerGroup: 1.2, 
              spaceBetween: 20, 
                                                  
          }
        },
        navigation: {
            nextEl: '.tab-content1-1 > .swiper-button-next',
            prevEl: '.tab-content1-1 > .swiper-button-prev',
        },
      });
   
      innerSwiper1 = new Swiper('.inner-swiper1 > .swiper-container', {
        loop: true,
        navigation: {
          nextEl: '.inner-swiper1 .swiper-button-next',
          prevEl: '.inner-swiper1 .swiper-button-prev',
        },
        nested:true
      });

      // 좋아요
      $('.room .icon-heart').click(function(){      
        $(this).toggleClass('full')
      })
//실시간 게스트 이용후기 .geust ============================================================
    var swiper3 = new Swiper('.tab-content2-1 > .swiper-container', {
      slidesPerView: 3,
      spaceBetween: 30,
      slidesPerGroup: 3,
      loop: true,
      pagination: {
        el: '.tab-content2-1 > .swiper-pagination',
        clickable: true,
      },     
      breakpoints: {                    
        767: {
            slidesPerView: 1.2,   
            slidesPerGroup: 1.2,  
            spaceBetween: 20,          
                            
        }
      },
      navigation: {
          nextEl: '.tab-content2-1 > .swiper-button-next',
          prevEl: '.tab-content2-1 > .swiper-button-prev',
    },
    });
    var swiper4 = new Swiper('.tab-content2-2 > .swiper-container', {
      slidesPerView: 3,
      spaceBetween: 30,
      slidesPerGroup: 3,
      loop: true, 
      pagination: {
        el: '.tab-content2-2 > .swiper-pagination',
        clickable: true,
      },
      breakpoints: {                    
        767: {
          slidesPerView: 1.2,
          slidesPerGroup: 1.2, 
          spaceBetween: 20, 
                           
        }
      },
      navigation: {
          nextEl: '.tab-content2-2 > .swiper-button-next',
          prevEl: '.tab-content2-2 > .swiper-button-prev',
    },
    });

    
  //실시간 게스트 이용후기 이미지 hover
   
    $('.geust img').on({
      mouseenter:function(){
        $(this).parent().find('.text-box').css('top','100%');              
      },
      mouseleave:function(){
      $(this).parent().find('.text-box').css('top','50%');
      }
           
    })
    $('.geust .text-box').on({
      mouseenter:function(){
        $(this).css({
              top:'0',
              height:'100%'       
            })             
      },    
      mouseleave:function(){    
          $(this).css('top','50%');
        }              
    })
    $('#widget').draggable();
    $( '.tab-content2-1 .draggable' ).draggable({ axis: "y", revert: true, containment: '.tab-content2-1 .swiper-slide', scroll: false } );   
    $( '.tab-content2-2 .draggable' ).draggable({ axis: "y", revert: true, containment: '.tab-content2-2 .swiper-slide', scroll: false } );  
    
// 취향저격 curation-room ============================================================
    var swiper5 = new Swiper('.curation-room .swiper-container', {
      slidesPerView: 3,
      spaceBetween: 30,
      slidesPerGroup: 3,
      loop: true,
      pagination: {
        el: '.curation-room .swiper-pagination',
        clickable: true,
      },
      breakpoints: {                    
        767: {
            slidesPerView: 1.3,
            slidesPerGroup: 1.3,         
            centeredSlides: true,           
            spaceBetween: 10, 
            loop: true, 
            grabCursor: true,
            observer:true,  
        }
      },
  });

//위치확인 pop=======================================================================
   $('.location .text-box a').click(function(e){
     e.preventDefault();
     $('.location .pop-location').fadeIn();
     $(this).text('새로고침')   

    })
//지역별 숙소/ 지도 ==========================================================


function tooltip(el, e){  
  e.preventDefault();
   console.log(el);
  
    var tooltipTitle=el.data('title');   
    var position=el.data('position');  
    $('.tooltip').remove();
    $('map').after('<div class="tooltip '+position+'">'+tooltipTitle+'</div>');
    
    var x=Math.floor(e.offsetX);
    var y=Math.floor(e.offsetY);     
    console.log(x, y);

    $('.tooltip').css({
        left:x,
        top:y
    }) 
}

//탑버튼=====================================================================
  //위로가기 버튼을 일정 스크롤이 진행되면 보여주기
  $(window).scroll(function(){
    var scrollTop=$(this).scrollTop();  
    //console.log(scrollTop);
    if(scrollTop>200){
        $('#goTop').addClass('on');
    }else{
      $('#goTop').removeClass('on');
    }
  })
  
  $('#goTop').click(function(){                                               
    $('html, body').stop(true).animate({
        scrollTop:0
    })
  })

  $('.map').click(function(){

    return false;
  })
//========================
})
