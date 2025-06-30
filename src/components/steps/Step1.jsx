import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema } from "../../lib/validationSchemas";

const Step1 = ({ onNext, defaultValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues,
  });

  const onSubmit = (data) => onNext(data);

  const inputBase =
    "w-full px-4 py-2.5 text-base border rounded-lg bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0066cc]/50 hover:border-blue-400 focus:bg-white";

  const errorStyle = "border-red-400 focus:ring-red-200";

  return (
    <div className="max-w-md mx-auto p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="mb-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 tracking-tight">
          Personal Info
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
          Fill in your details to continue
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm md:text-base font-medium text-gray-600 mb-1 ml-1"
          >
            Full Name
          </label>
          <input
            id="fullName"
            {...register("fullName")}
            className={`${inputBase} ${
              errors.fullName ? errorStyle : "border-gray-200"
            }`}
            placeholder="John Doe"
          />
          {errors.fullName && (
            <p className="text-sm text-red-500 mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm md:text-base font-medium text-gray-600 mb-1 ml-1"
          >
            Email Address
          </label>
          <input
            id="email"
            {...register("email")}
            type="email"
            className={`${inputBase} ${
              errors.email ? errorStyle : "border-gray-200"
            }`}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm md:text-base font-medium text-gray-600 mb-1 ml-1"
          >
            Phone Number
          </label>
          <input
            id="phone"
            {...register("phone")}
            type="tel"
            className={`${inputBase} border-gray-200`}
            placeholder="+91 9876543210"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 text-base font-semibold py-3 px-4 bg-[#0066cc] text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 transition-all duration-200"
        >
          Continue
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              d="M9 5l7 7-7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Step1;
