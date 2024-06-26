import React from 'react'
import Logo from '../assets/favicon.png';
import { FiAlertTriangle } from "react-icons/fi";
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const Invalid = ({ children }) => {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-[9rem] lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <ExclamationTriangleIcon className="w-1/6 text-white cursor-wait px-2 py-2 bg-orange-600 rounded-full mb-3 mx-auto" />
            <div className="font-semibold text-lg text-gray-700 text-center">Server was unable to load page!</div>
            <h4 className="mt-10 animate-pulse text-center text-2xl font-bold leading-9 tracking-tight text-red-500">
                {children}
            </h4>
            </div>
        </div>
    </>
  )
}

export default Invalid
