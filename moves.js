function show_avaible_moves(figure, coordinates) {
	var x = coordinates.charAt(2);
	var y = coordinates.charAt(1);
	// белые начинают сверху
	switch (figure) {
		case "1c":
			// черная пешка
			// ход вперед
			if (y<8 && $(["#c", y*1+1, x].join("")).children("img").length == 0) {
				$(["#c", y*1+1, x].join("")).addClass("avmove");
			}
			
			//если ход на "своей" территории
			if (y<3 && $(["#c", y*1+2, x].join("")).children("img").length == 0) {
				$(["#c", y*1+2, x].join("")).addClass("avmove");
			}
			
			// удар по диагонало влево-вверх
			if (x>1 && $(["#c", y*1+1, x*1-1].join("")).children("img").length > 0) {
				if ($(["#c", y*1+1, x*1-1].join("")).children("img").attr("src").indexOf("b") != -1) {
					$(["#c", y*1+1, x*1-1].join("")).addClass("avmove");
				}
			}
			// удар по диагонало вправо-вверх
			if (x<8 && $(["#c", y*1+1, x*1+1].join("")).children("img").length > 0) {
				if ($(["#c", y*1+1, x*1+1].join("")).children("img").attr("src").indexOf("b") != -1) {
					$(["#c", y*1+1, x*1+1].join("")).addClass("avmove");
				}
			}
			break;
			
		case "1b":
			// белая пешка
			// ход вперед
			if (y>1 && $(["#c", y*1-1, x].join("")).children("img").length == 0) {
				$(["#c", y*1-1, x].join("")).addClass("avmove");
			}
			//если ход на "своей" территории
			if (y>6 && $(["#c", y*1-2, x].join("")).children("img").length == 0) {
				$(["#c", y*1-2, x].join("")).addClass("avmove");
			}
			
			// удар по диагонало влево-вниз
			if (x>1 && $(["#c", y*1-1, x*1-1].join("")).children("img").length > 0) {
				if ($(["#c", y*1-1, x*1-1].join("")).children("img").attr("src").indexOf("c") != -1) {
					$(["#c", y*1-1, x*1-1].join("")).addClass("avmove");
				}
			}
			// удар по диагонало вправо-вниз
			if (x<8 && $(["#c", y*1-1, x*1+1].join("")).children("img").length > 0) {
				if ($(["#c", y*1-1, x*1+1].join("")).children("img").attr("src").indexOf("c") != -1) {
					$(["#c", y*1-1, x*1+1].join("")).addClass("avmove");
				}
			}
			break;
		
		case "2c":
			// черная ладья
			for (i = y*1+1; i < 9; i++) {
				// путь по вертикали вверх
				if ($(["#c", i, x].join("")).children("img").length != 0) {
					// если белая фигура - можно бить
					if ($(["#c", i, x].join("")).children("img").attr("src").indexOf("b") != -1) {
						$(["#c", i, x].join("")).addClass("avmove");
					}
					break;
				}
				$(["#c", i, x].join("")).addClass("avmove");
			}
			
			for (i = y*1-1; i > 0; i--) {
				// путь по вертикали вниз
				if ($(["#c", i, x].join("")).children("img").length != 0) {
					// если белая фигура - можно бить
					if ($(["#c", i, x].join("")).children("img").attr("src").indexOf("b") != -1) {
						$(["#c", i, x].join("")).addClass("avmove");
					}
					break;
				}
				$(["#c", i, x].join("")).addClass("avmove");
			}
			
			for (i = x*1+1; i < 9; i++) {
				// путь по горизонтали влево
				if ($(["#c", y, i].join("")).children("img").length != 0) {
					// если белая фигура - можно бить
					if ($(["#c", y, i].join("")).children("img").attr("src").indexOf("b") != -1) {
						$(["#c", y, i].join("")).addClass("avmove");
					}
					break;
				}
				$(["#c", y, i].join("")).addClass("avmove");
			}
			
			for (i = x*1-1; i > 0; i--) {
				// путь по горизонтали влево
				if ($(["#c", y, i].join("")).children("img").length != 0) {
					// если белая фигура - можно бить
					if ($(["#c", y, i].join("")).children("img").attr("src").indexOf("b") != -1) {
						$(["#c", y, i].join("")).addClass("avmove");
					}
					break;
				}
				$(["#c", y, i].join("")).addClass("avmove");
			}
			
			break;
			
		case "2b":
			// белая ладья
			for (i = y*1+1; i < 9; i++) {
				// путь по вертикали вверх
				if ($(["#c", i, x].join("")).children("img").length != 0) {
					// если белая фигура - можно бить
					if ($(["#c", i, x].join("")).children("img").attr("src").indexOf("c") != -1) {
						$(["#c", i, x].join("")).addClass("avmove");
					}
					break;
				}
				$(["#c", i, x].join("")).addClass("avmove");
			}
			
			for (i = y*1-1; i > 0; i--) {
				// путь по вертикали вниз
				if ($(["#c", i, x].join("")).children("img").length != 0) {
					// если белая фигура - можно бить
					if ($(["#c", i, x].join("")).children("img").attr("src").indexOf("c") != -1) {
						$(["#c", i, x].join("")).addClass("avmove");
					}
					break;
				}
				$(["#c", i, x].join("")).addClass("avmove");
			}
			
			for (i = x*1+1; i < 9; i++) {
				// путь по горизонтали влево
				if ($(["#c", y, i].join("")).children("img").length != 0) {
					// если белая фигура - можно бить
					if ($(["#c", y, i].join("")).children("img").attr("src").indexOf("c") != -1) {
						$(["#c", y, i].join("")).addClass("avmove");
					}
					break;
				}
				$(["#c", y, i].join("")).addClass("avmove");
			}
			
			for (i = x*1-1; i > 0; i--) {
				// путь по горизонтали влево
				if ($(["#c", y, i].join("")).children("img").length != 0) {
					// если белая фигура - можно бить
					if ($(["#c", y, i].join("")).children("img").attr("src").indexOf("c") != -1) {
						$(["#c", y, i].join("")).addClass("avmove");
					}
					break;
				}
				$(["#c", y, i].join("")).addClass("avmove");
			}
			
			break;
			
		case "3c":
			// черный конь
			// 8 клеток для хода коня
			if (y<7) {
				// ход вверх влево
				if (x>1) {
					if ($(["#c", y*1+2, x*1-1].join("")).children("img").length > 0) {
						if ($(["#c", y*1+2, x*1-1].join("")).children("img").attr("src").indexOf("b") != -1) {
							$(["#c", y*1+2, x*1-1].join("")).addClass("avmove");
						}
					} else {
						$(["#c", y*1+2, x*1-1].join("")).addClass("avmove");
					}
				}
				// ход вверх вправо
				if (x<8) {
					if ($(["#c", y*1+2, x*1+1].join("")).children("img").length > 0) {
						if ($(["#c", y*1+2, x*1+1].join("")).children("img").attr("src").indexOf("b") != -1) {
							$(["#c", y*1+2, x*1+1].join("")).addClass("avmove");
						}
					} else {
						$(["#c", y*1+2, x*1+1].join("")).addClass("avmove");
					}
				}
			}
			if (y>2) {
				// ход вниз влево
				if (x>1) {
					if ($(["#c", y*1-2, x*1-1].join("")).children("img").length > 0) {
						if ($(["#c", y*1-2, x*1-1].join("")).children("img").attr("src").indexOf("b") != -1) {
							$(["#c", y*1-2, x*1-1].join("")).addClass("avmove");
						}
					} else {
						$(["#c", y*1-2, x*1-1].join("")).addClass("avmove");
					}
				}
				// ход вниз вправо
				if (x<8) {
					if ($(["#c", y*1-2, x*1+1].join("")).children("img").length > 0) {
						if ($(["#c", y*1-2, x*1+1].join("")).children("img").attr("src").indexOf("b") != -1) {
							$(["#c", y*1-2, x*1+1].join("")).addClass("avmove");
						}
					} else {
						$(["#c", y*1-2, x*1+1].join("")).addClass("avmove");
					}
				}
			}
			if (x<7) {
				// ход вправо вверх 
				if ($(["#c", y*1+1, x*1+2].join("")).children("img").length > 0) {
					if ($(["#c", y*1+1, x*1+2].join("")).children("img").attr("src").indexOf("b") != -1) {
						$(["#c", y*1+1, x*1+2].join("")).addClass("avmove");
					}
				} else {
					$(["#c", y*1+1, x*1+2].join("")).addClass("avmove");
				}
				// ход вправо вниз
				if ($(["#c", y*1-1, x*1+2].join("")).children("img").length > 0) {
					if ($(["#c", y*1-1, x*1+2].join("")).children("img").attr("src").indexOf("b") != -1) {
						$(["#c", y*1-1, x*1+2].join("")).addClass("avmove");
					}
				} else {
					$(["#c", y*1-1, x*1+2].join("")).addClass("avmove");
				}
			}
			if (x>2) {
				// ход влево вверх 
				if ($(["#c", y*1+1, x*1-2].join("")).children("img").length > 0) {
					if ($(["#c", y*1+1, x*1-2].join("")).children("img").attr("src").indexOf("b") != -1) {
						$(["#c", y*1+1, x*1-2].join("")).addClass("avmove");
					}
				} else {
					$(["#c", y*1+1, x*1-2].join("")).addClass("avmove");
				}
				// ход влево вниз
				if ($(["#c", y*1-1, x*1-2].join("")).children("img").length > 0) {
					if ($(["#c", y*1-1, x*1-2].join("")).children("img").attr("src").indexOf("b") != -1) {
						$(["#c", y*1-1, x*1-2].join("")).addClass("avmove");
					}
				} else {
					$(["#c", y*1-1, x*1-2].join("")).addClass("avmove");
				}
			}
			
			break;
			
		case "3b":
			// белый конь
			// 8 клеток для хода коня
			if (y<7) {
				// ход вверх влево
				if (x>1) {
					if ($(["#c", y*1+2, x*1-1].join("")).children("img").length > 0) {
						if ($(["#c", y*1+2, x*1-1].join("")).children("img").attr("src").indexOf("c") != -1) {
							$(["#c", y*1+2, x*1-1].join("")).addClass("avmove");
						}
					} else {
						$(["#c", y*1+2, x*1-1].join("")).addClass("avmove");
					}
				}
				// ход вверх вправо
				if (x<8) {
					if ($(["#c", y*1+2, x*1+1].join("")).children("img").length > 0) {
						if ($(["#c", y*1+2, x*1+1].join("")).children("img").attr("src").indexOf("c") != -1) {
							$(["#c", y*1+2, x*1+1].join("")).addClass("avmove");
						}
					} else {
						$(["#c", y*1+2, x*1+1].join("")).addClass("avmove");
					}
				}
			}
			if (y>2) {
				// ход вниз влево
				if (x>1) {
					if ($(["#c", y*1-2, x*1-1].join("")).children("img").length > 0) {
						if ($(["#c", y*1-2, x*1-1].join("")).children("img").attr("src").indexOf("c") != -1) {
							$(["#c", y*1-2, x*1-1].join("")).addClass("avmove");
						}
					} else {
						$(["#c", y*1-2, x*1-1].join("")).addClass("avmove");
					}
				}
				// ход вниз вправо
				if (x<8) {
					if ($(["#c", y*1-2, x*1+1].join("")).children("img").length > 0) {
						if ($(["#c", y*1-2, x*1+1].join("")).children("img").attr("src").indexOf("c") != -1) {
							$(["#c", y*1-2, x*1+1].join("")).addClass("avmove");
						}
					} else {
						$(["#c", y*1-2, x*1+1].join("")).addClass("avmove");
					}
				}
			}
			if (x<7) {
				// ход вправо вверх 
				if ($(["#c", y*1+1, x*1+2].join("")).children("img").length > 0) {
					if ($(["#c", y*1+1, x*1+2].join("")).children("img").attr("src").indexOf("c") != -1) {
						$(["#c", y*1+1, x*1+2].join("")).addClass("avmove");
					}
				} else {
					$(["#c", y*1+1, x*1+2].join("")).addClass("avmove");
				}
				// ход вправо вниз
				if ($(["#c", y*1-1, x*1+2].join("")).children("img").length > 0) {
					if ($(["#c", y*1-1, x*1+2].join("")).children("img").attr("src").indexOf("c") != -1) {
						$(["#c", y*1-1, x*1+2].join("")).addClass("avmove");
					}
				} else {
					$(["#c", y*1-1, x*1+2].join("")).addClass("avmove");
				}
			}
			if (x>2) {
				// ход влево вверх 
				if ($(["#c", y*1+1, x*1-2].join("")).children("img").length > 0) {
					if ($(["#c", y*1+1, x*1-2].join("")).children("img").attr("src").indexOf("c") != -1) {
						$(["#c", y*1+1, x*1-2].join("")).addClass("avmove");
					}
				} else {
					$(["#c", y*1+1, x*1-2].join("")).addClass("avmove");
				}
				// ход влево вниз
				if ($(["#c", y*1-1, x*1-2].join("")).children("img").length > 0) {
					if ($(["#c", y*1-1, x*1-2].join("")).children("img").attr("src").indexOf("c") != -1) {
						$(["#c", y*1-1, x*1-2].join("")).addClass("avmove");
					}
				} else {
					$(["#c", y*1-1, x*1-2].join("")).addClass("avmove");
				}
			}
			
			break;
			
		case "4c":
			// черный слон
			// ход по диагонали влево вверх
			var temp_y = y*1;
			for (i=x*1-1; i>0; i--) {
				temp_y ++;
				if (temp_y < 9) {
					if ($(["#c", temp_y, i].join("")).children("img").length > 0) {
						if ($(["#c", temp_y, i].join("")).children("img").attr("src").indexOf("b") != -1) {
							$(["#c", temp_y, i].join("")).addClass("avmove");
						}
						break;
					}
					$(["#c", temp_y, i].join("")).addClass("avmove");
				}
			}
			// ход по диагонали влево вниз
			var temp_y = y*1;
			for (i=x*1-1; i>0; i--) {
				temp_y --;
				if (temp_y > 0) {
					if ($(["#c", temp_y, i].join("")).children("img").length > 0) {
						if ($(["#c", temp_y, i].join("")).children("img").attr("src").indexOf("b") != -1) {
							$(["#c", temp_y, i].join("")).addClass("avmove");
						}
						break;
					}
					$(["#c", temp_y, i].join("")).addClass("avmove");
				}
			}
			// ход по диагонали вправо вверх
			var temp_y = y*1;
			for (i=x*1+1; i<9; i++) {
				temp_y ++;
				if (temp_y < 9) {
					if ($(["#c", temp_y, i].join("")).children("img").length > 0) {
						if ($(["#c", temp_y, i].join("")).children("img").attr("src").indexOf("b") != -1) {
							$(["#c", temp_y, i].join("")).addClass("avmove");
						}
						break;
					}
					$(["#c", temp_y, i].join("")).addClass("avmove");
				}
			}
			// ход по диагонали вправо вниз
			var temp_y = y*1;
			for (i=x*1+1; i<9; i++) {
				temp_y --;
				if (temp_y > 0) {
					if ($(["#c", temp_y, i].join("")).children("img").length > 0) {
						if ($(["#c", temp_y, i].join("")).children("img").attr("src").indexOf("b") != -1) {
							$(["#c", temp_y, i].join("")).addClass("avmove");
						}
						break;
					}
					$(["#c", temp_y, i].join("")).addClass("avmove");
				}
			}
			break;
			
			
		case "4b":
			// белый слон
			// ход по диагонали влево вверх
			var temp_y = y*1;
			for (i=x*1-1; i>0; i--) {
				temp_y ++;
				if (temp_y < 9) {
					if ($(["#c", temp_y, i].join("")).children("img").length > 0) {
						if ($(["#c", temp_y, i].join("")).children("img").attr("src").indexOf("c") != -1) {
							$(["#c", temp_y, i].join("")).addClass("avmove");
						}
						break;
					}
					$(["#c", temp_y, i].join("")).addClass("avmove");
				}
			}
			// ход по диагонали влево вниз
			var temp_y = y*1;
			for (i=x*1-1; i>0; i--) {
				temp_y --;
				if (temp_y > 0) {
					if ($(["#c", temp_y, i].join("")).children("img").length > 0) {
						if ($(["#c", temp_y, i].join("")).children("img").attr("src").indexOf("c") != -1) {
							$(["#c", temp_y, i].join("")).addClass("avmove");
						}
						break;
					}
					$(["#c", temp_y, i].join("")).addClass("avmove");
				}
			}
			// ход по диагонали вправо вверх
			var temp_y = y*1;
			for (i=x*1+1; i<9; i++) {
				temp_y ++;
				if (temp_y < 9) {
					if ($(["#c", temp_y, i].join("")).children("img").length > 0) {
						if ($(["#c", temp_y, i].join("")).children("img").attr("src").indexOf("c") != -1) {
							$(["#c", temp_y, i].join("")).addClass("avmove");
						}
						break;
					}
					$(["#c", temp_y, i].join("")).addClass("avmove");
				}
			}
			// ход по диагонали вправо вниз
			var temp_y = y*1;
			for (i=x*1+1; i<9; i++) {
				temp_y --;
				if (temp_y > 0) {
					if ($(["#c", temp_y, i].join("")).children("img").length > 0) {
						if ($(["#c", temp_y, i].join("")).children("img").attr("src").indexOf("c") != -1) {
							$(["#c", temp_y, i].join("")).addClass("avmove");
						}
						break;
					}
					$(["#c", temp_y, i].join("")).addClass("avmove");
				}
			}
			break;
			
		case "5c":
			// черный ферзь
			// ход по диагонали влево вверх
			var temp_y = y*1;
			for (i=x*1-1; i>0; i--) {
				temp_y ++;
				if (temp_y < 9) {
					if ($(["#c", temp_y, i].join("")).children("img").length > 0) {
						if ($(["#c", temp_y, i].join("")).children("img").attr("src").indexOf("b") != -1) {
							$(["#c", temp_y, i].join("")).addClass("avmove");
						}
						break;
					}
					$(["#c", temp_y, i].join("")).addClass("avmove");
				}
			}
			// ход по диагонали влево вниз
			var temp_y = y*1;
			for (i=x*1-1; i>0; i--) {
				temp_y --;
				if (temp_y > 0) {
					if ($(["#c", temp_y, i].join("")).children("img").length > 0) {
						if ($(["#c", temp_y, i].join("")).children("img").attr("src").indexOf("b") != -1) {
							$(["#c", temp_y, i].join("")).addClass("avmove");
						}
						break;
					}
					$(["#c", temp_y, i].join("")).addClass("avmove");
				}
			}
			// ход по диагонали вправо вверх
			var temp_y = y*1;
			for (i=x*1+1; i<9; i++) {
				temp_y ++;
				if (temp_y < 9) {
					if ($(["#c", temp_y, i].join("")).children("img").length > 0) {
						if ($(["#c", temp_y, i].join("")).children("img").attr("src").indexOf("b") != -1) {
							$(["#c", temp_y, i].join("")).addClass("avmove");
						}
						break;
					}
					$(["#c", temp_y, i].join("")).addClass("avmove");
				}
			}
			// ход по диагонали вправо вниз
			var temp_y = y*1;
			for (i=x*1+1; i<9; i++) {
				temp_y --;
				if (temp_y > 0) {
					if ($(["#c", temp_y, i].join("")).children("img").length > 0) {
						if ($(["#c", temp_y, i].join("")).children("img").attr("src").indexOf("b") != -1) {
							$(["#c", temp_y, i].join("")).addClass("avmove");
						}
						break;
					}
					$(["#c", temp_y, i].join("")).addClass("avmove");
				}
			}
			
			for (i = y*1+1; i < 9; i++) {
				// путь по вертикали вверх
				if ($(["#c", i, x].join("")).children("img").length != 0) {
					// если белая фигура - можно бить
					if ($(["#c", i, x].join("")).children("img").attr("src").indexOf("b") != -1) {
						$(["#c", i, x].join("")).addClass("avmove");
					}
					break;
				}
				$(["#c", i, x].join("")).addClass("avmove");
			}
			
			for (i = y*1-1; i > 0; i--) {
				// путь по вертикали вниз
				if ($(["#c", i, x].join("")).children("img").length != 0) {
					// если белая фигура - можно бить
					if ($(["#c", i, x].join("")).children("img").attr("src").indexOf("b") != -1) {
						$(["#c", i, x].join("")).addClass("avmove");
					}
					break;
				}
				$(["#c", i, x].join("")).addClass("avmove");
			}
			
			for (i = x*1+1; i < 9; i++) {
				// путь по горизонтали влево
				if ($(["#c", y, i].join("")).children("img").length != 0) {
					// если белая фигура - можно бить
					if ($(["#c", y, i].join("")).children("img").attr("src").indexOf("b") != -1) {
						$(["#c", y, i].join("")).addClass("avmove");
					}
					break;
				}
				$(["#c", y, i].join("")).addClass("avmove");
			}
			
			for (i = x*1-1; i > 0; i--) {
				// путь по горизонтали влево
				if ($(["#c", y, i].join("")).children("img").length != 0) {
					// если белая фигура - можно бить
					if ($(["#c", y, i].join("")).children("img").attr("src").indexOf("b") != -1) {
						$(["#c", y, i].join("")).addClass("avmove");
					}
					break;
				}
				$(["#c", y, i].join("")).addClass("avmove");
			}
			
			break;
			
		case "5b":
			// черный ферзь
			// ход по диагонали влево вверх
			var temp_y = y*1;
			for (i=x*1-1; i>0; i--) {
				temp_y ++;
				if (temp_y < 9) {
					if ($(["#c", temp_y, i].join("")).children("img").length > 0) {
						if ($(["#c", temp_y, i].join("")).children("img").attr("src").indexOf("c") != -1) {
							$(["#c", temp_y, i].join("")).addClass("avmove");
						}
						break;
					}
					$(["#c", temp_y, i].join("")).addClass("avmove");
				}
			}
			// ход по диагонали влево вниз
			var temp_y = y*1;
			for (i=x*1-1; i>0; i--) {
				temp_y --;
				if (temp_y > 0) {
					if ($(["#c", temp_y, i].join("")).children("img").length > 0) {
						if ($(["#c", temp_y, i].join("")).children("img").attr("src").indexOf("c") != -1) {
							$(["#c", temp_y, i].join("")).addClass("avmove");
						}
						break;
					}
					$(["#c", temp_y, i].join("")).addClass("avmove");
				}
			}
			// ход по диагонали вправо вверх
			var temp_y = y*1;
			for (i=x*1+1; i<9; i++) {
				temp_y ++;
				if (temp_y < 9) {
					if ($(["#c", temp_y, i].join("")).children("img").length > 0) {
						if ($(["#c", temp_y, i].join("")).children("img").attr("src").indexOf("c") != -1) {
							$(["#c", temp_y, i].join("")).addClass("avmove");
						}
						break;
					}
					$(["#c", temp_y, i].join("")).addClass("avmove");
				}
			}
			// ход по диагонали вправо вниз
			var temp_y = y*1;
			for (i=x*1+1; i<9; i++) {
				temp_y --;
				if (temp_y > 0) {
					if ($(["#c", temp_y, i].join("")).children("img").length > 0) {
						if ($(["#c", temp_y, i].join("")).children("img").attr("src").indexOf("c") != -1) {
							$(["#c", temp_y, i].join("")).addClass("avmove");
						}
						break;
					}
					$(["#c", temp_y, i].join("")).addClass("avmove");
				}
			}
			
			for (i = y*1+1; i < 9; i++) {
				// путь по вертикали вверх
				if ($(["#c", i, x].join("")).children("img").length != 0) {
					// если белая фигура - можно бить
					if ($(["#c", i, x].join("")).children("img").attr("src").indexOf("c") != -1) {
						$(["#c", i, x].join("")).addClass("avmove");
					}
					break;
				}
				$(["#c", i, x].join("")).addClass("avmove");
			}
			
			for (i = y*1-1; i > 0; i--) {
				// путь по вертикали вниз
				if ($(["#c", i, x].join("")).children("img").length != 0) {
					// если белая фигура - можно бить
					if ($(["#c", i, x].join("")).children("img").attr("src").indexOf("c") != -1) {
						$(["#c", i, x].join("")).addClass("avmove");
					}
					break;
				}
				$(["#c", i, x].join("")).addClass("avmove");
			}
			
			for (i = x*1+1; i < 9; i++) {
				// путь по горизонтали влево
				if ($(["#c", y, i].join("")).children("img").length != 0) {
					// если белая фигура - можно бить
					if ($(["#c", y, i].join("")).children("img").attr("src").indexOf("bc") != -1) {
						$(["#c", y, i].join("")).addClass("avmove");
					}
					break;
				}
				$(["#c", y, i].join("")).addClass("avmove");
			}
			
			for (i = x*1-1; i > 0; i--) {
				// путь по горизонтали влево
				if ($(["#c", y, i].join("")).children("img").length != 0) {
					// если белая фигура - можно бить
					if ($(["#c", y, i].join("")).children("img").attr("src").indexOf("c") != -1) {
						$(["#c", y, i].join("")).addClass("avmove");
					}
					break;
				}
				$(["#c", y, i].join("")).addClass("avmove");
			}
			
			break;
			
		case "6c":
			// черный король
			if (x>1) {
				// ход влево
				if ($(["#c", y, x*1-1].join("")).children("img").length > 0) {
					if ($(["#c", y, x*1-1].join("")).children("img").attr("src").indexOf("b") != -1) {
						$(["#c", y, x*1-1].join("")).addClass("avmove");
					}
				} else {
					$(["#c", y, x*1-1].join("")).addClass("avmove");
				}
			}
			
			if (x>1 && y<8) {
				// ход влево-вверх
				if ($(["#c", y*1+1, x*1-1].join("")).children("img").length > 0) {
					if ($(["#c", y*1+1, x*1-1].join("")).children("img").attr("src").indexOf("b") != -1) {
						$(["#c", y*1+1, x*1-1].join("")).addClass("avmove");
					}
				} else {
					$(["#c", y*1+1, x*1-1].join("")).addClass("avmove");
				}
			}
			
			if (y<8) {
				// ход вверх
				if ($(["#c", y*1+1, x].join("")).children("img").length > 0) {
					if ($(["#c", y*1+1, x].join("")).children("img").attr("src").indexOf("b") != -1) {
						$(["#c", y*1+1, x].join("")).addClass("avmove");
					} 
				} else {
					$(["#c", y*1+1, x].join("")).addClass("avmove");
				}
				
			}
			
			if (x<8 && y<8) {
				// ход вправо-вверх
				if ($(["#c", y*1+1, x*1+1].join("")).children("img").length > 0) {
					if ($(["#c", y*1+1, x*1+1].join("")).children("img").attr("src").indexOf("b") != -1) {
						$(["#c", y*1+1, x*1+1].join("")).addClass("avmove");
					}
				} else {
					$(["#c", y*1+1, x*1+1].join("")).addClass("avmove");
				}
			}
			
			if (x<8) {
				// ход вправо
				if ($(["#c", y, x*1+1].join("")).children("img").length > 0) {
					if ($(["#c", y, x*1+1].join("")).children("img").attr("src").indexOf("b") != -1) {
						$(["#c", y, x*1+1].join("")).addClass("avmove");
					}
				} else {
					$(["#c", y, x*1+1].join("")).addClass("avmove");
				}
			}
			
			if (x<8 && y>1) {
				// ход вправо-вниз
				if ($(["#c", y*1-1, x*1+1].join("")).children("img").length > 0) {
					if ($(["#c", y*1-1, x*1+1].join("")).children("img").attr("src").indexOf("b") != -1) {
						$(["#c", y*1-1, x*1+1].join("")).addClass("avmove");
					}
				} else {
					$(["#c", y*1-1, x*1+1].join("")).addClass("avmove");
				}
			}
			
			if (y>1) {
				// ход вниз
				if ($(["#c", y*1-1, x].join("")).children("img").length > 0) {
					if ($(["#c", y*1-1, x].join("")).children("img").attr("src").indexOf("b") != -1) {
						$(["#c", y*1-1, x].join("")).addClass("avmove");
					} 
				} else {
					$(["#c", y*1-1, x].join("")).addClass("avmove");
				}
			}
			
			if (x>1 && y>1) {
				// ход влево-вниз
				if ($(["#c", y*1-1, x*1-1].join("")).children("img").length > 0) {
					if ($(["#c", y*1-1, x*1-1].join("")).children("img").attr("src").indexOf("b") != -1) {
						$(["#c", y*1-1, x*1-1].join("")).addClass("avmove");
					}
				} else {
					$(["#c", y*1-1, x*1-1].join("")).addClass("avmove");
				}
			}
			
			break;
			
		case "6b":
			// белый король
			if (x>1) {
				// ход влево
				if ($(["#c", y, x*1-1].join("")).children("img").length > 0) {
					if ($(["#c", y, x*1-1].join("")).children("img").attr("src").indexOf("c") != -1) {
						$(["#c", y, x*1-1].join("")).addClass("avmove");
					}
				} else {
					$(["#c", y, x*1-1].join("")).addClass("avmove");
				}
			}
			
			if (x>1 && y<8) {
				// ход влево-вверх
				if ($(["#c", y*1+1, x*1-1].join("")).children("img").length > 0) {
					if ($(["#c", y*1+1, x*1-1].join("")).children("img").attr("src").indexOf("c") != -1) {
						$(["#c", y*1+1, x*1-1].join("")).addClass("avmove");
					}
				} else {
					$(["#c", y*1+1, x*1-1].join("")).addClass("avmove");
				}
			}
			
			if (y<8) {
				// ход вверх
				if ($(["#c", y*1+1, x].join("")).children("img").length > 0) {
					if ($(["#c", y*1+1, x].join("")).children("img").attr("src").indexOf("c") != -1) {
						$(["#c", y*1+1, x].join("")).addClass("avmove");
					} 
				} else {
					$(["#c", y*1+1, x].join("")).addClass("avmove");
				}
			}
			
			if (x<8 && y<8) {
				// ход вправо-вверх
				if ($(["#c", y*1+1, x*1+1].join("")).children("img").length > 0) {
					if ($(["#c", y*1+1, x*1+1].join("")).children("img").attr("src").indexOf("c") != -1) {
						$(["#c", y*1+1, x*1+1].join("")).addClass("avmove");
					}
				} else {
					$(["#c", y*1+1, x*1+1].join("")).addClass("avmove");
				}
			}
			
			if (x<8) {
				// ход вправо
				if ($(["#c", y, x*1+1].join("")).children("img").length > 0) {
					if ($(["#c", y, x*1+1].join("")).children("img").attr("src").indexOf("c") != -1) {
						$(["#c", y, x*1+1].join("")).addClass("avmove");
					}
				} else {
					$(["#c", y, x*1+1].join("")).addClass("avmove");
				}
			}
			
			if (x<8 && y>1) {
				// ход вправо-вниз
				if ($(["#c", y*1-1, x*1+1].join("")).children("img").length > 0) {
					if ($(["#c", y*1-1, x*1+1].join("")).children("img").attr("src").indexOf("c") != -1) {
						$(["#c", y*1-1, x*1+1].join("")).addClass("avmove");
					}
				} else {
					$(["#c", y*1-1, x*1+1].join("")).addClass("avmove");
				}
			}
			
			if (y>1) {
				// ход вниз
				if ($(["#c", y*1-1, x].join("")).children("img").length > 0) {
					if ($(["#c", y*1-1, x].join("")).children("img").attr("src").indexOf("c") != -1) {
						$(["#c", y*1-1, x].join("")).addClass("avmove");
					} 
				} else {
					$(["#c", y*1-1, x].join("")).addClass("avmove");
				}
			}
			
			if (x>1 && y>1) {
				// ход влево-вниз
				if ($(["#c", y*1-1, x*1-1].join("")).children("img").length > 0) {
					if ($(["#c", y*1-1, x*1-1].join("")).children("img").attr("src").indexOf("c") != -1) {
						$(["#c", y*1-1, x*1-1].join("")).addClass("avmove");
					}
				} else {
					$(["#c", y*1-1, x*1-1].join("")).addClass("avmove");
				}
			}
			
			break;
	}
}


function autostart() {
	$("#c21").html("<img src='images/1c.png' />");
	$("#c22").html("<img src='images/1c.png' />");
	$("#c23").html("<img src='images/1c.png' />");
	$("#c24").html("<img src='images/1c.png' />");
	$("#c25").html("<img src='images/1c.png' />");
	$("#c26").html("<img src='images/1c.png' />");
	$("#c27").html("<img src='images/1c.png' />");
	$("#c28").html("<img src='images/1c.png' />");
	$("#c11").html("<img src='images/2c.png' />");
	$("#c12").html("<img src='images/3c.png' />");
	$("#c13").html("<img src='images/4c.png' />");
	$("#c14").html("<img src='images/5c.png' />");
	$("#c15").html("<img src='images/6c.png' />");
	$("#c16").html("<img src='images/4c.png' />");
	$("#c17").html("<img src='images/3c.png' />");
	$("#c18").html("<img src='images/2c.png' />");
	$("#wf").html("");
	
	$("#c71").html("<img src='images/1b.png' />");
	$("#c72").html("<img src='images/1b.png' />");
	$("#c73").html("<img src='images/1b.png' />");
	$("#c74").html("<img src='images/1b.png' />");
	$("#c75").html("<img src='images/1b.png' />");
	$("#c76").html("<img src='images/1b.png' />");
	$("#c77").html("<img src='images/1b.png' />");
	$("#c78").html("<img src='images/1b.png' />");
	$("#c81").html("<img src='images/2b.png' />");
	$("#c82").html("<img src='images/3b.png' />");
	$("#c83").html("<img src='images/4b.png' />");
	$("#c84").html("<img src='images/6b.png' />");
	$("#c85").html("<img src='images/5b.png' />");
	$("#c86").html("<img src='images/4b.png' />");
	$("#c87").html("<img src='images/3b.png' />");
	$("#c88").html("<img src='images/2b.png' />");
	$("#bf").html("");
	
	rungame();
}