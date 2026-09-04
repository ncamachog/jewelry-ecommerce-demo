import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact Us — Valkiria" };

export default function ContactPage() {
  return (
    <div className="container-page max-w-xl py-16 md:py-24">
      <h1 className="font-serif text-3xl text-brand-primary md:text-4xl">Contact Us</h1>
      <p className="mt-4 text-sm leading-relaxed text-brand-muted md:text-base">
        Questions about an order, sizing, or a custom request? Send us a note and we&rsquo;ll
        get back to you within one business day.
      </p>
      <form className="mt-10 space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <input
            placeholder="Name"
            className="border border-gray-300 px-4 py-3 text-sm outline-none focus:border-brand-primary"
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 px-4 py-3 text-sm outline-none focus:border-brand-primary"
          />
        </div>
        <input
          placeholder="Subject"
          className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-brand-primary"
        />
        <textarea
          placeholder="Message"
          rows={5}
          className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-brand-primary"
        />
        <button type="submit" className="btn-primary">
          Send Message
        </button>
      </form>
    </div>
  );
}
