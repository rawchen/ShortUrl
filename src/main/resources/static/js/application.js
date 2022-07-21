$(function() {
    if($('[data-toggle="datepicker"]').length > 0){
      $('[data-toggle="datepicker"]').datepicker({
        autoPick: false,
        format: "yyyy/mm/dd",
        days:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
        daysShort:["周日","周一","周二","周三","周四","周五","周六"],
        daysMin:["日","一","二","三","四","五","六"],
        months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
        monthsShort:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
        startDate: new Date()
      });    
    }

    $(".tabbed").hide();
    $(".tabbed").filter(":first").fadeIn();

    var hash = window.location.hash.replace("!", "");    
    if(hash && $(".tabbed"+hash).length > 0){
      $(".tabbed").hide();
      $(hash).fadeIn();      
      $('.tabs li').removeClass("active");
      $('.tabs li a[href$="' + hash + '"]').parent('li').addClass('active');
    }

    $(".tabs a").click(function(e){
      if($(this).attr("data-link")){
        return;
      }
      e.preventDefault();
      var id = $(this).attr("href");
      $(".tabs li").removeClass("active");
      $(this).parent("li").addClass("active");
      $(".tabbed").hide();
      $(id).fadeIn();
      //window.location.hash = id;
      update_sidebar();
    });
 /**
  * Hide advanced option + Toggle on click
  */
  $(".slideup").slideUp();
  
  $(document).on('click',".main-advanced .other .tabs li",function(e) {
    e.preventDefault();
    $(".other-detail").show();
  });

  // Add more parameters
  var phtml=$(".parameters").html();
  $(".add_parameter").click(function(){
    if($(this).attr("data-home")){
      $(".parameter-input").append("<div class='row'>"+phtml+"</div><p><a href='#' class='btn btn-danger btn-xs delete_parameter' data-holder='div.row'>删除</a></p>");
    }else{
      $('#parameters').append("<div class='form-group'>"+phtml+"</div><p><a href='#' class='btn btn-danger btn-xs delete_parameter'>删除</a></p>");      
    }
    update_sidebar();
    update_autocomplete();
    if($().chosen) {
      $("select").chosen({disable_search_threshold: 5});
    }    
    return false;
  }); 
  $(document).on('click',".delete_parameter",function(e){
    e.preventDefault();
    var t=$(this);
    $(this).parent('p').prev($("this").attr("data-holder")).slideUp('slow',function(){
      $(this).remove();
      t.parent('p').remove();
    });
    return false;
  });
  /**
   * Call Neo
   **/
  if($().chosen) {
    $("select").chosen({disable_search_threshold: 5});  
  }   
  /**
   * Custom Radio Box
   **/
  $(document).on('click','.switch_opt button',function(e) {
    var name = $(this).parent("span").attr("data-id");
    var to = $(this).attr("data-value");
    var callback=$(this).parent("span").attr("data-callback");

    $("input#" + name).val(to);
    if(callback !==undefined){
      window[callback](to);
    }
  });
  $(document).on('click','.form_opt li a',function(e) {
    
    var href=$(this).attr('href');
    var name = $(this).parent("li").parent("ul").attr("data-id");
    var to = $(this).attr("data-value");
    var callback=$(this).parent("li").parent("ul").attr("data-callback");
    if(href=="#" || href=="") e.preventDefault();

    $("input#" + name).val(to);
    $(this).parent("li").parent("ul").find("a").removeClass("current");
    $(this).addClass("current");
    if(callback !==undefined){
      window[callback](to);
    }
  });
  /**
   * Show forgot password form
   **/
   $(document).on('click','#forgot-password',function(){
      show_forgot_password();
   });
   if(location.hash=="#forgot"){
      show_forgot_password();
   }   
   $(document).on('click',"div.alert",function(){
    $(this).fadeOut();
   }); 
  /**
   * Open share window
   */
   $(document).on('click',"a.u_share",function(e){
    e.preventDefault();
    window.open($(this).attr("href"), '', 'left=50%, top=100, width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=1')    
   });  
  /**
   * Back to top
   */
  $(window).scroll(function(){   
    if(window.pageYOffset>300){
      $("#backtop,#back-to-top").fadeIn('slow');
    }else{
      $("#backtop,#back-to-top").fadeOut('slow');
    }
  });
  $("a#back-to-top").smoothscroll();
  //
  $(document).on('click',".clear-search",function(e){
    e.preventDefault();
    $(".return-ajax").slideUp('medium',function(){
      $(this).html('');
      $("#search").find("input[type=text]").val('');
      $(".url-container").slideDown('medium');
    });
  });  
  // Select All
  $(document).on('click','#selectall',function(e) {
    e.preventDefault();   
    if($(this).find(".fa-check-square").length > 0){
      $(this).html('<i class="fa fa-minus-square"></i>');
    }else{
      $(this).html('<i class="fa fa-check-square"></i>');
    }
    $('input').iCheck('toggle');
  }); 
  /**
   * Delete All
   */
  $(document).on('click','#deleteall',function(e) {
    e.preventDefault();
    if($(".url-container input[type=checkbox]:checked").length < 1){
      return $(".return-ajax").html('<div class="alert alert-info">请至少选择1个网址</div><br>').fadeIn();
    }    
    $('form#delete-all-urls').attr("action", appurl+"/user/delete");
    $('form#delete-all-urls').submit();
  });  
  /**
   * Active Menu
   **/
  var path = location.pathname.substring(1);  
  if (path) {
    $('.navbar .navbar-nav > li:not(.dropdown) > a[href$="' + path + '"]').addClass("active");
    $('.nav-sidebar a').removeClass("active");
    $('.nav-sidebar a[href$="' + path + '"]').addClass('active'); 
  }   
  // Alert Modal
  $(document).on("click", ".delete", function(e){
    e.preventDefault();
    //$(this).modal();  
    var title = $(this).attr("data-title");
    var content = $(this).attr("data-content");
    var link = $(this).attr("href");
    var width = screen() < 2 ? ['90%', 'auto'] : ['300px', 'auto']; 
    layer.open({
      type: 1,
      scrollbar: false,
      btn: ['确定', '取消'],
      btnAlign: 'c',
      area: width,
      shadeClose: true,
      title: title,
      content: content,
      yes: function(index, layero){
        window.location.href = link;
      }
    });   
  });
  /**
   * OnClick Select
   **/
   $(".onclick-select").on('click', function(){
    $(this).select();
   })
  /**
   * Show Languages
   **/
  $("#show-language").click(function(e){
    e.preventDefault();
    $(".langs").fadeToggle();
  });
  if($().chosen) {
    $('select.filter').chosen().change(function(e,v){
        var href=document.URL.split("?")[0].split("#")[0];
        window.location=href+"?"+$(this).attr("data-key")+"="+v.selected;
    });   
  }
  $(".tooltip").tooltip();
  // Load all
  loadall();

  function format_date(time){
    var d=new Date(time);
    var list=new Array();
    list[0]="January";list[1]="February";list[2]="March";list[3]="April";list[4]="May";list[5]="June";list[6]="July";list[7]="August";list[8]="September";list[9]="October";list[10]="November";list[11]="December";       
    var month = list[d.getMonth()];
    return d.getDate()+" "+ month +", "+d.getFullYear();
  }  
  // Charts
  if($(".chart").length > 0){
    function showTooltip(x, y, c, d) {
      $('<div id="tooltip" class="chart-tip"><strong>' + c + '</strong><br>'+format_date(d)+'</div>').css( {
          position: 'absolute',
          display: 'none',
          top: y - 40,
          left: x - 30,
          color: '#fff',
          opacity: 0.80
      }).appendTo("body").fadeIn(200);
    }

    var previousPoint = null;
    var previousSeries = null;
    $(".chart").bind("plothover", function (event, pos, item) {
      if(item){
        if(previousSeries != item.seriesIndex || previousPoint != item.dataIndex){
          previousPoint = item.dataIndex;
          previousSeries = item.seriesIndex; 
          $("#tooltip").remove();
          showTooltip(item.pageX, item.pageY, item.datapoint[1]+" Clicks", item.datapoint[0]);          
        }                      
      }
    });     
  }  
  if($(".copy").length > 0){
    new Clipboard('.copy');  
  }  

  $(document).on("click", ".copy", function(e){
    e.preventDefault();  
    $(this).text("已复制");
    $(this).prev("a").addClass("float-away");
    setTimeout(function() {
      $("a").removeClass('float-away');
    }, 400);    
  });  

  $("#payment-form").on("submit", function(e){
    
    $(".form-group").removeClass("has-danger");
    
    var $error = 0;

    var $name = $("#name");
    if ($name == "" || $name.val().length < 2) {
        $name.parents(".form-group").addClass("has-danger");
        $error = 1;
    }    

    var $address = $("#address");
    if ($address == "" || $address.val().length < 2) {
        $address.parents(".form-group").addClass("has-danger");
        $error = 1;
    }   

    var $city = $("#city");
    if ($city == "" || $city.val().length < 2) {
        $city.parents(".form-group").addClass("has-danger");
        $error = 1;
    }     

    var $state = $("#state");
    if ($state == "" || $state.val().length < 2) {
        $state.parents(".form-group").addClass("has-danger");
        $error = 1;
    } 

    var $zip = $("#zip");
    if ($zip == "" || $zip.val().length < 2) {
        $zip.parents(".form-group").addClass("has-danger");
        $error = 1;
    }                 
    var $coupon = $("#coupon");
    if ($zip.parents(".form-group").hasClass("has-error")) {
        $error = 1;
    }  

    var $stripe = $(".StripeElement");
    if($stripe.length > 0 && $stripe.hasClass("StripeElement--invalid")){
      $error = 1;
    }
    if($error) return false;
  });

  if($("input#coupon").length > 0){
    var $coupon = $("#coupon");
    $coupon.blur(function(){
      if($coupon.val().length > 2){
        $coupon.parent("div").find(".help-block").remove();
        $.ajax({
            type: "POST",
            url: appurl + "/server",
            data: "request=validatecoupon&code="+$coupon.val()+"&token="+token,        
            success: function (response) { 
              if(response == "invalid"){
                $coupon.parents(".form-group").addClass("has-danger").addClass("has-error");                
              }else{
                $coupon.parents(".form-group").removeClass("has-danger").removeClass("has-error");
                $coupon.parents(".form-group").addClass("has-success");    
                $coupon.after("<p class='help-block'>"+response+"</p>");
              }
            }
        });       
      }  
    });      
  }
  // Validate forms
  $(".validate").submit(function(e){
    if(validateForm($(this)) == false ) e.preventDefault();
  });
  $(".contact-event").click(function(e) { 
    e.preventDefault(); 
    $(this).hide(); 
    $(".contact-box").fadeIn(); 
  });  
  $(".contact-close").click(function(e){
    e.preventDefault(); 
    $(".contact-box").hide();
    $(".contact-event").fadeIn();
  });
  $(".contact-form").submit(function(e){
    e.preventDefault();
    if(validateForm($(this)) == false ) return false;
    $.ajax({
        type: "POST",
        url: appurl + "/server",
        data: "request=ajax_form&"+$(this).serialize()+"&token="+token,        
        success: function (response) { 
          $(".contact-box").hide();
          $(".contact-event").fadeIn();
          $(".contact-form").trigger("reset");
          let style = $(".contact-event i").attr("style");
          $(".contact-event i").removeClass("fa-question").addClass("fa-check").attr("style", "background-color:#82e26f;color:#fff");
          setTimeout(function(){
            $(".contact-event i").removeClass("fa-check").addClass("fa-question").attr("style", style);
          }, 5000);
        }
    }); 
  });  
  var poll_max = 10;
  $(".addA").click(function(e){
    e.preventDefault();
    var poll_num = $(".poll-options > .form-group").length;
    if(poll_num == poll_max) return false;
    poll_num++;
    $(".poll-options").append("<div class='form-group'><input type='text' placeholder='#"+poll_num+"' class='form-control' name='answer[]' id='answer[]'  placeholder='' data-id='"+poll_num+"'></div>");
    $("ol.poll-answers").append("<li data-id='"+poll_num+"'>#"+poll_num+"</li>");
    update_sidebar();
  });
  $(document).on('keyup', '.poll-options input[type=text]', function(){
    let id = $(this).data("id");
    if($(this).val().length <1 || $(this).val().length > 50) return false;
    $("ol.poll-answers li[data-id="+id+"]").text($(this).val());
  });
  $(".poll-form").submit(function(e){
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: appurl + "/server",
        data: "request=ajax_poll&"+$(this).serialize()+"&token="+token,        
        success: function (response) { 
          $(".poll-box").html("<p>Thanks!</p>");
          $(".poll-form").remove();
          let style = $(".contact-event i").attr("style");
          setTimeout(function(){
            $(".poll-overlay").remove();
          }, 2000);
        }
    }); 
  }); 
  $(".themes-style li a").click(function(e){
    e.preventDefault();
    var c = $(this).attr("data-class");
    var callback=$(this).parent("li").parent("ul").attr("data-callback");
    $(".themes-style li a").removeClass("current");
    $(this).addClass("current");   
    $("#theme_value").val(c);
    if(callback !== undefined){
      window[callback](c);
    }
  });
  var links_max = 10;
  $(".addLinks").click(function(e){
    e.preventDefault();
    var links_num = $(".links > .form-group").length;
    if(links_num == links_max) return false;
    links_num++;
    $(".links").append($(".links-template").html().replace("null", links_num));
    $(".custom-profile_links").append("<a href='#' data-id='"+links_num+"' class='btn btn-block'><span>#"+links_num+"</span></a>");
    update_sidebar();
  });
  $(document).on('keyup', '.links input[data-input=label]', function(){
    let id = $(this).parents(".form-group").data("id");
    if($(this).val().length <1 || $(this).val().length > 50) return false;
    $('.custom-profile_links a[data-id='+id+'] span').text($(this).val());
  });   
  $(document).on('click',".deleteLinks",function(e){
    e.preventDefault();
    var t = $(this);
    var p = $(this).parent('p').prev(".form-group");
    p.slideUp('slow',function(){
      $('.custom-profile_links a[data-id='+p.data("id")+']').fadeOut();
      $(this).remove();
      t.parent('p').remove();
    });
    return false;
  }); 
  $("#profile-builder input[name=name]").keyup(function(e){
    if($(this).val().length <1 || $(this).val().length > 50) return false;
    $(".custom-profile_header h3 span").text($(this).val());
  });
  $(".code-selector").hide();
  $(".code-selector[data-id=php]").fadeIn('fast', function(){
      update_sidebar();
  });
  $(".code-lang a").click(function(e){
    e.preventDefault();
    var id = $(this).attr("href");
    $(".code-lang a").removeClass("active");
    $('a[href$="'+id+'"]').addClass("active");
    $(".code-selector").hide();
    var c = id.replace("#","");
    $(".code-selector[data-id="+c+"]").fadeIn();
    update_sidebar();
  });
  
  //检查Domain
  $(".verify_domain").click(function(e){
    e.preventDefault();
    var button = $(this);
    var url = button.attr("href");
    if(url != "#"){
      var verify = '#'+button.attr("id");
      var id = button.attr("data-id");
      $.ajax({
          type: "GET",
          url: url,
          beforeSend: function() {
            button.text("验证中");            
          },
          success: function (r) {
            if(r.error){
              if(r.error == 2){
                countdown("60",verify,"秒后再试",'验证解析',url);
              }
              button.text(r.msg);
            }else{
              button.remove();
              layer.msg('解析已生效', {icon: 1,closeBtn: 2});
              $(".status_"+id).html('<span class="btn btn-success btn-xs">'+r.msg+'</span>');
            }
          }
      });
    }
  });
  
  //复制CNAME
  $(".copy_cname").click(function(e){
    e.preventDefault();
    var copy = new Clipboard('.copy_cname');
    copy.on('success', function(e) {
      layer.msg('已复制到剪贴板', {icon: 1,closeBtn: 2});
    });
  });
  
  //删除SSL
  $(".delete_ssl").click(function(e){
    e.preventDefault();
    var url = $(".ssl_form").attr("action");
    var id = $(".ssl_name option").attr("value");
    var token = $(".ssl_form input[name=token]").attr("value");
    var button = $(this);
    var width = screen() < 2 ? ['90%', 'auto'] : ['300px', 'auto'];
    layer.open({
      type: 1,
      scrollbar: false,
      btn: ['确定', '取消'],
      btnAlign: 'c',
      area: width,
      shadeClose: true,
      title: '删除SSL证书',
      content: '确定删除SSL证书？',
      yes: function(index, layero){
        layer.close(index);
        $.ajax({
          type: "POST",
          url: url,
          data: "delete_ssl="+id+"&token="+token,
          beforeSend: function() {
            button.text("删除中");            
          },
          success: function (r) {
            if(r.error){
              button.text(r.msg);
            }else{
              $(".ssl_form").load(location.href+" .ssl_form");
            }
          }
        });
      }
    });
  });
  
  $(".scroll").click(function(e){
    e.preventDefault();
  });
  
  // 关闭tabs
  $(document).on('click','.closetab',function(e) {
    e.preventDefault();
    var id = $(this).attr("data-id");
    $("#"+id).slideUp();
  });
  
  $('.single-input-clear').click(function(){
    $('.main-input').val('').focus();
    $('.single-input-clear').hide();
  });
  $('.main-input').on('input', function(){
    var v = $(this).val();
    if (v == '') {
      $('.single-input-clear').hide();
    }else{
      $('.single-input-clear').show();
    }
  });
  
  $('.multiple-input-clear').click(function(){
    $('.main-textarea').val('').focus();
    $('.multiple-input-clear').hide();
  });
  $('.main-textarea').on('input', function(){
    var v = $(this).val();
    if (v == '') {
      $('.multiple-input-clear').hide();
    }else{
      $('.multiple-input-clear').show();
    }
  });
  
  //获取APP数据ID
  $("#debrowser-value").click(function(e){
    e.preventDefault();
    var value = debrowserSelect .getValue('valueStr');
    if(value){
      var width = screen() < 2 ? ['90%', 'auto'] : ['500px', 'auto'];
      layer.open({
        type: 1,
        scrollbar: false,
        btnAlign: 'c',
        area: width,
        shadeClose: true,
        title: 'APP数据ID',
        content: value,
      });
    }
  });
  
  $(document).on('click','.optional_call',function(p){
      p.preventDefault();
      var action = $(this).attr("data-action");
      var title = $(this).attr("data-title");
      var submit = $(this).attr("data-submit");
      var width = screen() < 2 ? ['90%', 'auto'] : ['500px', 'auto'];
      $.ajax({
        type: "POST",
        url: appurl+"/server",
        data: "request="+action+"&token="+token,
        beforeSend: function() {
          layer.load();  
        },
        complete: function() {   
          layer.closeAll('loading');
        },                   
        success: function (html) {   
          layer.open({
            type: 1,
            scrollbar: false,
            btn: ['确定', '取消'],
            btnAlign: 'c',
            area: width,
            shadeClose: true,
            title: title,
            content: html,
            yes: function(index, layero){
              optional_submit();
            }
          });
        }
      });       
  });
  
  $(document).on('click','.optional_edit_call',function(p){
      p.preventDefault();
      var id = $(this).attr("data-id");
      var action = $(this).attr("data-action");
      var title = $(this).attr("data-title");
      var width = screen() < 2 ? ['90%', 'auto'] : ['500px', 'auto'];
      $.ajax({
        type: "POST",
        url: appurl+"/server",
        data: "request="+action+"&id="+id+"&token="+token,
        beforeSend: function() {
          layer.load();  
        },
        complete: function() {   
          layer.closeAll('loading');
        },                   
        success: function (html) {   
          layer.open({
            type: 1,
            scrollbar: false,
            btn: ['确定', '取消'],
            btnAlign: 'c',
            area: width,
            shadeClose: true,
            title: title,
            content: html,
            success: function(layero, index){
              optional_edit(id);
            },
            yes: function(index, layero){
              optional_submit(id);
            }
          });
        }
      });       
  });
  
  $(document).on('click','#optional_url_tab .form_choose li a',function(e){
    e.preventDefault();
    var name = $(this).parent("li").parent("ul").attr("data-id");
    var to = $(this).attr("data-value");
    $("input#" + name).val(to);
    $(this).parent("li").parent("ul").find("a").removeClass("current");
    $(this).addClass("current");
    
    var type = $("#optype").val();
    if(type == 0){
      $("#optional_url_tab .help-block").hide();
      $("#optional_url_tab textarea[name='optional_url']").attr("disabled",false);
    }else if(type == 1){
      $("#optional_url_tab .help-block").show();
      $("#optional_url_tab textarea[name='optional_url']").attr("disabled",true).val("");
    }
  });
  
  $(document).on('click',"#bounds .form_choose li a",function(e) {
    var href=$(this).attr('href');
    var name = $(this).parent("li").parent("ul").attr("data-id");
    var to = $(this).attr("data-value");
    if(href=="#" || href=="") e.preventDefault();

    $("input#" + name).val(to);
    $(this).parent("li").parent("ul").find("a").removeClass("current");
    $(this).addClass("current");
  });
  
  $(document).on("click", ".qrimg", function(e){
    e.preventDefault();
    var title = $(this).attr("data-title");
    if(!title) title = "二维码";
    var content = $(this).attr("src");
    var width = screen() < 2 ? ['90%', 'auto'] : ['300px', 'auto']; 
    layer.open({
      type: 1,
      scrollbar: false,
      btnAlign: 'c',
      area: width,
      shadeClose: true,
      title: title,
      content: '<p align="center"><img src="'+content+'" style="width:100%;max-height:500px"></p>',
    });   
  });
  
  //开启备用图
  $(document).on("ifChanged", "#onspare", function(e){
    e.preventDefault();
    if($(this).is(":checked")){
      $(".upspare").show();
      $(".qrimg").show();
    }else{
      $(".upspare").hide();
      $(".qrimg").hide();
      var file=$("#spare")
      file.after(file.clone().val(""));
      file.remove();
    }
  });
  
  $(document).on('submit',"form#login_form,form#forgot_form",function(e) {
    e.preventDefault();
    var url = $(this).attr("action");
    $.ajax({
      type: "POST",
      url: url,
      data: $(this).serialize(),
      dataType:"json",
      beforeSend: function() {
        layer.load();         
      },
      complete: function() {    
        layer.closeAll('loading');
      },        
      success: function (html) {                        
        if(html.error){
          layer.msg(html.msg, {icon: 2,closeBtn: 2});
          return false;
        }else{
          $("input").val('');
          layer.msg(html.msg, {icon: 1,closeBtn: 2},function(){
            window.location.href = html.url;
          });
        }
      }
    });
  });
  
  $(document).on('click','.mailverify',function(e){
    e.preventDefault();
    var name = $("#name").val();
    var code = $("#code").val();
    var email = $("#email").val();
    if(name == ""){
      layer.msg("请填写用户名", {icon: 2,closeBtn: 2});
      return false;
    }
    if(email == ""){
      layer.msg("请填写电子邮箱", {icon: 2,closeBtn: 2});
      return false;
    }
    $.ajax({
      type: "POST",
      url: appurl+"/user/register",
      data: "username="+name+"&code="+code+"&email="+email+"&email_code=1&token="+token,
      dataType:"json",
      beforeSend: function() {
        layer.load();         
      },
      complete: function() {    
        layer.closeAll('loading');
      },        
      success: function (html) {
        var code_btn = $(".mailverify");
        settime(code_btn);
        if(html.error){
          layer.msg(html.msg, {icon: 2,closeBtn: 2});
          return false;
        }else{
          layer.msg(html.msg, {icon: 1,closeBtn: 2});   
        } 
      }
    });      
  });
}); // End jQuery Ready

//倒计时
function countdown(time,id,text,load,url){
 if(time === 0){
   $(id).attr("href",url).removeClass('btn-default').addClass('btn-warning').text(load);
   return;
 }else{
   time--;
   $(id).attr("href","#").removeClass('btn-warning').addClass('btn-default').text(time + '' +text);
 } 
 setTimeout(function() { 
   countdown(time,id,text,load,url);
 },1000);
}
//验证码倒计时
var timing = 60;
function settime(btn){
  //发送验证码倒计时
  if(timing == 0){
    clearInterval(smsTime);
    btn.attr('disabled',false);
    btn.text("重新获取");
    timing = 60;
    return;
  }else{ 
    btn.attr('disabled',true);
    btn.text(timing+" 秒");
    timing--;
  }
  var smsTime=setTimeout(function(){
    settime(btn);
  },1000);
}
//可见宽度
function screen(){
  var width = $(window).width();
  if(width > 1200){
    return 3;
  }else if(width > 990){
    return 2;
  }else if(width > 768){
    return 1;
  }else{
    return 0;
  }
}
//定向设置
var visitArr = [];
function optional_submit(index){  
  var optype = $("#optype").val();
  
  var geo_nameStr = geoSelect.getValue('nameStr');
  var device_nameStr = deviceSelect.getValue('nameStr');
  var browser_nameStr = browserSelect.getValue('nameStr');
  var operator_nameStr = operatorSelect.getValue('nameStr');
  var language_nameStr = languageSelect.getValue('nameStr');
  
  var geo_val = geoSelect.getValue('valueStr');
  var device_val = deviceSelect.getValue('valueStr');
  var browser_val = browserSelect.getValue('valueStr');
  var operator_val = operatorSelect.getValue('valueStr');
  var language_val = languageSelect.getValue('valueStr');
  var sourcelink_val = $(".sourcelinks-input input[name='sourcelink']").val().trim();
  var optional_url = $("#optional_url_tab textarea[name='optional_url']").val().trim();
  
  if(optype == 0 && optional_url.length == 0){
    layer.msg("请填写定向链接", {icon: 2,closeBtn: 2});
    return false;
  }
  if(visitArr.length >= 10){
    layer.msg("最多设置10条定向规则", {icon: 2,closeBtn: 2});
    return false;
  }
  if(sourcelink_val.length > 2048){
    layer.msg("来源链接长度不能超过2048个字符", {icon: 2,closeBtn: 2});
    return false;
  }
  if(optional_url.length > 2048){
    layer.msg("定向链接长度不能超过2048个字符", {icon: 2,closeBtn: 2});
    return false;
  }

  
  var visit = {
    geo_name: geo_nameStr.length==0 ? "不限" : geo_nameStr,
    device_name: device_nameStr.length==0 ? "不限" : device_nameStr,
    browser_name: browser_nameStr.length==0 ? "不限" : browser_nameStr,
    operator_name: operator_nameStr.length==0 ? "不限" : operator_nameStr,
    language_name: language_nameStr.length==0 ? "不限" : language_nameStr,
    optype: optype,
    geo_val: geo_val,
    device_val: device_val,
    browser_val: browser_val,
    operator_val: operator_val,
    language_val: language_val,
    sourcelink_val: sourcelink_val,
    optional_val: optional_url
  };
  
  var repeat_text = '已有定向设置中包含当前规则';
  if(index && index >= 0) {
    if(isRepeat(geo_val,device_val,browser_val,operator_val,language_val,sourcelink_val,index)){
      layer.msg(repeat_text, {icon: 2,closeBtn: 2});
      return false;
    }
    visitArr[index] = visit;
  }else{
    if(isRepeat(geo_val,device_val,browser_val,operator_val,language_val,sourcelink_val)){
      layer.msg(repeat_text, {icon: 2,closeBtn: 2});
      return false;
    }
    visitArr.push(visit)
  }
  
  $(".no-optional").hide();
  $(".optional-table").show();
  initVisitData();
  
  layer.closeAll('page');
}
function optional_edit(index){
  var visitData = visitArr[index];
  var optype = visitData.optype;
  var geo = visitData.geo_val.split(",");
  var device = visitData.device_val.split(",");
  var browser = visitData.browser_val.split(",");
  var operator = visitData.operator_val.split(",");
  var language = visitData.language_val.split(",");
  var sourcelink_type = visitData.sourcelink_type;
  geoSelect.setValue(geo);
  deviceSelect.setValue(device);
  browserSelect.setValue(browser);
  operatorSelect.setValue(operator);
  languageSelect.setValue(language);
  $(".sourcelinks-input input[name='sourcelink']").val(visitData.sourcelink_val);
  $("#optional_url_tab textarea[name='optional_url']").val(visitData.optional_val);
  $("#optype").val(optype);
  $("#optional_url_tab .form_choose li a").removeClass("current");
  if(optype == 0){
    $("#optional_url_tab .form_choose li a[data-value='0']").addClass("current");
    $("#optional_url_tab .help-block").hide();
    $("#optional_url_tab textarea[name='optional_url']").attr("disabled",false);
  }else{
    $("#optional_url_tab .form_choose li a[data-value='1']").addClass("current");
    $("#optional_url_tab .help-block").show();
    $("#optional_url_tab textarea[name='optional_url']").attr("disabled",true).val("");
  }
}
function initVisitData() {
  $(".optional-table tbody").html("");
  for (var i = 0; i < visitArr.length; i++) {
    visitArr[i].sourcelink_val.length==0 ? sourcelink_name="不限" : sourcelink_name=visitArr[i].sourcelink_val;
    visitArr[i].optional_val.length==0 || visitArr[i].optype==1 ? optional_name="屏蔽" : optional_name=visitArr[i].optional_val;
    $(".optional-table tbody").append(
      '<tr>'+
      '<td>'+visitArr[i].geo_name+'</td>'+
      '<td>'+visitArr[i].device_name+'</td>'+
      '<td>'+visitArr[i].browser_name+'</td>'+
      '<td>'+visitArr[i].operator_name+'</td>'+
      '<td>'+visitArr[i].language_name+'</td>'+
      '<td>'+sourcelink_name+'</td>'+
      '<td>'+optional_name+'</td>'+
      '<th>'+
      '<button type="button" class="btn btn-success btn-xs optional_edit_call" data-action="add_optional" data-title="修改定向" data-id="'+i+'">编辑</button>'+
      '<button type="button" class="btn btn-danger btn-xs" onclick="delVisitData('+i+')">删除</button>'+
      '</th>'+
      '<input type="hidden" name="optype[]" value='+visitArr[i].optype+'>'+
      '<input type="hidden" name="geo[]" value='+visitArr[i].geo_val+'>'+
      '<input type="hidden" name="device[]" value='+visitArr[i].device_val+'>'+
      '<input type="hidden" name="browser[]" value='+visitArr[i].browser_val+'>'+
      '<input type="hidden" name="operator[]" value='+visitArr[i].operator_val+'>'+
      '<input type="hidden" name="language[]" value='+visitArr[i].language_val+'>'+
      '<input type="hidden" name="sourcelink[]" value='+visitArr[i].sourcelink_val+'>'+
      '<input type="hidden" name="optionalurl[]" value='+visitArr[i].optional_val+'>'+
      '</tr>')
  }
}
//判断添加规则
function isRepeat(geo,device,browser,operator,language,sourcelink,index){
  for(var i=0;i<visitArr.length;i++){
    if(index && index == i) {
      continue;
    }
    var isGeo = false;
    isGeo = (geo == "" || visitArr[i].geo_val == "" || isExist(visitArr[i].geo_val.split(","), geo.split(",")) || isProvince(visitArr[i].geo_val.split(","), geo.split(",")));
    var isDevice = false;
    isDevice = (device == "" || visitArr[i].device_val == "" || isExist(visitArr[i].device_val.split(","), device.split(",")));
    var isBrowser = false;
    isBrowser = (browser == "" || visitArr[i].browser_val == "" || isExist(visitArr[i].browser_val.split(","), browser.split(",")));
    var isOperator = false;
    isOperator = (operator == "" || visitArr[i].operator_val == "" || isExist(visitArr[i].operator_val.split(","), operator.split(",")));
    var isLanguage = false;
    isLanguage = (language == "" || visitArr[i].language_val == "" || isExist(visitArr[i].language_val.split(","), language.split(",")));
    var isSourcelink = false;
    isSourcelink = (sourcelink == "" || visitArr[i].sourcelink_val == "" || visitArr[i].sourcelink_val == sourcelink);

    if(isGeo && isDevice && isBrowser && isOperator && isLanguage && isSourcelink){
      return true;
    }
  }
}
//重复校验
function isExist(a, b){
  var set = new Set();
  for(var i=0;i<a.length;i++){
    set.add(a[i]);
  }
  for(var i=0;i<b.length;i++){
    if(set.has(b[i])){
      return true;
    }
  }
  return false;
}
//地域校验
function isProvince(a, b){
  var data = [{
    1000: [1,16],
    1001: [17,32],
    1002: [33,43],
    1003: [44,54],
    1004: [55,66],
    1005: [67,80],
    1006: [81,89],
    1007: [90,101],
    1008: [102,117],
    1009: [118,130],
    1010: [131,141],
    1011: [142,157],
    1012: [158,166],
    1013: [167,177],
    1014: [178,195],
    1015: [196,213],
    1016: [214,230],
    1017: [231,244],
    1018: [245,265],
    1019: [266,279],
    1020: [280,288],
    1021: [289,326],
    1022: [327,347],
    1023: [348,356],
    1024: [357,372],
    1025: [373,379],
    1026: [380,389],
    1027: [390,403],
    1028: [404,411],
    1029: [412,416],
    1030: [417,439]
  }];
  for(var i=0;i<a.length;i++){
    if(data[0][a[i]]){
      for(var j=0;j<b.length;j++){
        if(b[j] >= data[0][a[i]][0] && b[j] <= data[0][a[i]][1]){
          return true;
        }
      }      
    }
  }
  for(var i=0;i<b.length;i++){
    if(data[0][b[i]]){
      for(var j=0;j<a.length;j++){
        if(a[j] >= data[0][b[i]][0] && a[j] <= data[0][b[i]][1]){
          return true;
        }
      }      
    }
  }
  return false;
}
//删除定向
function delVisitData(index){
  visitArr.splice(index, 1);
  if(visitArr.length == 0){
    $(".no-optional").show();
    $(".optional-table").hide();
  }
  initVisitData();
}
/**
 * iCheck Load Function
 **/
function icheck_reload(){
  if(typeof icheck !== "undefined"){
    var c=icheck;
  }else{
    if($("input[type=checkbox],input[type=radio]").attr("data-class")){
      var c="-"+$("input[type=checkbox],input[type=radio]").attr("data-class");
    }else{
      var c="";
    }    
  }
  if($().iCheck){
    $('input').iCheck({
      checkboxClass: 'icheckbox_flat'+c,
      radioClass: 'iradio_flat'+c
    }); 
  }
}

/**
 * Show Password Field Function
 **/
function show_forgot_password(){
  $("#login_form").slideUp("slow");
  $("#forgot_form").slideDown("slow");  
  return false  
}
/**
 * Custom Radio Box Callback
 **/
function update_sidebar(){
  // Sidebar Height
  if(!is_mobile() && !is_tablet()){
    var h1 = $(".content").height();
    $(".sidebar").height(h1 - 57); 
  }    
}
/**
 * Load zClip
 **/
function zClipload(){
 
}
/**
 * Load Some Functions
 **/
function loadall(){
  zClipload();
  icheck_reload();
  update_sidebar();
  update_autocomplete();
}
// Switch Forms
window.form_switch= function(e){
  if(e == 0){
    $("#multiple").slideUp();
    $("#single").slideDown();
    $(".custom-alias").show();
    $(".btn_single").hide();
    $(".btn_multiple").show();
  }else{
    $("#multiple").slideDown();
    $("#single").slideUp();
    $(".custom-alias").hide();
    $(".btn_multiple").hide();
    $(".btn_single").show();
  }
}
// Auto complete
function update_autocomplete(){
  var parameters = [
    { value: 'utm_source', data: 'utm_source' },
    { value: 'utm_medium', data: 'utm_medium' },
    { value: 'utm_campaign', data: 'utm_campaign' },
    { value: 'utm_term', data: 'utm_term' },
    { value: 'utm_content', data: 'utm_content' },
    { value: 'tag', data: 'tag' },
  ];
  if($().devbridgeAutocomplete){
    $(".autofillparam").devbridgeAutocomplete({
      lookup: parameters
    });
  }
}
// Validate Form 
function validateForm(e){
  
  $(".form-group").removeClass("has-danger");
  $(".form-control-feedback").remove();
  let error = 0;

  e.find("[data-required]").each(function(){

    let type = $(this).attr("type");

    if(type == "email"){
      let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!regex.test($(this).val())) error = 1;    
    } else {    
      if($(this).val() == "") error = 1;
    }

    if(error == 1) {
      $(this).parents(".form-group").addClass("has-danger");
      $(this).after("<div class='form-control-feedback'>This field is required</div>");
    }

  });
  if(error == 1) {
    return false;
  }  

  return true;
}
window.changeTheme = function(c){
  $("#custom-profile").attr("class", "custom-profile_"+c);
}
window.showBundle = function(v){
  if(v == 1) return $("#view-lists").fadeIn();
  return $("#view-lists").fadeOut();
}
window.showAll = function(v){
  if(v == 1) return $("#view-links").fadeIn();
  return $("#view-links").fadeOut();
}