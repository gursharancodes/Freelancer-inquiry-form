import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectDetailsSchema } from "../../lib/validationSchemas";

const Step2 = ({ onNext, onBack, defaultValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectDetailsSchema),
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
          Project Details
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
          Help us understand your project scope
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
        {/* Project Type */}
        <div className="relative">
          <label
            htmlFor="projectType"
            className="block text-sm md:text-base font-medium text-gray-600 mb-1 ml-1"
          >
            Project Type
          </label>
          <select
            id="projectType"
            {...register("projectType")}
            className={`${inputBase} appearance-none pr-10 ${
              errors.projectType ? errorStyle : "border-gray-200"
            }`}
          >
            <option className="text-gray-400" value="">
              Select
            </option>
            <option value="Website">Website</option>
            <option value="App">App</option>
            <option value="Branding">Branding</option>
          </select>
          {/* Custom dropdown arrow */}
          <div className="pointer-events-none absolute top-1/2 translate-y-1 right-3 text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                d="M19 9l-7 7-7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Budget */}
        <div className="relative">
          <label
            htmlFor="budget"
            className="block text-sm md:text-base font-medium text-gray-600 mb-1 ml-1"
          >
            Budget Range
          </label>
          <select
            id="budget"
            {...register("budget")}
            className={`${inputBase} appearance-none pr-10 border-gray-200`}
          >
            <option value="">Select</option>
            <option value="Below $1k">Below $1k</option>
            <option value="$1k - $5k">$1k - $5k</option>
            <option value="$5k+">$5k+</option>
          </select>
          <div className="pointer-events-none absolute top-1/2 translate-y-1 right-3 text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                d="M19 9l-7 7-7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <label
            htmlFor="timeline"
            className="block text-sm md:text-base font-medium text-gray-600 mb-1 ml-1"
          >
            Timeline
          </label>
          <input
            id="timeline"
            {...register("timeline")}
            className={`${inputBase} ${
              errors.timeline ? errorStyle : "border-gray-200"
            }`}
            placeholder="e.g. 2 weeks, 1 month"
          />
          {errors.timeline && (
            <p className="text-sm text-red-500 mt-1">
              {errors.timeline.message}
            </p>
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

export default Step2;
