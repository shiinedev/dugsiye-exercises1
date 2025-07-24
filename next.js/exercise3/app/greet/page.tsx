"use client"
import {useActionState} from 'react'
import { greet } from '../form/actions'

const initialState = {
    message:"",
    error:""
}

const Greeting = () => {
    const [state,formAction] = useActionState(greet,initialState)
  return (
    <div>
      <div className='w-4xl mx-auto flex justify-center items-center mt-10'>
      <form action={formAction} className='flex flex-col space-y-2'>
      <input className='border p-2'  type="text" name='firstName' placeholder="enter first name" />
      <input className='border p-2'  type="text" name='lastName' placeholder="enter last name" />
      <button className='bg-rose-600 text-white rounded p-2 ' type='submit'>Submit</button>
      {
        state.message && <p className='text-green-600'>{state.message}</p>
      }
      {
        state.error && <p className='text-red-600'>{state.error}</p>
      }
      </form>
    </div>
    </div>
  )
}

export default Greeting
