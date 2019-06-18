// A script that may one day play chess.

function addBorder(num){
    var boxes = document.getElementsByClassName("box64");
    boxes[num].style.border = "2px solid rgb(204,0,0)";
}

function addSelectionBorder(num){
    var boxes = document.getElementsByClassName("box64");
    boxes[num].style.border = "2px solid rgb(1,1,1)";
}

function clearBorders(){
    var redBoxes = document.getElementsByClassName("box64red");
    var whiteBoxes = document.getElementsByClassName("box64white");
    for (var boxcount=0;boxcount<redBoxes.length;boxcount++){
        redBoxes[boxcount].style.border = "2px solid rgb(192, 137, 129)";
        whiteBoxes[boxcount].style.border = "2px solid blanchedalmond";
    }
}

function opposite(color){
    if (color==="w"){
        return "b";
    }
    return "w";
}

function createPiecesArr(board){
    var newPiecesArr = [];
    for (var piecesCount=0;piecesCount<board.length-1;piecesCount++){
        if (board[piecesCount]!=='ee'){
            newPiecesArr[piecesCount] = addPiece(board[piecesCount]);
        }
    }
    return newPiecesArr;
}

function swapBoardString(str,num1,num2){
    if (num1<num2){
        newString = str.substring(0,num1*2);
        newString += "ee";
        newString += str.substring(num1*2+2,num2*2);
        newString += str[num1*2];
        newString += str[num1*2+1];
        newString += str.substring(num2*2+2,str.length-1);
        newString += opposite(str[128]);
    } else {
        newString = str.substring(0,num2*2);
        newString += str[num1*2];
        newString += str[num1*2+1];
        newString += str.substring(num2*2+2,num1*2);
        newString += "ee";
        newString += str.substring(num1*2+2,str.length-1);
        newString += opposite(str[128]);
    }
    return newString;
}

function check (str,color){
    return false;
}

function getBishopMoves(num,color){
    for (var topRightFile=1;topRightFile<8;topRightFile++){
        if (num-(topRightFile*7)>=0 && (num-(topRightFile*7))%8!==0){
            if (!pieces[num-(topRightFile*7)]){
                pieces[num].moves.push([num,num-(topRightFile*7)]);
            } else if (pieces[num-(topRightFile*7)].color===opposite(color)){
                pieces[num].moves.push([num,num-(topRightFile*7)]);
                break;
            } else if (pieces[num-(topRightFile*7)].color===color){
                break;
            }
        } else {
            break;
        }
    }
    for (var topLeftFile=1;topLeftFile<8;topLeftFile++){
        if (num-(topLeftFile*9)>=0 && (num-(topLeftFile*9))%8!==7){
            if (!pieces[num-(topLeftFile*9)]){
                pieces[num].moves.push([num,num-(topLeftFile*9)]);
            } else if (pieces[num-(topLeftFile*9)].color===opposite(color)){
                pieces[num].moves.push([num,num-(topLeftFile*9)]);
                break;
            } else if (pieces[num-(topLeftFile*9)].color===color){
                break;
            }
        } else {
            break;
        }
    }
    for (var bottomRightFile=1;bottomRightFile<8;bottomRightFile++){
        if (num+(bottomRightFile*7)<=63 && (num+(bottomRightFile*7))%8!==7){
            if (!pieces[num+(bottomRightFile*7)]){
                pieces[num].moves.push([num,num+(bottomRightFile*7)]);
            } else if (pieces[num+(bottomRightFile*7)].color===opposite(color)){
                pieces[num].moves.push([num,num+(bottomRightFile*7)]);
                break;
            } else if (pieces[num+(bottomRightFile*7)].color===color){
                break;
            }
        } else {
            break;
        }
    }
    for (var bottomLeftFile=1;bottomLeftFile<8;bottomLeftFile++){
        if (num+(bottomLeftFile*9)<=63 && (num+(bottomLeftFile*9))%8!==0){
            if (!pieces[num+(bottomLeftFile*9)]){
                pieces[num].moves.push([num,num+(bottomLeftFile*9)]);
            } else if (pieces[num+(bottomLeftFile*9)].color===opposite(color)){
                pieces[num].moves.push([num,num+(bottomLeftFile*9)]);
                break;
            } else if (pieces[num+(bottomLeftFile*9)].color===color){
                break;
            }
        } else {
            break;
        }
    }
}
function getRookMoves(num,color){
    var lastRightSpace = Math.floor(num/8)*8 + 7;
    var lastLeftSpace = Math.floor(num/8)*8;
    for (var rightSideRow=1;rightSideRow<8;rightSideRow++){
        if (num+rightSideRow<=lastRightSpace){
            if (!pieces[num+rightSideRow]){
                pieces[num].moves.push([num,num+rightSideRow]);
            } else if (pieces[num+rightSideRow].color===opposite(color)){
                pieces[num].moves.push([num,num+rightSideRow]);
                break;
            } else if (pieces[num+rightSideRow].color === color){
                break;
            }
        } else {
            break;
        }
    }
    for (var leftSideRow=1;leftSideRow<8;leftSideRow++){
        if (num-leftSideRow>=lastLeftSpace){
            if(!pieces[num-leftSideRow]){
                pieces[num].moves.push([num,num-leftSideRow]);
            } else if (pieces[num-leftSideRow].color===opposite(color)){
                pieces[num].moves.push([num,num-leftSideRow]);
                break;
            } else if (pieces[num-leftSideRow].color === color){
                break;
            }
        } else {
            break;
        }
    }
    for (var topColumn=1;topColumn<8;topColumn++){
        if (num-(topColumn*8)>=0){
            if (!pieces[num-(topColumn*8)]){
                pieces[num].moves.push([num,num-(topColumn*8)]);
            } else if (pieces[num-(topColumn*8)].color===opposite(color)){
                pieces[num].moves.push([num,num-(topColumn*8)]);
                break;
            } else if (pieces[num-(topColumn*8)].color===color){
                break;
            }
        } else {
            break;
        }
    }
    for (var bottomColumn=1;bottomColumn<8;bottomColumn++){
        if (num+(bottomColumn*8)<=63){
            if (!pieces[num+(bottomColumn*8)]){
                pieces[num].moves.push([num,num+(bottomColumn*8)]);
            } else if (pieces[num+(bottomColumn*8)].color===opposite(color)){
                pieces[num].moves.push([num,num+(bottomColumn*8)]);
                break;
            } else if (pieces[num+(bottomColumn*8)].color===color){
                break;
            }
        }  else {
            break;
        }
    }
}



function getKingMoves(num,color){
    var movesArr = [];
    var lastLeftSpace = Math.floor(num/8) * 8;
    var lastRightSpace = lastLeftSpace + 7;
    if(num+1<64){
        if (num+8<64){
            if (!check((num+8),color)){
                if (!pieces[num+8]){
                    movesArr.push([num,num+8]);
                } else if (pieces[num+8].color===opposite(color)){
                    movesArr.push([num,num+8]);
                }
            }
        } 
        if (num+7<64){
            if (!check((num+7),color)){
                if (!pieces[num+7] && num%8!==0){
                    movesArr.push([num,num+7]);
                } else if(!pieces[num+7]){

                } else if (pieces[num+7].color===opposite(color) && num%8!==0){
                    movesArr.push([num,num+7]);
                }
            }
        }
        if (num+9<64){
            if (!check((num+9),color)){
                if (!pieces[num+9] && num%8!==7){
                    movesArr.push([num,num+9]);
                } else if(!pieces[num+9]){

                } else if (pieces[num+9].color===opposite(color) && num%8!==7){
                    movesArr.push([num,num+9]);
                }
            }
        }
        if (!check((num+1),color)){
            if (!pieces[num+1] & num%8!==7){
                movesArr.push([num,num+1]);
            } else if(!pieces[num+1]){

            } else if (pieces[num+1].color===opposite(color) && num%8!==7){
                movesArr.push([num,num+1]);
            }
        }
    }
    if (num-1>=0){
        if (num-8>=0){
            if (!check((num-8),color)){
                if (!pieces[num-8]){
                    movesArr.push([num,num-8]);
                } else if (pieces[num-8].color===opposite(color)){
                    movesArr.push([num,num-8]);
                }
            }
        } 
        if (num-7>=0){
            if (!check((num-7),color)){
                if (!pieces[num-7] && num%8!==7){
                    movesArr.push([num,num-7]);
                } else if(!pieces[num-7]){

                } else if (pieces[num-7].color===opposite(color) && num%8!==7){
                    movesArr.push([num,num-7]);
                }
            }
        }
        if (num-9>=0){
            if (!check((num-9),color)){
                if (!pieces[num-9] && num%8!==0){
                    movesArr.push([num,num-9]);
                } else if(!pieces[num-9]){

                } else if (pieces[num-9].color===opposite(color) && num%8!==0){
                    movesArr.push([num,num-9]);
                }
            }
        }
        if (!check((num-1),color)){
            if (!pieces[num-1] && num%8!==0){
                movesArr.push([num,num-1]);
            } else if(!pieces[num-1]){

            } else if (pieces[num-1].color===opposite(color) && num%8!==0){
                movesArr.push([num,num-1]);
            }
        }
    }
    return movesArr;
}

function findMoves(num,type,color){
    if (type==="P"){
        if (color==="w"){
            if (pieces[num-7]&& pieces[num-7].color==="b"){
                pieces[num].moves.push([num,num-7]);
            }
            if (pieces[num-9] && pieces[num-9].color==="b"){
                pieces[num].moves.push([num,num-9]);
            }
            if (!pieces[num-8]){
                pieces[num].moves.push([num,num-8]);
                if (num/8>=6 && !pieces[num-16]){
                    pieces[num].moves.push([num,num-16]);
                }
            }
        } else if (color==="b"){
            if (pieces[num+7]&& pieces[num+7].color==="w"){
                pieces[num].moves.push([num,num+7]);
            }
            if (pieces[num+9] && pieces[num+9].color==="w"){
                pieces[num].moves.push([num,num+9]);
            }
            if (!pieces[num+8]){
                pieces[num].moves.push([num,num+8]);
                if (num/8<2 && !pieces[num+16]){
                    pieces[num].moves.push([num,num+16]);
                }
            }
        }
    } else if (type==="N"){
        
        if (num-17 >=0){
            if (num%8!==0){
                if (!pieces[num-17]){
                    pieces[num].moves.push([num,num-17]);
                } 
                else if (pieces[num-17].color===opposite(color)){
                    pieces[num].moves.push([num,num-17]);
                }
            }
        }
        
        if (num-15 >=0){
            if (num%8!==7){
                if (!pieces[num-15]){
                    pieces[num].moves.push([num,num-15]);
                } 
                else if (pieces[num-15].color===opposite(color)){
                    pieces[num].moves.push([num,num-15]);
                }
            }
        }
        
        if (num-10 >=0){
            if (num%8>1){
                if (!pieces[num-10]){
                    pieces[num].moves.push([num,num-10]);
                } 
                else if (pieces[num-10].color===opposite(color)){
                    pieces[num].moves.push([num,num-10]);
                }
            }
        }
        
        if (num-6 >=0){
            if (num%8<6){
                if (!pieces[num-6]){
                    pieces[num].moves.push([num,num-6]);
                } 
                else if (pieces[num-6].color===opposite(color)){
                    pieces[num].moves.push([num,num-6]);
                }
            }
        }
       
        if (num+17<=63){
            if (num%8!==7){
                if (!pieces[num+17]){
                    pieces[num].moves.push([num,num+17]);
                } 
                else if (pieces[num+17].color===opposite(color)){
                    pieces[num].moves.push([num,num+17]);
                }
            }
        }
        
        if (num+15<=63){
            if (num%8!==0){
                if (!pieces[num+15]){
                    pieces[num].moves.push([num,num+15]);
                }
                else if (pieces[num+15].color===opposite(color)){
                    pieces[num].moves.push([num,num+15]);
                }
            }
        }
        
        if (num+10<=63){
            if (num%8<6){
                if (!pieces[num+10]){
                    pieces[num].moves.push([num,num+10]);
                } 
                else if (pieces[num+10].color===opposite(color)){
                    pieces[num].moves.push([num,num+10]);
                }
            }
        }
        
        if (num+6<=63){
            if (num%8>1){
                if (!pieces[num+6]){
                    pieces[num].moves.push([num,num+6])
                } 
                else if (pieces[num+6].color===opposite(color)){
                    pieces[num].moves.push([num,num+6]);
                }
            }
        }
    } else if (type==="B"){
        getBishopMoves(num,color);
    } else if (type==="R"){
        getRookMoves(num,color);
    } else if (type==="Q"){
        getBishopMoves(num,color);
        getRookMoves(num,color);
    } else if (type==="K"){
        pieces[num].moves = getKingMoves(num,color);
    }
}

function showMove(num,type,color){
    removeImages();
    board = newBoard(boardString);
    pieces = createPiecesArr(board);
    doThing();
    pieces[num].moves = [];
    clearBorders();
    console.log(num + " " + color + type);
    findMoves(num,type,color);
    //console.log(pieces[num].moves);
    for (var mov=0;mov<pieces[num].moves.length;mov++){
        addBorder(pieces[num].moves[mov][1]);
        addDestinationFunction(num,pieces[num].moves[mov][1]);
        //console.log(pieces[num].moves[mov]);
    }
    addSelectionBorder(num);
}

function Destination(num1,num2){
    removeImages();
    console.log(num2);
    boardString = swapBoardString(boardString,num1,num2);
    board = newBoard(boardString);
    pieces = createPiecesArr(board);
    clearBorders();
    doThing();
}

function newBoard(str){
    var newBoard = [];
    for (var aa=0;aa<128;aa++){
        newBoard[aa/2] = str[aa] + str[aa+1];
        aa++;
    }
    newBoard[64] = str[128];
    return newBoard;
}

function addPiece (str){
    var newPiece = {};
    newPiece.color = str[0];
    newPiece.type = str[1];
    newPiece.image = new Image();
    newPiece.image.src = './img/' + str + '.png';
    newPiece.space;
    newPiece.moves = [];
    return newPiece;
}

function addBorderFunction(boxes,num){
    boxes.onclick = function(){addBorder(num);}
}

function addShowMoveFunction(boxes,num,type,color){
    boxes.onclick = function(){showMove(num,type,color);}
}

function clearOnclick(box){
    box.onclick = function(){}
}

function addDestinationFunction(num1,num2){
    var boxes = document.getElementsByClassName("box64");
    boxes[num2].onclick = function(){Destination(num1,num2);}
}

function doThing(){
    var boxes = document.getElementsByClassName("box64");
    for (var a=0;a<boxes.length;a++){
        boxes[a].style.cursor = "pointer";
    }
    for (var cc=0;cc<64;cc++){
        if (pieces[cc]){
            boxes[cc].append(pieces[cc].image);
            pieces[cc].space = cc;
            if (pieces[cc].color!==boardString[128]){
                clearOnclick(boxes[cc]);
            } else {
                addShowMoveFunction(boxes[cc],cc,pieces[cc].type,pieces[cc].color);
            }
        } else {
            clearOnclick(boxes[cc]);
        }
    }
}
function removeImages(){
    var boxes = document.getElementsByClassName("box64");
    for (var dd=0;dd<64;dd++){
        if (pieces[dd]){
            boxes[dd].removeChild(boxes[dd].lastChild);
        }
    }
}
/*
*
*
*
*
*
*
*
*/
//The goods
var boardString = 'bRbNbBbQbKbBbNbR'
for (var pawnCountb=0;pawnCountb<8;pawnCountb++){
    boardString += 'bP';
}
for (var Ecount=0;Ecount<32;Ecount++){
    boardString += 'ee';
}
for (var pawnCountw=0;pawnCountw<8;pawnCountw++){
    boardString += 'wP';
    
}
boardString += 'wRwNwBwQwKwBwNwRw';
var board = newBoard(boardString);
var pieces = createPiecesArr(board);
