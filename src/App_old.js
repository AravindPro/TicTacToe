import './App.css';
import Status from './Status';
let turnNo = 0;
let positions = [[null, null, null], [null, null, null], [null, null, null]]
let finished = false;

function checkSolved(rowNo, columnNo) {
  let verticalChk = checkRow(rowNo) | checkColumn(columnNo);
  
  let diagonalCheck = false;
  if((rowNo+columnNo)%2 === 0){
    if(rowNo === columnNo){
      diagonalCheck |= (positions[0][0] === positions[1][1] && positions[0][0] === positions[2][2]);
    }
    if(rowNo + columnNo === 2){
      diagonalCheck |= (positions[0][2] === positions[1][1] && positions[0][2] === positions[2][0]);
    }
  }
  return(verticalChk | diagonalCheck);
}

function checkRow(rowNo)
{
  return (positions[rowNo][0] === positions[rowNo][1] && positions[rowNo][0] === positions[rowNo][2]);
}
function checkColumn(columnNo)
{
  return (positions[0][columnNo] === positions[1][columnNo] && positions[0][columnNo] === positions[2][columnNo])
}
const update = (e) => {
  let boxNo = e.target['classList'][1]
  let rowNo = boxNo % 10;
  let columnNo = (boxNo-rowNo)/10;
  if(turnNo % 2 === 0)
  {
    e.target.children[0].textContent = 0;
    positions[rowNo][columnNo] = 0;
  }else{
    e.target.children[0].textContent = 1;
    positions[rowNo][columnNo] = 1;
  }
  turnNo++;
  if(checkSolved(rowNo, columnNo) == 1){
    finished = true;
  }
}




function App() {
  return (
    <div className="grid-container">
        <div className="box 00" onClick={update}><span className='box-content'></span></div>
        <div className="box 10" onClick={update}><span className='box-content'></span></div>
        <div className="box 20" onClick={update}><span className='box-content'></span></div>
        <div className="box 01" onClick={update}><span className='box-content'></span></div>
        <div className="box 11" onClick={update}><span className='box-content'></span></div>
        <div className="box 21" onClick={update}><span className='box-content'></span></div>
        <div className="box 02" onClick={update}><span className='box-content'></span></div>
        <div className="box 12" onClick={update}><span className='box-content'></span></div>
        <div className="box 22" onClick={update}><span className='box-content'></span></div>
        {finished && <Status />}
    </div>
    
  );
}

export default {App, finished};
