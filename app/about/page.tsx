export default function About() {
  return (
    <div className="flex flex-col items-center gap-6 pt-8 md:pt-0">
      <h1 className="text-4xl md:text-5xl text-black font-semibold tracking-tight text-center relative inline-block">
        About Me
        <span className="absolute left-0 -bottom-2 w-full h-[3px] bg-black" />
      </h1>
      <p className="text-black text-lg md:text-xl text-center max-w-2xl mx-auto leading-relaxed mt-4">
        I am a passionate <span className="font-semibold">Fullstack Web Developer</span> with a strong desire to create intuitive and high-performance digital solutions. With expertise in Next.js, React, and backend technologies, I bring ideas to life.
      </p>
    </div>
  );
}
