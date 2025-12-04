import React, { useState } from "react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error" | null

  const validateEmail = (value) => {
    return /\S+@\S+\.\S+/.test(value);
  };

  const handleSubscribe = async () => {
    if (!email.trim()) {
      setStatus("error");
      return;
    }
    if (!validateEmail(email)) {
      setStatus("error");
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      // Simulate API request — replace with your backend call
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 pt-12 pb-16 bg-gradient-to-b from-white to-gray-50 px-4">
      <h1 className="md:text-4xl text-3xl font-bold text-gray-900">
        Subscribe now & get 20% off
      </h1>

      <p className="md:text-base text-gray-600 pb-4 max-w-lg">
        Join our community and be the first to know about new products and exclusive offers.
      </p>

      <div
        className="flex items-center max-w-2xl w-full md:h-14 h-12 shadow-lg rounded-lg overflow-hidden"
        role="form"
      >
        <input
          className="border-2 border-gray-200 h-full outline-none w-full px-4 text-gray-700 focus:border-orange-500 transition-colors"
          type="email"
          aria-label="Email address"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setStatus(null);
          }}
        />

        <button
          onClick={handleSubscribe}
          disabled={loading}
          className={`md:px-14 px-10 h-full text-white font-semibold whitespace-nowrap transition-colors 
            ${loading ? "bg-orange-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"}`}
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </div>

      {/* Status Messages */}
      {status === "success" && (
        <p className="text-green-600 font-medium">🎉 You’re subscribed successfully!</p>
      )}

      {status === "error" && (
        <p className="text-red-500 font-medium">Please enter a valid email.</p>
      )}
    </div>
  );
};

export default NewsLetter;
