import Button from "../components/button";
import Heading from "../components/heading";
import InputBox from "../components/inputBox";
import SubHeading from "../components/subHeading";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import useUser from "../hooks/useUser";

export default function Update() {
  const [password, setPassword] = useState("");
  const [Error, setError] = useState(false);
  const user = useUser();
  const navigate = useNavigate();

  if (user.Loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
      </div>
    );
  }

  if (!user.UserDetails) {
    return <Navigate to={"/signin"} />;
  }

  async function Update() {
    try {
      const response = await axios.put(
        import.meta.env.VITE_BACKEND_URL + "api/v1/user/update",
        {
          password,
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("url_token"),
          },
        }
      );
      alert("Update successful");
      navigate("/home");
    } catch (error) {
      setError(true);
    }
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Update Password"} />
          <SubHeading label={"Enter new password"} />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="123456"
            label={"Password"}
          />
          <div className="pt-4">
            <Button onClick={Update} label={"Update Password"} />
          </div>
          <div className={`${!Error ? "hidden" : ""}`}>Incorrect Token</div>
        </div>
      </div>
    </div>
  );
}
