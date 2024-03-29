import React from "react";

const Home = () => {
    return (
        <main className="w-full px-32 py-20">
          <header className="flex justify-between w-full mb-16 px-4">
            <h1 className="font-mono text-xl text-black">Claire's Travel Logs</h1>
            <div>
              <search>
                <form>
                  <input className="font-mono px-4 py-2 bg-slate-100 rounded-lg" placeholder="Search" />
                </form>
              </search>
              <div>
                <button></button>
                <button></button>
              </div>
            </div>
          </header>
          {/* log card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20">
            {/* first card */}
            <a href="#" className="block space-y-8 overflow-hidden rounded-md hover:bg-neutral-100 transition duration-300">
              <img src="assets/Japan.png" className="w-full h-auto" alt="Japan" />
              {/* log info, couldn't figure out how to center text*/}
              <div className="">
                <h2 className="pl-4 font-mono text-lg text-black">Trip to Japan</h2>
                <button className="more"></button>
              </div>
            </a>
            {/* second card */}
            <a href="#" className="block space-y-8 overflow-hidden rounded-md hover:bg-neutral-100 transition duration-300">
              <img src="assets/shanghai.png" className="w-full h-auto" alt="Shanghai" />
              {/* log info */}
              <div className="">
                <h2 className="pl-4 font-mono text-lg text-black">Trip to Shanghai</h2>
                <button className="more"></button>
              </div>
            </a>
          </div>
          {/* fixed button at center bottome of page*/}
          <button className="fixed bottom-20 left-1/2 transform -translate-x-1/2 font-mono text-black px-16 py-2 rounded-lg bg-neutral-100 hover:bg-neutral-200">Add New Log</button>
        </main>
      );
};

export default Home;
