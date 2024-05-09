import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddUrl() {
  const [OriginalUrl, setOriginalUrl] = useState("");
  const [CustomUrl, setCustomUrl] = useState("");
  const navigate = useNavigate();

  async function addUrl() {
    await axios.post(
      import.meta.env.VITE_BACKEND_URL + "api/v1/account/url",
      {
        originalUrl: OriginalUrl,
        customUrl: CustomUrl,
      },
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("url_token"),
        },
      }
    );
  }

  function Profile() {
    navigate("/profile");
  }

  function Logout() {
    localStorage.removeItem("url_token");
    navigate("/signin");
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <input
          type="text"
          placeholder="Original Url"
          className="w-fit m-3 peer h-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Custom Url"
          className="w-auto m-3 peer h-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          onChange={(e) => setCustomUrl(e.target.value)}
        />
        <button
          onClick={addUrl}
          className="m-3 middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Add
        </button>
      </div>
      <div>
        <button
          onClick={Profile}
          className="m-3 middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Profile
        </button>
        <button
          onClick={Logout}
          className="m-3 middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
