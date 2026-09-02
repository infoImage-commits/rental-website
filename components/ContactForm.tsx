"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import { useSubmitContact } from "@/lib/hooks/useContact";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export default function ContactForm({ defaultSubject = "" }: { defaultSubject?: string }) {
  const shouldReduceMotion = useReducedMotion();
  const viewport = { once: true, amount: 0.2 };

  const { mutate: submitContact, isPending } = useSubmitContact();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: defaultSubject,
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === "error") setStatus("idle");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("idle");

    submitContact(formData, {
      onSuccess: (res) => {
        if (res.isSuccess) {
          setStatus("success");
          setFormData({ name: "", email: "", phone: "", subject: defaultSubject, message: "" });
        } else {
          setStatus("error");
          setErrorMessage(res.errors?.[0] ?? res.message ?? "Something went wrong. Please try again.");
        }
      },
      onError: () => {
        setStatus("error");
        setErrorMessage("Network error. Please check your connection and try again.");
      },
    });
  }

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : fadeUp}
      initial={shouldReduceMotion ? undefined : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={viewport}
      className="min-w-0 w-full"
    >
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
            className="flex min-h-[440px] flex-col items-center justify-center gap-6 rounded-2xl border border-[#c4dfd4] bg-[#f5f7f6] px-6 py-12 text-center shadow-[0_8px_24px_rgba(31,77,61,0.06)] sm:px-8"
          >
            <motion.div
              initial={shouldReduceMotion ? undefined : { scale: 0.86 }}
              animate={shouldReduceMotion ? undefined : { scale: 1 }}
              className="grid size-20 place-items-center rounded-full bg-[#2e6f57] shadow-lg"
            >
              <svg className="size-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </motion.div>
            <div>
              <h2 className="text-[24px] font-semibold text-[#183c2f] lg:text-[30px]">Message Sent</h2>
              <p className="mt-2 max-w-[420px] text-[14px] leading-7 text-[#667c74] lg:text-[16px]">
                Thank you for reaching out. Our team will review your message and get back to you as soon as possible.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-[#2e6f57] px-6 text-[14px] font-semibold text-[#2e6f57] transition hover:bg-[#2e6f57] hover:text-white"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            variants={shouldReduceMotion ? undefined : container}
            initial={shouldReduceMotion ? undefined : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
            className="rounded-2xl border border-[#e0eae5] bg-white p-5 shadow-[0_8px_24px_rgba(31,77,61,0.06)] sm:p-7 lg:p-8"
          >
            <AnimatePresence>
              {status === "error" && (
                <motion.div
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                  className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
                >
                  <svg className="mt-0.5 size-5 shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  <p className="text-[13px] leading-5 text-red-700">{errorMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={container} className="grid gap-5 sm:grid-cols-2">
              <ContactInput label="Your Name" id="contact-name" name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" />
              <ContactInput label="Email Address" id="contact-email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Your email address" />
              <ContactInput label="Phone Number" id="contact-phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Your phone number" />
              <ContactInput label="Subject" id="contact-subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="How can we help?" />

              <motion.div variants={fadeUp} className="flex flex-col gap-2 sm:col-span-2">
                <label htmlFor="contact-message" className="text-[13px] font-semibold text-[#183c2f]">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows={5}
                  className="min-h-[150px] resize-y rounded-xl border border-[#c0c8c6] px-4 py-3 text-[14px] leading-6 text-[#183c2f] outline-none transition placeholder:text-[#aab4b0] focus:border-[#2e6f57] focus:ring-2 focus:ring-[#2e6f57]/10"
                />
              </motion.div>

              <motion.div variants={fadeUp} className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-[#2e6f57] px-6 py-3 text-[15px] font-semibold text-white shadow-md transition hover:bg-[#255f49] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isPending ? (
                    <>
                      <span className="size-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Image src="/contact/icons/send.svg" alt="" width={16} height={14} className="h-[14px] w-4" />
                    </>
                  )}
                </button>
              </motion.div>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ContactInput({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <motion.div variants={fadeUp} className="flex min-w-0 flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-semibold text-[#183c2f]">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        id={id}
        type={type}
        name={name}
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-12 rounded-xl border border-[#c0c8c6] px-4 text-[14px] text-[#183c2f] outline-none transition placeholder:text-[#aab4b0] focus:border-[#2e6f57] focus:ring-2 focus:ring-[#2e6f57]/10 lg:h-[52px]"
      />
    </motion.div>
  );
}
