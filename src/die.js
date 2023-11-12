

export default function Die(props){
    const styles ={
        background : props.isHeld ? "#59E391" : "#FFFFFF"
    }
    return(
        <div className="dice-item" style={styles} onClick={props.holdFunction}>
            <h2>{props.value}{props.isHeld}</h2>
        </div>
    )
}