import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [commodity, setCommodity] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [market, setMarket] = useState("");

  const [districts, setDistricts] = useState([]);
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    if (!state) {
      setDistricts([]);
      setDistrict("");
      setMarkets([]);
      setMarket("");
      return;
    }

    const fetchDistricts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/mandi/locations?state=${encodeURIComponent(
            state,
          )}`,
        );

        const data = await response.json();

        setDistricts(data);
        setDistrict("");
        setMarkets([]);
        setMarket("");
      } catch (error) {
        console.log("Error fetching districts:", error);
      }
    };

    fetchDistricts();
  }, [state]);

  useEffect(() => {
    if (!state || !district) {
      setMarkets([]);
      setMarket("");
      return;
    }

    const fetchMarkets = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/mandi/locations?state=${encodeURIComponent(
            state,
          )}&district=${encodeURIComponent(district)}`,
        );

        const data = await response.json();

        setMarkets(data);
        setMarket("");
      } catch (error) {
        console.log("Error fetching markets:", error);
      }
    };

    fetchMarkets();
  }, [state, district]);

  const handleSearch = async (event) => {
    event.preventDefault();

    const params = new URLSearchParams({
      commodity,
      state,
      district,
      market,
    });

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/mandi/prices?${params.toString()}`,
      );

      const data = await response.json();

      navigate("/MandiPrice", {
        state: {
          searchData: {
            commodity,
            state,
            district,
            market,
          },
          priceData: data,
        },
      });
    } catch (error) {
      console.log("Error fetching mandi prices:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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

              <select
                value={district}
                onChange={(event) => setDistrict(event.target.value)}
                disabled={!state}
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 bg-white outline-none focus:border-green-600 disabled:bg-gray-100"
              >
                <option value="">
                  {state ? "Select District" : "Select State First"}
                </option>

                {districts.map((districtName) => (
                  <option key={districtName} value={districtName}>
                    {districtName}
                  </option>
                ))}
              </select>
            </div>

            {/* Mandi */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Mandi / Market
              </label>

              <select
                value={market}
                onChange={(event) => setMarket(event.target.value)}
                disabled={!district}
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 bg-white outline-none focus:border-green-600 disabled:bg-gray-100"
              >
                <option value="">
                  {district ? "Select Mandi" : "Select District First"}
                </option>

                {markets.map((marketName) => (
                  <option key={marketName} value={marketName}>
                    {marketName}
                  </option>
                ))}
              </select>
            </div>
          </div>

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

      <footer className="border-t bg-white mt-10">
        <div className="max-w-6xl mx-auto px-6 py-5 text-sm text-gray-500">
          MandiMantra &copy; 2026
        </div>
      </footer>
    </div>
  );
}

export default Home;
