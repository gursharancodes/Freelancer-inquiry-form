import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { descriptionUploadSchema } from "../../lib/validationSchemas";

const Step3 = ({ onNext, onBack, defaultValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(descriptionUploadSchema),
    defaultValues,
  });

  const onSubmit = (data) => {
    const file = data.file?.[0] || null;
    onNext({ ...data, file });
  };

  const inputBase =
    "w-full px-4 py-2.5 text-base border rounded-lg bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0066cc]/50 hover:border-blue-400 focus:bg-white";

  const errorStyle = "border-red-400 focus:ring-red-200";

  return (
    <div className="max-w-md mx-auto p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="mb-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 tracking-tight">
          Project Overview
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
          Add a description and any relevant files
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm md:text-base font-medium text-gray-600 mb-1 ml-1"
          >
            Project Description
          </label>
          <textarea
            id="description"
            {...register("description")}
            rows={5}
            className={`${inputBase} ${
              errors.description ? errorStyle : "border-gray-200"
            } resize-none`}
            placeholder="Briefly describe your project goals and requirements"
          />
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* File Upload */}
        <div>
          <label
            htmlFor="file"
            className="block text-sm md:text-base font-medium text-gray-600 mb-3 ml-1"
          >
            Upload File (PDF, PNG, JPG)
          </label>
          <input
            id="file"
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            {...register("file")}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#0066cc] file:text-white hover:file:bg-blue-700 transition-all"
          />
          {errors.file && (
            <p className="text-sm text-red-500 mt-1">{errors.file.message}</p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-2">
          <button
            type="button"
            onClick={onBack}
            className="text-base font-semibold py-2.5 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 text-base font-semibold py-2.5 px-4 bg-[#0066cc] text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 transition-all"
          >
            Next
            <svg
              className="w-5 h-5"
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
        </div>
      </form>
    </div>
  );
};

export default Step3;
