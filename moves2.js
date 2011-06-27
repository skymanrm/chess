var avaibleMoves_pawn = new Array (
	0, 3, 0,
	2, 1, 2,
	0, 5, 0
);

var avaibleMoves_rook = new Array (
	0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 ,0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 ,0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 ,0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 ,0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 ,0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 ,0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 ,0, 0, 0,
	1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1,
	0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 ,0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 ,0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 ,0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 ,0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 ,0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 ,0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 ,0, 0, 0,
);


function start() {
	board = new Board();
	pawn = new figure(1, "c", [2,2]); 
}

function Board() {
	this.current = new Array(
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
	); // 64 пустые клетки + границы
	
}

Board.prototype.compare = function(avaible, figure) {
	var x = figure.position[x];
	var y = figure.position[y];
	
	var avaible_right_moves = 8 - x;
	var avaible_left_moves = x;
	var avaible_down_moves = y;
	var avaible_up_moves = 8 -y;
	
	// ищем 5ку
	var len = Math.sqrt(avaible.length);
	for (i = 0; i < len; i++) {
		for (j = 0; j < len; j++) {
			if (avaible[i * len + j] == 5) {
				alert(i*len+j);
			}
		}
	}
}


function figure(type, color, position) {
	this.type = type; // одной цифрой
	this.color = color; // b - белые | c - черные
	this.position = position; // массив {x;y}
	
	// после создания ставим фигуру на её место
	$(["#c", this.position[y], this.position[x]].join("")).html("<img src='images/"+this.type+this.color+".png' />");
	
	// вычисляем место в board.current
	Board.current[8 + (y*1-1)*10 + 1 + x*1] = this.type+";"+this.color;
}