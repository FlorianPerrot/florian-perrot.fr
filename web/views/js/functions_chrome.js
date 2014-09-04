//Def le répertoire img
function defPath(url) {
	$path = url;
}

//Centre un element verticalement
function centreVerticale(elem) {
	elem.css("margin-top", elem.parent().height() / 2 - elem.height() / 2
			+ "px");
}
//convertie 'at' en @ (Anti-bot)
function convEmail(){
	$('.link-courriel').each(function() {
		var text = jQuery(this).attr('href');
		var address = text.replace(" at ", "@");
		$(this).attr('href',address);
	});
	$('span.text-courriel').each(function() {
		 var text = jQuery(this).text();
		 var address = text.replace(" at ", "@");
		 $(this).text(address);
	});
}

function initSize() {
	if ($(window).width() >= 1024) {
		// $display_elem.css("display","inline-block");
		$("main").css("min-height", $(window).height());
	} else {
		$(".bloc-text").css("display", "inline-block");
		$("main").css("min-height", "");
	}
}

function animButtonMenu(elem) {
	function anim(elem) {
		ico = elem.find("img");
		margin = elem.width() - ico.width() - elem.find("span").width() - 2;
		if (margin > 0) {
			ico.animate({
				marginLeft : margin
			}, "slow");
		}
	}
	;

	elem.hover(function() {
		anim($(this));
	}, function() {
		$(this).find("img").stop();
		$(this).find("img").css("margin-left", "5px");
	});
}

function animAfficheTextBloc() {

	$("main .bloc-text").each(function() {

		if ($(this).attr("id") == $display_elem.attr("id")) {
			$(this).slideDown();

			if ($(this).height() < $(window).height()) {
				padding = (($(window).height() - $(this).height()) / 2) + "px";
				$("main").animate({
					paddingTop : padding
				}, "slow");
			} else {
				$("main").animate({
					paddingTop : "200px"
				}, "slow");
			}
		} else if ($(this).css("display") == "inline-block") {
			$(this).slideUp();
		}
	});
}
function bindButton(button, windowOC, end) {
	button.click(function() {
		if (windowOC.is(":hidden")) {
			button.attr("src", $path + "views/img/fleche_bas.png");
			windowOC.slideDown(500, end);
		} else {
			windowOC.slideUp(500, end);
		}
	});
}

function jauges(){
	$('input.round').each(function(){
	            var $input = $(this);
	            var $div = $input.parent();
	            var min = $input.data('min');
	            var max = $input.data('max');
	            var ratio = ($input.data('value') - min) / (max - min);
	            var color = "white";//$input.data('color') ? $input.data('color') :  "#91c2ff";
	
	            var $circle = $('<canvas width="100px" height="100px"/>');
	            var $color = $('<canvas width="100px" height="100px"/>');
	            var $img = $('<img atr="notes" src="'+$path+'views/img/note.png"/>');//Image a ajouter
	            $div.append($circle);
	            $div.append($color);
	            var ctx = $circle[0].getContext('2d');
	
			// On ajout l'image de notes si il y en a
			var notes = $div.children('.sous-text');
			if(notes.length){
				$div.append($img);
			}
	
	        // On dessine le cercle de font
	            ctx.beginPath();
	            ctx.arc(50,50,42,0,2*Math.PI);
	            ctx.lineWidth = 10;
	            ctx.strokeStyle = "rgba(0,0,0,0.1)";
	            ctx.stroke();
	
	        // On dessine le cercle de niveau
	            var ctx = $color[0].getContext('2d');
	            ctx.beginPath();
	            ctx.arc(50,50,42,-1/2 * Math.PI, ratio*2*Math.PI - 1/2 * Math.PI );
	            ctx.lineWidth = 10;
	            ctx.strokeStyle = "rgba(170,170,170,1)";
	            ctx.stroke();
	});
	$("div.round").hover(function(){
		$(this).children(".sous-text").css("visibility","visible");
	},function(){
		$(this).children(".sous-text").css("visibility","hidden");
	});
}