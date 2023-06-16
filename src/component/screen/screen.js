/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react"
import './screen.css'
import Buttons from "../button/button";
import Lap from "../laps/lap";
import Screen2 from "./screen2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";


export default function Screen() {
  const [start, setStart] = useState(false);
  const [count, setCount] = useState(0);
  const [time, setTime] = useState("00:00:00");
  const [laps, setLaps] = useState([])
  const [lapTime, setLapTime] = useState([])

  const clearTime = () => {
    setTime("00:00:00");
    setCount(0);
    setLaps([])
  };

  const handleStart = () => {
    setStart(true)
  }

  const handleStop = () => {
    setStart(false)
  }

  const createLap = () => {
    setLaps([...laps, time])
    setLapTime([...lapTime, time])
  }

  return (
    <div className="Screen">
      <div>
			  <Swiper pagination={{dynamicBullets: true,}} modules={[Pagination]} className="mySwiper">
          <SwiperSlide><h1 className="timer">{time}</h1></SwiperSlide>
          <SwiperSlide>  
            <Screen2 time={time} start={start} count={count} setCount={setCount} setTime={setTime} handleStart={handleStart} />
          </SwiperSlide>
        </Swiper>
        <Buttons handleStart={handleStart} handleStop={handleStop} start={start} setStart={setStart} clearTime={clearTime} createLap={createLap}/>
        <Lap time={time} start={start} count={count} setCount={setCount} setTime={setTime} />
        <div className="content-lap"> {laps.length > 0 && laps.map((lap, index)=>{
          return (
            <Lap time2={index > 0 ? laps[index - 1] : null} time={lap} ind={index}/>
          )
        })}
        </div>
		  </div>
    </div>
  );
}
