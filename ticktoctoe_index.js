window.addEventListener('DOMContentLoaded', () => {
    
    const player = document.querySelector('.display-player');
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const notice = document.querySelector('.announcer');
    const restartBtn = document.querySelector('.restart');

    let isGameActive = true;
    let OXBoard = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';//처음 시작 X
    

    const X_WON = 'PLAYERX_WON';
    const O_WON = 'PLAYERO_WON';
    const TIE = 'TIE';


    /*
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    //이기는 조건
    const winningConditions = [
        //가로
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        //세로
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        //대각선
        [0, 4, 8],
        [2, 4, 6]
    ];

    function roundResult() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = OXBoard[winCondition[0]];
            const b = OXBoard[winCondition[1]];
            const c = OXBoard[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            //한줄이 완벽할 때
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }
        //누가 이겼는지 판별
    if (roundWon) {
            announce(currentPlayer === 'X' ? X_WON : O_WON);
            isGameActive = false;
            return;
        }
        //동점
    if (!OXBoard.includes(''))
        announce(TIE);
    }



    //알림
    const announce = (type) => {
        switch(type){
            case O_WON:
                notice.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case X_WON:
                notice.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                notice.innerText = 'Tie';
        }
        notice.classList.remove('hide');
    };

    //타일이 비어있는지 아닌지 확인
    const checkTileInnerText = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };


    //보드 내용물 채우기
    const updateBoard =  (index) => {
        OXBoard[index] = currentPlayer;
    }

    //player변화
    const changePlayer = () => {
        player.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        player.innerText = currentPlayer;
        player.classList.add(`player${currentPlayer}`);
    }

    const userClickAction = (tile, index) => {
        if(checkTileInnerText(tile) && isGameActive) {
            tile.innerText = currentPlayer;//타일 표시
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            roundResult();
            changePlayer();
        }
    }
    //타일 클릭할 때마다
    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userClickAction(tile, index));
    });


    //보드 초기화
    const resetBoard = () => {
        OXBoard = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        notice.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    

    restartBtn.addEventListener('click', resetBoard);
});