import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [pan, setPan] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const validatePan = async () => {
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
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(
        err.response ? err.response.data : "Error connecting to the API"
      );
      setResponse(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validatePan();
  };

  return (
    <div className="pan-ctn">
      <div className="pan-verify">
        <h2>PAN Validation</h2>
        <form onSubmit={handleSubmit} className="input-ctn">
          <div className="input-form">
            <label>
              Enter PAN Number:
              <input
                type="text"
                value={pan}
                onChange={(e) => setPan(e.target.value)}
                placeholder="ABCDE1234F"
                required
              />
            </label>
          </div>
          <button type="submit" className="submit-form">
            Validate PAN
          </button>
        </form>

        {response && (
          <div style={{ marginTop: "20px", color: "green" }}>
            <h3>Success</h3>
            <pre>{response}</pre>
          </div>
        )}

        {error && (
          <div style={{ marginTop: "20px", color: "red" }}>
            <h3>Error</h3>
            <pre>{error}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
