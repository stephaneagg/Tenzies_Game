import { useState } from 'react'
import './App.css'
import Die from "./Die.jsx"
import {nanoid} from "nanoid"

export default function App() {

  const [dice, setDice] = useState(allNewDice())

  /**
   * Function takes no parameters
   * Returns and array of size 10
   * Each element is a random number between 1-6 inclusive
   */
  function allNewDice() {
    let arr = []
    for (let i=0; i<10; i++) {
      arr[i] = {
        value: Math.floor(Math.random() * 7) + 1,
        isHeld: false,
        id: nanoid()
      }
    }
    return arr
  }

  function renderDice() {
    const diceArr =  dice.map( (die) => <Die key={die.id} value={die.value}/>)
    return diceArr
  }

  function reroll() {
    setDice( () => allNewDice() )
  }

    /**
     * Challenge: Update the array of numbers in state to be
     * an array of objects instead. Each object should look like:
     * { value: <random number>, isHeld: false }
     * 
     * Making this change will break parts of our code, so make
     * sure to update things so we're back to a working state
     */
    

  return (
    <main>
      <div className='dice-container'>
        {renderDice()}
      </div>
      <button className="roll-dice" onClick={reroll}>Roll</button>
    </main>
  )
}
