"use client"
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const Signup = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [message, setMessage] = useState('')

    const handlesubmit = async () => {

    }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
        <h1>Signup</h1>
        <form className='flex flex-col gap-[10px]' onSubmit={handlesubmit}>
            <input 
            className="border border-gray-300 rounded-md p-2 mb-4"
                placeholder='Name'
                type="text" 
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
            />
            <input
            className='border border-gray-300 rounded-md p-2 mb-4'
                placeholder='Email'
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
            />
            <input
            className='border border-gray-300 rounded-md p-2 mb-4'
                placeholder='Password'
                type="password"
                value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})}
            />
            <button type='submit'>Sign up</button>
        </form>
        {message && <p>{message}</p>}

        <p>Already have an account? 
            <Link href="/login" className="text-blue-500">Login</Link>
        </p>
    </div>
  )
}

export default Signup