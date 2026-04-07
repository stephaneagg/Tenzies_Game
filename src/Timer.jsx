
import {useStopwatch} from "react-timer-hook"
import { useEffect } from "react";

export default function Timer(props) {


    const {
        seconds,
        minutes,
        pause,
        reset
    } = useStopwatch({ autoStart: true, interval: 1000 });

    function endGame() {
        pause()
        props.regTime(minutes, seconds)
    }

    // After change of gameWon the game has either started or ended
    // pause the timer or reset it
    useEffect(
        () => {
            props.gameWon ? endGame() : reset(undefined, true);
        }, [props.gameWon]
    )

    return (

    <div>
      <div style={{fontSize: '50px'}}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
    )

}