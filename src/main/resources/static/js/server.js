$(document).ready(function(){
  $(document).on('submit',"form.shortform",function(e) {
    e.preventDefault();
    var form = $(this);
    if($("#multiple-form").val()==="1"){
      var url =  form.find(".main-textarea");
    }else{
      var url =  form.find(".main-input");
    }
    if(!url.val()){
      $('.ajax .alert').hide();
      $('.share-this').hide();
      layer.msg("请输入正确的网址", {icon: 2,closeBtn: 2});
      return;
    }
    var lang_shorn=form.find('#shortenurl').text();   
    $.ajax({
      type: "POST",
      url: appurl+"/insert",
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
          $('.ajax .alert').hide();
          $('.share-this').hide();
          layer.msg(html.msg, {icon: 2,closeBtn: 2});
          $('.main-input').addClass('error');
        }else{
          $('.main-input').removeClass('error');                  
          if(!html.confirm){
            $("#copyurl").show();               
            
            var short = html.short.split("#");

            $('.ajax').hide().html('<div class="alert alert-success no-round">网址已成功缩短</div>').fadeIn('slow');
            $('.share-this').html('<div class="sharetop"><p>短网址</p><span>'+html.short+'</span><div id="copyurl">复制</div></div><div class="panel-default panel-body"><img src="'+short[0]+'/qr?size=500x500" alt=""><br>短网址二维码</div>').fadeIn('slow');
            zClipload(); 
          }else{
            $('.share-this').slideUp();
            $('.ajax').hide().html('<div class="alert alert-success">网址已成功缩短</div>').fadeIn('slow');             
          }
          refreshLinks();
          $('.main-senior').find('input').val('');
          $('.main-advanced').find('input').val('');
          if($("#multiple-form").val()==="1"){
            url.val(html.short);
          }
          if($(".short_captcha > div").length > 0){
            $(".verify_button img").click();
          }
          var copy = new Clipboard('#copyurl');            
          $("#submit").hide();            
          $("#copyurl").attr("data-clipboard-text", html.short).show();
          copy.on('success', function(e) {  
            layer.msg('已复制到剪贴板', {icon: 1,closeBtn: 2});
          });                                  
        } 
      }
    });  
  });    
  /**
  * Search for URls
  **/
  $("#search").submit(function(e){
    e.preventDefault();
    var val=$(this).find("input[type=text]").val();
    var action=$(this).attr("action");
    if(val.length > 3){
      $.ajax({
          type: "POST",
          url: action,
          data: "q="+val+"&token="+token,
          beforeSend: function() {
            $(".return-ajax").html("<img class='loader' src='"+appurl+"/static/loader.gif' style='margin:0 45%;border:0;' />");
          },
          complete: function() {      
            $('img.loader').fadeOut("fast",function(){$(this).remove()});
          },          
          success: function (r) { 
            $(".return-ajax").html(r);
            $(".url-container").slideUp('fast');
            $(".return-ajax").slideDown('fast');
            loadall();
          }
      }); 
    }else{
      $(".return-ajax").html('<p class="alert alert-info">关键词至少包含3个字符</p><br>').fadeIn();
    }   
  });
 /**
   * Server Requests
   **/ 
  $(document).on('click','.ajax_call',function(p){
      p.preventDefault();
      var e = $(this);
      var id = $(this).attr("data-id");
      var action = $(this).attr("data-action");
      var loading="<img class='loader' src='"+appurl+"/static/loader.gif' style='margin:5px 50%;border:0;' />";
      var title = e.attr("data-title");
      if(typeof($(this).attr("data-container")) == "undefined"){
        if(typeof($(this).attr("data-class"))!="undefined") {
          var container=$("."+$(this).attr("data-class"));
          var loading="<span><i class='glyphicon glyphicon-refresh'></i> Loading</span>";
        }else{
          if(typeof(title) == "undefined") title="User Account";
          $(this).modal({title:title,content:"Please wait while loading...",confimation:1});
          var container=$("#modal-alert > p");
        }
      }else{
        var container=$("#"+$(this).attr("data-container"));
      }
      var title=$(this).attr("data-title");
      $.ajax({
        type: "POST",
        url: appurl+"/server",
        data: "request="+action+"&id="+id+"&token="+token,
        beforeSend: function() {
          container.html(loading);
        },
        complete: function() {   
          loadall();    
          $('img.loader').fadeOut("fast");
        },                   
        success: function (html) {           
          if(typeof(e.attr("data-active")) !== "undefined"){
            e.parents("div#user-content").find(".active").removeClass("active");
            e.addClass(e.attr("data-active"));
          }
          container.hide();                                            
          container.html(html);
          container.fadeIn('fast');
        }
      });       
  });
  
  $(document).on('click','.layer_call',function(p){
      p.preventDefault();
      var id = $(this).attr("data-id");
      var action = $(this).attr("data-action");
      var title = $(this).attr("data-title");
      var submit = $(this).attr("data-submit");
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
            yes: function(index, layero){
              $("."+submit).submit();
              layer.close(index);
            }
          });
        }
      });       
  });
  
  if($("#widget_activities").length > 0){
    var intval =  $("#widget_activities").attr("data-refresh");
    setInterval(function(){
      server("activities");
    },intval);
  }

  $("#archiveall").click(function(e){
    e.preventDefault();
    if($(".url-container input[type=checkbox]:checked").length < 1){
      return $(".return-ajax").html('<div class="alert alert-info">请至少选择1个网址</div><br>').fadeIn();
    }    
    $(".url-container input[type=checkbox]").each(function(e){
      if($(this).prop("checked")) {
        archive($(this).data("id"));
      }
    });
  });
  $(document).on('click','#addtobundle',function(e) {
    e.preventDefault();       

    if($(".url-container input[type=checkbox]:checked").length < 1){
      return $(".return-ajax").html('<div class="alert alert-info">请至少选择1个网址</div><br>').fadeIn();
    }

    var title = $(this).data("content"); 
    $.ajax({
      type: "POST",
      url: appurl+"/server",
      data: "request=bulk_bundle&token="+token,
      complete: function() {   
        loadall();    
        $('img.loader').fadeOut("fast");
      },                   
      success: function (html) {   
        $(this).modal({title: title, content:"Please wait while loading...",confimation:1});
        let container=$("#modal-alert > p");                    
        container.hide();                                            
        container.html(html);
        container.fadeIn('fast');
      }
    });    
  });
  $(document).on('submit', '[role=bulk-bundle]', function(e){
    e.preventDefault();
    let bundleid = $(this).find("select").val();
    $(".url-container input[type=checkbox]").each(function(e){
      if($(this).prop("checked")) {
        addtobundle($(this).data("id"), bundleid);
      }
    });
  });
  $(document).on('click','.fetchBundles',function(p){
      p.preventDefault();
      var e = $(this);
      var id = $(this).attr("data-id");
      var action = $(this).attr("data-action");
      var loading="<img class='loader' src='"+appurl+"/static/loader.gif' style='margin:5px 50%;border:0;' />";
      var title = e.attr("data-title");
      $.ajax({
        type: "POST",
        url: appurl+"/server",
        data: "request="+action+"&id="+id+"&token="+token,
        complete: function() {   
          loadall();    
          $('img.loader').fadeOut("fast");
        },                   
        success: function (html) {           
          $(this).modal({title:title, content: html, header: false, confimation: 1});          
        }
      });       
  });
  $(document).on('input propertychange','#urls',function(e) {
    e.preventDefault();
    var arrHost = $(this).val().replace(/\n/g, ',').split(',');
    var arrTrim = trimArray(arrHost);
    var arrUnique = unique(arrTrim);
    var arrRepeat = arrTrim.length-arrUnique.length;
    if(arrRepeat > 0){
      $(".urlsnum").html(arrUnique.length+'，<font color="#ff0000">'+arrRepeat+'个重复</font>');
    }else{
      $(".urlsnum").text(arrUnique.length);
    }
  });
  $(document).on('submit',"form.checkurl",function(e) {
    e.preventDefault();
    var form = $(this);
    var url =  $(this).find("#urls");
    var normal =  form.find("#normal");
    var hold =  form.find("#hold");
    if(!url.val()){
      layer.msg("请输入正确的网址", {icon: 2,closeBtn: 2});
      return;
    }
    $.ajax({
      type: "POST",
      url: "/checklink",
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
          return;
        }else{
          normal.val("");
          hold.val("");
          $(".normalnum").text("0");
          $(".holdnum").text("0");
          $(".verify_button img").click();
          if(html.normal){
            var num = html.normal.split(',').length;
            normal.val(html.normal.replace(/,/g, '\n'));
            $(".normalnum").text(num);
            $('#normal').addClass('normal');
          }
          if(html.hold){
            var num = html.hold.split(',').length;
            hold.val(html.hold.replace(/,/g, '\n'));
            $(".holdnum").text(num);
            $('#hold').addClass('error');
          }
          layer.msg(html.msg, {icon: 1,closeBtn: 2});
        }
      }
    });  
  });
});
/**
* 移除数组中的空元素
* @param {array} 数组
* @returns {narray} 新数组
* */
function trimArray(array){
  var narray = [];
  for(var i = 0; i < array.length; i++){
    if(array[i]){
      if(typeof array[i] == "string"){
        if(array[i].trim()){
          narray.push(array[i]);
        }
      }else{
        narray.push(array[i]);
      }
    }
  }
  return narray;
}
/**
* 去除数组中重复的元素
* @returns {Array}
* */
function unique(array){
  if(!array.length) return [];
  if(array.length < 2) return [array[0]] || [];
  var tempObj = {},
    newArr = [];
  for(var i = 0; i < array.length; i++){
    var v = array[i];
    if((typeof tempObj[v] == "undefined")){
      tempObj[v] = v;
      newArr.push(v);
    }
  }
  return newArr;
}; 
/**
 * Realtime Data
 **/
function server(fn){
  if(fn=="activities"){
    var li=$("#widget_activities").find("li");
    var text=$("#widget_activities h3 small").text();
    var id=li.attr("data-id");
    if(typeof(id) == "undefined") id=0;
    $.ajax({
          type: "POST",
          url: appurl+"/server",
          data: "request=activities&id="+id+"&token="+token,
          beforeSend: function() {
          	li.removeClass("new_item");
            $("#widget_activities h3 small").html("<img class='loader' src='"+appurl+"/static/loader.gif' style='margin:0 45%;border:0;' />");
          },
          complete: function() {      
            $("#widget_activities h3 small").text(text);
          },          
          success: function (r) {             
            $("#widget_activities ul").html(r);
          }
      }); 
  }
  return false;
}  
/**
 * [refreshLinks description]
 */
function refreshLinks(){
  if($(".data-holder").length < 1) return;
  $.ajax({
      type: "POST",
      url: appurl+"/server",
      data: "request=refreshlinks&token="+token,
      beforeSend: function() {
        $(".data-holder").html("<div class='data-modal'><img class='loader' src='"+appurl+"/static/loader.gif' style='margin:0 45%;border:0;' /></div>");
      },
      complete: function() {      
        $(".data-modal").remove();
      },          
      success: function (r) {
        $(".data-holder").html(r);
        loadall();
      }
  });   
}
/**
 * [archive description]
 */
var archive = (id) => {
  var container = $('.return-ajax');
  var loading="<img class='loader' src='"+appurl+"/static/loader.gif' style='margin:5px 50%;border:0;' />";
  $.ajax({
    type: "POST",
    url: appurl+"/server",
    data: "request=archive&id="+id+"&token="+token,
    beforeSend: function() {
      container.html(loading);
    },
    complete: function() {   
      loadall();    
      $('img.loader').fadeOut("fast");
    },                   
    success: function (html) {
      container.hide();                                            
      container.html(html);
      container.fadeIn('fast');
    }
  });   
}
var addtobundle = (id, bundleid) => {
  var container = $('.return-ajax');
  var loading="<img class='loader' src='"+appurl+"/static/loader.gif' style='margin:5px 50%;border:0;' />";
  $.ajax({
    type: "POST",
    url: appurl+"/server",
    data: "request=bulk_bundle_add&id="+id+"&bundleid="+parseInt(bundleid)+"&token="+token,
    beforeSend: function() {
      container.html(loading);
    },
    complete: function() {   
      $('img.loader').fadeOut("fast").remove();
    },                   
    success: function (html) {
      $(document).modal_destroy();
      container.hide();      
      container.html(html.msg);
      container.fadeIn('fast');
      refreshLinks();
      $("#selectall").html('<i class="fa fa-check-square"></i>');
      $('input').iCheck('uncheck');
    }
  });   
}