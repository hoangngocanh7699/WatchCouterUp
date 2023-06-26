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
import { myContant } from "../../constant/constant";


export default function Screen() {
  const [start, setStart] = useState(false);
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(myContant.initialTime);
  const [laps, setLaps] = useState([])
  const [lapTime, setLapTime] = useState([])

  const clearTime = () => {
    setTime(myContant.initialTime);
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
    setLaps([time,...laps])
    setLapTime([time,...lapTime])
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
        <div className="buttons">
          {start ? <Buttons className='btn-lap' title='Lap' onClick={createLap}/> : <Buttons className='btn-reset' title='Reset' onClick={clearTime}/> }
          {start ? <Buttons className='btn-stop' title='Stop' onClick={handleStop} /> : <Buttons className='btn-start' title='Start' onClick={handleStart}/> }
        </div>
        <Lap time={time} start={start} count={count} setCount={setCount} setTime={setTime} />
        <div className="content-lap"> {laps.length > 0 && laps.map((lap, index)=>{
          return (
             <Lap key={index} time2={laps?.length > 0 && laps[index - 1] } time={lap} idx={laps.length - laps.findIndex(x => x === lap)}/>
          )
        })}
        </div>
		  </div>
    </div>
  );
}
