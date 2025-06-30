import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  LogOut,
  Mail,
  Phone,
  FileText,
  Calendar,
  Folder,
  User,
  DollarSign,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const InquiriesList = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInquiries = async () => {
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching inquiries:", error);
      } else {
        setInquiries(data);
      }

      setLoading(false);
    };

    fetchInquiries();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  if (loading)
    return (
      // Loading spinner
      <div className="min-h-dvh flex items-center justify-center">
        <div className="text-center text-gray-500 text-sm">
          <div className="w-8 h-8 border-2 border-[#0066cc] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          Loading inquiries...
        </div>
      </div>
    );

  if (inquiries.length === 0)
    return (
      <div>

        {/* Header */}
        <div className="flex justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
              Client Inquiries
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {inquiries.length} total inquir
              {inquiries.length === 1 ? "y" : "ies"}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-100 text-red-600 border border-red-200 hover:bg-red-200 hover:shadow-md hover:scale-102 px-4 py-2 rounded-xl text-sm font-medium transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>


        {/* Empty State */}
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center text-gray-500">
            <Folder className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No Inquiries Found
            </h3>
            <p className="text-sm">
              Client inquiries will appear here once submitted.
            </p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-dvh px-2 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
              Client Inquiries
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {inquiries.length} total inquir
              {inquiries.length === 1 ? "y" : "ies"}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-100 text-red-600 border border-red-200 hover:bg-red-200 hover:shadow-md hover:scale-102 px-4 py-2 rounded-xl text-sm font-medium transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Inquiries */}
        <div className="space-y-6">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 sm:p-6 transition-all duration-300"
            >
              {/* User Info */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#0066cc]/10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-[#0066cc]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {inq.full_name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(inq.created_at).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <a
                  href={`mailto:${inq.email}`}
                  className="flex items-center gap-3 p-3 bg-gray-100 hover:bg-gray-200 transition rounded-xl text-sm text-gray-800"
                >
                  <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="break-all">{inq.email}</span>
                </a>

                {inq.phone && (
                  <a
                    href={`tel:${inq.phone}`}
                    className="flex items-center gap-3 p-3 bg-gray-100 hover:bg-gray-200 transition rounded-xl text-sm text-gray-800"
                  >
                    <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span>{inq.phone}</span>
                  </a>
                )}
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-xl">
                  <Folder className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Project Type
                    </p>
                    <p className="text-sm text-gray-800 font-medium">
                      {inq.project_type}
                    </p>
                  </div>
                </div>

                {inq.budget && (
                  <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-xl">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Budget</p>
                      <p className="text-sm text-gray-800 font-medium">
                        {inq.budget}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-xl">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Timeline</p>
                    <p className="text-sm text-gray-800 font-medium">
                      {inq.timeline}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <p className="text-xs text-gray-500 uppercase mb-2">
                  Description
                </p>
                <div className="bg-gray-100 rounded-xl p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {inq.description}
                  </p>
                </div>
              </div>

              {/* File URL */}
              {inq.file_url && (
                <div className="pt-4 border-t border-gray-200">
                  <a
                    href={inq.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#0066cc] hover:text-blue-700 text-sm font-medium transition group"
                  >
                    <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    View Uploaded File
                    <svg
                      className="w-3 h-3 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InquiriesList;
