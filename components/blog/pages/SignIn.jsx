import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure, resetError } from "../redux/user/userSlice";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation"; // Use Next.js router
import Link from "next/link";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize router

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("All fields are required"));
    }

    if (formData.password.length < 8) {
      return dispatch(signInFailure("Password must be at least 8 characters long"));
    }

    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:8000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        router.push("/"); // Use Next.js router for navigation
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left */}
        <div className="flex-1">
          <Link href="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              PK Photography
            </span>
          </Link>
          <p className="text-sm mt-5">
            Here you'll find a variety of articles and tutorials on topics such
            as web development, software engineering, and programming languages.
          </p>
        </div>

        {/* Right */}
        <div className="flex-1 ">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
  <label className="block text-gray-700" htmlFor="email">
    Email
  </label>
  <input
    type="email"
    placeholder="name@company.com"
    id="email"
    onChange={handleChange}
    className="bg-white text-black border border-gray-300 rounded-lg py-3 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500" // Tailwind styles for input
  />
</div>
<div>
  <label className="block text-gray-700" htmlFor="password">
    Password
  </label>
  <input
    type="password"
    placeholder="**********"
    id="password"
    onChange={handleChange}
    className="bg-white text-black border border-gray-300 rounded-lg py-3 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500" // Tailwind styles for input
  />
</div>

           
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link href="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
