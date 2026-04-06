import { useState } from 'react'
import './App.css'
import Die from "./Die.jsx"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"

export default function App() {

  const {width, height} = useWindowSize()
  const [dice, setDice] = useState( () => allNewDice())

    /**
     * Challenge part 2:
     * 1. Create a new `gameWon` variable.
     * 2. If `gameWon` is true, change the button text to
     *    "New Game" instead of "Roll"
     */

  const gameWon = checkGameWon()
  if (gameWon) {
    console.log("Game Won!")
  }


  function checkGameWon() {
    let firstVal = dice[0].value 
    for (let i = 0; i < dice.length; i++ ) {
      if (!dice[i].isHeld || dice[i].value != firstVal)
        return false;
    }
    return true
  }


  function randFace() {
    return (Math.floor(Math.random() * 6) + 1)
  }

  /**
   * Function takes no parameters
   * Returns and array of size 10
   * Each element is a random number between 1-6 inclusive
   */
  function allNewDice() {
    let arr = []
    for (let i=0; i<10; i++) {
      arr[i] = {
        value: randFace(),
        isHeld: false,
        id: nanoid()
      }
    }
    return arr
  }

  function renderDice() {
    const diceArr =  dice.map( (die) => <Die key={die.id} id={die.id} value={die.value} isHeld={die.isHeld} hold={hold}/>)
    return diceArr
  }

  function handleRollDiceClick() {
    gameWon ? setDice(allNewDice) : reroll()
  }

  function reroll() {

    let newArr = []

    for (let i=0; i<dice.length; i++) {
      if (dice[i].isHeld) {
        newArr.push(dice[i])
      } else {
        newArr.push({
          ...dice[i],
          value: randFace()
       })
      }
    }
    setDice( () => newArr )
  }

    /**
     * Function takes an id as a paramter representing the id of the dice being held
     * sets dice to a new array where the speciefied dice is held
     */
    function hold(id) {
      let newArr = []

      for (let i = 0; i<dice.length; i++) {
        if (dice[i].id == id) {
          newArr.push({
            ...dice[i],
            isHeld: !dice[i].isHeld
          })
        } else {newArr.push(dice[i])}
      }
      setDice(newArr)
    }
    

  return (
    <main>
      <h1>Tenzies</h1>

      {gameWon ?
      <div>
        <h3>Congragulations</h3>
        <Confetti
        width={width}
        height={height}
        />
      </div>
      : null}

      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>
      <div className='dice-container'>
        {renderDice()}
      </div>
      <button className="roll-dice" onClick={handleRollDiceClick}>{gameWon ? "New Game" : "Roll"}</button>


    </main>
  )
}
