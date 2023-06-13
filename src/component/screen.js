import { useEffect, useState } from "react";

// you can change it to countdown timer

export default function App() {
  const [start, setStart] = useState(false);
  const [count, setCount] = useState(0);
  const [time, setTime] = useState("00:00:00");

  var initTime = new Date();

  const showTimer = (ms) => {
    const milliseconds = Math.floor((ms % 1000) / 10)
      .toString()
      .padStart(2, "0");
    const second = Math.floor((ms / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const minute = Math.floor((ms / 1000 / 60) % 60)
      .toString()
      .padStart(2, "0");
    setTime(
        `${minute}:${second}:${milliseconds}`
    );
  };

  const clearTime = () => {
    setTime("00:00:00");
    setCount(0);
  };

  useEffect(() => {
    if (!start) {
      return;
    }
    var id = setInterval(() => {
      var left = count + (new Date() - initTime);
      setCount(left);
      showTimer(left);
      if (left <= 0) {
        setTime("00:00:00:00");
        clearInterval(id);
      }
    }, 1);
    return () => clearInterval(id);
  }, [start]);

  return (
    <div className="Screen">
      <h1 className="timer">{time}</h1>
      <div
        style={{
          marginTop: "80px",
          display: "flex",
          justifyContent: "space-between",
          width: "300px"
        }}
      >
        {start ? (
          <button className="button" onClick={() => setStart(true)}>
            Lap
          </button>
        ) : (
          <button
            className="button"
            style={{ backgroundColor: "gray", color: "#fff" }}
            onClick={clearTime}
          >
            Reset
          </button>
        )}

        {start ? (
          <button
            className="button"
            style={{ backgroundColor: "#820000", color: "red" }}
            onClick={() => setStart(false)}
          >
            Stop
          </button>
        ) : (
          <button className="button" onClick={() => setStart(true)}>
            Start
          </button>
        )}
      </div>
    </div>
  );
}
