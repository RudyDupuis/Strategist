const squares = document.querySelectorAll('.square');
const endOfTurnButton = document.querySelector('#endOfTurn');
const moveButton = document.querySelector('#move');
const pushPullButton = document.querySelector('#pushPull');
const rotateButton = document.querySelector('#rotate');
const gameTurnDisplay = document.querySelector('#gameTurnDisplay');
const winDisplay = document.querySelector('#winDisplay');
let buttons = [moveButton, pushPullButton,  rotateButton];

const rules = document.querySelector('.rules');
const rulesButton = document.querySelector('.rulesButton');

/*** Rules ***/
let ruleDisplay = true;

rulesButton.addEventListener('click', () => {
    rules.classList.toggle("rules-open");
    if(ruleDisplay = true){
        rules.innerHTML = 
        `<h1>Stratège</h1>
            <h2>Règles</h2>
            <div class="preamble">
                <p>Pour jouer il faut appuyer sur le bouton d'une action (Déplacer, ...).</p>
                <p>Puis appuyer sur le pion qui doit effectuer cette action.</p>
                <p>Pour finir son tour il faut appuyer sur le bouton Fin de tour.</p>
            </div>
            <div class="rule-section">
                <h3>Déplacer</h3>
                <div class="explanation">
                    <div class="text">
                        <p>Les 8 pions d'un joueur peuvent être déplacés pendant son tour de jeu.</p>
                        <p>Chaque pion peut avancer de 0, 1 ou 2 cases selon le choix du joueur.</p>
                        <p>Ils ne peuvent pas avancer en diagonal.</p>
                    </div>
                    <div class="flex-column-center plan">
                        <div class="flex-row"><div class="square square-rules-small move-square"></div></div>
                        <div class="flex-row">
                            <div class="square square-rules-small move-square"></div>
                            <div class="square square-rules-small move-square"></div>
                            <div class="square square-rules-small move-square"></div>
                        </div>
                        <div class="flex-row">
                            <div class="square square-rules-small move-square"></div>
                            <div class="square square-rules-small move-square"></div>
                            <div class="square square-rules-small"><div class="pawn pawnTeam1"></div></div>
                            <div class="square square-rules-small move-square"></div>
                            <div class="square square-rules-small move-square"></div>
                        </div>
                        <div class="flex-row">
                            <div class="square square-rules-small move-square"></div>
                            <div class="square square-rules-small move-square"></div>
                            <div class="square square-rules-small move-square"></div>
                        </div>
                        <div class="flex-row"><div class="square square-rules-small move-square"></div></div>
                    </div>
                </div>
            </div>
            <div class="rule-section"> 
                <h3>Pousser/Tirer</h3>
                <div class="explanation">
                    <div class="text">
                        <p>Si un pion est adjacent à un pion allier ou adverse, il peut le pousser (case bleu clair) ou le tirer (case bleu foncé).</p>
                        <p>Il ne peut pas pousser si deux pions sont devant lui et il ne peut pas tirer si un pion est derrère lui.</p>
                        <p>Il ne peut pas sortir ni pousser un pion un pion hors du plateau</p>
                        <p>Cette action est comptée comme un déplacement d'une case</p>
                    </div>
                    <div class="flex-row-center space-between plan">
                        <div>
                            <div class="flex-row"><div class="square square-rules-medium push-square"></div></div>
                            <div class="flex-row">
                                <div class="square square-rules-medium"><div class="pawn pawnTeam1"></div></div>
                            </div>
                            <div class="flex-row">
                                <div class="square square-rules-medium"><div class="pawn pawnTeam1 pawn-outline"></div></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex-row">
                                <div class="square square-rules-medium"><div class="pawn pawnTeam1"></div></div>
                            </div>
                            <div class="flex-row">
                                <div class="square square-rules-medium"><div class="pawn pawnTeam1 pawn-outline"></div></div>
                            </div>
                            <div class="flex-row"><div class="square square-rules-medium pull-square"></div></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rule-section">
                <h3>Tourner</h3>
                <div class="explanation">
                    <div class="text">
                        <p>Chaque pion est composé de 2 triangles sur chaque face.</p>
                        <p>Le triangle noir lui sert de bouclier.</p>
                        <p>Le joueur peut réorienter ses pions comme il le souhaite jusqu'à la fin de son tour</p>
                    </div>
                    <div class="flex-column-center plan">
                        <div class="square square-rules-big"><div class="pawn pawnTeam1"></div></div>
                    </div>
                </div>
            </div>
            <div class="rule-section">
                <h3>But du jeu</h3>
                <div class="explanation">
                    <div class="text">
                        <p>Si un pion à la possibilité d'aller sur un pion adverse lors de son déplacement sans passer par le coté du bouclier alors le pion adverse est retiré du plateau.</p>
                        <p>La partie est terminé quand l'un des joueurs n'a plus de pion. Il aura perdu.</p>
                    </div>
                    <div class="flex-column-center plan">
                        <div class="flex-row">
                            <div class="square square-rules-medium"><div class="pawn pawnTeam2 pawn-outline"></div></div>
                        </div>
                        <div class="flex-row">
                            <div class="square square-rules-medium kill-square"><div class="pawn pawnTeam1"></div></div>
                        </div>
                    </div>
                </div>
            </div>`;
        ruleDisplay = false;
    }
    else{
        rules.innerHTML = "";
        ruleDisplay = true;
    }
    rulesButton.classList.toggle("rulesButton-open");
})

/*** Creating selection areas ***/

function twoSquaresArea(squareId){
    let twoSquaresArea = [             //coordinate of all squares at 2 squares of clicked square    //     O
        Array.prototype.indexOf.call(squares, document.getElementById(squareId)) - 16,               //   . O .
        Array.prototype.indexOf.call(squares, document.getElementById(squareId)) - 8,                // . . X . .  //center
        Array.prototype.indexOf.call(squares, document.getElementById(squareId)) + 8,                //   . O .
        Array.prototype.indexOf.call(squares, document.getElementById(squareId)) + 16,               //     O
    
        Array.prototype.indexOf.call(squares, document.getElementById(squareId)) + 9,                //     .
        Array.prototype.indexOf.call(squares, document.getElementById(squareId)) + 2,                //   . . O
        Array.prototype.indexOf.call(squares, document.getElementById(squareId)) + 1,                // . . X O O  //right
        Array.prototype.indexOf.call(squares, document.getElementById(squareId)) - 7,                //   . . O
                                                                                                     //     .
        Array.prototype.indexOf.call(squares, document.getElementById(squareId)) + 7,                //     .
        Array.prototype.indexOf.call(squares, document.getElementById(squareId)) - 1,                //   O . .
        Array.prototype.indexOf.call(squares, document.getElementById(squareId)) - 2,                // O O X . .  //left 
        Array.prototype.indexOf.call(squares, document.getElementById(squareId)) - 9,                //   O . .
    ];                                                                                               //     .
 
    return twoSquaresArea;
}

function oneSquaresArea(squareId){
    let oneSquaresArea = [             //coordinate of all squares at 1 square of clicked square    
        Array.prototype.indexOf.call(squares, document.getElementById(squareId)) - 8,                  //   O
        Array.prototype.indexOf.call(squares, document.getElementById(squareId)) + 8,                  // O X O   
        Array.prototype.indexOf.call(squares, document.getElementById(squareId)) + 1,                  //   O       
        Array.prototype.indexOf.call(squares, document.getElementById(squareId)) - 1,                
    ];                                                                                              
 
    return oneSquaresArea;
}

function squaresAreaInBoard(squareId, squareArea){
    let coordinateMoveSquares = [];

    function removeOtherSideSquares(){
        let column = [];
        let startSplice = [];
        let spliceRemove = [];

        if(coordinateMoveSquares.length > 4){   //squareArea == twoSquaresArea
            column = [1, 2, 7, 8];
            startSplice = [8 , 10, 5, 4];
            spliceRemove = [4, 1, 1, 4];
        }
        else{
            column = [1, 8];
            startSplice = [3 , 2];
            spliceRemove = [1, 1];
        }

        for(let i=0; i < column.length; i++){
            if (squareId.search(column[i]) == 1) {              //If clicked square is on colomn[i] (ex: A1 B1 ...)
                coordinateMoveSquares.splice(startSplice[i], spliceRemove[i]);                
            }
        }
    }

    function removeOutsideSquares(){
        coordinateMoveSquares.forEach(testSquare => {          
            if(testSquare < 0 || testSquare > 63){      //Remove square outside of the boardGame
                coordinateMoveSquares.splice(coordinateMoveSquares.indexOf(testSquare), 1);
                removeOutsideSquares();   //Recurcivity because splice() changes the order of the array
            }
            
        })
    }

    for(let i=0; i < squareArea.length; i++){                //coordinateMoveSquares = squareArea
        coordinateMoveSquares.push(squareArea[i]);
    }

    removeOtherSideSquares();
    removeOutsideSquares();

    return coordinateMoveSquares;
}

function movementSquares(coordinateMoveSquares, twoSquaresArea){
    let isTwoSquaresArea = false;     
    let coordinatePawnSquares = [];

    function removeSquaresWithPawn(){
        coordinateMoveSquares.forEach(testSquare => {         
            if(squares[testSquare].children.length == 1){               
                coordinatePawnSquares.push(testSquare);  //If the square has a pawn, it is pushed into coordinatePawnSquares

                let pawnSquare = [twoSquaresArea[6], twoSquaresArea[9], twoSquaresArea[1], twoSquaresArea[2]];
                let blindSpotSquare = [twoSquaresArea[5], twoSquaresArea[10], twoSquaresArea[0], twoSquaresArea[3]];

                for(let i=0; i<4; i++){        //Removes blind spot behind the pawn     
                    if (testSquare == pawnSquare[i] && coordinateMoveSquares.indexOf(blindSpotSquare[i]) != -1) {
                        coordinateMoveSquares.splice(coordinateMoveSquares.indexOf(blindSpotSquare[i]), 1);
                    }
                }

                coordinateMoveSquares.splice(coordinateMoveSquares.indexOf(testSquare), 1);    //Removes the square from the pawn
                removeSquaresWithPawn();                //Recurcivity because splice() changes the order of the array
            }    
        })
    }

    function removeBlindSpot(){
        if(isTwoSquaresArea){
            //Removes blind spot between two pawns
            let pawnPos1 = [twoSquaresArea[6], twoSquaresArea[1], twoSquaresArea[9], twoSquaresArea[2]];
            let pawnPos2 = [twoSquaresArea[1], twoSquaresArea[9], twoSquaresArea[2], twoSquaresArea[6]];
            let blindSpot = [twoSquaresArea[7], twoSquaresArea[11], twoSquaresArea[8], twoSquaresArea[4]];
    
            for(let i=0; i<4; i++){
                if(coordinatePawnSquares.indexOf(pawnPos1[i]) != -1 && coordinatePawnSquares.indexOf(pawnPos2[i]) != -1 &&
                   coordinatePawnSquares.indexOf(blindSpot[i]) == -1){
                    coordinateMoveSquares.splice(coordinateMoveSquares.indexOf(blindSpot[i]), 1);
                }
            } 
        }
    }

    if(coordinateMoveSquares.length > 4){  //at this stage twoSquareArea has at least 5 squares
        isTwoSquaresArea = true;
    }

    removeSquaresWithPawn();
    removeBlindSpot();

    return coordinateMoveSquares;
}

function killSquares(coordinateMoveSquares, square, twoSquaresArea){
    let coordinateEnemyPawnSquares = [];
    let coordinatePawnSquares = [];

    function addOtherTeamPawns(){
        coordinateMoveSquares.forEach(testSquare => {         
            if(squares[testSquare].children.length == 1){ 
                coordinatePawnSquares.push(testSquare);                 //Coordinates of all pawns
    
                if(square.children[0].classList[1] == "pawnTeam1" && squares[testSquare].children[0].classList[1] == "pawnTeam2"){
                    coordinateEnemyPawnSquares.push(testSquare); //add pawnTeam2 in coordinateEnemySqaures if selected pawn is in team 1
                }              
                if(square.children[0].classList[1] == "pawnTeam2" && squares[testSquare].children[0].classList[1] == "pawnTeam1"){
                    coordinateEnemyPawnSquares.push(testSquare); //add pawnTeam1 in coordinateEnemySqaures if selected pawn is in team 2
                } 
            }
        })      
    }

    function removePawnBehindPawn(){
        coordinateMoveSquares.forEach(testSquare => {
            let pawnSquare = [twoSquaresArea[6], twoSquaresArea[9], twoSquaresArea[1], twoSquaresArea[2]];
            let blindSpotSquare = [twoSquaresArea[5], twoSquaresArea[10], twoSquaresArea[0], twoSquaresArea[3]];
        
            for(let i=0; i<4; i++){        //Removes pawn behind the pawn     
                if (testSquare == pawnSquare[i] && coordinatePawnSquares.indexOf(pawnSquare[i]) != -1 && coordinateEnemyPawnSquares.indexOf(blindSpotSquare[i]) != -1) {
                    coordinateEnemyPawnSquares.splice(coordinateEnemyPawnSquares.indexOf(blindSpotSquare[i]), 1);
                }
            }
        })
    }

    function removePawnBetweenTwoPawns(){
        let pawnPos1 = [twoSquaresArea[6], twoSquaresArea[1], twoSquaresArea[9], twoSquaresArea[2]];
        let pawnPos2 = [twoSquaresArea[1], twoSquaresArea[9], twoSquaresArea[2], twoSquaresArea[6]];
        let blindSpot = [twoSquaresArea[7], twoSquaresArea[11], twoSquaresArea[8], twoSquaresArea[4]];
    
        for(let i=0; i<4; i++){
            if(coordinatePawnSquares.indexOf(pawnPos1[i]) != -1 && coordinatePawnSquares.indexOf(pawnPos2[i]) != -1 &&
               coordinateEnemyPawnSquares.indexOf(blindSpot[i]) != -1){
               coordinateEnemyPawnSquares.splice(coordinateEnemyPawnSquares.indexOf(blindSpot[i]), 1);
            }
        }  
    }

    addOtherTeamPawns();
    removePawnBehindPawn();
    removePawnBetweenTwoPawns();

    return coordinateEnemyPawnSquares;
}

function protectSquares(coordinateEnemyPawnSquares, twoSquaresArea){
    function removeRotateBlackInLine(){
        coordinateEnemyPawnSquares.forEach(testSquare => {
            let pawnSquareFirst = [twoSquaresArea[6], twoSquaresArea[9], twoSquaresArea[1], twoSquaresArea[2]];
            let pawnSquareSecond = [twoSquaresArea[5], twoSquaresArea[10], twoSquaresArea[0], twoSquaresArea[3]];
            let rotate1 = [90, 270, 0, 180];
            let rotate2 = [180, 0, 90, 270];

            //remove kill squares if the enemy pawn is on a black side (in line)
            for (let i = 0; i < 4; i++) {
                if (testSquare == pawnSquareFirst[i]) { 
                    if(parseInt(squares[testSquare].children[0].style.transform.match(/(\d+)/)[0]) == rotate1[i] ||
                       parseInt(squares[testSquare].children[0].style.transform.match(/(\d+)/)[0]) == rotate2[i]){
                        coordinateEnemyPawnSquares.splice(coordinateEnemyPawnSquares.indexOf(pawnSquareFirst[i]), 1);
                        removeRotateBlackInLine();
                    }
                }  
                if (testSquare == pawnSquareSecond[i]) { 
                    if(parseInt(squares[testSquare].children[0].style.transform.match(/(\d+)/)[0]) == rotate1[i] ||
                       parseInt(squares[testSquare].children[0].style.transform.match(/(\d+)/)[0]) == rotate2[i]){
                        coordinateEnemyPawnSquares.splice(coordinateEnemyPawnSquares.indexOf(pawnSquareSecond[i]), 1);
                        removeRotateBlackInLine();
                    }
                }  
            }
        })
    }

    function removeRotateBlackInDiagonal(){
        coordinateEnemyPawnSquares.forEach(testSquare => {
            let pawnSquare = [twoSquaresArea[7], twoSquaresArea[11], twoSquaresArea[8], twoSquaresArea[4]];
            let rotate1 = [180, 270, 180, 270];
            let rotate2 = [0, 90, 0, 90];
            let rotate3 = [90, 0, 270,180];
            let pawn1 = [twoSquaresArea[6], twoSquaresArea[9], twoSquaresArea[2], twoSquaresArea[2]];
            let pawn2 = [twoSquaresArea[1], twoSquaresArea[1], twoSquaresArea[9], twoSquaresArea[6]];

            //remove kill squares if the enemy pawn is on a black side (in diagonal)
            for (let i = 0; i < 4; i++) {
                if(testSquare == pawnSquare[i]){
                    //side black and pawn
                    if(parseInt(squares[testSquare].children[0].style.transform.match(/(\d+)/)[0]) == rotate1[i] && 
                       squares[pawn1[i]].children.length == 1){
                        coordinateEnemyPawnSquares.splice(coordinateEnemyPawnSquares.indexOf(pawnSquare[i]), 1);
                        removeRotateBlackInDiagonal();
                    }
                    //side black and pawn
                    if(parseInt(squares[testSquare].children[0].style.transform.match(/(\d+)/)[0]) == rotate2[i] && 
                       squares[pawn2[i]].children.length == 1){
                        coordinateEnemyPawnSquares.splice(coordinateEnemyPawnSquares.indexOf(pawnSquare[i]), 1);
                        removeRotateBlackInDiagonal();
                    }
                    //both sides black
                    if(parseInt(squares[testSquare].children[0].style.transform.match(/(\d+)/)[0]) == rotate3[i]){
                        coordinateEnemyPawnSquares.splice(coordinateEnemyPawnSquares.indexOf(pawnSquare[i]), 1);
                        removeRotateBlackInDiagonal();
                    }
                }
            }
        })
    }

    removeRotateBlackInDiagonal();
    removeRotateBlackInLine();

    return coordinateEnemyPawnSquares;
}

function pushSquares(coordinateMoveSquares, twoSquaresArea){
    let coordinatePushSquaresAndPawns = [];
    let coordinatePushSquares = [];
    let coordinatePushPawns = [];

    coordinateMoveSquares.forEach(testSquare => {
        let firstSquares = [twoSquaresArea[6], twoSquaresArea[9], twoSquaresArea[1], twoSquaresArea[2]];
        let lastSquares = [twoSquaresArea[5], twoSquaresArea[10], twoSquaresArea[0], twoSquaresArea[3]];
        let columnRow = [8, 1, "A", "H"];
        let position = [1, 1, 0, 0];
        
        //if the first square has a pawn and is not at the edge of the board
        for (let i = 0; i < 4; i++) {
            if(testSquare == firstSquares[i] && squares[firstSquares[i]].children.length == 1 &&
                squares[testSquare].id.search(columnRow[i]) != position[i] && squares[lastSquares[i]].children.length != 1){       
                     coordinatePushSquares.push(lastSquares[i]);
                     coordinatePushPawns.push(testSquare);
             }  
        } 
    })

    coordinatePushSquaresAndPawns = [coordinatePushSquares, coordinatePushPawns];

    return coordinatePushSquaresAndPawns;
}

function pullSquares(coordinateMoveSquares, twoSquaresArea){
    let coordinatePullSquaresAndPawns = [];
    let coordinatePullSquares = [];
    let coordinatePullPawns = [];

    coordinateMoveSquares.forEach(testSquare => {
        let firstSquares = [twoSquaresArea[6], twoSquaresArea[9], twoSquaresArea[1], twoSquaresArea[2]];
        let lastSquares = [twoSquaresArea[9], twoSquaresArea[6], twoSquaresArea[2], twoSquaresArea[1]];
        let columnRow = [2, 7, "G", "B"];
        let position = [1, 1, 0, 0];
        
        //if the first square has a pawn and is not at the edge of the board
        for (let i = 0; i < 4; i++) {
            if(testSquare == firstSquares[i] && squares[firstSquares[i]].children.length == 1 &&
                squares[testSquare].id.search(columnRow[i]) != position[i] && squares[lastSquares[i]].children.length != 1){       
                    coordinatePullSquares.push(lastSquares[i]);
                    coordinatePullPawns.push(testSquare);
             }  
        } 
    })

    coordinatePullSquaresAndPawns = [coordinatePullSquares, coordinatePullPawns];

    return coordinatePullSquaresAndPawns;
}

/*** Add and remove focus ***/

function removeFocus(){
    squares.forEach(square => {                         //boardGame returns to its original state
        square.classList.remove("move-square");
        square.classList.remove("kill-square");
        square.classList.remove("push-square");
        square.classList.remove("pull-square");
    });
}

function removeButtonFocus(){
    for (let i = 0; i < 3; i++) {
        buttons[i].classList.remove('buttonActive');  
    }
}

function addMoveKillFocus(){
    squares.forEach(square => {
        square.addEventListener('click', (e) => {
            if(moveButton.classList.length == 1){                                     //if move button is clicked
                if(square.children.length == 1){
                    //if pawn can move
                    if(movePawnCounter[square.children[0].id] == 2 || movePawnCounter[square.children[0].id] == 1){
                        removeFocus();

                        focusSquare = square;

                        let whichArea;

                        if(movePawnCounter[square.children[0].id] == 2){ //moving two square
                            whichArea = twoSquaresArea(square.id); 
                        }
                        if(movePawnCounter[square.children[0].id] == 1){ //moving one square
                             whichArea = oneSquaresArea(square.id);
                        }
                        
                        movementSquares(
                            squaresAreaInBoard(square.id, whichArea), twoSquaresArea(square.id)
                            ).forEach(movSquare => {
                                squares[movSquare].classList.add("move-square");        //Movement square has a showy background
                        })
        
                        protectSquares(
                            killSquares(squaresAreaInBoard(square.id, whichArea), square, twoSquaresArea(square.id)), 
                            twoSquaresArea(square.id)).forEach(killSquare => {
                                squares[killSquare].classList.add("kill-square");     //killing square has a showy background
                        })

                        movePawn();
                        killPawn();
                    } 
                }
            }
        })
    });
}

function addPushPullFocus(){
    squares.forEach(square => {
        square.addEventListener('click', (e) => {
            if(pushPullButton.classList.length == 1){                                     //if pushPull button is clicked    
                if(square.children.length == 1 ){                                          //If square has a pawn
                    //if pawn can move
                    if(movePawnCounter[square.children[0].id] == 2 || movePawnCounter[square.children[0].id] == 1){ 
                        removeFocus();
        
                        let pushSquaresArray = pushSquares(squaresAreaInBoard(square.id, twoSquaresArea(square.id)), twoSquaresArea(square.id));
                        let pullSquaresArray = pullSquares(squaresAreaInBoard(square.id, twoSquaresArea(square.id)), twoSquaresArea(square.id));
                        focusSquare = square;

                        let pullVar = 10;
                        let pushVar = 10;

                        function pull(i){
                            if(squares[pullSquaresArray[0][i]].className == "square pull-square"){
                                let moveCounter = movePawnCounter[focusSquare.children[0].id];
                                //the focus square goes on the square without a pawn
                                removePawnAddPawn(squares[pullSquaresArray[0][i]], focusSquare);
                                //if the other pawn can't move
                                if(movePawnCounter[squares[pullSquaresArray[1][i]].children[0].id] == 0){
                                    //the square with the pawn goes in place of the focus square was
                                    removePawnAddPawn(focusSquare, squares[pullSquaresArray[1][i]]);
                                    dontMove(focusSquare);
                                }
                                //if the other pawn can move on one square
                                else if(movePawnCounter[squares[pullSquaresArray[1][i]].children[0].id] == 1){
                                    //the square with the pawn goes in place of the focus square was
                                    removePawnAddPawn(focusSquare, squares[pullSquaresArray[1][i]]);
                                    oneSquareMove(focusSquare);
                                }
                                else{
                                    removePawnAddPawn(focusSquare, squares[pullSquaresArray[1][i]]);
                                }
                                pushPullCanMove(squares[pullSquaresArray[0][i]], moveCounter);
                            }
                        }
                        
                        function push(i){
                            if(squares[pushSquaresArray[0][i]].className == "square push-square"){
                                //if the other pawn can't move
                                if(movePawnCounter[squares[pushSquaresArray[1][i]].children[0].id] == 0){
                                    //the square with the pawn goes on the square without a pawn
                                    removePawnAddPawn(squares[pushSquaresArray[0][i]], squares[pushSquaresArray[1][i]]);
                                    dontMove(squares[pushSquaresArray[0][i]]);
                                }
                                //if the other pawn can move on one square
                                else if(movePawnCounter[squares[pushSquaresArray[1][i]].children[0].id] == 1){
                                    removePawnAddPawn(squares[pushSquaresArray[0][i]], squares[pushSquaresArray[1][i]]);
                                    oneSquareMove(squares[pushSquaresArray[0][i]]);
                                }
                                else{
                                    removePawnAddPawn(squares[pushSquaresArray[0][i]], squares[pushSquaresArray[1][i]]);
                                }

                                let moveCounter = movePawnCounter[focusSquare.children[0].id];
                                //the focus square  goes in place of the square where the pawn was
                                removePawnAddPawn(squares[pushSquaresArray[1][i]], focusSquare);
                                
                                pushPullCanMove(squares[pushSquaresArray[1][i]], moveCounter);
                            }
                        }

                        for (let i = 0; i < pushSquaresArray[0].length; i++) {
                            squares[pushSquaresArray[0][i]].classList.add("push-square");     //pushing square has a showy background

                            function pushListen(){
                                pushVar = i;
                                squares.forEach(square => square.removeEventListener('click', pushListen));
                            } 
                            
                            squares[pushSquaresArray[0][i]].addEventListener('click', pushListen);
                        }
        
                        for (let i = 0; i < pullSquaresArray[0].length; i++) {
                            squares[pullSquaresArray[0][i]].classList.add("pull-square");     //pushing square has a showy background

                            function pullListen(){
                                pullVar = i;
                                squares.forEach(square => square.removeEventListener('click', pullListen));;
                            } 

                            squares[pullSquaresArray[0][i]].addEventListener('click', pullListen);  
                        }

                        setInterval(() => {
                            if (pullVar != 10) {
                                pull(pullVar);
                                pullVar = 10;
                            }
                            if (pushVar != 10) {
                                push(pushVar);
                                pushVar = 10;
                            }
                        }, 1);
                    }
                }    
            }
        })
    });
}

function addFocus() {
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            removeFocus();
            removeButtonFocus();
            button.classList.add('buttonActive');
        })
    })

    addMoveKillFocus();
    addPushPullFocus();
    rotatePawn();
}

/*** Moving pawns on the board ***/

function removePawnAddPawn(addSquare, removeSquare){
    addSquare.innerHTML = `<div class="pawn"></div>`;                                  //Add a pawn in the movement square
    addSquare.children[0].classList.add(removeSquare.children[0].classList[1]);         //Pawn takes the color of his team
    addSquare.children[0].id = removeSquare.children[0].id;                             //Keep pawn id
    addSquare.children[0].style.transform = removeSquare.children[0].style.transform;   //add pawn rotate
    movePawnCounter[addSquare.children[0].id] = 2;                                 //Indicates the pawn can be played
    addSquare.children[0].style.outline = "4px solid #f3c053";                         //add outline if pawn can move
    removeSquare.innerHTML = "";                                                     //Remove the focus pawn
    removeFocus();
}

function oneSquareMove(square){
    movePawnCounter[square.children[0].id] = 1;                                 //pawn can move one square
}

function dontMove(square){
    movePawnCounter[square.children[0].id] = 0;                                 //pawn can't move
    square.children[0].style.outline = "none";                                      //remove outline
}

function oneOrTwoSquaresMove(square){
    if(movePawnCounter[focusSquare.children[0].id] == 2){
        let oneSquare = false;

        oneSquaresArea(focusSquare.id).forEach(id => {                                  
            if(squares[id] == square){  //If the pawn moves one square
                oneSquare = true;
            }
        });

        removePawnAddPawn(square, focusSquare);
        oneSquare ? oneSquareMove(square) : dontMove(square);

    }
    else{
        removePawnAddPawn(square, focusSquare);
        dontMove(square);
    }
}

function pushPullCanMove(square, moveCounter){
    if(moveCounter == 2){
       oneSquareMove(square);
    }
    else{
        dontMove(square);
    }
}

function movePawn(){
    squares.forEach(square => {
        square.addEventListener('click', () => {
            if(square.className == "square move-square"){                                       //If it's a movement square
                oneOrTwoSquaresMove(square);
            }
        })
    });
}

function killPawn(){
    squares.forEach(square => {
        square.addEventListener('click', () => {
            if(square.className == "square kill-square"){                                       //If it's a killing square                              
                oneOrTwoSquaresMove(square);
                
                if(square.children[0].classList[1] == "pawnTeam1"){                             //Counter of pawns
                    numberPawnTeam1 ++;                                         
                }
                else{
                    numberPawnTeam2 ++;
                }

                win();
            }
        })
    });
}

function rotatePawn(){
    function rotate90Deg(square){
        //.match() => return number of transform : rotate(90deg);
        let rotate = parseInt(square.children[0].style.transform.match(/(\d+)/)[0]);    
        rotate += 90;
        if(rotate == 360){  rotate = 0; }                                   //not to exceed 360°                                                 
        square.children[0].style.transform = "rotate(" + rotate + "deg)";
    }

    squares.forEach(square => {
        square.addEventListener('click', () => {
            if(rotateButton.classList.length == 1){                                     //if rotate button is clicked
                if(square.children.length == 1){                                        //if square has a pawn
                    //if turnCounter is even number and pawn is in team2
                    if(turnCounter%2 == 0 && square.children[0].classList[1] == "pawnTeam2"){ 
                        rotate90Deg(square);
                    }
                    //if turnCounter is odd number and pawn is in team1
                    if(turnCounter%2 != 0 && square.children[0].classList[1] == "pawnTeam1"){ 
                        rotate90Deg(square);
                    }                                            
                }      
            }
        })
    })
}

/*** Turns of play ***/

function turn(){
    squares.forEach(square => {
        if(square.children.length == 1 && movePawnCounter[square.children[0].id] == 2){
            square.children[0].style.outline = "4px solid #f3c053";                         //add outline if pawn can move (start)
        }
    })

    endOfTurnButton.addEventListener('click', ()=>{
        turnCounter ++;
        removeFocus();
        removeButtonFocus();
        gameTurnDisplay.innerHTML = `<h2>Tour ${turnCounter}</h2>`;         //display "Tour ..."

        if(turnCounter%2 == 0){                                              //if turnCounter is even number
            for(let i=0; i<9; i++){
                movePawnCounter["T1P"+ i] = 0;
                movePawnCounter["T2P"+ i] = 2;
            }
        }
        else{
            for(let i=0; i<9; i++){                                         //if turnCounter is odd number
                movePawnCounter["T1P"+ i] = 2;
                movePawnCounter["T2P"+ i] = 0;
            }
        }

        squares.forEach(square => {
            if(square.children.length == 1 && movePawnCounter[square.children[0].id] == 2){
                square.children[0].style.outline = "4px solid #f3c053";                         //add outline if pawn can move
            }
            if(square.children.length == 1 && movePawnCounter[square.children[0].id] == 0){
                square.children[0].style.outline = "none";                                      //remove outline if pawn can't move
            }
   
        })
    })
}

function win(){
    let pawnTeam = [numberPawnTeam1, numberPawnTeam2];
    let message = ["verts", "oranges"];
    let color = ["#6a8532", "#eb5e28"];

    for(let i=0; i<2; i++){
        if(pawnTeam[i] == 8){
            winDisplay.style.display = "flex";
            winDisplay.children[1].innerHTML = "<h1>Les " + message[i] + " l'emportent !</h1>";
            winDisplay.children[1].style.color = color[i];
        }
    }
}

/***** GAME *****/

let focusSquare = null;     //cf addMoveKillFocus()
let turnCounter = 1;        //cf turn()
let numberPawnTeam1 = 0;    //cf win()
let numberPawnTeam2 = 0;    //cf win()

let movePawnCounter = {
    T1P1 : 2, 
    T1P2 : 2, 
    T1P3 : 2, 
    T1P4 : 2, 
    T1P5 : 2, 
    T1P6 : 2, 
    T1P7 : 2, 
    T1P8 : 2,
    T2P1 : 0, 
    T2P2 : 0, 
    T2P3 : 0, 
    T2P4 : 0, 
    T2P5 : 0, 
    T2P6 : 0, 
    T2P7 : 0, 
    T2P8 : 0,
}

squares.forEach(square => {
    if(square.children.length == 1){
        square.children[0].style.transform = "rotate(0deg)";                            //add rotate for rotatePawn()
    }
})

turn();
addFocus();

