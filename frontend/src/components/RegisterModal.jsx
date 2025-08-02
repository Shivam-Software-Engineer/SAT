import { X, User, Mail, Phone, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';

const RegisterModal = ({
  isRegisterOpen,
  setIsRegisterOpen,
  registerForm,
  setRegisterForm,
  handleRegister
}) => {
 const [otpSending, setOtpSending] = useState(false);


  const [hasSentOtp, setHasSentOtp] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isResending, setIsResending] = useState(false);

  const [resendTimer, setResendTimer] = useState(180); // 3 minutes in seconds
const [isResendAvailable, setIsResendAvailable] = useState(false);



const Base_API_URL = import.meta.env.VITE_APP_URL ;



const clearForm = () => {
  setRegisterForm({
    name: '',
    email: '',
    phone: '',
    otp: '',
  });
  setHasSentOtp(false);
  setResendTimer(180);
  setIsResendAvailable(false);
};



const resendOtp = async () => {
  if (!registerForm.phone) return;

  setIsResending(true); // Start loader

  try {
    // ✅ Hit your backend API to resend OTP
    const response = await axios.post(`${Base_API_URL}website/auth/send-otp`, {
      phone: registerForm.phone,
    });

    if (response.data.status === 1) {
      setHasSentOtp(true);
      setResendTimer(180);
      setIsResendAvailable(false);

      // ✅ Success popup (unchanged)
      Swal.fire({
        icon: "success",
        title: "OTP Resent!",
        text: "Check your phone again.",
        width: "300px",
      });
    } else {
      throw new Error(response.data.message || "OTP resend failed");
    }
  } catch (error) {
    console.error("Resend OTP Error:", error);
    Swal.fire({
      icon: "error",
      title: "Failed to send OTP",
      text: error.message || "Please try again.",
      width: "300px",
    });
  } finally {
    setIsResending(false); // Stop loader
  }
};





useEffect(() => {
  let interval;

  if (hasSentOtp && resendTimer > 0) {
    setIsResendAvailable(false);
    interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
  } else if (resendTimer === 0) {
    setIsResendAvailable(true);
    clearInterval(interval);
  }

  return () => clearInterval(interval);
}, [hasSentOtp, resendTimer]);

  const navigate = useNavigate();

  if (!isRegisterOpen) return null;



const sendOtp = async () => {
  setError(null);
  setOtpSending(true); // Start loader

  if (!registerForm.phone || registerForm.phone.length !== 10) {
    setError("Enter valid phone number");
    setOtpSending(false); // Stop loader on error
    return;
  }

  try {
    const res = await axios.post(`${Base_API_URL}website/auth/send-otp`, {
      phone: registerForm.phone,
    });

    if (res.data.status === 1) {
      setHasSentOtp(true);
      setResendTimer(60);
      Swal.fire({
        icon: "success",
        title: "OTP Sent!",
        text: "Check your phone.",
        width: "300px",
      });
    } else {
      throw new Error(res.data.message || "OTP sending failed");
    }
  } catch (err) {
    console.error("Error sending OTP:", err);
    setError("Failed to send OTP. Try again later.");
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: err.message || "Something went wrong.",
      width: "300px",
    });
  } finally {
    setOtpSending(false); // Stop loader in all cases
  }
};



  const handleRegisterWithRedirect = async (e) => {
  e.preventDefault();
  setError(null);

  if (!registerForm.phone || !registerForm.otp) {
    setError("Please enter both phone number and OTP");
    return;
  }

  try {
    setIsSubmitting(true);

    // ✅ Step 1: Verify OTP using your backend API
    const res = await axios.post(`${Base_API_URL}website/auth/verify-otp`, {
      phone: registerForm.phone,
      otp: registerForm.otp,
      email: registerForm.email,
    });

    if (res.data.status !== 1) {
      setError("Invalid OTP. Please try again.");
      return;
    }

    // ✅ Step 2: Submit to Google Sheet or custom DB
    await submitToGoogleSheet();  // Your existing function
    await handleRegister();       // Your existing registration logic

    // ✅ Step 3: Store user info
    localStorage.setItem("registeredUser", JSON.stringify({
      name: registerForm.name,
      email: registerForm.email,
      phone: registerForm.phone
    }));

    // ✅ Step 4: Redirect
    setRegistrationSuccess(true);
    setTimeout(() => navigate('/free-demo-videos'), 2000);
  } catch (err) {
    console.error("OTP verification or registration failed:", err);
    setError("Something went wrong. Try again.");
  } finally {
    setIsSubmitting(false);
  }
};


  const handleCloseModal = () => {
  if (!isSubmitting) {
    setIsRegisterOpen(false);
    setError(null);
    clearForm(); // ✅ reset form data when modal closes
  }
};


  const submitToGoogleSheet = async () => {
    const endpoint = import.meta.env.VITE_FormSubmit_URL;

    const payload = {
      name: registerForm.name,
      email: registerForm.email,
      phone: registerForm.phone,
    };

    try {
      await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      console.error('Error submitting to Google Sheet:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-gray-200 rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">
            {registrationSuccess ? 'Success!' : 'Claim Your Spot'}
          </h2>
          <button
            onClick={handleCloseModal}
            disabled={isSubmitting}
            className="text-gray-500 hover:text-gray-800 transition-colors disabled:opacity-50"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {registrationSuccess ? (
            <div className="text-center space-y-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                Registration Successful!
              </h3>
              <p className="text-gray-600">You will be redirected to demo videos shortly...</p>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleRegisterWithRedirect} className="space-y-4">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="John Doe"
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="john@example.com"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="9876543210"
                      value={registerForm.phone}
                      onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {hasSentOtp && (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
    <div className="relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ShieldCheck className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        required
        className="block w-full pl-10 pr-20 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder="Enter OTP"
        value={registerForm.otp || ''}
        onChange={(e) => setRegisterForm({ ...registerForm, otp: e.target.value })}
        disabled={isSubmitting}
      />
      <div className="absolute inset-y-0 right-2 flex items-center">
       {!isResendAvailable ? (
  <span className="text-xs text-gray-500">
    Resend in {Math.floor(resendTimer / 60)}:{(resendTimer % 60).toString().padStart(2, '0')}
  </span>
) : (
  <button
    type="button"
    onClick={resendOtp}
    className="text-xs text-blue-600 hover:underline font-medium flex items-center gap-1"
    disabled={isSubmitting || isResending}
  >
    {isResending ? (
      <>
        <svg className="w-3 h-3 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l5-5-5-5v4a10 10 0 00-10 10h4z"></path>
        </svg>
        Sending...
      </>
    ) : (
      "Resend OTP"
    )}
  </button>
)}

      </div>
    </div>
  </div>
)}

              </div>

              <div className="pt-2">
                {!hasSentOtp ? (
  <button
    type="button"
    onClick={sendOtp}
    disabled={otpSending || isSubmitting}
    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {otpSending ? (
      <>
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Sending...
      </>
    ) : (
      "Send OTP"
    )}
  </button>
) : (
  <button
    type="submit"
    disabled={isSubmitting}
    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {isSubmitting ? (
      <>
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Processing...
      </>
    ) : (
      "Register"
    )}
  </button>
)}

              </div>
            </form>
          )}
        </div>
      </div>

      {isSubmitting && registrationSuccess && (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex flex-col items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
          <p className="mt-4 text-gray-800 text-sm">Redirecting to demo videos...</p>
        </div>
      )}

      <div id="recaptcha-container"></div>
    </div>
  );
};

export default RegisterModal;
