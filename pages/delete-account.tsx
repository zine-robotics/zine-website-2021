import axios from "../api/axios";
import { useState } from "react";
import type { NextPage } from "next";
import { Navbar } from "../components/Navbar";

const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [deletionOption, setDeletionOption] = useState("partial");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Loader state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); 

    try {
      const response = await axios.post("/user/delete", {
        email,
        password,
        deletionOption
      });

      setSuccessMessage(response.data);
      setError(null); 
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("An unexpected error occurred.");
      }
      setSuccessMessage(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Navbar />
    <div className="bg-body-bg p-6 max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Account Deletion Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <span className="block text-sm font-medium text-gray-700">Data Deletion Option</span>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="deletionOption"
                value="partial"
                checked={deletionOption === "partial"}
                onChange={() => setDeletionOption("partial")}
                className="form-radio"
              />
              <span className="ml-2">Partial Deletion</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                name="deletionOption"
                value="full"
                checked={deletionOption === "full"}
                onChange={() => setDeletionOption("full")}
                className="form-radio"
              />
              <span className="ml-2">Full Deletion</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full text-white py-2 rounded-md transition ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>

        {isLoading && (
          <div className="mt-4 text-blue-600">
            <p>Loading...</p>
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-600">
            <p>{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="mt-4 text-green-600">
            <p>{successMessage}</p>
          </div>
        )}
      </form>
    </div>
    </>
  );
};

export default Home;
