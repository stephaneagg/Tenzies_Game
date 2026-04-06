import { useState } from 'react'
import './App.css'
import Die from "./Die.jsx"

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
    arr[i] = Math.floor(Math.random() * 7) + 1
  }
  return arr
}



function renderDice() {
  const diceArr =  dice.map( (die) => <button >{die}</button>)
  return diceArr
}


/**
 * Challenge:
 * 
 * Create state to hold our array of numbers. (Initialize
 * the state by calling our `generateAllNewDice` function so it 
 * loads all new dice as soon as the app loads)
 * 
 * Map over the state numbers array to generate our array
 * of Die components and render those in place of our
 * manually-written 10 Die elements.
 */



  return (
    <main>
      <div className='dice-container'>
        {renderDice()}
        </div>
    </main>
  )
}
