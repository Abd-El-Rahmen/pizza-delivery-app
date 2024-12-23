import React from 'react'
import { RingLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className="mt-20 flex flex-col items-center gap-4">
        <RingLoader color="#ef4444"  size={100} />
        <h2 className="text-lg font-bold text-red-500">Loading..</h2>
      </div>
  )
}

export default Loading
