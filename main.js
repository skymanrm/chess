var setfig = false; // взята фигура или нет
var figure = false; // src картинки с фигурой
var figfrom = false;  // откуда берем фигуру
var alreadyset = false; // взята фигура из упаковки или с доски
var run = false; // запущена игра или нет
	
	
$(document).ready(function(){
	var rows = $("#board").children("tr");
	
	// рисуем доску
	for (var i = 1; i < 9; i++) {
		for (var j = 1; j < 9; j++) {
			var cellid = "#c" + i + j;
			if (Math.round((i + j)/2) != (i+j)/2) {
				$(cellid).css("background", "url(images/bl.png)");
			}
		}
	}
	
	// берем фигуру
	$(".figures>img").live("click", function() {
		if (setfig != false) {
			alert("Вы уже взяли фигуру");
		} else {
			figure = $(this);
			figfrom = $(this).parent();
			$(this).remove();
			setfig = true;
			$("#crsr").html("<img src='"+$(figure).attr("src")+"' />");
		}
	})
	
	// обработчик кликов мышкой
	$(".cols").click(function(){
		if (setfig == false) {
			// смотрим есть ли тут фигура, если есть даем передвинуть или убрать
		} else {
			// проверяем занята клетка или нет
			if ($(this).html() != "") {
				alert("Клетка занята!")
			} else {
				$(this).html("<img src='"+$(figure).attr("src")+"' />");
				$("#crsr").html('');
				figure = false;
				setfig = false;
				check_unused();
			}
		}		
	})
	
	// двигаем и удаляем уже установленные фигуры
	$(".cols>img").live("click", function(){
		if (figure == false) {
			figfrom = $(this).parent();
			$(this).remove();
			$("#crsr").html('');
			figure = $(this);
			$("#crsr").html("<img src='"+$(figure).attr("src")+"' />");
			setfig = true;
			alreadyset = true;
		}
	})
	
	
	// делаем следование за курсором
	$(document).mousemove(function(xy){
		$("#crsr").css({
			'top': xy.pageY,
			'left': xy.pageX + 5
		})
	})
	
	$("#dropfig").click(function(){
		if (figure != false) {
			if (run == true) {
				$(".cols").removeClass("avmove");
			}
				$(figfrom).append("<img src='"+$(figure).attr("src")+"' />");
				figure = false;
				setfig = false;
				figfrom = false;
				$("#crsr").html('');
		}
	})
	
	$(".figures").click(function(){
		if (figure != false) {
			if ($(figure).attr("src").indexOf("c") != -1) {
				$("#wf").append(figure);
			}
			if ($(figure).attr("src").indexOf("b") != -1) {
				$("#bf").append(figure);
			}
			figure = false;
			setfig = false;
			figfrom = false;
			$("#crsr").html('');
		}
	})
	
	$("#aut").click(function(){
		autostart();
	})
})

// проверяем остались не расставленные фигуры или нет
function check_unused() {
	if ($(".figures").children("img").filter(":visible").length == 0) {
		rungame();
	}
}

// запуск игры
function rungame() {
	alert("Все фигуры расставлены! Запускаем игру...");
	
	figure = false;
	run = true;
	
	$("#status").text("Ходят белые");
	
	// очищаем предыдущие бинды
	$(".figures>img").unbind("click");
	$(".cols").unbind("click");
	$(".cols>img").die("click");
	$(".figures").unbind("click");
	
	// создаем новые действия
	$(".cols>img").live("click", function(){
		if (figure == false) {
			if ($("#status").text() == "Ходят белые" && $(this).attr("src").indexOf("b") == -1) {
				alert("Ход белых!");
			} else if ($("#status").text() == "Ходят черные" && $(this).attr("src").indexOf("c") == -1) {
				alert("Ход черных!");
			} else {
				// берем фигуру
				figure = $(this);
				figfrom = $(this).parent();
				
				// получаем координаты фигуры
				var xyfig = $(this).parent().attr("id");
				
				// разбираемся с доступностью клеток				
				$(this).remove();
				$("#crsr").html(figure);
				
				show_avaible_moves(figure, xyfig);
			}
		} 
	})
	
	// перемещение
	$(".avmove").live("click", function() {
		if ($(this).children("img").length > 0) {
			// убили кого то
			var temp = $(this).children("img");
			$(this).children("img").remove();
			$("#killed").append(temp);
		} 
			$(this).html(figure);
			figure = false;
			setfig = false;
			figfrom = false;
			$("#crsr").html('');
			$(".avmove").removeClass("avmove");
						
			if ($("#status").text() == "Ходят белые") {
				$("#status").text("Ходят черные");
			} else {
				$("#status").text("Ходят белые");
			}
	})
	
	
}
