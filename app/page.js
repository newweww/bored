'use client'

import React, { useState } from 'react'

export default function Home() {
  const [activity, setActivity] = useState("")

  const activityFetch = async () => {
    const res = await fetch("https://www.boredapi.com/api/activity");
    const data = await res.json();
    setActivity(data);
    console.log(data);
  }

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
      <div className="flex flex-col justify-center items-center">
        <p className="text-8xl text-white">Bored</p>
      </div>
      <br />
      <button className="flex justify-center items-center bg-white text-orange-400 border-2 border-orange-400 p-4 rounded-lg hover:shadow-lg" onClick={activityFetch}>
        What to do?
      </button>
      <br />
      <div>
        <p className="text-3xl text-white">{activity.activity}</p>
      </div>
    </div>
  );
}
