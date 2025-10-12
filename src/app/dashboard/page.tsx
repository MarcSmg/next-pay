'use client';
import { useEffect, useState } from 'react';

interface Registration {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  genre: string;
  createdAt: string;
}

export default function Dashboard() {
    const [registrations, setRegistrations] =    useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchRegistrations = async () => {
        try {
            const response = await fetch('/api/registrations', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'},
            }); 
            if (!response.ok) {
                // Attempt to read the error message from the response body
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
            }            
            const data = await response.json();
            setRegistrations(data);
            setLoading(false);
            console.log('Successfully fetched users',data);
        } catch (error) {
            console.error('Error fetching registrations:', error);
        } finally {
            setLoading(false);
        }
        
    };

    useEffect(() => {
        fetchRegistrations();
        console.log('Fetching registrations...');
    }, []);

    const deleteRegistration = async (id: number) => {
        try {
            const response = await fetch(`/api/registrations/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (data.success) {
                setRegistrations(registrations.filter(reg => reg.id !== id));
                console.log('Registration deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting registration:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return <div className="p-6">
        <h1 className="text-3xl text-[var(--text-primary)] text-center font-bold mb-4">Dashboard</h1>
        {registrations.length === 0 ? ( 
            <p>No registrations found.</p>
        ) : (
            <div className="overflow-hidden rounded-lg border-3 border-gray-400 shadow-md p-4">
                <table className="min-w-full border-gray-300 ">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-r border-gray-400">ID</th>
                            <th className="py-2 px-4 border-r border-gray-400">First Name</th>
                            <th className="py-2 px-4 border-r border-gray-400">Last Name</th>
                            <th className="py-2 px-4 border-r border-gray-400">Email</th>
                            <th className="py-2 px-4 border-r border-gray-400">Phone</th>
                            <th className="py-2 px-4 border-r border-gray-400">Genre</th>
                            <th className="py-2 px-4 border-r border-gray-400">Created At</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className=' text-center'>
                        {registrations.map((reg) => (
                            <tr key={reg.id}>
                                <td className="py-2 px-4 border-r border-gray-400">{reg.id}</td>
                                <td className="py-2 px-4 border-r border-gray-400">{reg.firstName}</td>
                                <td className="py-2 px-4 border-r border-gray-400">{reg.lastName}</td>
                                <td className="py-2 px-4 border-r border-gray-400">{reg.email}</td>
                                <td className="py-2 px-4 border-r border-gray-400">{reg.phone}</td>
                                <td className="py-2 px-4 border-r border-gray-400">{reg.genre}</td>
                                <td className="py-2 px-4 border-r border-gray-400">{new Date(reg.createdAt).toLocaleString()}</td>
                                <td className="py-2 px-4">
                                    <button
                                        className="bg-red-500 text-[var(--text-secondary)] px-3 py-1 rounded hover:bg-red-600 transform hover:scale-105 transition cursor-pointer"
                                        onClick={() => deleteRegistration(reg.id)}
                                    >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
    </div>;
}