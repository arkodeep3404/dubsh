import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Analytics() {
  const [UrlDetails, setUrlDetails] = useState([]);
  const [TotalVisitors, setTotalVisitors] = useState(0);
  const [VisitorDetails, setVisitorDetails] = useState([]);
  const [ContactDetails, setContactDetails] = useState([]);
  const [TotalContacts, setTotalContacts] = useState(0);
  const { customUrl } = useParams();

  useEffect(() => {
    async function urlDetails() {
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "api/v1/account/url/" + customUrl,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("url_token"),
          },
        }
      );
      setUrlDetails(response.data.url);
    }
    urlDetails();
  }, []);

  useEffect(() => {
    async function firstFetch() {
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL +
          "api/v1/account/analytics/" +
          customUrl,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("url_token"),
          },
        }
      );
      setTotalVisitors(response.data.totalVisitors);
      setVisitorDetails(response.data.visitorDetails);
      setTotalContacts(response.data.totalContacts);
      setContactDetails(response.data.contactDetails);
    }
    firstFetch();
  }, []);

  useEffect(() => {
    const timeoutValue = setTimeout(async () => {
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL +
          "api/v1/account/analytics/" +
          customUrl,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("url_token"),
          },
        }
      );
      setTotalVisitors(response.data.totalVisitors);
      setVisitorDetails(response.data.visitorDetails);
      setTotalContacts(response.data.totalContacts);
      setContactDetails(response.data.contactDetails);
    }, 1000);

    return () => {
      clearTimeout(timeoutValue);
    };
  }, [TotalVisitors, VisitorDetails, ContactDetails, TotalContacts]);

  return (
    <div>
      {UrlDetails.map((details) => (
        <div className="flex">
          <div className="w-auto m-3 peer h-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
            Original Url : {details.originalUrl}
          </div>
          <div className="w-auto m-3 peer h-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
            Custom Url : {details.customUrl}
          </div>
        </div>
      ))}
      <div className="w-auto m-3 peer h-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
        Total Visitors : {TotalVisitors}
      </div>
      <div className="w-auto m-3 peer h-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
        Visitor Details :
      </div>
      {VisitorDetails.map((visitors) => (
        <div className="flex">
          <div className="w-auto m-3 peer h-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
            ID : {visitors._id}
          </div>
          <div className="w-auto m-3 peer h-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
            Timestamp : {new Date(visitors.timestamp).toLocaleString()}
          </div>
        </div>
      ))}
      <div className="w-auto m-3 peer h-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
        Total Contacts : {TotalContacts}
      </div>
      <div className="w-auto m-3 peer h-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
        Contact Details :
      </div>
      {ContactDetails.map((contacts) => (
        <div className="flex">
          <div className="w-auto m-3 peer h-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
            Name : {contacts.name}
          </div>
          <div className="w-auto m-3 peer h-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
            Email : {contacts.email}
          </div>
          <div className="w-auto m-3 peer h-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
            Phone Number : {contacts.phoneNumber}
          </div>
        </div>
      ))}
    </div>
  );
}
