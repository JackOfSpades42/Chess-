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

function swapBoardString(str,numFrom,numTo){
    //if(numFrom<64 && numFrom>=0 && numTo<64 && numTo>=0){
        console.log("moving " + numFrom + " to " + numTo);
        if (numFrom<numTo){
            newString = str.substring(0,numFrom*2);
            newString += "ee";
            newString += str.substring(numFrom*2+2,numTo*2);
            newString += str[numFrom*2];
            newString += str[numFrom*2+1];
            newString += str.substring(numTo*2+2,str.length-1);
            newString += opposite(str[128]);
        } else {
            newString = str.substring(0,numTo*2);
            newString += str[numFrom*2];
            newString += str[numFrom*2+1];
            newString += str.substring(numTo*2+2,numFrom*2);
            newString += "ee";
            newString += str.substring(numFrom*2+2,str.length-1);
            newString += opposite(str[128]);
        }
        return newString;
    //}
    //else {
        //return "";
    //}
}

function check (str,color){
    if (color===undefined){
        var checkw = check(str,"w");
        var checkb = check(str,"b");
        if (!checkb && !checkw){
            return false;
        } else {
            return true;
        }
    }
    else {
        var king = color + "K";
        var kingSpace = Math.floor((str.indexOf(king)/2));
        console.log(kingSpace);
        console.log("Check string = "+ str );
        var bishCheck = getBishopMoves(kingSpace,color,str);
        var rookCheck = getRookMoves(kingSpace,color,str);
        var knightCheck = getKnightMoves(kingSpace,color,str);
        var checkBoard = newBoard(str);
        var checkPieces = createPiecesArr(checkBoard);
        if (bishCheck.length>0){
            for (var bcheck=0;bcheck<bishCheck.length;bcheck++){
                if (checkPieces[bishCheck[bcheck][1]]){
                    if (checkPieces[bishCheck[bcheck][1]].type==="B" || checkPieces[bishCheck[bcheck][1]].type==="Q"){
                        return true;
                    }
                }
            }
        }
        if (rookCheck.length>0){
            for (var rcheck=0;rcheck<rookCheck.length;rcheck++){
                if (checkPieces[rookCheck[rcheck][1]]){
                    if (checkPieces[rookCheck[rcheck][1]].type==="R" || checkPieces[rookCheck[rcheck][1]].type==="Q"){
                        return true;
                    }
                }
            }
        }
        if (knightCheck.length>0){
            for (var kcheck=0;kcheck<knightCheck.length;kcheck++){
                if (checkPieces[knightCheck[kcheck][1]]){
                    if (checkPieces[knightCheck[kcheck][1]].type==="K"){
                        return true;
                    }
                }
            }
        }
        if (color==="w"){
            if (checkPieces[kingSpace-7]){
                if (checkPieces[kingSpace-7].type==="P" && checkPieces[kingSpace-7].color==="b"){
                    return true;
                }
            } else if (checkPieces[kingSpace-9]){
                if (checkPieces[kingSpace-9].type==="P" && checkPieces[kingSpace-9].color==="b"){
                    return true;
                }
            }
        } else {
            if (checkPieces[kingSpace+7]){
                if (checkPieces[kingSpace+7].type==="P" && checkPieces[kingSpace+7].color==="w"){
                    return true;
                }
            } else if (checkPieces[kingSpace+9]){
                if (checkPieces[kingSpace+9].type==="P" && checkPieces[kingSpace+9].color==="w"){
                    return true;
                }
            }
        }
    }
    return false;
}

function getBishopMoves(num,color,str){
    var thisMoveBoard = newBoard(str);
    var thisMovePieces = createPiecesArr(thisMoveBoard);
    for (var topRightFile=1;topRightFile<8;topRightFile++){
        if (num-(topRightFile*7)>=0 && (num-(topRightFile*7))%8!==0){
            if (!thisMovePieces[num-(topRightFile*7)]){
                thisMovePieces[num].moves.push([num,num-(topRightFile*7)]);
            } else if (thisMovePieces[num-(topRightFile*7)].color===opposite(color)){
                thisMovePieces[num].moves.push([num,num-(topRightFile*7)]);
                break;
            } else if (thisMovePieces[num-(topRightFile*7)].color===color){
                break;
            }
        } else {
            break;
        }
    }
    for (var topLeftFile=1;topLeftFile<8;topLeftFile++){
        if (num-(topLeftFile*9)>=0 && (num-(topLeftFile*9))%8!==7){
            if (!thisMovePieces[num-(topLeftFile*9)]){
                thisMovePieces[num].moves.push([num,num-(topLeftFile*9)]);
            } else if (thisMovePieces[num-(topLeftFile*9)].color===opposite(color)){
                thisMovePieces[num].moves.push([num,num-(topLeftFile*9)]);
                break;
            } else if (thisMovePieces[num-(topLeftFile*9)].color===color){
                break;
            }
        } else {
            break;
        }
    }
    for (var bottomRightFile=1;bottomRightFile<8;bottomRightFile++){
        if (num+(bottomRightFile*7)<=63 && (num+(bottomRightFile*7))%8!==7){
            if (!thisMovePieces[num+(bottomRightFile*7)]){
                thisMovePieces[num].moves.push([num,num+(bottomRightFile*7)]);
            } else if (thisMovePieces[num+(bottomRightFile*7)].color===opposite(color)){
                thisMovePieces[num].moves.push([num,num+(bottomRightFile*7)]);
                break;
            } else if (thisMovePieces[num+(bottomRightFile*7)].color===color){
                break;
            }
        } else {
            break;
        }
    }
    for (var bottomLeftFile=1;bottomLeftFile<8;bottomLeftFile++){
        if (num+(bottomLeftFile*9)<=63 && (num+(bottomLeftFile*9))%8!==0){
            if (!thisMovePieces[num+(bottomLeftFile*9)]){
                thisMovePieces[num].moves.push([num,num+(bottomLeftFile*9)]);
            } else if (thisMovePieces[num+(bottomLeftFile*9)].color===opposite(color)){
                thisMovePieces[num].moves.push([num,num+(bottomLeftFile*9)]);
                break;
            } else if (thisMovePieces[num+(bottomLeftFile*9)].color===color){
                break;
            }
        } else {
            break;
        }
    }
    console.log(num);
    return thisMovePieces[num].moves;
}
function getRookMoves(num,color,str){
    var thisMoveBoard = newBoard(str);
    var thisMovePieces = createPiecesArr(thisMoveBoard);
    var lastRightSpace = Math.floor(num/8)*8 + 7;
    var lastLeftSpace = Math.floor(num/8)*8;
    for (var rightSideRow=1;rightSideRow<8;rightSideRow++){
        if (num+rightSideRow<=lastRightSpace){
            if (!thisMovePieces[num+rightSideRow]){
                thisMovePieces[num].moves.push([num,num+rightSideRow]);
            } else if (thisMovePieces[num+rightSideRow].color===opposite(color)){
                thisMovePieces[num].moves.push([num,num+rightSideRow]);
                break;
            } else if (thisMovePieces[num+rightSideRow].color === color){
                break;
            }
        } else {
            break;
        }
    }
    for (var leftSideRow=1;leftSideRow<8;leftSideRow++){
        if (num-leftSideRow>=lastLeftSpace){
            if(!thisMovePieces[num-leftSideRow]){
                thisMovePieces[num].moves.push([num,num-leftSideRow]);
            } else if (thisMovePieces[num-leftSideRow].color===opposite(color)){
                thisMovePieces[num].moves.push([num,num-leftSideRow]);
                break;
            } else if (thisMovePieces[num-leftSideRow].color === color){
                break;
            }
        } else {
            break;
        }
    }
    for (var topColumn=1;topColumn<8;topColumn++){
        if (num-(topColumn*8)>=0){
            if (!thisMovePieces[num-(topColumn*8)]){
                thisMovePieces[num].moves.push([num,num-(topColumn*8)]);
            } else if (thisMovePieces[num-(topColumn*8)].color===opposite(color)){
                thisMovePieces[num].moves.push([num,num-(topColumn*8)]);
                break;
            } else if (thisMovePieces[num-(topColumn*8)].color===color){
                break;
            }
        } else {
            break;
        }
    }
    for (var bottomColumn=1;bottomColumn<8;bottomColumn++){
        if (num+(bottomColumn*8)<=63){
            if (!thisMovePieces[num+(bottomColumn*8)]){
                thisMovePieces[num].moves.push([num,num+(bottomColumn*8)]);
            } else if (thisMovePieces[num+(bottomColumn*8)].color===opposite(color)){
                thisMovePieces[num].moves.push([num,num+(bottomColumn*8)]);
                break;
            } else if (thisMovePieces[num+(bottomColumn*8)].color===color){
                break;
            }
        }  else {
            break;
        }
    }
    return thisMovePieces[num].moves;
}



function getKingMoves(num,color,str){
    var movesArr = [];
    if(num+1<64){
        if (num+8<64){
            var checkString = swapBoardString(str,num,num+8);
            if (!check(checkString,color)){
                if (!pieces[num+8]){
                    movesArr.push([num,num+8]);
                } else if (pieces[num+8].color===opposite(color)){
                    movesArr.push([num,num+8]);
                }
            }
        } 
        if (num+7<64){
            console.log(num+7);
            var checkString = swapBoardString(str,num,num+7);
            if (!check(checkString,color)){
                if (!pieces[num+7] && num%8!==0){
                    movesArr.push([num,num+7]);
                } else if(!pieces[num+7]){

                } else if (pieces[num+7].color===opposite(color) && num%8!==0){
                    movesArr.push([num,num+7]);
                }
            }
        }
        if (num+9<64){
            var checkString = swapBoardString(str,num,num+9);
            if (!check(checkString,color)){
                if (!pieces[num+9] && num%8!==7){
                    movesArr.push([num,num+9]);
                } else if(!pieces[num+9]){

                } else if (pieces[num+9].color===opposite(color) && num%8!==7){
                    movesArr.push([num,num+9]);
                }
            }
        }
        var checkString = swapBoardString(str,num,num+1);
        if (!check(checkString,color)){
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
            var checkString = swapBoardString(str,num,num-8);
            if (!check(checkString,color)){
                if (!pieces[num-8]){
                    movesArr.push([num,num-8]);
                } else if (pieces[num-8].color===opposite(color)){
                    movesArr.push([num,num-8]);
                }
            }
        } 
        if (num-7>=0){
            var checkString = swapBoardString(str,num,num-7);
            if (!check(checkString,color)){
                if (!pieces[num-7] && num%8!==7){
                    movesArr.push([num,num-7]);
                } else if(!pieces[num-7]){

                } else if (pieces[num-7].color===opposite(color) && num%8!==7){
                    movesArr.push([num,num-7]);
                }
            }
        }
        if (num-9>=0){
            var checkString = swapBoardString(str,num,num-9);
            if (!check(checkString,color)){
                if (!pieces[num-9] && num%8!==0){
                    movesArr.push([num,num-9]);
                } else if(!pieces[num-9]){

                } else if (pieces[num-9].color===opposite(color) && num%8!==0){
                    movesArr.push([num,num-9]);
                }
            }
        }
        var checkString = swapBoardString(str,num,num-1);
        if (!check(checkString,color)){
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

function getKnightMoves(num,color,str){
    var thisMoveBoard = newBoard(str);
    var thisMovePieces = createPiecesArr(thisMoveBoard);
    if (num-17 >=0){
        if (num%8!==0){
            if (!thisMovePieces[num-17]){
                thisMovePieces[num].moves.push([num,num-17]);
            } 
            else if (thisMovePieces[num-17].color===opposite(color)){
                thisMovePieces[num].moves.push([num,num-17]);
            }
        }
    }
    
    if (num-15 >=0){
        if (num%8!==7){
            if (!thisMovePieces[num-15]){
                thisMovePieces[num].moves.push([num,num-15]);
            } 
            else if (thisMovePieces[num-15].color===opposite(color)){
                thisMovePieces[num].moves.push([num,num-15]);
            }
        }
    }
    
    if (num-10 >=0){
        if (num%8>1){
            if (!thisMovePieces[num-10]){
                thisMovePieces[num].moves.push([num,num-10]);
            } 
            else if (thisMovePieces[num-10].color===opposite(color)){
                thisMovePieces[num].moves.push([num,num-10]);
            }
        }
    }
    
    if (num-6 >=0){
        if (num%8<6){
            if (!thisMovePieces[num-6]){
                thisMovePieces[num].moves.push([num,num-6]);
            } 
            else if (thisMovePieces[num-6].color===opposite(color)){
                thisMovePieces[num].moves.push([num,num-6]);
            }
        }
    }
   
    if (num+17<=63){
        if (num%8!==7){
            if (!thisMovePieces[num+17]){
                thisMovePieces[num].moves.push([num,num+17]);
            } 
            else if (thisMovePieces[num+17].color===opposite(color)){
                thisMovePieces[num].moves.push([num,num+17]);
            }
        }
    }
    
    if (num+15<=63){
        if (num%8!==0){
            if (!thisMovePieces[num+15]){
                thisMovePieces[num].moves.push([num,num+15]);
            }
            else if (thisMovePieces[num+15].color===opposite(color)){
                thisMovePieces[num].moves.push([num,num+15]);
            }
        }
    }
    
    if (num+10<=63){
        if (num%8<6){
            if (!thisMovePieces[num+10]){
                thisMovePieces[num].moves.push([num,num+10]);
            } 
            else if (thisMovePieces[num+10].color===opposite(color)){
                thisMovePieces[num].moves.push([num,num+10]);
            }
        }
    }
    
    if (num+6<=63){
        if (num%8>1){
            if (!thisMovePieces[num+6]){
                thisMovePieces[num].moves.push([num,num+6])
            } 
            else if (thisMovePieces[num+6].color===opposite(color)){
                thisMovePieces[num].moves.push([num,num+6]);
            }
        }
    }
    return thisMovePieces[num].moves;
}

function getPawnMoves(num,color,str){
    var thisMoveBoard = newBoard(str);
    var thisMovePieces = createPiecesArr(thisMoveBoard);
    if (color==="w"){
        if (thisMovePieces[num-7]&& thisMovePieces[num-7].color==="b"){
            thisMovePieces[num].moves.push([num,num-7]);
        }
        if (thisMovePieces[num-9] && thisMovePieces[num-9].color==="b"){
            thisMovePieces[num].moves.push([num,num-9]);
        }
        if (!thisMovePieces[num-8]){
            thisMovePieces[num].moves.push([num,num-8]);
            if (num/8>=6 && !thisMovePieces[num-16]){
                thisMovePieces[num].moves.push([num,num-16]);
            }
        }
    } else if (color==="b"){
        if (thisMovePieces[num+7]&& thisMovePieces[num+7].color==="w"){
            thisMovePieces[num].moves.push([num,num+7]);
        }
        if (thisMovePieces[num+9] && thisMovePieces[num+9].color==="w"){
            thisMovePieces[num].moves.push([num,num+9]);
        }
        if (!thisMovePieces[num+8]){
            thisMovePieces[num].moves.push([num,num+8]);
            if (num/8<2 && !thisMovePieces[num+16]){
                thisMovePieces[num].moves.push([num,num+16]);
            }
        }
    }
    return thisMovePieces[num].moves;
}

function findMoves(num,type,color,str){
    if (type==="P"){
        pieces[num].moves = getPawnMoves(num,color,str);
    } else if (type==="N"){
        pieces[num].moves = getKnightMoves(num,color,str);
    } else if (type==="B"){
        pieces[num].moves = getBishopMoves(num,color,str);
    } else if (type==="R"){
        pieces[num].moves = getRookMoves(num,color,str);
    } else if (type==="Q"){
        pieces[num].moves = getBishopMoves(num,color,str);
        var qRookMoves = getRookMoves(num,color,str);
        for (var addRookMoves=0;addRookMoves<qRookMoves.length;addRookMoves++){
            pieces[num].moves.push(qRookMoves[addRookMoves]);
        }
    } else if (type==="K"){
        pieces[num].moves = getKingMoves(num,color,str);
    }
}

function showMove(num,type,color,str){
    removeImages();
    board = newBoard(boardString);
    pieces = createPiecesArr(board);
    doThing();
    pieces[num].moves = [];
    clearBorders();
    console.log(num + " " + color + type);
    findMoves(num,type,color,str);
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

function addShowMoveFunction(boxes,num,type,color,str){
    boxes.onclick = function(){showMove(num,type,color,str);}
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
                addShowMoveFunction(boxes[cc],cc,pieces[cc].type,pieces[cc].color,boardString);
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
