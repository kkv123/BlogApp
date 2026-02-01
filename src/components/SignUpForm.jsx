import React from "react";
import { useState } from "react"
import authObj from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

export default function SignUpForm() {
    const [error, setError] = useState();
    const dispatch = useDispatch()
    const [register, handleSubmit] = useForm();
    const createAccount = async (data) => {
        setError("")
        try {
            const signUp = await authObj.createAccount(data);
            if (signUp) {
                const userData = await authObj.getAccount();
                if (userData) {
                    dispatch(login(userData));
                    navigate("/")
                }
            }
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div>
                {/*TODO: for logo */}
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign In
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <input
                type="text"
                label="Full Name"
                placeholder="Enter full name"
                {...register("fullName", {
                    required: true
                })}
            />
            <input
                type="email"
                label="Email"
                placeholder="Enter your email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                    }
                })}
            />
            <input
                label='Password'
                type="password"
                placeholder="Enter your password"
                {...register("password",{
                    required: true
                })}
            />
            <button
                onSubmit={handleSubmit(createAccount)}
                className="w-full"
                type="submit"
                label="Submit"
            >
                Create Account
            </button>



        </div>
    )
}