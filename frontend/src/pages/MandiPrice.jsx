import { useLocation } from "react-router-dom";

function MandiPrice() {
  const location = useLocation();

  const searchData = location.state?.searchData;
  const priceData = location.state?.priceData;

  const record = priceData?.records?.[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-xl font-semibold text-green-700">MandiMantra</h1>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Mandi Price
        </h2>

        {record ? (
          <div className="bg-white border rounded-lg p-6 max-w-3xl">
            <h3 className="text-xl font-medium text-gray-800">
              {record.commodity}
            </h3>

            <p className="text-gray-500 mt-2">
              {record.market}, {record.district}, {record.state}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Date: {record.arrival_date}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="border rounded-md p-4">
                <p className="text-sm text-gray-500">Minimum Price</p>

                <p className="text-xl font-semibold mt-1">
                  ₹{record.min_price}
                </p>
              </div>

              <div className="border rounded-md p-4">
                <p className="text-sm text-gray-500">Maximum Price</p>

                <p className="text-xl font-semibold mt-1">
                  ₹{record.max_price}
                </p>
              </div>

              <div className="border rounded-md p-4">
                <p className="text-sm text-gray-500">Modal Price</p>

                <p className="text-xl font-semibold mt-1">
                  ₹{record.modal_price}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border rounded-lg p-6 max-w-3xl">
            <p className="text-gray-500">No mandi price data found.</p>

            {searchData && (
              <p className="text-sm text-gray-400 mt-2">
                Try changing your search details.
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default MandiPrice;
