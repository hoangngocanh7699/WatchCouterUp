
export default function Buttons(props) {

    return (
        <div className="btnStart-reset">
            {props.start ? (<button className="btn-lap" onClick={props.createLap}>Lap</button>) 
        : ( <button className="btn-reset" onClick={props.clearTime}>Reset</button> )}

        {props.start ? (<button className="btn-stop" onClick={() => props.setStart(false)}>Stop</button>)
        : ( <button className="btn-start" onClick={props.handleStart}>Start</button> )}
        </div>
    );
  }