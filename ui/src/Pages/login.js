import { useState, useEffect } from "react";
import GoogleLogin from "../components/Login/loginButton";
import GitHubIcon from "../components/Login/githubicon";
function Login() {
  const [token, setToken] = useState(null);

  const googleAuth = () => {
    // window.open(`${apiHost}/auth/google`, "_self");
  };

  useEffect(() => {
    console.log("Token updated:", token);
  }, [token]);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-100">
     
      <h1>Welcome Back</h1>
      <div className="bg-white dark:bg-gray-105 shadow-lg rounded-lg pt-6 pr-7 pl-9 pb-4 w-96 ">
      <h2 className="text-2xl font-semibold text-center mb-4">Academic Dashboard</h2>
        {!token ? (
          <>
            <GoogleLogin />
            <div className="mt-4 text-center">
              <p className="text-gray-600 dark:text-gray-400">Sign in using your BITsathy account</p>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-green-600">You are logged in!</p>
            <button
              className="mt-4 bg-red-500 text-white font-medium py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
