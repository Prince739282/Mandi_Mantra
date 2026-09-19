import { useState } from "react";

function Home() {
  const [commodity, setCommodity] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [market, setMarket] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();

    console.log({
      commodity,
      state,
      district,
      market,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-green-700">MandiMantra</h1>

          <div className="flex gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-green-700">
              Home
            </a>

            <a href="#about" className="hover:text-green-700">
              About
            </a>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">
            Check Mandi Prices
          </h2>

          <p className="text-gray-500 mt-2">
            Find the latest available prices of agricultural commodities from
            different mandis.
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="bg-white border rounded-lg p-6 max-w-4xl"
        >
          <h3 className="text-lg font-medium text-gray-800 mb-5">
            Search Price
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Commodity */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Commodity
              </label>

              <input
                type="text"
                value={commodity}
                onChange={(event) => setCommodity(event.target.value)}
                placeholder="e.g. Tomato"
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 outline-none focus:border-green-600"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">State</label>

              <select
                value={state}
                onChange={(event) => setState(event.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 bg-white outline-none focus:border-green-600"
              >
                <option value="">Select State</option>

                <option value="Uttar Pradesh">Uttar Pradesh</option>

                <option value="Haryana">Haryana</option>

                <option value="Delhi">Delhi</option>

                <option value="Rajasthan">Rajasthan</option>
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                District
              </label>

              <input
                type="text"
                value={district}
                onChange={(event) => setDistrict(event.target.value)}
                placeholder="e.g. Ghaziabad"
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 outline-none focus:border-green-600"
              />
            </div>

            {/* Market */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Mandi / Market
              </label>

              <input
                type="text"
                value={market}
                onChange={(event) => setMarket(event.target.value)}
                placeholder="e.g. Ghaziabad Mandi"
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 outline-none focus:border-green-600"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2.5 rounded-md hover:bg-green-700"
            >
              Search
            </button>

            <button
              type="button"
              className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-md hover:bg-gray-50"
            >
              Use My Location
            </button>
          </div>
        </form>

        {/* About */}
        <div id="about" className="mt-12 max-w-4xl">
          <h3 className="text-xl font-medium text-gray-800">
            About MandiMantra
          </h3>

          <p className="text-gray-500 mt-3 leading-7">
            MandiMantra provides information about agricultural commodity prices
            available in Indian mandis. Users can search for a commodity and
            select a location to view its latest available mandi price.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-10">
        <div className="max-w-6xl mx-auto px-6 py-5 text-sm text-gray-500">
          MandiMantra &copy; 2026
        </div>
      </footer>
    </div>
  );
}

export default Home;
