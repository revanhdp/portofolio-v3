export default function Contact() {
  return (
    <div className="flex flex-col items-center gap-6 pt-8 md:pt-0">
      <h1 className="text-4xl md:text-5xl text-black font-semibold tracking-tight text-center relative inline-block mb-4">
        Get In Touch
        <span className="absolute left-0 -bottom-2 w-full h-[3px] bg-black" />
      </h1>
      <p className="text-black text-xl text-center max-w-xl mx-auto leading-relaxed">
        Based in Indonesia. Always looking forward to building something awesome together. Feel free to drop a message.
      </p>

      <a 
        href="mailto:hello@example.com"
        className="mt-6 px-10 py-4 bg-black text-white font-medium text-lg uppercase tracking-widest transition-all duration-300 transform hover:scale-105 hover:bg-zinc-800 active:scale-95"
      >
        Email Me
      </a>
    </div>
  );
}
