"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Home, User, Briefcase, Cpu, FolderCode, Mail } from "lucide-react";

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const pathname = usePathname();
  const isExperience = pathname === '/experience';
  const isSkills = pathname === '/skills';
  const isHome = pathname === '/';
  const isScrollable = isExperience || isSkills;

  return (
    <main className={`w-full box-border flex items-center justify-center bg-white ${isScrollable ? 'min-h-screen' : 'h-screen max-h-screen overflow-hidden'}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname} // Triggers entry animation on route change
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`relative w-[95%] flex flex-col items-center justify-center bg-white ${isScrollable ? 'min-h-[95vh] pt-10 pb-32 border-none shadow-none' : isHome ? 'h-[95vh] bg-white shadow-sm' : 'h-[95vh] shadow-sm'}`}
        >
          {/* Border L Shape with draw animation - Hidden on Experience page */}
          {!isScrollable && (
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
          <div className={`flex flex-col gap-10 items-center w-full ${isScrollable ? 'max-w-none px-0 w-full' : isHome ? 'h-full w-full max-w-none px-0' : 'max-w-5xl px-4 mt-16 mb-24 overflow-y-auto no-scrollbar pb-10'}`}>
            {children}
          </div>

        </motion.div>
      </AnimatePresence>

      {/* Dynamic Nav Menu - Simple Minimalist B/W Dock */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="fixed bottom-6 md:bottom-8 w-full flex justify-center items-center z-50 pointer-events-none"
      >
        <nav className="flex items-center gap-1 md:gap-2 bg-white/95 dark:bg-black/95 px-3 py-2 md:px-4 md:py-2 border border-zinc-200 dark:border-zinc-800 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] rounded-full pointer-events-auto max-w-[92vw] overflow-x-auto no-scrollbar">
          {[
            { name: 'Home', path: '/', icon: Home },
            { name: 'About', path: '/about', icon: User },
            { name: 'Experience', path: '/experience', icon: Briefcase },
            { name: 'Skills', path: '/skills', icon: Cpu },
            { name: 'Projects', path: '/projects', icon: FolderCode },
            { name: 'Contact', path: '/contact', icon: Mail }
          ].map((item, idx) => {
            const isActive = item.path === pathname;
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.path}
                className={`relative flex flex-col items-center justify-center pb-2.5 pt-1.5 px-3.5 md:px-5 text-sm font-medium transition-colors duration-250 group select-none ${
                  isActive
                    ? "text-black dark:text-white"
                    : "text-zinc-400 dark:text-zinc-500 hover:text-black dark:hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Icon className="w-4 h-4 md:w-4.5 md:h-4.5 transition-transform duration-200 group-hover:scale-105" />
                  <span className="hidden md:inline-block font-sans">{item.name}</span>
                </span>
                {isActive && (
                  <motion.span
                    layoutId="active-nav-dot"
                    className="absolute bottom-1 w-1 h-1 bg-black dark:bg-white rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </motion.div>
    </main>
  );
}
