import './lap.css'
import { useEffect, useRef } from 'react';

export default function Lap(props) {

    const setIntervalRef = useRef(null)
    var initTime = new Date();

    const showTimer = (ms) => {
        const milliseconds = Math.floor((ms % 1000) / 10).toString().padStart(2, "0");
        const second = Math.floor((ms / 1000) % 60).toString().padStart(2, "0");
        const minute = Math.floor((ms / 1000 / 60) % 60).toString().padStart(2, "0");
        props.setTime(
            `${minute}:${second}:${milliseconds}`
        );
    };

    useEffect(() => {
        if (!props.start) {
          return;
        }
        clearInterval(setIntervalRef.current)
        setIntervalRef.current = setInterval(() => {
          var left = props.count + (new Date() - initTime);
          props.setCount(left);
          showTimer(left);
          if (left <= 0) {
            props.setTime("00:00:00:00");
            clearInterval(setIntervalRef.current);
          }
        }, 10);
        console.log(setIntervalRef.current)
        return () => clearInterval(setIntervalRef.current);
      }, [props.start]);

    return (
        <div className='Lap'>
            {props.time2 != null && <div className="btnLap">
                <p className="laptime" >Lap {props.ind}</p>
                <p className="laptime">{props.time}</p>
            </div>}
        </div>
    )

}