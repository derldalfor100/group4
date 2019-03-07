function displayToggle(boolValue) {
    document.getElementById('board').style.display = boolValue ? 'block':'none';
}

function colorAll(e) {
    var divs =document.getElementsByTagName('div');
    var labels =document.getElementsByTagName('label');
    var buttons = document.getElementsByTagName('button');
    if(e.target.id === 'light'){
        document.body.style.backgroundColor = '#FFFD6A';
        for(var i=0; i<divs.length; i++){
            divs[i].style.backgroundColor = '#A3FF89';
            divs[i].style.color = '#000000';
        }
        for(var i=0; i<labels.length; i++){
            labels[i].style.color = '#000000';
        }
        for(var i=0; i<buttons.length; i++){
            buttons[i].style.backgroundColor = '#EAB391';
            buttons[i].style.color = '#000000';
        }
    } else {
        document.body.style.backgroundColor = '#04324F';
        for(var i=0; i<divs.length; i++){
            divs[i].style.backgroundColor = '#3A3021';
            divs[i].style.color = '#ffffff';
        }
        for(var i=0; i<labels.length; i++){
            labels[i].style.color = '#ffffff';
        }
        for(var i=0; i<buttons.length; i++){
            buttons[i].style.backgroundColor = '#EA009D';
            buttons[i].style.color = '#ffffff';
        }
    }
}

function Board() {
    var tiles = [];
    var board = document.getElementById('board');
    var table = document.createElement('div');
    var againstPC;
    var pcTurns = 0;
    (function init() { //IIFE
        var row;
        for (var i = 1; i <= 9; i++) {
            if (i % 3 == 1) {
                row = document.createElement('div');
                row.setAttribute('id', 'row' + Math.floor(i / 3 + 1));
            }
            var td = document.createElement('div');
            td.className = 'td';
            tiles.push(new Tile(i));
            var tileBtn = tiles[i - 1].getBtn();
            tileBtn.onclick = tileClicked;
            td.appendChild(tileBtn);
            row.appendChild(td);
            if (i % 3 == 0) {
                table.appendChild(row);
            }
        }
        resetAll();
        board.appendChild(table);
        var parentDiv = document.getElementById('content');
        parentDiv.appendChild(board);
        document.getElementById('newGame').onclick = startNewGame;
    })();

    function tileClicked(event) {
        var btn = event.target;
        var isPlayerXTurn = document.getElementById('player1').checked ? true : false;
        var pic = isPlayerXTurn ? btn.childNodes[0] : btn.childNodes[1];
        pic.style.display = 'inline-grid';
        btn.disabled = true;

        var idNum = Number(btn.getAttribute('id')[btn.getAttribute('id').length - 1]);
        var rowNum = Math.ceil(idNum / 3);
        var colNum;
        if (idNum % 3 === 1) {
            colNum = 1;
        } else if (idNum % 3 === 2) {
            colNum = 2;
        } else {
            colNum = 3;
        }
        board.style.cursor = 'no-drop';
        if (checkWin(isPlayerXTurn, rowNum, colNum)) {
            displayToggle(false);
            var WinMsg = document.getElementById('message');
            var txt = isPlayerXTurn ? "Player X, You're the winner!" : "Player O, You're the winner!";
            var txtNode = document.createTextNode(txt);
            WinMsg.appendChild(txtNode);
            resetAll();
            document.getElementById('pc').disabled = false;
        } else if (checkDraw()) {
            displayToggle(false);
            var WinMsg = document.getElementById('message');
            WinMsg.innerText = 'Draw! Click on "New Game" button to play again.';
            document.getElementById('pc').disabled = false;
        } else {
            toggleCheck(isPlayerXTurn);
            if (againstPC && document.getElementById('player2').checked) {
                pcTurn();
            }
        }
    }
    function toggleCheck(isPlayerXChecked) {
        document.getElementById('player1').checked = !isPlayerXChecked;
        document.getElementById('player1').disabled = isPlayerXChecked;
        document.getElementById('player2').checked = isPlayerXChecked;
        document.getElementById('player2').disabled = !isPlayerXChecked;
    }
    function checkDraw() {
        var notDraw = tiles.some((tile) => {
            return !tile.isFilled();
        });
        return !notDraw;
    }
    function checkWin(isPlayerXChecked, row, col) {
        var numPic = isPlayerXChecked ? 0 : 1;
        return checkRows(numPic, row) || checkCols(numPic, col) || checkDiagonals(numPic, row, col);
    }
    function checkRows(numPic, row) {
        var win = false;
        var btn1 = document.getElementById('b' + (row * 3 - 2));
        var pic1 = btn1.childNodes[numPic];
        if (pic1.style.display !== 'none') {
            var btn2 = document.getElementById('b' + (row * 3 - 1));
            var pic2 = btn2.childNodes[numPic];
            if (pic2.style.display !== 'none') {
                var btn3 = document.getElementById('b' + (row * 3));
                var pic3 = btn3.childNodes[numPic];
                win = pic3.style.display !== 'none' ? true : false;
            }
        }
        return win;
    }
    function checkCols(numPic, col) {
        var win = false;
        var btn1 = document.getElementById('b' + (col));
        var pic1 = btn1.childNodes[numPic];
        if (pic1.style.display !== 'none') {
            var btn2 = document.getElementById('b' + (col + 3));
            var pic2 = btn2.childNodes[numPic];
            if (pic2.style.display !== 'none') {
                var btn3 = document.getElementById('b' + (col + 6));
                var pic3 = btn3.childNodes[numPic];
                win = pic3.style.display !== 'none' ? true : false;
            }
        }
        return win;
    }
    function checkDiagonals(numPic, row, col) {
        var win = false;
        if (row === col) {
            var btn1 = document.getElementById('b1');
            var pic1 = btn1.childNodes[numPic];
            if (pic1.style.display !== 'none') {
                var btn2 = document.getElementById('b5');
                var pic2 = btn2.childNodes[numPic];
                if (pic2.style.display !== 'none') {
                    var btn3 = document.getElementById('b9');
                    var pic3 = btn3.childNodes[numPic];
                    win = pic3.style.display !== 'none' ? true : false;
                }
            }
        }
        if (row + col === 4) {
            var btn1 = document.getElementById('b3');
            var pic1 = btn1.childNodes[numPic];
            if (pic1.style.display !== 'none') {
                var btn2 = document.getElementById('b5');
                var pic2 = btn2.childNodes[numPic];
                if (pic2.style.display !== 'none') {
                    var btn3 = document.getElementById('b7');
                    var pic3 = btn3.childNodes[numPic];
                    win = pic3.style.display !== 'none' ? true : false;
                }
            }
        }
        return win;
    }
    function resetAll() {
        tiles.forEach((tile) => {
            tile.getBtn().disabled = true;
        });
    }

    function freeAll() {
        tiles.forEach((tile) => {
            tile.getBtn().disabled = false;
        });
    }

    function hideAllPics() {
        tiles.forEach((tile) => {
            tile.hideAll();
        });
    }

    function startNewGame() {
        displayToggle(true);
        document.getElementById('player1').disabled = false;
        document.getElementById('player1').checked = true;
        document.getElementById('player2').disabled = true;
        document.getElementById('player2').checked = false;
        document.getElementById('pc').disabled = true;
        document.getElementById('message').innerText = '';
        againstPC = document.getElementById('pc').checked;
        hideAllPics();
        freeAll();
        pcTurns = 0;
    }

    function pcTurn() {
        var turn;
        var corners = [tiles[0], tiles[2], tiles[6], tiles[8]];
        var myTurns = tiles.filter(tile => tile.getX().style.display !== 'none');
        var message = document.getElementById('message');
        message.innerText = 'PC turn...';
        board.style.pointerEvents = 'none';
        board.style.cursor = 'no-drop';
        pcTurns++;
        if (pcTurns === 1) {
            if (!tiles[4].isFilled()) {
                turn = {
                    target: tiles[4].getBtn()
                }
                setTimeout(() => {
                    message.innerText = '';
                    tileClicked(turn);
                    board.style.pointerEvents = 'initial';
                }, 2000);
            } else {
                var item = corners[Math.floor(Math.random() * corners.length)];
                turn = {
                    target: item.getBtn()
                }
                setTimeout(() => {
                    message.innerText = '';
                    tileClicked(turn);
                    board.style.pointerEvents = 'initial';
                }, 2000);
            }
        } else if (pcTurns === 2) {
            var num1 = myTurns[0].title;
            var num2 = myTurns[1].title;
            var row1;
            var col1;
            var row2;
            var col2;
            if (num1 <= 3) {
                row1 = 1;
            } else if (num1 <= 6) {
                row1 = 2;
            } else {
                row1 = 3;
            }
            if (num2 <= 3) {
                row2 = 1;
            } else if (num2 <= 6) {
                row2 = 2;
            } else {
                row2 = 3;
            }

            if (num1 === 1 || num1 === 4 || num1 === 7) {
                col1 = 1;
            } else if (num1 === 2 || num1 === 5 || num1 === 8) {
                col1 = 2;
            } else {
                col1 = 3;
            }
            if (num2 === 1 || num2 === 4 || num2 === 7) {
                col2 = 1;
            } else if (num2 === 2 || num2 === 5 || num2 === 8) {
                col2 = 2;
            } else {
                col2 = 3;
            }

            if (row1 === row2 && col1 === 1 && col2 === 2 && !tiles[row1 * 3 - 1].isFilled()) {
                turn = {
                    target: tiles[row1 * 3 - 1].getBtn()
                }
                setTimeout(() => {
                    message.innerText = '';
                    tileClicked(turn);
                    board.style.pointerEvents = 'initial';
                }, 2000);
            } else if (row1 === row2 && col1 === 1 && col2 === 3 && !tiles[row1 * 3 - 2].isFilled()) {
                turn = {
                    target: tiles[row1 * 3 - 2].getBtn()
                }
                setTimeout(() => {
                    message.innerText = '';
                    tileClicked(turn);
                    board.style.pointerEvents = 'initial';
                }, 2000);
            } else if (row1 === row2 && !tiles[row1 * 3 - 3].isFilled()) {
                turn = {
                    target: tiles[row1 * 3 - 3].getBtn()
                }
                setTimeout(() => {
                    message.innerText = '';
                    tileClicked(turn);
                    board.style.pointerEvents = 'initial';
                }, 2000);
            } else if (col1 === col2 && row1 === 1 && row2 === 2 && !tiles[col1 + 5].isFilled()) {
                turn = {
                    target: tiles[col1 + 5].getBtn()
                }
                setTimeout(() => {
                    message.innerText = '';
                    tileClicked(turn);
                    board.style.pointerEvents = 'initial';
                }, 2000);
            } else if (col1 === col2 && row1 === 1 && row2 === 3 && !tiles[col1 + 2].isFilled()) {
                turn = {
                    target: tiles[col1 + 2].getBtn()
                }
                setTimeout(() => {
                    message.innerText = '';
                    tileClicked(turn);
                    board.style.pointerEvents = 'initial';
                }, 2000);
            } else if (col1 === col2 && !tiles[col1 - 1].isFilled()) {
                turn = {
                    target: tiles[col1 - 1].getBtn()
                }
                setTimeout(() => {
                    message.innerText = '';
                    tileClicked(turn);
                    board.style.pointerEvents = 'initial';
                }, 2000);
            } else if (row1 === 1 && row2 === 2 && col1 === 1 && col2 === 2 && !tiles[8].isFilled()) {
                turn = {
                    target: tiles[8].getBtn()
                }
                setTimeout(() => {
                    message.innerText = '';
                    tileClicked(turn);
                    board.style.pointerEvents = 'initial';
                }, 2000);
            } else if (row1 === 2 && row2 === 3 && col1 === 2 && col2 === 3 && !tiles[0].isFilled()) {
                turn = {
                    target: tiles[0].getBtn()
                }
                setTimeout(() => {
                    message.innerText = '';
                    tileClicked(turn);
                    board.style.pointerEvents = 'initial';
                }, 2000);
            } else if (row1 === 1 && row2 === 2 && col1 === 3 && col2 === 2 && !tiles[6].isFilled()) {
                turn = {
                    target: tiles[6].getBtn()
                }
                setTimeout(() => {
                    message.innerText = '';
                    tileClicked(turn);
                    board.style.pointerEvents = 'initial';
                }, 2000);
            } else if (row1 === 2 && row2 === 3 && col1 === 2 && col2 === 1 && !tiles[2].isFilled()) {
                turn = {
                    target: tiles[2].getBtn()
                }
                setTimeout(() => {
                    message.innerText = '';
                    tileClicked(turn);
                    board.style.pointerEvents = 'initial';
                }, 2000);
            } else if (!tiles[0].isFilled()) {
                turn = {
                    target: tiles[0].getBtn()
                }
                setTimeout(() => {
                    message.innerText = '';
                    tileClicked(turn);
                    board.style.pointerEvents = 'initial';
                }, 2000);
            } else {
                turn = {
                    target: tiles[2].getBtn()
                }
                setTimeout(() => {
                    message.innerText = '';
                    tileClicked(turn);
                    board.style.pointerEvents = 'initial';
                }, 2000);
            }
        } else {
            var randomIndex = Math.floor(Math.random() * tiles.length);
            while (tiles[randomIndex].isFilled()) {
                randomIndex = Math.floor(Math.random() * tiles.length);
            }
            addPic(randomIndex);
        }
    }

    function addPic(index){
        turn = {
            target: tiles[index].getBtn()
        }
        setTimeout(() => {
            message.innerText = '';
            tileClicked(turn);
            board.style.pointerEvents = 'initial';
        }, 2000);
    }

    function Tile(_title) {
        this.title = _title;
        var button = document.createElement('button');
        var picX = 'x.png';
        var picO = 'o.png';
        var x = document.createElement('img');
        var o = document.createElement('img');
        (function createTile() { //IIFE

            button.setAttribute('id', 'b' + _title);
            button.style.width = '100px';
            button.style.height = '100px';
            button.style.overflow = 'hidden';
            button.style.margin = '10px';

            x.setAttribute('src', picX);
            x.setAttribute('width', '50px');
            x.setAttribute('height', '50px');
            x.style.display = 'none';

            o.setAttribute('src', picO);
            o.setAttribute('width', '50px');
            o.setAttribute('height', '50px');
            o.style.display = 'none';

            button.appendChild(x);
            button.appendChild(o);
        })();
        this.getBtn = () => {
            return button;
        };
        this.getX = () => {
            return x;
        };
        this.getO = () => {
            return o;
        };
        this.hideAll = () => {
            x.style.display = 'none';
            o.style.display = 'none';
        }
        this.isFilled = () => {
            if (x.style.display !== 'none' || o.style.display !== 'none') {
                return true;
            }
            return false;
        }
    }
}

function initPlayers() {
    document.getElementById('player2').disabled = true;
    document.getElementById('player1').checked = true;
    document.getElementById('pc').checked = false;
}

new Board();