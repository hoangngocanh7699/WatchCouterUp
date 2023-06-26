import { myContant } from '../../constant/constant';
import './lap.css'
import { useEffect, useRef } from 'react';

export default function Lap(props) {

    const intervalRef = useRef(null)
    var initTime = new Date();

    const showTimer = (ms) => {
        const milliseconds = Math.floor((ms % 1000) / 10).toString().padStart(2, "0");
        const second = Math.floor((ms / 1000) % 60).toString().padStart(2, "0");
        const minute = Math.floor((ms / 1000 / 60) % 60).toString().padStart(2, "0");
        props.setTime(
            `${minute}:${second}:${milliseconds}` // output
        );
    };

    useEffect(() => {
        if (!props.start) {
          return;
        }
        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
          var left = props.count + (new Date() - initTime);
          props.setCount(left);
          showTimer(left);
          if (left <= 0) {
            props.setTime(myContant.initialTime);
            clearInterval(intervalRef.current);
          }
        }, 10);
        return () => clearInterval(intervalRef.current);
      }, [props.start]);

    return (
      <>
        <div className='Lap'>
          {(props.idx && props.time !== myContant.initialTime) && <div className="btnLap">
                <p className="laptime" >Lap {props.idx}</p>
                <p className="laptime">{props.time}</p>
          </div>}
        </div>
      </>
    )
}