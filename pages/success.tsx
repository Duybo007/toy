import React from 'react'
import { BsBagCheckFill } from 'react-icons/bs';
import Link from 'next/link';


function success() {
  return (
    <div className="pt-10">
      <div className="success bg-dark flex flex-col border-2 border-light p-20 justify-center items-center rounded-lg text-xl gap-5">
        <p className="icon text-4xl text-green-500">
          <BsBagCheckFill />
        </p>
        <h2 className='text-5xl font-semibold'>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email
          <a className="email text-red pl-2" href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link href="/">
          <button type="button" className="btn cursor-pointer w-[300px]">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

export default success