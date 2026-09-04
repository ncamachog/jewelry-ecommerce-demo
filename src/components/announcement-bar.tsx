const messages = [
  "Complimentary shipping on orders over $150",
  "Free gift wrapping on every order",
  "30-day easy returns",
];

export function AnnouncementBar() {
  return (
    <div className="bg-brand-primary py-2.5 text-center text-[11px] font-medium uppercase tracking-widest text-white">
      <div className="container-page">
        <p>
          {messages.join("  •  ")}
        </p>
      </div>
    </div>
  );
}
