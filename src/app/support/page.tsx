export default function SupportPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#181A20] via-[#23242a] to-[#23242a]">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Need Help?</h1>
        <p className="text-lg md:text-2xl font-bold text-white mb-2">
          If you're experiencing any issue, please email
        </p>
        <a
          href="mailto:trenzora@gmail.com"
          className="text-xl md:text-2xl font-extrabold text-[#6c2eb7] underline hover:text-[#7d3eea] transition"
        >
          trenzora@gmail.com
        </a>
        <div className="mt-8">
          <a
            href="/"
            className="inline-block px-8 py-3 rounded-full bg-[#6c2eb7] text-white font-semibold text-lg shadow-lg hover:bg-[#7d3eea] transition"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
