$(document).ready(function () {
	$('.markettab > p').click(function (e) {
		$('.markettab > p').removeClass('markettab_active');
		$(this).addClass('markettab_active');

	});
	$('.award > p').click(function (e) {
		$('.award > p').removeClass('award_active');
		$(this).addClass('award_active');

	});
	$('.dropdown-menu li').click(function (e) {
		//e.preventDefault();  
		$('.dropdown-menu li').removeClass('active');
		$(this).addClass('active');

	});
	$(".dropdown-toggle").unbind("click").bind("click", function () {
		if ($(".dropdown-menu ").is(":hidden")) {
			$(".dropdown-menu ").show();
		} else {
			$(".dropdown-menu ").hide();

		}
	});

});

$(function() {

	judescreen();
	$(window).resize(function() {
		judescreen();
	});

	function judescreen() {

		var winW = $(window).width();

		if(winW < 768) {
			
			$(".dropdown-toggle").unbind("click").bind("click", function() {
				if($(".dropdown-menu ").is(":hidden")) {
					$(".dropdown-menu ").show();
				} else {
					$(".dropdown-menu ").hide();
					
				}
			});
			
	}
}
});

function en(){
    window.location.href="index.html?id=2"
}
function zh(){
	window.location.href="index_cn.html?id=1"
}

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
if(GetQueryString("id")==null)
{
	var type=navigator.appName
if (type=="Netscape"){
var lang = navigator.language
}
else{
var lang = navigator.userLanguage
}

var lang = lang.substr(0,2)
setTimeout(function(){
if (lang == "zh"){
	window.location.href="index_cn.html?id=1";
}
else if (lang == "en"){
	window.location.href="index.html?id=2"
}
},500);
}