import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function CollectDetails() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Number, setNumber] = useState(0);
  const [Final, setFinal] = useState("");
  const { customUrl } = useParams();

  useEffect(() => {
    async function firstFetch() {
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "api/v1/account/origin/" + customUrl
      );
      setFinal(response.data.url);
    }
    firstFetch();
  }, []);

  async function CollectDetails(final, e) {
    e.preventDefault();
    const response = await axios.post(
      import.meta.env.VITE_BACKEND_URL + "api/v1/account/submit/" + customUrl,
      {
        name: Name,
        email: Email,
        phoneNumber: Number,
      }
    );

    window.location.href = final;
  }

  return (
    <>
      <div className="w-auto m-3 peer h-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
        Please enter your details to continue
      </div>
      <div className="flex items-center justify-between">
        <form onSubmit={(e) => CollectDetails(Final, e)}>
          <input
            required
            type="text"
            placeholder="Your Name"
            className="w-fit m-3 peer h-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            required
            type="email"
            placeholder="Your Email"
            className="w-auto m-3 peer h-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            type="number"
            placeholder="Your Phone Number"
            className="w-auto m-3 peer h-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            onChange={(e) => setNumber(e.target.value)}
          />
          <button
            type="submit"
            className="m-3 middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
