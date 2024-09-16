import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import ZineLogo from "../../images/zinelogo.png";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authContext";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { sendEmailVerification } from "firebase/auth";

interface ILoginData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const errorMessages: { [key: string]: string } = {
  "auth/email-already-in-use": "This email is already in use. Contact Zine Team",
  "auth/internal-error": "An internal error has occurred. Please try again later",
  "auth/network-request-failed": "Network request error. Please check your internet and try again",
  "auth/user-disabled": "User with this email has been disabled",
  "auth/quota-exceeded": "Quota exceeded. Please contact Zine Team",
  "auth/timeout": "Timeout. Please check your internet and try again later",
  default: "An unknown error has occurred",
};

const validateEmail = (email: string) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

const Signup = () => {
  const {
    register,
    reset,
    setError,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginData>();
  const router = useRouter();
  const { signUp } = useAuth();

  const checkPasswordConfirmation = (passwordConfirmation: string) => {
    return watch("password") === passwordConfirmation;
  };

  const onSubmit = async (data: ILoginData) => {
    const { name, email, password } = data;
    reset();

    const promise = signUp(name, email, password).then(async (userCredential: any) => {
      // Signed in
      // console.log(userCredential)
      const _user = userCredential.user;
      return true;
    });

    const success = await toast
      .promise(promise, {
        pending: "Signing Up",
        error: "Sign up unsuccessful",
        success: "Verification email sent!",
      })
      .then(() => {
        setTimeout(() => router.push("/login"), 3000);
      })
      .catch((error: any) => {
        const message = errorMessages[error.code] || errorMessages["default"];
        setError("root.authError", { message });
        return false;
      });
  };

  return (
    <div className="flex flex-col items-center" style={{ background: "linear-gradient(to right, #003D63, #0C72B0)" }}>
      <ToastContainer position="top-left" autoClose={5000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />

      <div className="bg-white rounded-xl px-8 pb-8 md:px-16 my-16 w-11/12 md:w-1/2" style={{ maxWidth: 651 }}>
        <div className="flex justify-center">
          <Image src={ZineLogo} width={150} height={150} />
        </div>
        <p className="text-center -mt-8 font-semibold" style={{ color: "#0C72B0" }}>
          Robotics and Research Group
        </p>
        <form>
          <div className="mt-8">
            <label className="block text-gray-600">
              Full Name<span className="text-red-500">*</span>
            </label>
            <input type="text" className="block w-full focus:outline-none bottom-border text-lg pt-2" {...register("name", { required: true })} />
            {errors.name && (
              <p className="text-red-500 text-sm" role="alert">
                Full Name is required
              </p>
            )}
          </div>

          <div className="mt-8">
            <label className="block text-gray-600">
              Email<span className="text-red-500">*</span>
            </label>
            <input type="email" className="block w-full focus:outline-none bottom-border text-lg pt-2" {...register("email", { required: true, validate: validateEmail })} />
            {errors.email?.type === "required" && (
              <p className="text-red-500 text-sm" role="alert">
                Email ID is required
              </p>
            )}
            {errors.email?.type === "validate" && (
              <p className="text-red-500 text-sm" role="alert">
                Enter a valid college email id
              </p>
            )}
          </div>

          <div className="mt-8">
            <label className="block text-gray-600">
              Password<span className="text-red-500">*</span>
            </label>
            <input type="password" className="block w-full focus:outline-none bottom-border text-lg pt-2" {...register("password", { required: true, minLength: 6, maxLength: 12 })} />
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm" role="alert">
                Password is required
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm" role="alert">
                Password should be atleast 6 characters in length
              </p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-500 text-sm" role="alert">
                Password is too long
              </p>
            )}
          </div>

          <div className="mt-8">
            <label className="block text-gray-600">
              Password Confirmation<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              className="block w-full focus:outline-none bottom-border text-lg pt-2"
              {...register("passwordConfirmation", { required: true, validate: checkPasswordConfirmation })}
            />
            {errors.passwordConfirmation?.type === "required" && (
              <p className="text-red-500 text-sm" role="alert">
                Passwords Confirmation is required
              </p>
            )}
            {errors.passwordConfirmation?.type === "validate" && (
              <p className="text-red-500 text-sm" role="alert">
                Passwords do not match
              </p>
            )}
          </div>

          {errors.root?.authError && <p className="text-sm text-red-500">{errors.root.authError.message}</p>}
          <button className="mt-8 p-4 block w-full rounded-3xl text-white" onClick={handleSubmit(onSubmit)} style={{ background: "#0C72B0" }}>
            Sign Up
          </button>
          <p className="mt-8 text-sm text-center">
            Already have an account?{" "}
            <Link href="/login">
              <a className="text-blue-500 underline">Login</a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
