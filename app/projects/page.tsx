export default function Projects() {
  return (
    <div className="flex flex-col items-center gap-6 w-full pt-8 md:pt-0">
      <h1 className="text-4xl md:text-5xl text-black font-semibold tracking-tight text-center relative inline-block mb-4">
        My Selected Projects
        <span className="absolute left-0 -bottom-2 w-full h-[3px] bg-black" />
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-4 max-w-3xl">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i}
              className="border border-black p-6 cursor-pointer group hover:bg-black hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2 group-hover:text-white">Project {i}</h3>
              <p className="text-sm group-hover:text-gray-300">A detailed description of this amazing project showcasing modern web technologies.</p>
            </div>
          ))}
      </div>
    </div>
  );
}
