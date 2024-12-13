import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1 className="px-8 text-xl md:text-2xl text-right text-gray-500">Home</h1>
      <Outlet /> 
    </div>
  );
}

export default Home;
