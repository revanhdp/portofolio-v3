"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const pathname = usePathname();
  const isExperience = pathname === '/experience';

  return (
    <main className={`bg-white w-full ${isExperience ? 'min-h-screen' : 'h-screen max-h-screen overflow-hidden'} box-border flex items-center justify-center`}>
      <AnimatePresence mode="wait">
        <motion.div 
          key={pathname} // Triggers entry animation on route change
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`relative w-[95%] flex flex-col items-center justify-center bg-white ${!isExperience ? 'h-[95vh] shadow-sm' : 'min-h-[95vh] pt-10 pb-32 border-none shadow-none'}`}
        >
          {/* Border L Shape with draw animation - Hidden on Experience page */}
          {!isExperience && (
            <>
              <motion.span 
                initial={{ width: 0, height: 0 }}
                animate={{ width: 40, height: 40 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="absolute top-0 left-0 border-t-2 border-l-2 border-black" 
              />
              <motion.span 
                initial={{ width: 0, height: 0 }}
                animate={{ width: 40, height: 40 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="absolute top-0 right-0 border-t-2 border-r-2 border-black" 
              />
              <motion.span 
                initial={{ width: 0, height: 0 }}
                animate={{ width: 40, height: 40 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="absolute bottom-0 left-0 border-b-2 border-l-2 border-black" 
              />
              <motion.span 
                initial={{ width: 0, height: 0 }}
                animate={{ width: 40, height: 40 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="absolute bottom-0 right-0 border-b-2 border-r-2 border-black" 
              />
            </>
          )}

          {/* Individual Page Content */}
          <div className={`flex flex-col gap-10 items-center w-full max-w-5xl px-4 ${isExperience ? 'w-full' : 'mt-16 mb-24 overflow-y-auto no-scrollbar pb-10'}`}>
            {children}
          </div>

        </motion.div>
      </AnimatePresence>

      {/* Dynamic Nav Menu - Now fixed to viewport so it stays comfortable when scrolling long content */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="fixed bottom-8 md:bottom-12 w-full flex justify-center items-center z-50 pointer-events-none"
      >
        <ul className="flex flex-wrap justify-center gap-6 md:gap-16 bg-white/70 backdrop-blur-md px-10 py-4 border border-zinc-200 pointer-events-auto">
          {[
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
            { name: 'Experience', path: '/experience' },
            { name: 'Projects', path: '/projects' },
            { name: 'Contact', path: '/contact' }
          ].map((item, idx) => (
            <li key={idx}>
              <Link 
                href={item.path} 
                className="text-black text-lg md:text-xl font-medium relative group inline-block"
              >
                {/* Magnetic-like effect on hover */}
                <motion.div
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="inline-block"
                >
                  {item.name}
                </motion.div>
                <span 
                  className={`absolute left-0 -bottom-2 w-full h-[2px] bg-black origin-left transition-transform duration-300 ease-out ${
                    item.path === pathname ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} 
                />
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </main>
  );
}
