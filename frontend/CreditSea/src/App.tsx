import React, { useState, useCallback } from "react";
import "./App.css";
import LoanListing from "./components/LoanListing.tsx";
import Popup from "./components/Popup.tsx";
import { FaSearch } from "react-icons/fa";

// Interface to define loan form data structure
interface LoanApplicationData {
  applicantName: string;
  requiredAmount: string;
  duration: string;
  jobStatus: string;
  loanPurpose: string;
  officeAddress: string;
}

const Application: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState<LoanApplicationData>({
    applicantName: "",
    requiredAmount: "",
    duration: "",
    jobStatus: "",
    loanPurpose: "",
    officeAddress: "",
  });

  const [activeSection, setActiveSection] = useState<string>("loan");

  // Function to display the loan form
  const openLoanForm = useCallback(() => {
    setIsFormVisible(true);
  }, []);

  // Handle form data changes
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  // Function to handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = 12140970;
    const apiEndpoint = `https://credit-sea-assignment-bck.vercel.app/api/loans?userId=${userId}`;

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error submitting loan application");
      }

      await response.json();
      alert("Your loan application was successfully submitted!");
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error:", error);
      alert("Loan application submission failed.");
    }
  };

  return (
    <div className="Application bg-gray-200 min-h-screen">
      <div className="p-6 bg-gray-100 flex justify-center">
        <div className="p-6 max-w-4xl w-full">
          {/* Display Balance Section */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <div className="bg-green-600 w-5 h-5 text-white p-4 rounded-full"></div>
              <div>
                <h3 className="text-black-500 uppercase text-sm font-semibold">
                  Account Balance
                </h3>
                <p className="text-green-600 text-2xl font-bold">₦ 0.0</p>
              </div>
            </div>

            {/* Loan Button */}
            <button
              onClick={openLoanForm}
              className="bg-gray-600 hover:bg-gray-900 text-white font-semibold py-2 px-6 rounded-lg"
            >
              Apply for Loan
            </button>
          </div>

          {/* Action Tabs */}
          <div className="flex space-x-2 mb-4">
            {["loan", "transaction", "deposit"].map((section) => (
              <button
                key={section}
                className={`flex-1 py-2 px-4 rounded-lg shadow ${
                  activeSection === section
                    ? "bg-green-100 text-green-800"
                    : "bg-white text-gray-800 border"
                }`}
                onClick={() => setActiveSection(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)} Options
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative mb-4">
            <input
              type="text"
              className="w-full border-gray-400 rounded-lg shadow p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Search loans"
            />
            <FaSearch className="absolute top-4 left-4 text-gray-600" />
          </div>

          {/* Render Conditional Content */}
          <div className="container max-w-5xl mx-auto px-4 py-8">
            {activeSection === "loan" ? (
              <div className="bg-gray-400 p-7 rounded-lg">
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-3xl text-gray-700 font-semibold">
                    Submitted Loan Applications
                  </h1>
                </div>
                <div className="flex justify-between rounded-lg items-center border-b p-4 mb-4 hover:bg-gray-200 transition-all duration-200">
                  <div className="text-gray-800 font-semibold">Officer</div>
                  <div className="text-gray-800 font-semibold">Loan Amount</div>
                  <div className="text-gray-800 font-semibold">Date</div>
                  <div className="text-gray-800 font-semibold">Status</div>
                </div>
                <LoanListing />
              </div>
            ) : (
              <div className="flex justify-center items-center h-64">
                <h1 className="text-3xl font-semibold text-gray-500">
                  Feature Coming Soon
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loan Application Modal */}
      <Popup isVisible={isFormVisible} onClose={() => setIsFormVisible(false)}>
        <LoanApplicationForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
        />
      </Popup>
    </div>
  );
};

// LoanApplicationForm Component
const LoanApplicationForm: React.FC<{
  formData: LoanApplicationData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFormSubmit: (e: React.FormEvent) => void;
}> = ({ formData, handleInputChange, handleFormSubmit }) => (
  <form
    onSubmit={handleFormSubmit}
    className="p-8 space-y-6 bg-gray-200 rounded-lg h-full"
  >
    <h2 className="text-2xl font-bold mb-6 text-gray-900">Loan Application</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        name="applicantName"
        placeholder="Full name (as on bank account)"
        value={formData.applicantName}
        onChange={handleInputChange}
        className="w-full p-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
      />
      <input
        type="number"
        name="requiredAmount"
        placeholder="Loan amount"
        value={formData.requiredAmount}
        onChange={handleInputChange}
        className="w-full p-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="number"
        name="duration"
        placeholder="Tenure (in months)"
        value={formData.duration}
        onChange={handleInputChange}
        className="w-full p-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
      />
      <input
        type="text"
        name="jobStatus"
        placeholder="Job status"
        value={formData.jobStatus}
        onChange={handleInputChange}
        className="w-full p-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <textarea
        name="loanPurpose"
        placeholder="Reason for loan"
        value={formData.loanPurpose}
        onChange={handleInputChange}
        className="w-full p-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 resize-none"
      ></textarea>
      <input
        type="text"
        name="officeAddress"
        placeholder="Office address"
        value={formData.officeAddress}
        onChange={handleInputChange}
        className="w-full p-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
      />
    </div>

    <div className="flex justify-end space-x-2">
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-6 rounded-md font-semibold hover:bg-green-800"
      >
        Submit Application
      </button>
    </div>
  </form>
);

export default Application;
