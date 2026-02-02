import React from "react";
import { useState } from "react"
import authObj from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import '../../src/index.css'
import { Navigate } from "react-router-dom";
import Logo from "./Logo";
import Button from "./Button";
import Input from "./Input";

export default function SignUpForm() {
    const [error, setError] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const createAccount = async (data) => {
        setError("")
        try {
            console.log("entered data is " + data);
            console.log(data.email + " " + data.password + " " + data.fullName);
            const signUp = await authObj.createAccount(data.email, data.password, data.fullName);
            if (signUp) {
                const userData = await authObj.getAccount();
                if (userData) {
                    dispatch(login(userData));
                    navigate("/")
                }
            }
        } catch (e) {
            const message = e?.message || e?.response?.message || "Something went wrong";

            console.log(message);
            setError(message);
        }
    }
    console.log(error);
    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-200 rounded-xl p-10 border border-black/10`}>
                <div>
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
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
                {error && (<p className="text-red-600 mt-8 text-center">{error}</p>)}
                <form onSubmit={handleSubmit(createAccount)}>
                    <Input
                        type="text"
                        label="Full Name"
                        placeholder="Enter full name"
                        {...register("fullName", {
                            required: true
                        })}
                    />
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
                        label='Password'
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true
                        })}
                    />
                    <Button
                        className="w-full"
                        type="submit"
                        label="Submit"
                    >
                        Create Account
                    </Button>


                </form>

            </div>

        </div>
    )
}
