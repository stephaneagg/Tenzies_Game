

export default function Die(props) {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return (
        <button className={`die ${props.isHeld ? "held" : ""} ${props.rolling && !props.isHeld ? "shake" : ""}`} style={styles} onClick={ () => {props.hold(props.id)}}>
            {props.value}
        </button>
    )
}