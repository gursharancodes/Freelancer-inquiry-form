import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import { supabase } from "../lib/supabaseClient";

const steps = [Step1, Step2, Step3, Step4];
const stepLabels = [
  "Personal Info",
  "Project Details",
  "Description",
  "Review",
];

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const CurrentComponent = steps[currentStep];

  const nextStep = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    const data = formData;
    let fileUrl = null;

    try {
      if (data.file) {
        const file = data.file;
        const filePath = `inquiries/${Date.now()}-${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("inquiry-uploads")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("inquiry-uploads")
          .getPublicUrl(filePath);

        fileUrl = publicUrlData.publicUrl;
      }

      const { error: insertError } = await supabase.from("inquiries").insert([
        {
          full_name: data.fullName,
          email: data.email,
          phone: data.phone || null,
          project_type: data.projectType,
          budget: data.budget || null,
          timeline: data.timeline,
          description: data.description,
          file_url: fileUrl,
        },
      ]);

      if (insertError) throw insertError;

      setSubmitted(true);
    } catch (err) {
      alert("Submission failed. Check console.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      {/* name */}
      <div className="flex flex-col gap-1 items-center mb-10 text-center">
        <h1 className="text-2xl font-semibold">GursharanCodes.</h1>
        <p className="text-gray-500 text-xs md:text-sm mb-3">
          {" "}
          Frontend Developer
        </p>
        <div className="border-b-2 border-gray-200 w-1/2"></div>
      </div>
      {/* Step Indicators */}
      <div className="mb-8">
        <div className="flex justify-between items-start gap-4 sm:gap-6 mb-8">
          {stepLabels.map((label, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;

            return (
              <div key={label} className="flex-1 min-w-0">
                <div className="flex flex-col items-center text-xs sm:text-sm font-medium transition-all duration-200">
                  {/* Step Icon */}
                  <div
                    className={`w-9 h-9 flex items-center justify-center rounded-full border-2 mb-2
              ${
                isActive
                  ? "border-[#0066cc] bg-[#0066cc]/10 text-[#0066cc]"
                  : isCompleted
                  ? "border-green-500 bg-green-50 text-green-600"
                  : "border-gray-300 bg-gray-100 text-gray-400"
              }`}
                  >
                    {isCompleted ? (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <span className="font-semibold">{index + 1}</span>
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={`text-center break-words leading-snug ${
                      isActive
                        ? "text-[#0066cc]"
                        : isCompleted
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white border border-[#0066cc]/30 text-center rounded-2xl px-6 py-10 shadow-xl"
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* Check Icon */}
            <div className="bg-[#0066cc]/10 text-[#0066cc] rounded-full p-3 shadow-md">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-semibold text-[#0066cc]">
              Submission Successful
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-500 max-w-sm">
              Thank you for your inquiry. We've received your submission and
              will be in touch soon.
            </p>
          </div>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentComponent
              onNext={nextStep}
              onBack={prevStep}
              defaultValues={formData}
              formData={formData}
              isSubmitting={isSubmitting}
              onSubmit={handleFinalSubmit}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default MultiStepForm;
