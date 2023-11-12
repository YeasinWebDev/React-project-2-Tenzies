
import React from "react";
import Main from "./main.js";
import Die from "./die.js";
import TrackNumber from "./trackNumber.js";
import {nanoid} from "nanoid";
import Confetti from 'react-confetti'

export default function App() {

    function allNewDice(){
        const newDice =[];
        for(let i=0; i<10;i++){
            newDice.push({
                value:Math.floor(Math.random()*6 + 1), 
                isHeld:false,
                id: nanoid()
            })
        }
        return newDice
    }


    // hold the dice 
    function holdDice(id) {
        setdice(oldOne =>  oldOne.map(die => die.id === id ? {...die, isHeld : !die.isHeld} : die))
    }


    // dice state
    const [dice , setdice] = React.useState(allNewDice())

    // tenzies state
    const [tenzies, setTenzies] = React.useState(false)
    // roll count state
    const [rollNum, setRollNum] = React.useState(0)


    // useEffect for dice change
    React.useEffect(() => {
        const allHeld = dice.every((die) => die.isHeld )
        const firstvalue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstvalue)
        if(allHeld && allSameValue) {
            setTenzies(true)
            console.log("you win ")
        }
    },[dice])

    // win 
    const reasetvalue = tenzies === true? "New Game": "Roll"

    // adding dice number
    const allDiceElement = dice.map(die => (<Die value={die.value}  
        key={die.id} isHeld ={die.isHeld} holdFunction ={() => holdDice(die.id)}/>))


    // reset btn function 
    function resetDice(){
          
            if(!tenzies){
                setdice(oldOne => oldOne.map(die => die.isHeld === true ? die : 
                {
                    value:Math.floor(Math.random()*6 + 1), 
                    isHeld:false,
                    id: nanoid()
                }))
                setRollNum(prev => prev + 1)
            }else{
                setTenzies(false)
                setdice(allNewDice())
                setRollNum(0)
            }
            console.log(rollNum)
        } 

    return (
        <div id="box">
            {tenzies && <Confetti />}
            <Main/>
            <div className="dice-container">
            {allDiceElement}
            </div>
            <TrackNumber  countRoll ={rollNum} />
            <button className="resetBtn" onClick={resetDice}> {reasetvalue} </button>
        </div>
    )
}