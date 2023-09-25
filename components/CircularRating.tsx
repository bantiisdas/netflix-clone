import React from 'react'

interface Props {
  percent: number | undefined;
}

const CircularRating = ({percent}: Props) => {

  if(percent === undefined){
    percent = 0;
  }
  else{
    percent *= 10;
    percent = Math.round(percent)
  }
  
  const dashArray = Math.PI * 100;

  const dashOffset = Math.PI * (100 - percent)

  const colorSchema = {
    low: {
      bar: "#db2360",
      track: "#571435"
    },
    medium: {
      bar: "#d2d531",
      track: "#423d0f"
    },
    high: {
      bar: "#21d07a",
      track: "#204529"
    },
    none: {
      bar: "#d4d4d4",
      track: "#666666"
    },
  }

  const getColorSchema = (rating: number) => {
    if(rating >= 70){
      return colorSchema.high;
    }
    else if(rating >= 40){
      return colorSchema.medium;
    }
    else{
      return colorSchema.low;
    }
  }

  return (
    <div className='relative w-[62.7px] h-[62.7px] bg-[#36454F] rounded-full flex justify-center items-center scale-[0.8] sm:scale-100'>
      <svg width="56.1px" height="56.1px" viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="55" cy="55" r="50"
          fill="transparent"
          stroke={getColorSchema(percent).track}
          strokeWidth={8}
          strokeDasharray={dashArray}
          className="scale-[0.90]"
        />
        <circle cx="55" cy="55" r="50"
          fill="transparent"
          stroke={getColorSchema(percent).bar}
          strokeWidth={8}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          className="scale-[0.90]"
        />
      </svg>
      <div className="font-semibold absolute text-[24.75px] left-[12.375px]">
        {percent}
        <span className="absolute text-[8.25px] top-[8.25px]">%</span>
      </div>
    </div>
  )
}

export default CircularRating