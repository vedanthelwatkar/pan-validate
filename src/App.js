import axios from "axios";
import React, { useState } from "react";

const PanValidation = () => {
  const [pan, setPan] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setResponse(null);
    setError("");

    if (pan.match(/^[A-Z]{5}[0-9]{4}[A-Z]$/)) {
      try {
        const res = await axios.post(
          "https://mvp.verify24x7.in/verifyApi/api/validate-pan",
          { pan },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setResponse(res.data.data);
        setError(null);
      } catch (err) {
        setError(
          "Validation failed: " +
            (err.response?.data?.msg || "Server error, click validate again")
        );
        setResponse(null);
      }
    } else {
      setError("Invalid PAN format");
      setResponse(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-100 to-slate-200 flex justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md border border-slate-200 h-fit mt-10">
        <h2 className="text-3xl font-bold mb-6 text-slate-800 text-center">
          PAN Validation
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="pan"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Enter PAN Number
            </label>
            <input
              type="text"
              id="pan"
              value={pan}
              onChange={(e) => setPan(e.target.value)}
              placeholder="ABCDE1234F"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out font-medium"
          >
            Validate PAN
          </button>
        </form>

        {response && (
          <table className="min-w-full mt-6 bg-white border border-slate-200 rounded-md">
            <thead>
              <tr className="bg-slate-100">
                <th className="px-4 py-2 text-left">Field</th>
                <th className="px-4 py-2 text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">PAN Number</td>
                <td className="border px-4 py-2">{response.pan_number}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">DOB Match</td>
                <td className="border px-4 py-2">{response.dob_match}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">PAN Active</td>
                <td className="border px-4 py-2">{response.pan_active}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">First Name</td>
                <td className="border px-4 py-2">{response.first_name}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Last Name</td>
                <td className="border px-4 py-2">{response.last_name}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Middle Name</td>
                <td className="border px-4 py-2">
                  {response.middle_name || "N/A"}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Aadhaar Seeding Status</td>
                <td className="border px-4 py-2">
                  {response.aadhaar_seeding_status}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Name on Card</td>
                <td className="border px-4 py-2">{response.name_on_card}</td>
              </tr>
            </tbody>
          </table>
        )}

        {error && (
          <div className="mt-6 p-4 bg-rose-50 border border-rose-200 rounded-md">
            <p className="text-rose-700 font-medium">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PanValidation;
