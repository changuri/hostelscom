$(function(){
    // 달력
    $(window).resize(function(){
        var windowWidth=$(window).width();
        $( "#from, #to" ).datepicker( "hide" ).datepicker("destroy");
        if(windowWidth <= 767){       
            $( "#from, #to" ).datepicker({ 
                numberOfMonths: 1,
            })
        }else{
            $('.popup-bg').hide();
            $( "#from, #to" ).datepicker({
                numberOfMonths: 2,
            })
        }    
        setTimeout(function(){
            $( "#from, #to" ).datepicker("refresh");
        },500)
    })
    
    //모바일 달력  팝업 배경보이기
    $('.search .row2 input').focus(function(){     
        console.log('클릭');             
        if($('body').hasClass('mobile')){        
          $('.popup-bg').show();
        }else{
          $('.popup-bg').hide();
        }            
    })
    //달력 아이콘 클릭시 
    $('.search .row2 .icon-calender').click(function(){ 
        $('#from').trigger('focus');
    });
  
    //한국 버전으로 옵션 설정  
    $.datepicker.setDefaults({
    dateFormat: 'yy-mm-dd',
    prevText: '이전 달',
    nextText: '다음 달',
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
    showMonthAfterYear: true,
    yearSuffix: '년'
    });          
      
    function getDate( element ) {
        var date;
        try {
            date = $.datepicker.parseDate( dateFormat, element.value );
        } catch( error ) {
            date = null;
        }
        return date;
    };

    //from~to
    var dateFormat = "yy-mm-dd",
    from = $( "#from" )
    to = $( "#to" )
    from = $( "#from" ).datepicker({
        defaultDate: "+1w",
        numberOfMonths: 2
    }).on( "change", function() {
        to.datepicker( "option", "minDate", getDate( this ) );
    })
    to = $( "#to" ).datepicker({
        defaultDate: "+1w",
        numberOfMonths: 2              
    }).on( "change", function() {
        from.datepicker( "option", "maxDate", getDate( this ) );
    });
})