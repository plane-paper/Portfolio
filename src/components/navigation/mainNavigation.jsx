import { motion } from 'framer-motion';

const MainNavigation = ({ onNavigate }) => {
  const navItems = ['intro', 'work', 'about', 'contact'];
  
  return (
    <motion.nav
      variants={{
        hidden: { y: 30, opacity: 0 },
        visible: { 
          y: 0, 
          opacity: 1,
          transition: { 
            duration: 0.6,
            ease: "easeOut",
            delay: 1.9,
            staggerChildren: 0.1,
            delayChildren: 0.2
          }
        },
        exit: { 
          y: -30, 
          scale: 0.95,
          opacity: 0,
          transition: { duration: 0.4 }
        }
      }}
      className="border border-white rounded inline-flex overflow-hidden"
    >
      {navItems.map((item, idx) => (
        <motion.button
          key={item}
          variants={{
            hidden: { scale: 0, opacity: 0 },
            visible: { 
              scale: 1, 
              opacity: 1,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 17
              }
            }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate(item)}
          className={`px-4 md:px-6 py-3 text-xs md:text-sm uppercase tracking-wider hover:bg-white/10 transition-all duration-300 ${
            idx < navItems.length - 1 ? 'border-r border-white' : ''
          }`}
        >
          {item === 'work' ? 'Projects' : item === 'about' ? 'Resume' : item.charAt(0).toUpperCase() + item.slice(1)}
        </motion.button>
      ))}
    </motion.nav>
  );
};

export default MainNavigation;