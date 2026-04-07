import { useState } from 'react'
import { useEffect } from 'react'
import { useWindowSize } from "react-use"
import Die from "./Die.jsx"
import Timer from "./Timer.jsx"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

  const {width, height} = useWindowSize()
  const [dice, setDice] = useState( () => allNewDice())
  const [rolling, setRolling] = useState(false);
  const [playing, setPlaying] = useState(false);

  const [time, setTime] = useState({minutes: 0, seconds: 0})
  const [bestTime, setBestTime] = useState({minutes: 0, seconds:0})
  const [rolls, setRolls] = useState(0)
  const [bestRolls, setBestRolls] = useState(0) 

  // At every re-render check if game has been won
  const gameWon = checkGameWon()


  useEffect(() => {
    if (gameWon) {
      setBestRolls(prev => {
        if (prev === 0) return rolls;
        return rolls < prev ? rolls : prev;
      });
    }
  }, [gameWon]);

  function checkGameWon() {
    let firstVal = dice[0].value 
    for (let i = 0; i < dice.length; i++ ) {
      if (!dice[i].isHeld || dice[i].value != firstVal)
        return false;
    }
    return true
  }

  // Function returns a random number between 1 and 6 inclusive
  function randFace() {
    return (Math.floor(Math.random() * 6) + 1)
    //return 1
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

  // Function takes the dice array and maps a new array of die components
  function renderDice() {
    const diceArr =  dice.map( (die) => <Die key={die.id} id={die.id} face={`/resources/${die.value}.png`} isHeld={die.isHeld} hold={hold} rolling={rolling}/>)
    return diceArr
  }

  // Handles clicking the roll/new game button. 
  // If the game has been won a new game is starting with fresh dice else call reroll
  // If playing is not true set it to true
  function handleRollDiceClick() {
    if (gameWon) {
      setDice(allNewDice);
      setRolls(0);
      return;
    }

    if (!playing) setPlaying(true);

    reroll();
    setRolls(prev => prev + 1);
  }

  // Function handles rerolling the unheld dice
  function reroll() {
    setRolling(true)

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
    setTimeout(() => setRolling(false), 300);
  }

    /**
     * Function takes an id as a paramter representing the id of the dice being held
     * sets dice to a new array where the speciefied dice is held
     */
    function hold(id) {
      if (gameWon) {
        return
      }

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

  function regTime(minutes, seconds) {
    setTime({minutes: minutes, seconds: seconds})
    setBestTime(prev => {
      if (prev.minutes === 0 && prev.seconds === 0) {
        return { minutes, seconds };
      }

      const prevTotal = prev.minutes * 60 + prev.seconds;
      const newTotal = minutes * 60 + seconds;

      if (newTotal < prevTotal) {
        return { minutes, seconds };
      }

      return prev;
    });
  }
    

  return (
    <main>
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>

      {gameWon ?
        <>
          <h2>Congragulations!</h2>
          <p>You made Tenzies in: {time.minutes}:{time.seconds}</p>
          <Confetti
          width={width}
          height={height}
          />
        </>
      : null}

      {bestTime.minutes !== 0 || bestTime.seconds !== 0 ? 
        <>
          <p>Your best time is: {bestTime.minutes}:{bestTime.seconds}</p>
          <p>Your lowest roll game was: {bestRolls}</p>
        </>
      : null}

      {playing ? 
        <>
          <Timer gameWon={gameWon} regTime={regTime}/>
          <h2>Rolls: {rolls}</h2>
        </>
      : null
      }
      
      {playing ? 
        <div className='dice-container'>
          {renderDice()}
        </div>
      : null
      }
      <button className="roll-dice" onClick={handleRollDiceClick}>{gameWon || !playing ? "New Game" : "Roll"}</button>


    </main>
  )
}
