import React from 'react'

function PageNotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center p-5">
      <h1 className="text-[clamp(4rem,10vw,8rem)] m-0 text-[#1a1a1a]">404</h1>
      <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] my-2.5 text-[#333]">Page Not Found</h2>
      <p className="text-[clamp(1rem,2vw,1.2rem)] max-w-[600px] text-[#666] mb-5">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <a 
        href="/" 
        className="px-5 py-2.5 bg-blue-500 text-white no-underline rounded text-[clamp(0.9rem,1.5vw,1.1rem)] transition-colors duration-300 hover:bg-blue-600"
      >
        Go Back Home
      </a>
    </div>
  )
}

export default PageNotFound