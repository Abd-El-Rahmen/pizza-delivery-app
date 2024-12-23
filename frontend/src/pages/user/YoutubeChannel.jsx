import React from 'react';

const YoutubeChannel = () => {
  return (
    <div className='w-full p-6'>
        <div className="w-full py-6 px-10 bg-black rounded-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-6">
        <div className="text-white">
          <h2 className="text-3xl font-extrabold mb-4">
            ¡Subscribe to our <span className='text-red-500'>YouTube</span> Channel
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse 
            nibh sapien, hendrerit quis finibus a, rutrum commodo arcu. Curabitur 
            pharetra lacus et venenatis bibendum. Nam vel nunc massa. Suspendisse 
            potenti. Curabitur ut egestas neque.
          </p>
        </div>

        <div className="flex justify-center sm:justify-end">
          <button className="button w-36 h-12">
            Subscribe!
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default YoutubeChannel;
