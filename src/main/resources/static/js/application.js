const input = document.getElementById("longurl");
input.focus();

$('#longurl').bind("keypress", function() {
    if (event.keyCode === 13) {
        if (!$('#shortenurl').prop("disabled")) {
            doSubmit();
        }
    }
});

if($('[data-toggle="datepicker"]').length > 0){
    $('[data-toggle="datepicker"]').datepicker({
        autoPick: false,
        autoHide: true,
        format: "yyyy/mm/dd",
        days:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
        daysShort:["周日","周一","周二","周三","周四","周五","周六"],
        daysMin:["日","一","二","三","四","五","六"],
        months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
        monthsShort:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
        startDate: new Date()
    });
}

$(window).scroll(function(){
    if(window.pageYOffset>300){
        $("#backtop,#back-to-top").fadeIn('slow');
    }else{
        $("#backtop,#back-to-top").fadeOut('slow');
    }
});
$("a#back-to-top").smoothscroll();

function isUrl(str) {
    const v = new RegExp('^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$', 'i');
    return v.test(str);
}

function doSubmit() {
    var link = $("#longurl").val().trim();
    if (isUrl(link)) {
        if ($("#expiry").val() !== "") {
            regex = /^\d{4}[\/](0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])$/;
            if (!regex.test($("#expiry").val().trim())) {
                $("#expiry").focus();
                layer.msg('日期格式不正确', {icon: 2,closeBtn: 2});
                return;
            }
        }

        // 如果包含本域名
        if (link.indexOf(window.location.host) !== -1) {
            input.focus();
            layer.msg('不允许循环哦', {icon: 2,closeBtn: 2});
            return;
        }
        const btnObject = document.getElementById('shortenurl');
        btnObject.innerHTML = '立即缩短(10)';
        btnObject.disabled = true;
        let sec = 10;
        let intervalId = setInterval(function () {
            if (sec > 0) {
                btnObject.innerHTML = '立即缩短(' + sec + ')';
                btnObject.disabled = true;
                sec--;
            } else {
                btnObject.innerHTML = '立即缩短';
                btnObject.disabled = false;
                clearInterval(intervalId);
            }
        }, 1000);
        $.ajax({
            //几个参数需要注意一下
            type: "POST",//方法类型
            dataType: "json",//预期服务器返回的数据类型
            url: "/insert",//url
            headers: {'content-type': 'application/json'},
            data: JSON.stringify({"longUrl": decodeURI(link), "effectiveDate": $('#expiry').val(), "password": $('#pass').val()}),
            success: function (result) {
                if (result.code === 200) {

                    let link = document.location.protocol + "//" + window.location.host + "/" + result.msg;

                    $('.ajax').hide().html('<div class="alert alert-success no-round">网址已成功缩短</div>').fadeIn('slow');
                    $('.share-this').html('<div class="sharetop"><p>短网址</p><span id="short-link">' + link + '</span><div id="copyurl">复制</div></div><div class="panel-default panel-body"><img src="'+ 'https://java.rawchen.com/qrcode/api/?url=' + link + '" alt=""><br>短网址二维码</div>').fadeIn('slow');
                    $("#copyurl").attr("data-clipboard-text", link).show();
                    var copy = new Clipboard('#copyurl');
                    copy.on('success', function(e) {
                        layer.msg('短链已复制到剪贴板', {icon: 1,closeBtn: 2});
                    });
                } else if (result.code === 400) {
                    layer.msg(result.msg, {icon: 2,closeBtn: 2});
                } else if (result.code === 500) {
                    layer.msg(result.msg, {icon: 3,closeBtn: 2});
                }
            },
            error: function () {
                layer.msg('异常', {icon: 3,closeBtn: 2});
            }
        });
    } else {
        input.focus();
        layer.msg('URL格式不正确', {icon: 2,closeBtn: 2});
    }
}