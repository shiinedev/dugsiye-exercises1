"use client"

import { requiredField } from './form/actions';
import { useActionState } from 'react';
const initialData = {
  message:"",
  error:""
}

export default function Home() {

  const [state,formAction] = useActionState(requiredField,initialData)

  return (
    <div className='w-4xl mx-auto flex justify-center items-center mt-10'>
      <form action={formAction} className='flex flex-col space-y-2'>
      <input className='border p-2'  type="email" name='email' placeholder="enter your email" />
      <input className='border p-2'  type="password" name='password' placeholder="enter your password" />
      <button className='bg-rose-600 text-white rounded p-2 ' type='submit'>Submit</button>
      {
        state.message && <p className='text-green-600'>{state.message}</p>
      }
      {
        state.error && <p className='text-red-600'>{state.error}</p>
      }
      </form>
    </div>
  );
}
