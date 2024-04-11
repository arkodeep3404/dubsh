import { useRecoilState } from "recoil";
import { urlAtom } from "../store/url";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DisplayUrl() {
  const [UrlList, setUrlList] = useRecoilState(urlAtom);
  const [Filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function firstFetch() {
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL +
          "api/v1/account/urls?filter=" +
          Filter,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("url_token"),
          },
        }
      );
      setUrlList(response.data.urls);
    }
    firstFetch();
  }, []);

  useEffect(() => {
    const timeoutValue = setTimeout(async () => {
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL +
          "api/v1/account/urls?filter=" +
          Filter,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("url_token"),
          },
        }
      );
      setUrlList(response.data.urls);
    }, 1000);

    return () => {
      clearTimeout(timeoutValue);
    };
  }, [UrlList, Filter]);

  function deleteUrl(ID) {
    axios.delete(
      import.meta.env.VITE_BACKEND_URL + "api/v1/account/url?urlId=" + ID,
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("url_token"),
        },
      }
    );
  }

  function openUrl(customUrl) {
    window.open(
      import.meta.env.VITE_BACKEND_URL + "api/v1/account/redirect/" + customUrl,
      "_blank"
    );
  }

  function copyUrl(customUrl) {
    navigator.clipboard.writeText(
      import.meta.env.VITE_BACKEND_URL + "api/v1/account/redirect/" + customUrl
    );
    alert("custom url link copied");
  }

  function analyticsUrl(customUrl) {
    window.open(
      import.meta.env.VITE_FRONTEND_URL + "analytics/" + customUrl,
      "_blank"
    );
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        className="w-auto m-3 peer h-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
        onChange={(e) => setFilter(e.target.value)}
      />
      {UrlList.map((Url) => (
        <div key={Url._id} className="flex">
          <div className="w-auto m-3 peer h-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
            {Url.originalUrl}
          </div>
          <div className="w-auto m-3 peer h-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
            {Url.customUrl}
          </div>
          <button
            onClick={() => openUrl(Url.customUrl)}
            className="m-3 middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Open
          </button>
          <button
            onClick={() => copyUrl(Url.customUrl)}
            className="m-3 middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Copy
          </button>
          <button
            onClick={() => analyticsUrl(Url.customUrl)}
            className="m-3 middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Analytics
          </button>
          <button
            onClick={() => deleteUrl(Url._id)}
            className="m-3 middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
