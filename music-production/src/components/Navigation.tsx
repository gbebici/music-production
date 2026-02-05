import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass-nav py-3" : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <button
          onClick={() => scrollToSection("hero")}
          className="font-bold text-lg tracking-tight text-foreground cursor-pointer hover:text-primary transition-colors"
        >
          GABRIEL BEBICI
        </button>

        <div className="hidden md:flex items-center gap-8">
          {["About", "Work", "Process","References","Contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="font-mono text-xs tracking-wider text-muted-foreground cursor-pointer hover:text-foreground transition-colors uppercase"
            >
              {item}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollToSection("contact")}
          className="hidden md:block font-mono text-xs tracking-wider cursor-pointer px-5 py-2.5 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded uppercase"
        >
          Start Project
        </button>
      </div>
    </motion.nav>
  );
};

export default Navigation;
