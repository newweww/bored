'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from './components/card';

export default function Home() {
  const [activity, setActivity] = useState("");
  const [data, setData] = useState([]);
  const [list, setList] = useState(true);

  const activityFetch = async () => {
    try {
      const res = await axios.get("https://www.boredapi.com/api/activity");
      setActivity(res.data);
    } catch (error) {
      console.error('Error fetching activity:', error);
    }
  };

  const listFetch = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/activity");
      setData(res.data);
    } catch (error) {
      console.error('Error fetching list:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(listFetch, 1000); 
    return () => clearInterval(interval); 
  }, []);

  const addToList = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/activity", {
        id: activity.key.toString(),
        activity: activity.activity.toString(),
      });
      await listFetch();
    } catch (error) {
      console.error('Error adding activity to list:', error);
    }
  };

  const isListOpen = async () => {
    await listFetch();
    setList(!list);
  };

  return (
    <div className='flex h-screen w-screen'>
      <div className='flex absolute z-10' onClick={isListOpen}>
        <button className="text-2xl m-5 text-white">List</button>
      </div>
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
        <br />
        {!activity.activity ? null :
          <div onClick={addToList}>
            <button className='flex justify-center items-center bg-white text-orange-400 border-2 border-orange-400 px-4 rounded-lg hover:shadow-lg'>Add to list</button>
          </div>
        }
      </div>
      {list ? null :
        <div className='flex flex-col gap-2 absolute mt-20 ml-10 h-4/5 w-96 bg-white text-orange-400 border-2 border-orange-400 p-4 rounded-lg hover:shadow-lg' style={{ overflowY: 'auto', overflowX: 'hidden' }}>
          {data.slice().reverse().map((data, index) => (
            <Card key={index} item={data} />
          ))}
        </div>
      }
    </div>
  );
}
