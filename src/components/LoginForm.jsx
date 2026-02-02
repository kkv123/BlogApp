import { useState } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import authObj from "../appwrite/auth";
import { login } from "../store/authSlice";
import Logo from "./Logo";
import '../../src/index.css'
import Input from "./Input";
import Button from "./Button";



export default function LoginForm() {
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    console.log("Entered in LoginForm()");

    const loginData = async (data) => {
        setError("");
        try {
            const currSession = await authObj.login(data);
            if (currSession) {
                const userDetail = await authObj.getAccount();
                if (userDetail) {
                    dispatch(login(userDetail))
                    navigate("/")
                }
            }

        } catch (e) {
            setError("error in login form : e " + e)
        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
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
                    <div>
                         <Input
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
                        <Input
                            label='password'
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                        >
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )

}