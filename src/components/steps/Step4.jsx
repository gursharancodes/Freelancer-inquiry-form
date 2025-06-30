import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSubmitSchema } from "../../lib/validationSchemas";

const Step4 = ({ onSubmit, onBack, formData, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reviewSubmitSchema),
  });

  const handleFinalSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <div className="max-w-xl mx-auto p-5 sm:p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          Review & Submit
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Please review your details before final submission
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(handleFinalSubmit)} className="space-y-8">
        {/* Review Section */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-6 space-y-6">
          {/* Personal Info */}
          <div>
            <h3 className="text-base font-semibold text-gray-700 mb-3 border-b pb-2">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p className="text-gray-500">Full Name</p>
                <p>{formData.fullName}</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p>{formData.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p>{formData.phone || "-"}</p>
              </div>
            </div>
          </div>

          {/* Project Info */}
          <div>
            <h3 className="text-base font-semibold text-gray-700 mb-3 border-b pb-2">
              Project Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p className="text-gray-500">Service type</p>
                <p>{formData.projectType}</p>
              </div>
              <div>
                <p className="text-gray-500">Budget</p>
                <p>{formData.budget || "-"}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-gray-500">Timeline</p>
                <p>{formData.timeline}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-gray-500 mb-1">Description</p>
                <p className="whitespace-pre-wrap">{formData.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4">
          <label className="flex items-start space-x-3 text-sm sm:text-base text-gray-700">
            <input
              type="checkbox"
              {...register("confirm")}
              className="mt-1 accent-[#0066cc]"
            />
            <span>
              I confirm that the above information is accurate and complete.
            </span>
          </label>
          {errors.confirm && (
            <p className="text-sm text-red-500 mt-2">
              {errors.confirm.message}
            </p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto text-base font-semibold py-2.5 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full sm:w-auto flex justify-center items-center gap-2 text-base font-semibold py-2.5 px-4 rounded-lg transition-all ${
              isSubmitting
                ? "bg-blue-400 text-white cursor-not-allowed"
                : "bg-[#0066cc] text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step4;
