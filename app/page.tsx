import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-white w-full h-screen max-h-screen overflow-hidden box-border flex items-center justify-center">
        <div className="relative w-[95%] h-[95%] flex items-center justify-center shadow-[inset_0_0_0_2px_white]">

          {/* Border L Shape */}
          <span className="absolute top-0 left-0 w-10 h-10 border-t border-l border-black" />
          <span className="absolute top-0 right-0 w-10 h-10 border-t border-r border-black" />
          <span className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-black" />
          <span className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-black" />

          <h1 className="text-3xl text-black font-bold">My Portfolio</h1>
        </div>  
    </main>
  );
}
