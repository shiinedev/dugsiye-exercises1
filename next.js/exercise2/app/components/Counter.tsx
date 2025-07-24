"use client"

import { useState } from 'react'

const Counter = () => {
    const [count,setCount] = useState(0);
  return (
    <div>
      <p>Counter: {count}</p>
      <button className='bg-teal-600 p-2 text-white rounded' onClick={() => setCount(count +1)}>Increment +1</button>
    </div>
  )
}

export default Counter
