export default function Home() {
  return (
    <div className="flex flex-col items-center gap-8 text-center pt-8 md:pt-0">
      <h1 className="text-5xl md:text-7xl text-black font-semibold tracking-tight">
        Fullstack Web Developer
      </h1>
      <p className="text-black text-xl text-center max-w-2xl mx-auto leading-relaxed">
        Hello, My Name is <span className="font-semibold relative inline-block text-black group">
          Revanza Hadi Putra
          {/* Subtle decoration effect */}
          <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-black scale-x-100 origin-left" />
        </span>, and people usually call me Revan. Nice to meet you.
      </p>
    </div>
  );
}
