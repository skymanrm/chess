// массивы ходов: 5 - место нахождения фигуры, 2 - доступно для хода,
// 3 - доступно для хода если фигура не ходила, 
// 1 - доступно для удара, 4 - доступно для хода и удара 
// Заглавные - белые фигуры, строчные - черные фигуры
// P - пешка, L - ладья, K - конь, S - слон, F - ферзь, C - король
var figure = false;
var startPosition = false;
var inGame = false;
var isCheck = false;

/**
 * Инициализация шахматной доски
 */
function ChessBoard() {
    this.board = new Array(
    9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
    9, 0, 0, 0, 0, 0, 0, 0, 0, 9,
    9, 0, 0, 0, 0, 0, 0, 0, 0, 9,
    9, 0, 0, 0, 0, 0, 0, 0, 0, 9,
    9, 0, 0, 0, 0, 0, 0, 0, 0, 9,
    9, 0, 0, 0, 0, 0, 0, 0, 0, 9,
    9, 0, 0, 0, 0, 0, 0, 0, 0, 9,
    9, 0, 0, 0, 0, 0, 0, 0, 0, 9,
    9, 0, 0, 0, 0, 0, 0, 0, 0, 9,
    9, 9, 9, 9, 9, 9, 9, 9, 9, 9
);
};

/**
 * Добавляет фигуру в массив
 * @param {string} type тип фигуры
 * @param {array} coordinate массив с координатами
 */
ChessBoard.prototype.addFigure = function(type, coordinate) {
    var x = coordinate[0] * 1;
    var y = 9 - coordinate[1] * 1;
    this.board[y*10+x] = $.trim(type);
}

/**
 * Удаляем фигуру из массива
 * @param {array} coordinate массив с координатами
 */
ChessBoard.prototype.delFigure = function(coordinate) {
	var x = coordinate[0] * 1;
	var y = 9 - coordinate[1] * 1;
	this.board[y*10+x] = 0;
}

/**
 * Отмечает клетку доступной для хода
 * @param {int} indexArray индекс элемента в массиве обозначающего клетку
 */
ChessBoard.prototype.addAvaibleMove = function(indexArray) {
	var x = indexArray % 10;
	var y = 9 - Math.floor(indexArray/10);
	
	$("#cell"+y+x).addClass("avaibleForMove");
	
	// если игра начата
	if (inGame) {
    	$("#cell"+y+x).droppable("enable");
	};
}

/**
 * Делает проверку на доступность клетки, если она не доступна возвращает true
 * @param {int} indexArray индекс элемента в массиве обозначающего клетку
 * @return {Boolean} true если клетка занята своим
 */
ChessBoard.prototype.checkMove = function(indexArray) {
	if (indexArray < 10 || indexArray > 90) {
		return true;
	}
	
	
	
	
	
	if (this.simpleBoard[indexArray] == 0) {	
		this.addAvaibleMove(indexArray);
	} else {
		if (this.simpleBoard[indexArray] == 2) {
			this.addAvaibleMove(indexArray);
		}
		return true;
	}
}

/**
 * Конвертируем массив доски в простой вариант, где 2 - враги, 1 - свои
 * @param type тип фигуры
 */
ChessBoard.prototype.toSimpleBoard = function(type) {
	// конвертируем доску в массив где враги обозначены 2, а свои 1
	this.simpleBoard = new Array();
	if (type.charCodeAt(0) > 66 && type.charCodeAt(0) < 84) {
		// белые
		for (var i = 0; i < this.board.length; i++) {
			if (this.board[i].toString().charCodeAt(0) > 98 && this.board[i].toString().charCodeAt(0) < 116) {
				this.simpleBoard.push(2);
			} else if (this.board[i].toString().charCodeAt(0) > 66 && this.board[i].toString().charCodeAt(0) < 84) {
				this.simpleBoard.push(1);
			} else {
				this.simpleBoard.push(this.board[i]);
			}
		}
	}

	if (type.charCodeAt(0) > 98 && type.charCodeAt(0) < 116) {
		// черные
		for (var i = 0; i < this.board.length; i++) {
			if (this.board[i].toString().charCodeAt(0) > 66 && this.board[i].toString().charCodeAt(0) < 84) {
				this.simpleBoard.push(2);
			} else if (this.board[i].toString().charCodeAt(0) > 98 && this.board[i].toString().charCodeAt(0) < 116) {
				this.simpleBoard.push(1);
			} else {
				this.simpleBoard.push(this.board[i]);
			}
		}
	}
}

/**
 * Очищает все доступные ходы
 */
ChessBoard.prototype.clearAvaibleMoves = function() {
	$(".cell").removeClass("avaibleForMove");
	if (inGame) {
    	$(".cell").droppable("disable");
	};
}

/**
 * Показывает все доступные ходы для фигуры
 * @param coordinate массив с координатами фигуры, начало координат в верхнем левом углу
 */
ChessBoard.prototype.showAvaible = function(coordinate) {
	var x = coordinate[0] * 1;
	var y = 9 - coordinate[1] * 1;

	var type = this.board[y * 10 + x]; // тут нормальное обозначение
	var typeU = type.toUpperCase(); // тут обозначение только фигуры
	
	// проверка взята фигура с той стороны иил нет
	if ($("#status").text() == "Ход черных" && type.toString().charCodeAt(0) > 66 && type.toString().charCodeAt(0) < 84) {
		// взята черная а ход белых
	} else if ($("#status").text() == "Ход белых" && type.toString().charCodeAt(0) > 98 && type.toString().charCodeAt(0) < 116) {
		// взята белая а ход черных
	} else {
		// все правильно сделано )
		chboard.toSimpleBoard(type);
	
		switch (typeU) {
			case "P":
				// пешка
				var add = +1;
				if (type == "P") {
					add = -1;
				}
				// ход вперед
				if (chboard.simpleBoard[(y + add)*10+x] == 0) {
					chboard.addAvaibleMove((y + add)*10+x);
				}
				// удары по диагонали
				if (chboard.simpleBoard[(y + add)*10+x-1] == 2) {
					chboard.addAvaibleMove((y + add)*10+x-1);
				}
				if (chboard.simpleBoard[(y + add)*10+x+1] == 2) {
					chboard.addAvaibleMove((y + add)*10+x+1);
				}
				break;
				
			case "L":
				// ладья
				for (i = x - 1; i > 0; i--) {
					if (chboard.checkMove(y*10+i)) {break};
				}
				for (i = x + 1; i < 10; i++) {
					if (chboard.checkMove(y*10+i)) {break};
				}
				for (i = y - 1; i > 0; i--) {
					if (chboard.checkMove(i*10+x)) {break};
				}
				for (i = y + 1; i < 10; i++) {
					if (chboard.checkMove(i*10+x)) {break};
				}
				break;
				
			case "S":
				// ладья
				for (i = y*10+x-11; i > 10; i = i - 11) {
					if (chboard.checkMove(i)) {break};
				}
				for (i = y*10+x + 11; i < 90; i = i + 11) {
					if (chboard.checkMove(i)) {break};
				}
				for (i = y*10+x + 9; i < 90; i = i + 9) {
					if (chboard.checkMove(i)) {break};
				}
				for (i = y*10+x - 9; i > 10; i = i - 9) {
					if (chboard.checkMove(i)) {break};
				}
				break;
				
			case "K":
				// конь
				var indexArray = y*10+x;
				chboard.checkMove(indexArray - 19);
				chboard.checkMove(indexArray - 8);
				chboard.checkMove(indexArray + 12);
				chboard.checkMove(indexArray + 21);
				chboard.checkMove(indexArray + 19);
				chboard.checkMove(indexArray + 8);
				chboard.checkMove(indexArray - 12);
				chboard.checkMove(indexArray - 21);
				break;
				
			case "F":
				// ферзь
				for (i = x - 1; i > 0; i--) {
					if (chboard.checkMove(y*10+i)) {break};
				}
				for (i = x + 1; i < 10; i++) {
					if (chboard.checkMove(y*10+i)) {break};
				}
				for (i = y - 1; i > 0; i--) {
					if (chboard.checkMove(i*10+x)) {break};
				}
				for (i = y + 1; i < 10; i++) {
					if (chboard.checkMove(i*10+x)) {break};
				}
				for (i = y*10+x-11; i > 10; i = i - 11) {
					if (chboard.checkMove(i)) {break};
				}
				for (i = y*10+x + 11; i < 90; i = i + 11) {
					if (chboard.checkMove(i)) {break};
				}
				for (i = y*10+x + 9; i < 90; i = i + 9) {
					if (chboard.checkMove(i)) {break};
				}
				for (i = y*10+x - 9; i > 10; i = i - 9) {
					if (chboard.checkMove(i)) {break};
				}
				break;
				
			case "C":
				// король
				var indexArray = y*10+x;
				chboard.checkMove(indexArray - 11);
				chboard.checkMove(indexArray - 9);
				chboard.checkMove(indexArray + 9);
				chboard.checkMove(indexArray + 11);
				chboard.checkMove(indexArray - 10);
				chboard.checkMove(indexArray + 1);
				chboard.checkMove(indexArray + 10);
				chboard.checkMove(indexArray - 1);
				break;
				
		}
	}
}

$(document).ready(function(){
	// создаем доску
	chboard = new ChessBoard();
	
	// добавляем к фигурам возможность перетаскивания
	$(".figure").draggable({
		revert: "invalid",
		start: function(event, ui) {
			startPosition = $(this).parent().attr("id")
		}
	});
	
	// добавляем к клеткам возможность поставить на них фигуру
	$(".cell").droppable({
		drop: function(event, ui) {
			moveFigure(this, ui.draggable);
			if ($(".box>.figure").length == 0 && !inGame) {
				runGame();
			}
		}
	});
	
	// добавляем к нижним ящикам с фигурами возможность поставить фигуру
	$(".box").droppable({
		drop: function(event, ui) {
			removeFigure(this, ui.draggable)
		}
	})
	
	// запуск игры
	$("#run").click(function(){
		runGame();
	})
	
})

/**
 * Передвигает item в cell
 * @param cell клетка в которую передвигаем фигуру
 * @param item сама фигура
 */
function moveFigure(cell, item) {
	if ($(cell).children("img").length > 0) {
		// если убили фигуру добавляем её на "кладбище" фигур
		$(cell).children("img");
		$(".killed").append("<img src='" + $(cell).children("img").attr("src") + "' style='display: none;'/>");
		$(".killed").children("img").last().fadeIn(1500);
	}
	
	$(cell).html(item.css("left", 23).css("top", 10));
	$(cell).droppable("disable");
	// узнаем на какую клетку поставили фигуру
	var x = $(cell).attr("id").charAt(5);
	var y = $(cell).attr("id").charAt(4);
	var type = $(item)
					.attr("class")
					.replace("white", "")
					.replace("black", "")
					.replace("figure", "")
					.replace("ui-draggable", "")
					.replace("ui-draggable-dragging", "")
					.replace("ui-draggable-disabled", "")
					.replace("ui-state-disabled", "");
	chboard.addFigure(type, [x, y]);
	if (startPosition.indexOf("box") == -1) {
		// если взяли фигуру с доски
		chboard.delFigure([startPosition.charAt(5), startPosition.charAt(4)]);
	}
	$("#"+startPosition).droppable("enable");
	
	// проверка на шах
	if (inGame) {
		if (check("black") && $("#status").text() == "Ход черных") {
			alert("Ход недоступен т.к. король оказывается под ударом");
		} else if (check("black")) {
			alert("Шах черным");
		} else if (check("white") && $("#status").text() == "Ход белых") {
			alert("Ход недоступен т.к. король оказывается под ударом");
		} else if (check("white")) {
			alert("Шах белым");
		}
	}
}

/**
 * Удаляем фигуру из нужной клетки/коробки
 * @param cell откуда удаляем
 * @param item фигура
 */
function removeFigure(cell, item) {
	$(cell).append(item.css("left", 0).css("top", 0));
	$("#"+startPosition).droppable("enable");
	if (startPosition.indexOf("box") == -1) {
		// если взяли фигуру с доски
		chboard.delFigure([startPosition.charAt(5), startPosition.charAt(4)]);
	}
}


/**
 * Переключение фигур
 */
function switchSide() {
	if ($("#status").text() == "Ход белых") {
		$(".cell>.black").draggable("disable");
		$(".cell>.white").draggable("enable");
		$(".cell>.white").bind("dragstart", function(event, ui) {
			chboard.showAvaible([$(this).parent().attr("id").charAt(5), $(this).parent().attr("id").charAt(4)]);
		})
		$(".cell>.white").bind("dragstop", function(event, ui) {
			chboard.clearAvaibleMoves();
		})
	} else {
		$(".cell>.white").draggable("disable");
		$(".cell>.black").draggable("enable");
		$(".cell>.black").bind("dragstart", function(event, ui) {
			chboard.showAvaible([$(this).parent().attr("id").charAt(5), $(this).parent().attr("id").charAt(4)]);
		})
		$(".cell>.black").bind("dragstop", function(event, ui) {
			chboard.clearAvaibleMoves();
		})
	}
}

/**
* Проверка шаха
*/
function check(side) {
	var isCheck = false;
	if (side == "white") {
		// узнаем позицию белого короля
		var king = $(".cell>.C").parent().attr("id");
		// провека шаха белым
		$(".cell>.black").each(function(){
		    var coord = $(this).parent().attr("id");
			chboard.showAvaible([$(this).parent().attr("id").charAt(5), $(this).parent().attr("id").charAt(4)]);
			
			if ($("#" + king).hasClass("avaibleForMove")) {
				isCheck = true;
				return false; // останавливаем перебор элементов
			}
		})
	}
	if (side == "black") {
		var king = $(".cell>.c").parent().attr("id");
		$(".cell>.white").each(function(){
		    var coord = $(this).parent().attr("id");
			chboard.showAvaible([$(this).parent().attr("id").charAt(5), $(this).parent().attr("id").charAt(4)]);
			
			if ($("#" + king).hasClass("avaibleForMove")) {
				isCheck = true;
				return false;
			}
		})
	}
	chboard.clearAvaibleMoves();
	return isCheck;
}

/**
 * Запуск игры
 */
function runGame() {
	if ($("#whiteBox>img").length == 16 || $("#blackBox>img").length == 16) {
		alert("Требуется поставить на поле хотя бы по одной фигуре для обоих сторон!");
	} else if ($("#whiteBox>img.C").length > 0 || $("#blackBox>img.c").length > 0) {
		alert("На доске должны быть оба короля!");
	} else if (check("white") == true || check("black") == true) {
		chboard.clearAvaibleMoves();
		alert("Один из королей находит под ударом, для запуска исправьте это.");
	} else {
	  if (window.confirm("Уверенны? Пути назад не будет!")) {
		  // если не одна фигура не была расставлена автоматически расставляем все
		  
		  
		  inGame = true;
		  // убираем ящики с фигурами
		  $("#figuresBoxes").fadeOut("fast", function() {
			  $(".killed").fadeIn("fast");
		  });
		  
		  $("#run").parent().remove();
		  $("#status").parent().animate({
			  top: "20"
		  });
		  // выключаем все драг-дропы
		  $(".box").droppable("disable");
		  $(".cell").droppable("disable");
		  $(".figure").draggable("disable");
		  
		  $("#status").text("Ход белых");
		  
		  switchSide();
		  
		  
		  $(".avaibleForMove").live("drop", function(event, ui) {
			  if ($("#status").text() == "Ход белых") {
				  $("#status").text("Ход черных");
			  } else {
				  $("#status").text("Ход белых");
			  }
			  
			  switchSide();
		  })
	  }
	}
}