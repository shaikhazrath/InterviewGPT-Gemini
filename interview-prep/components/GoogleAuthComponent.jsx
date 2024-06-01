import React, { useEffect, useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
const GoogleAuthComponent = () => {
  const router = useRouter();
  const [error, setError] = useState();
  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setToken(token)
  }, [token])

  const responseGoogle = async (response) => {
    try {
      const idToken = response.credential;
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/user`, {
        idToken,
      });
      localStorage.setItem('token', res.data.token)
      setToken(res.token)
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const onFailure = (error) => {
    console.error("Google sign-in failed:", error);
  };
  return (
    <div>
    {error && <h1 className="text-red-500 mb-4 " >{error}</h1>}
    <div className="">
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH}>
        <div className="flex justify-center">
          <GoogleLogin
            clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH}
            onSuccess={responseGoogle}
            onFailure={onFailure}
            size="medium"
            width="300"
            shape="square"
            type="standard"
            logo_alignment="left"
            theme="outline"
            render={(props) => (
              <button
                onClick={props.onClick}
                disabled={props.disabled}
              ></button>
            )}
          />
        </div>
      </GoogleOAuthProvider>
    </div>
  </div>
  )
}

export default GoogleAuthComponent