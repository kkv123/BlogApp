import { useState } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import authObj from "../appwrite/auth";
import { login } from "../store/authSlice";




export default function LoginForm() {
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [register, handleSubmit] = useForm();

    const loginData = async () => {
        setError("");
        try {
            const currSession = await authObj.login(data);
            if (currSession) {
                const userDetail = await authObj.getAccount();
                if (userDetail) {
                    dispatch(login(userDetail))
                }
            }

        } catch (e) {
            setError(e.message)
        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div>
                <span>
                    {/* for logo */}
                </span>
            </div>
            {/* sign Up link */}
            <p className="mt-2 text-center text-base text-black/60">
                Don&apos;t have any account?&nbsp;
                <Link
                    to="/signup"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign Up
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(loginData)} className="mt-8">
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
                    label='password'
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: true
                    })}
                />
                <button
                    type="submit"
                    className="w-full"
                >
                    Sign in
                </button>

            </form>

        </div>
    )

}