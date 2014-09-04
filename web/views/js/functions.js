function defPath(url){
	$path = url;
}
function init(){
	//Affiche le body
	$("header, main, footer").css("display","block");
	var $numPhoto = Math.floor((Math.random() * 3) + 1); 
	var $i = 1;
	$(".photo_perso").each(function(){
		$(this).attr("src",$path+"views/img/photo"+$numPhoto+".part"+$i+".png");
		$i++;
	});

   	//Positionne les elements du header
   	calMargin();
	centreVerticale($("#titre"));
	
	//Anime le header
	openButtonMenu();
	openDecoRight();
	openDecoLeft();
	openName("header .name","100%","40%");
	openName("header .name-page","-400px","20%");
}


//Fixe les elements à leur position
function fixeElem(){
   	calMargin();
	fixeButtonMenu();
	
	fixeDecoRight();
	fixeDecoLeft();
	fixeName("header .name","40%");
	fixeName("header .name-page","20%");
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

/* Header script */
//Crée une animation droite/gauche sur 'elem' quand hover
function animButton(elem){
	var marginButton = elem.css("margin-left");
	function animLoop(elem){ 
			elem.animate({marginLeft: "+=5px"},150,function(){
				elem.animate({marginLeft: "-=10px"},300,function(){
					elem.animate({marginLeft: "+=5px"},150,function(){					
						animLoop(elem);
					});
				});
			});
	};
	elem.hover(function(){
		animLoop($(this));
	},function(){
		$(this).stop();
		$(this).css("margin-left",marginButton);
	});	
}

//Calcul $margin, marge du premier bouton du menu
function calMargin(){
	$margin = ($("body").width()-160*$("header ul.menu li").length)/2;
	if($margin < 30){
		$margin = 30;
	}
}

//Positionne&anim les boutons du menu
function openButtonMenu(){
	var margin = $margin + 10;
   	$("header ul.menu li").each(function(){
   		$(this).animate({marginLeft: margin}, 2000,
   			function(){$(this).off();animButton($(this));});
   		margin += 160;
   	});
}
function fixeButtonMenu(){
	var margin = $margin + 10;
   	$("header ul.menu li").each(function(){
   		$(this).css("margin-left",margin);
   		$(this).off();
   		animButton($(this));
   		margin += 160;
   	});
}

//Animation des titres dans l'header
function openName(elem,start,end){
	$(elem).css("left", start);
	$(elem).animate({left: end}, 2000);
}
function fixeName(elem,end){
	$(elem).css("left", end);
}

function openDecoRight(){
	var margin = $margin;
	$("#deco-stair-right li").each(function(){
		$(this).css("margin-left","100%");
		$(this).animate({marginLeft: margin}, 2000);
		margin += 160;
	});
}
function fixeDecoRight(){
	var margin = $margin;
	$("#deco-stair-right li").each(function(){
		$(this).css("margin-left","100%");
		$(this).css("margin-left",margin);
		margin += 160;
	});
}
function closeDecoRight(){
	$("#deco-stair-right li").each(function(){
		$(this).animate({margin: "0px 0px 0px 100%" }, 2000);
	});
}
function openDecoLeft(){
   	var margin = $margin; 
	$("#deco-stair-left li").each(function(){
		$(this).animate({width: margin},2000);
		margin += 160;
	});
}
function fixeDecoLeft(){
   	var margin = $margin; 
	$("#deco-stair-left li").each(function(){
		$(this).css("width",margin);
		margin += 160;
	});
}
function closeDecoLeft(){
	$("#deco-stair-left li").each(function(){
		$(this).animate({width: 0},2000);
	});
}

/* Main script */

// sur le clic du "button" on ouvre "windowOC" et termine par la fonction "end"
function bindButton(button,windowOC,end){
	button.click(function(){
		if(windowOC.is(":hidden")){
			button.attr("src",$path+"views/img/fleche_bas.png");
			windowOC.slideDown(500,end);
		}
		else{
			windowOC.slideUp(500,end);	
		}
	});
}

//Crée les jauges
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

//Aligne un bloc verticalement
function centreVerticale(elem){
	elem.css("margin-top",elem.parent().height()/2-elem.height()/2+"px");
}