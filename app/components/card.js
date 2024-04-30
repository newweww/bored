import React, { useEffect } from 'react';
import axios from 'axios';

export const Card = ({ item }) => {

  useEffect(() => {
    console.log('Card item:', item);
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/activity?id=${item._id}`);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className='flex bg-white border-2 border-orange-500 h-11 w-auto min-w-72 items-center p-2 rounded-md relative'>
      <div className='flex w-64'>
        <p>{item.activity}</p>
      </div>
      <button onClick={handleDelete} className="bg-red-500 text-white w-7 h-7  rounded absolute top-1.5 right-1">X</button>
    </div>
  );
};
