"use client"
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Register() {

    const router = useRouter();

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        genre: ''
    });
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    });
    console.log(response);
    if (response.ok) {
        console.log('User registered successfully');
        setLoading(false);
        setMessage('User registered successfully');
        // Redirect to payment page

        const data = await response.json()

        if (data.url) {
            console.log('Payment URL found');
            window.location.href = data.url;
        } else {
            setMessage('Error: Payment URL not received.');
        }

    } else {
        setLoading(false);
        const errorData = await response.json();
        setMessage(errorData.error || 'Failed to register');
        console.error('Failed to register');
    }
  }
  return (
<div className="min-h-screen flex flex-col justify-center items-center p-6">
        <h1 className="text-3xl font-bold mb-6">Register</h1>
        <form onSubmit={handleSubmit} className=" container p-10 rounded-xl w-full max-w-md">
            <div className="mb-4">
                <label className="block mb-2" htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    placeholder='First Name'
                    id="firstName"
                    className="input-deep"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2" htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    placeholder='Last Name'
                    id="lastName"
                    className="input-deep"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2" htmlFor="email">Email</label>
                <input
                    type="email"
                    placeholder='E-mail'
                    id="email"
                    className="input-deep"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                />
            </div>
            <div className="mb-4">
                <label 
                className="block mb-2"
                htmlFor="phone">Phone</label>
                <input
                    type="tel"
                    id="phone"
                    className="input-deep"
                    placeholder='Phone Number'
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2" htmlFor="genre">Genre</label>
                <div className="flex gap-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="genre"
                            value="male"
                            checked={form.genre === "male"}
                            onChange={() => setForm({ ...form, genre: "male" })}
                            required
                        />
                        <span className="ml-2">Male</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="genre"
                            value="female"
                            checked={form.genre === "female"}
                            onChange={() => setForm({ ...form, genre: "female" })}
                            required
                        />
                        <span className="ml-2">Female</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="genre"
                            value="other"
                            checked={form.genre === "other"}
                            onChange={() => setForm({ ...form, genre: "other" })}
                            required
                        />
                        <span className="ml-2">Other</span>
                    </label>
                </div>
            </div>
            <div className=' mb-4'>
                <input
                    id="password"
                    className="input-deep"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required 
                    type="password" 
                />
            </div>
            <div className=' mb-4'>
                <input 
                    id="confirmPassword"
                    className="input-deep"
                    placeholder="Confirm Password"
                    type="password" 
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-[var(--accent-light)] text-white py-2 rounded-lg cursor-pointer transition duration-200 plate-button"
                disabled={loading}
            >
                {loading ? 'Processing...' : 'Register & Pay 500 FCFA'}
            </button>
            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </form>
    </div>
    
  )
}
