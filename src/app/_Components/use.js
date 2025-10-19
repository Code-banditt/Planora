"use client";

import React, { useState } from "react";

export default function FAQ() {
  const [faq, setFaq] = useState([
    {
      question: "How do I create a Planora account?",
      answer:
        'Click on the <a href="/signup" class="text-blue-600 transition-all duration-200 hover:underline">Sign Up</a> button and follow the quick steps. You can register using your email or continue with Google for faster access.',
      open: false,
    },
    {
      question: "How do I book a professional?",
      answer:
        'Search for the service you need (e.g. dentist, fitness coach, photographer), browse verified profiles, and click <span class="font-semibold">“Book Now”</span>. You can view availability and confirm in seconds.',
      open: false,
    },
    {
      question: "What payment methods does Planora accept?",
      answer:
        'We accept credit/debit cards, PayPal, and other secure online payment methods. Your details are protected with <span class="font-semibold">end-to-end encryption</span> for safety.',
      open: false,
    },
    {
      question: "Can I cancel or reschedule a booking?",
      answer:
        'Yes. Simply go to your <a href="/dashboard" class="text-blue-600 transition-all duration-200 hover:underline">dashboard</a>, select the booking, and choose <span class="font-semibold">Cancel</span> or <span class="font-semibold">Reschedule</span>. Please note that cancellation policies may vary by professional.',
      open: false,
    },
    {
      question: "How can I contact Planora support?",
      answer:
        'You can reach our team 24/7 via the <a href="/support" class="text-blue-600 transition-all duration-200 hover:underline">Help Center</a> or email us at <span class="font-semibold">support@planora.com</span>. We’re here to help!',
      open: false,
    },
  ]);

  const toggleFaq = (index) => {
    setFaq(
      faq.map((item, i) => {
        if (i === index) {
          item.open = !item.open;
        } else {
          item.open = false;
        }
        return item;
      })
    );
  };

  return (
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
            Everything you need to know about using Planora
          </p>
        </div>

        <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
          {faq.map((item, index) => (
            <div
              key={index}
              className="transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50 rounded-lg"
            >
              <button
                type="button"
                className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                onClick={() => toggleFaq(index)}
              >
                <span className="flex text-lg font-semibold text-black">
                  {item.question}
                </span>
                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform ${
                    item.open ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`${
                  item.open ? "block" : "hidden"
                } px-4 pb-5 sm:px-6 sm:pb-6 text-gray-600`}
              >
                <p dangerouslySetInnerHTML={{ __html: item.answer }}></p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-600 text-base mt-9">
          Didn’t find the answer you were looking for?{" "}
          <a
            href="/support"
            className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline"
          >
            Contact our support
          </a>
        </p>
      </div>
    </section>
  );
}
