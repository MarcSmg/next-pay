"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

const PaymentPage = () => {
  const router = useRouter();
  const [isChecked, setIsChecked] = React.useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  }
  const handleButtonClick = () => {
    // Logic to handle payment authorization and proceed to pay
    console.log('Payment authorized, proceeding to pay...');
    router.push('/dashboard'); // Redirect to dashboard after payment
  }
  return (
    <div className=' p-5 justify-self-center text-xl'>
      <h1 className=' text-3xl font-bold text-center p-5'>Payment</h1>
      <div>
        <input 
        checked={isChecked}
        onChange={handleCheckboxChange}  
        className=' size-4' id='agreeCheck' type="checkbox" />
        <label htmlFor="agreeCheck" className=' p-5'>By checking this box, you agree to pay 500 FCFA via your FedaPay account.</label>        
      </div>
      <button onClick={handleButtonClick} disabled={!isChecked} className={` mt-5 w-full bg-[var(--accent-light)] text-white p-3 rounded ${!isChecked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[var(--accent-hover)] cursor-pointer hover:shadow-xl transition'}`}>Authorize & Proceed to Pay</button>
    </div>
  )
}

export default PaymentPage