import React from 'react'
import Logo from '../assets/favicon.png';

const Loading = () => {
  return (
    <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-[9rem] lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
                className="mx-auto animate-pulse h-10 w-auto fill-green-500 overlay"
                src={Logo}
                alt="All Bills Logo"
            />
            <h2 className="mt-10 animate-pulse text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Loading...
            </h2>
            </div>
        </div>
    </>
  )
}

export default Loading
