import { useState } from 'react'
import './App.css'
import Die from "./Die.jsx"
import {nanoid} from "nanoid"

export default function App() {

  const [dice, setDice] = useState(allNewDice())

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
      <div className='dice-container'>
        {renderDice()}
      </div>
      <button className="roll-dice" onClick={reroll}>Roll</button>
    </main>
  )
}
