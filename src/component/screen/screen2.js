import { useEffect, useRef } from "react";

export default function Screen2(props) {

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
        }, 1);
        return () => clearInterval(setIntervalRef.current);
      }, [props.start]);

    return (
        <div className="clock">
        <div className="sec_hand"></div>
        <div className="sec_hand_number">{props.time}</div>
            <span className="twelve">60</span>
            <span className="one">5</span>
            <span className="two">10</span>
            <span className="three">15</span>
            <span className="four">20</span>
            <span className="five">25</span>
            <span className="six">30</span>
            <span className="seven">35</span>
            <span className="eight">40</span>
            <span className="nine">45</span>
            <span className="ten">50</span>
            <span className="eleven">55</span>
      </div>
    )
}