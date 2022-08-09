import {React, useState, useEffect} from 'react';
import './App.css'
import Status from './Status';

let turnNo = 0;
const App = () => {
	let [finished, setFinished] = useState(false);

	let [data, setData] = useState([[, 0], [, 1], [, 2], [, 3], [, 4], [, 5], [, 6], [, 7], [, 8]]);
	
	const update = (e) => {
		turnNo++;

		let newdata = [...data];
		data = newdata;
		let idVal = e.target['id']
		newdata[idVal] = [Number(turnNo % 2 == 1), idVal];
		setData(newdata);
		setFinished(Boolean(checkSolved(idVal)));
	}

	const checkSolved = (boxNo) => {
		let verticalChk = checkRow(boxNo) | checkColumn(boxNo);
		// console.log(checkRow(boxNo));
		let diagonalCheck = false;
		if(boxNo % 2 == 0){
			if(boxNo % 4 == 0){
				diagonalCheck |= (data[0][0] === data[4][0] && data[0][0] === data[8][0]);
			}
			if(boxNo % 4 == 2 || boxNo == 4){
				diagonalCheck |= data[2][0] === data[4][0] && data[4][0] === data[6][0];
			}
		}
		return (verticalChk | diagonalCheck);
	}

	const checkRow = (boxNo) => {
		let row = boxNo - boxNo%3;
		return (data[row][0] === data[row+1][0] && data[row][0] === data[row+2][0]);
	}
	const checkColumn = (boxNo) => {
		let column = boxNo %= 3;
		return (data[column][0] === data[column+3][0] && data[column][0] === data[column+6][0]);
	}

	return ( 
		<div className="App">
			<div className="grid-container">
				{data.map((container)=>{
					return(
						<div className="box" id={container[1]} onClick={update}>{container[0]}</div>
					)
				})}
				{finished && <Status />}
			</div>
		</div>
	 );
}
 
export default App;