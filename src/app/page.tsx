import Link from "next/link";
export default function Home() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
        Event Registration
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
        Register for our event and make your payment
      </p>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <Link 
          href="/register" 
          className=" px-6 py-3 bg-[var(--accent-light)] text-white rounded-lg transition duration-300 plate-button"
        >
          Register & Pay
        </Link>
        <Link 
          href="/dashboard" 
          className=" px-6 py-3 bg-[var(--accent-light)] text-white rounded-lg transition duration-300 plate-button"
        >
          Admin Dashboard
        </Link>
      </div>
    </div>
  );
}