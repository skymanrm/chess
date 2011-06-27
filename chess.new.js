var inGame = false;
var whiteTurn = true;
var imagesSrc = {
    "PAWN": "images/1b.png",
    "ROOK": "images/2b.png",
    "KNIGHT": "images/3b.png",
    "BISHOP": "images/4b.png",
    "QUEEN": "images/5b.png",
    "KING": "images/6b.png",
    "pawn": "images/1c.png",
    "rook": "images/2c.png",
    "knight": "images/3c.png",
    "bishop": "images/4c.png",
    "queen": "images/5c.png",
    "king": "images/6c.png"
};
var movesHistory = [];
var isCheck = false;
var defStart = false;


function init () {    
    figures = new Figures();
    info = new Status();
    
    // перетаскивание фигур
    $(".figure").draggable({
        revert: "invalid"
    });
    
    $('.cell,#figuresBoxes').droppable({
        drop: function(e, ui) {
            figures.moveFigure(ui.draggable, this, false);
        }
    });
    
    figures.draw();
    
    $("#run").click(function(){
        run();
    })
    
    $("#run2").click(function(){
        defaultPositions(figures);
        run();
    })
}

function run() {
    if ($("#figuresBoxes>.figures[piece=king]").length > 0 || $("#figuresBoxes>.figures[piece=KING]").length > 0) {
        alert("Оба короля должны быть на доске");
        return false;
    }
    
    inGame = true;
    movesHistory.push(figures.board); // запись в историю ходов
    figures.draw();
    board = new Board();
    
    info.setText("Игра запущена!<br />Ход белых");
    $('.cell,#figuresBoxes').droppable("destroy");
    $('.cell,#figuresBoxes').droppable({
        disabled: true
    });
    
    $("#run,#run2").parent().remove();
    $("#status").parent().animate({
        top: "20"
    });
    $("#figuresBoxes").fadeOut("fast", function() {
        $(".killed").fadeIn("fast");
    });
       
    // взяли фигуру
    $(".cell>.white,.cell>.black").live("dragstart", function(e,ui) {
        if ((whiteTurn && $(this).attr("class").indexOf("white") != -1) || (!whiteTurn && $(this).attr("class").indexOf("black") != -1)) {
            board.showAviableMoves([[$(this).parent().attr("id").charAt(4)], [$(this).parent().attr("id").charAt(5)]], figures);
            board.draw();
        }
    });
    
    // отпустили фигуру
    $(".cell>.white,.cell>.black").live("dragstop", function(e,ui) {
        figures.draw();
        board.clearAviableMoves();
        board.draw();
    });
    
    
    // поставили фигуру на новую клетку
    $(".aviableForMove,.aviableForAttack").live("drop", function(e,ui) {
        var parent = $(ui.draggable).parent(); // FIX
        // предварительная проверка на отсутсвие шаха перед ходом
        var figures2 = clone(figures); // копируем фигуры
        board.clearAviableMoves();
        var board2 = clone(board); // копируем еще че то
        figures2.moveFigure(ui.draggable, this, parent); // имитируем ход
        check(figures2, board2); // проверяем шах имитируемого хода
        $(".cell").html("");
    
        if (isCheck) {
            figures.draw();
            board.clearAviableMoves();
            board.draw();
            alert("Ваш король находится под ударом!");
        } else {
            switchSide(); // переключаем сторону
            figures.moveFigure(ui.draggable, this, parent);
            figures.draw();
            board.clearAviableMoves();
            board.draw();        

            check(figures, board); // проверяем шах
            movesHistory.push(figures.board); // запись в историю ходов
            $('#moveFx')[0].play();
        }
    })
    
}




var Figures = function () {
    this.board = [
    [0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0]];

    this.simpleBoard = [
    [0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0]
    ];

    // добавляем фигуру на доску
    this.addFigure = function(addFigure, coordinates) {
        this.board[coordinates[0]][coordinates[1]] = $.trim(addFigure);
    };

    // удаляем фигуру с доски
    this.delFigure = function(coordinates) {
        this.board[coordinates[0]][coordinates[1]] = 0;
    };
        
    // передвижение фигуры
    this.moveFigure = function(figureDom, toDom, parent) {       
        // удаляем фигуру с доски, если она на ней стояла
        if (parent == false) {
            parent = $(figureDom).parent();
        } 
        if ($(parent).hasClass("cell")) {
            var yx = $(parent).attr("id");
            this.delFigure([yx.charAt(4), yx.charAt(5)]);
        }
        
        // берем тип фигуры
        var figureType = $(figureDom).attr("piece");
        
        // если фигура добавлена на доску
        if ($(toDom).hasClass("cell")) {
            $(".figure").draggable("disable");
            // если в этой клетке уже была фигура
            if ($(toDom).children(".figure").length > 0) {
                if (inGame) {
                    // фигура убита
                    $(".killed").append($(toDom).children(".figure").attr("style", "position: relative;"));                    
                } else {
                    // переносим в ящик с фигурами
                    $("#figuresBoxes").append($(toDom).children(".figure").attr("style", "position: relative;"));
                }                
            }
            
            yx = $(toDom).attr("id");
            this.addFigure(figureType, [yx.charAt(4), yx.charAt(5)]);
            $(figureDom).remove();
        } else {
            // если убрали фугуру в коробку
            $(toDom).append(figureDom);
            $(figureDom).attr("style", "position: relative;");
        }
        this.draw();
    }
    
    this.toSimpleBoard = function(figure) {        
        for (var i=0;i<this.board.length;i++) {
            for (var j=0;j<this.board[0].length;j++) {
                if (this.board[i][j] != 0) {
                    if 
                    (
                        (isWhite(figure) && isWhite(this.board[i][j])) || 
                        (!isWhite(figure) && !isWhite(this.board[i][j]))
                        ) {
                        // если обе фигуры белые или черные
                        this.simpleBoard[i][j] = 1;
                    } else {
                        this.simpleBoard[i][j] = 2;
                    }
                } else {
                    this.simpleBoard[i][j] = 0;
                }
            }
        }
        return true;
    }
    
    function isWhite(figure) {
        if (figure.toUpperCase() == figure) {
            return true;
        }
        return false;
    }
    
    this.draw = function() {
        $(".cell").html('');
        for (var i=0;i<this.board.length;i++) {
            for (var j=0;j<this.board[0].length;j++) {
                if (this.board[i][j] != 0) {
                    var f_class = isWhite(this.board[i][j]) ? "white figure" : "black figure";
                    var temp = "<img class='" + f_class + "' src='"+ imagesSrc[this.board[i][j]]+"' piece='" + this.board[i][j] + "'/>";
                    $("#cell"+i.toString()+j.toString()).html(temp);
                }
            }
        }
        
        $(".figure").draggable("destroy");        
        if (!inGame) {
            // делаем доступными для перетаскивания все фигуры на поле
            $(".figure").draggable({
                revert: "invalid"
            });
            // делаем доступными все свободные клетки на поле
            $(".cell").not($(".cell>.figure").parent()).droppable("enable");
        } else {
            // активируем перетаскивание
            if (whiteTurn) {
                $(".white").draggable({
                    revert: "invalid"
                });
            }
            else {
                $(".black").draggable({
                    revert: "invalid"
                });
            }
        }
    }
}

var Board = function() {
    // 0 - клетка не подсвечивается, 1 - клетка доступна для хода, 2 - клетка доступна для удара
    this.board = [
    [0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0]];

    this.addAviableMove = function(coordinates, type) {
        if (type == "attack") {
            this.board[coordinates[0]][coordinates[1]] = 2;
        } else {
            this.board[coordinates[0]][coordinates[1]] = 1;
        }
    }
    
    this.delAviableMove = function(coordinates) {
        this.board[coordinates[0]][coordinates[1]] = 0;
    }
    
    this.clearAviableMoves = function() {
        for (var i=0;i<this.board.length;i++) {
            for (var j=0;j<this.board[0].length;j++) {
                this.board[i][j] = 0;
            }
        }
    }
    
    this.checkAviableMove = function(coordinates, type, figures) {
        // type = move или attack или both
        if ((coordinates[0]*1>-1 && coordinates[0]*1<8 ) && (coordinates[1]*1>-1 && coordinates[1]*1<8)) {
            switch (type) {
                case "move":
                    if (figures.simpleBoard[coordinates[0]][coordinates[1]] == 0) {
                        this.addAviableMove(coordinates, "move");
                        return true;
                    }
                    break;

                case "attack":
                    if (figures.simpleBoard[coordinates[0]][coordinates[1]] == 2) {
                        this.addAviableMove(coordinates, "attack");
                        return true;
                    }
                    break;

                case "both":
                    if (figures.simpleBoard[coordinates[0]][coordinates[1]] == 0) {
                        this.addAviableMove(coordinates);
                        return true;
                    } else if (figures.simpleBoard[coordinates[0]][coordinates[1]] == 2) {
                        this.addAviableMove(coordinates, "attack");   
                        return false;
                    } else {
                        return false;
                    }
                    break;

                default:
                    break;
            }
        }
    }
    
    this.showAviableMoves = function(coordinates, figures) {
        if (!figures.toSimpleBoard(figures.board[coordinates[0]][coordinates[1]])) {
            return false;
        }
        
        switch (figures.board[coordinates[0]][coordinates[1]].toUpperCase()) {
            case "PAWN":
                // доступные ходы для пешки
                var moveDirection = -1;
                if (figures.board[coordinates[0]][coordinates[1]] == "pawn") {
                    moveDirection = +1;
                }
                this.checkAviableMove([coordinates[0]*1+moveDirection,coordinates[1]], "move", figures);
                this.checkAviableMove([coordinates[0]*1+moveDirection,coordinates[1]-1], "attack", figures);
                this.checkAviableMove([coordinates[0]*1+moveDirection,coordinates[1]*1+1], "attack", figures);
                
                if (defStart && (coordinates[0]*1 < 2 || coordinates[0]*1 > 5) && this.checkAviableMove([coordinates[0]*1+moveDirection,coordinates[1]], "move", figures)) {
                    this.checkAviableMove([coordinates[0]*1+moveDirection*2,coordinates[1]], "move", figures);
                }
                
                break;
                
            case "ROOK":
                // доступные ходы для ладья
                for (var i=coordinates[1]*1-1;i>-1; i--) {
                    if (!this.checkAviableMove([coordinates[0],i], "both", figures)) {break}
                }
                for (var i=coordinates[1]*1+1;i<8; i++) {
                    if (!this.checkAviableMove([coordinates[0],i], "both", figures)) {break}
                }
                for (var i=coordinates[0]*1-1;i>-1; i--) {
                    if (!this.checkAviableMove([i,coordinates[1]], "both", figures)) {break}
                }
                for (var i=coordinates[0]*1+1;i<8; i++) {
                    if (!this.checkAviableMove([i,coordinates[1]], "both", figures)) {break}
                }
                break;
                
            case "KNIGHT":
                // доступные ходы для коня
                this.checkAviableMove([coordinates[0]*1-1,coordinates[1]*1-2], "both", figures);
                this.checkAviableMove([coordinates[0]*1-2,coordinates[1]*1-1], "both", figures);
                this.checkAviableMove([coordinates[0]*1-2,coordinates[1]*1+1], "both", figures);
                this.checkAviableMove([coordinates[0]*1-1,coordinates[1]*1+2], "both", figures);
                this.checkAviableMove([coordinates[0]*1+1,coordinates[1]*1+2], "both", figures);
                this.checkAviableMove([coordinates[0]*1+2,coordinates[1]*1+1], "both", figures);
                this.checkAviableMove([coordinates[0]*1+2,coordinates[1]*1-1], "both", figures);
                this.checkAviableMove([coordinates[0]*1+1,coordinates[1]*1-2], "both", figures);
                break;
                
            case "BISHOP":
                // доступные ходы для слона
                for (var i=1;i<this.board.length; i++) {
                    if (!this.checkAviableMove([coordinates[0]*1-i,coordinates[1]*1-i], "both", figures)) {break}
                }
                for (var i=1;i<this.board.length; i++) {
                    if (!this.checkAviableMove([coordinates[0]*1-i,coordinates[1]*1+i], "both", figures)) {break}
                }
                for (var i=1;i<this.board.length; i++) {
                    if (!this.checkAviableMove([coordinates[0]*1+i,coordinates[1]*1-i], "both", figures)) {break}
                }
                for (var i=1;i<this.board.length; i++) {
                    if (!this.checkAviableMove([coordinates[0]*1+i,coordinates[1]*1+i], "both", figures)) {break}
                }
                break;
                
            case "QUEEN":
                // доступные ходля для ферзя
                for (var i=coordinates[1]*1-1;i>-1; i--) {
                    if (!this.checkAviableMove([coordinates[0],i], "both", figures)) {break}
                }
                for (var i=coordinates[1]*1+1;i<8; i++) {
                    if (!this.checkAviableMove([coordinates[0],i], "both", figures)) {break}
                }
                for (var i=coordinates[0]*1-1;i>-1; i--) {
                    if (!this.checkAviableMove([i,coordinates[1]], "both", figures)) {break}
                }
                for (var i=coordinates[0]*1+1;i<8; i++) {
                    if (!this.checkAviableMove([i,coordinates[1]], "both", figures)) {break}
                }
                for (var i=1;i<this.board.length; i++) {
                    if (!this.checkAviableMove([coordinates[0]*1-i,coordinates[1]*1-i], "both", figures)) {break}
                }
                for (var i=1;i<this.board.length; i++) {
                    if (!this.checkAviableMove([coordinates[0]*1-i,coordinates[1]*1+i], "both", figures)) {break}
                }
                for (var i=1;i<this.board.length; i++) {
                    if (!this.checkAviableMove([coordinates[0]*1+i,coordinates[1]*1-i], "both", figures)) {break}
                }
                for (var i=1;i<this.board.length; i++) {
                    if (!this.checkAviableMove([coordinates[0]*1+i,coordinates[1]*1+i], "both", figures)) {break}
                }
                break;
                
            case "KING":
                this.checkAviableMove([coordinates[0]*1-1,coordinates[1]], "both", figures);
                this.checkAviableMove([coordinates[0]*1-1,coordinates[1]*1+1], "both", figures);
                this.checkAviableMove([coordinates[0],coordinates[1]*1+1], "both", figures);
                this.checkAviableMove([coordinates[0]*1+1,coordinates[1]*1+1], "both", figures);
                this.checkAviableMove([coordinates[0]*1+1,coordinates[1]], "both", figures);
                this.checkAviableMove([coordinates[0]*1+1,coordinates[1]*1-1], "both", figures);
                this.checkAviableMove([coordinates[0],coordinates[1]*1-1], "both", figures);
                this.checkAviableMove([coordinates[0]*1-1,coordinates[1]*1-1], "both", figures);
                break;
                
            default:
                break;
        }
    }
    
    this.draw = function () {
        $(".cell").removeClass("aviableForMove").removeClass("aviableForAttack").droppable("disable");
        for (var i=0;i<this.board.length;i++) {
            for (var j=0;j<this.board[0].length;j++) {
                if (this.board[i][j] == 1) {
                    $("#cell" + i.toString()+j.toString()).addClass("aviableForMove");
                } else if (this.board[i][j] == 2) {
                    $("#cell" + i.toString()+j.toString()).addClass("aviableForAttack");
                }
            }
        }
        
        $(".aviableForMove,.aviableForAttack").droppable("enable");
    }
}

var Status = function() {
    this.setText = function(text) {
        $("#status").html(text);
    }
}

function switchSide() {
    whiteTurn = whiteTurn == true ? false : true;
            
    if (whiteTurn) {
        info.setText("Ходят белые");
        $(".cell>.black").draggable("disable");
        $(".cell>.white").draggable("enable");
    } else {
        info.setText("Ходя черные");
        $(".cell>.black").draggable("enable");
        $(".cell>.white").draggable("disable");
    }
}

function check(figures, board) {
    if (!whiteTurn) {
        // шах черным
        for (var i=0;i<this.board.length;i++) {
            for (var j=0;j<this.board[0].length;j++) {
                if (figures.board[i][j] != 0 && (figures.board[i][j].indexOf("N") != -1 || figures.board[i][j].indexOf("O") != -1)) {
                    board.showAviableMoves([i, j], figures);
                }
            }
        }
        var yxKing = $(".cell>.figure[piece=king]").parent().attr("id");
        if (board.board[yxKing.charAt(4)][yxKing.charAt(5)] > 0) {
            info.setText("Шах черным!<br />");
            isCheck = true;
        } else {
            isCheck = false;
        }        
    } else {
        // шах белым
        for (var i=0;i<this.board.length;i++) {
            for (var j=0;j<this.board[0].length;j++) {
                if (figures.board[i][j] != 0 && (figures.board[i][j].indexOf("n") != -1 || figures.board[i][j].indexOf("o") != -1)) {
                    board.showAviableMoves([i, j], figures);
                }
            }
        }
        yxKing = $(".cell>.figure[piece=KING]").parent().attr("id");
        if (board.board[yxKing.charAt(4)][yxKing.charAt(5)] > 0) {
            info.setText("Шах белым!<br />");
            isCheck = true;
        } else {
            isCheck = false;
        } 
    }
    board.clearAviableMoves();
}

function clone(o) {
    if(!o || 'object' !== typeof o)  {
        return o;
    }
    var c = 'function' === typeof o.pop ? [] : {};
    var p, v;
    for(p in o) {
        if(o.hasOwnProperty(p)) {
            v = o[p];
            if(v && 'object' === typeof v) {
                c[p] = clone(v);
            }
            else {
                c[p] = v;
            }
        }
    }
    return c;
}

function defaultPositions(figures) {
    for (var i=0; i<2; i++) {
        for (var j=0;j<8;j++) {
            var i2 = i==0 ? 1 : 6;
            var pawn = i==0 ? "pawn" : "PAWN";
            figures.board[i2][j] = pawn;
        }
    }
    
    figures.board[0][0] = "rook";figures.board[0][7] = "rook";
    figures.board[7][0] = "ROOK";figures.board[7][7] = "ROOK";
    figures.board[0][1] = "knight";figures.board[0][6] = "knight";
    figures.board[7][1] = "KNIGHT";figures.board[7][6] = "KNIGHT";
    figures.board[0][2] = "bishop";figures.board[0][5] = "bishop";
    figures.board[7][2] = "BISHOP";figures.board[7][5] = "BISHOP";
    figures.board[0][4] = "queen";figures.board[0][3] = "king";
    figures.board[7][4] = "QUEEN";figures.board[7][3] = "KING";
    
    $("#figuresBoxes").html("");
    
    defStart = true;
}