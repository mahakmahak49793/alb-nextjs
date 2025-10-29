"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FaAngleDown } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import * as CommonActions from "@/redux/actions/commonActions";

const menuAnimation = {
  hidden: { 
    opacity: 0, 
    height: 0, 
    padding: 0, 
    transition: { duration: 0.3, when: "afterChildren" } 
  },
  show: { 
    opacity: 1, 
    height: "auto", 
    transition: { duration: 0.3, when: "beforeChildren" } 
  },
};

const menuItemAnimation = {
  hidden: (i: number) => ({ 
    padding: 0, 
    x: "-100%", 
    transition: { duration: (i + 1) * 0.1 } 
  }),
  show: (i: number) => ({ 
    x: 0, 
    transition: { duration: (i + 1) * 0.1 } 
  })
};

interface SubRoute {
  path: string;
  name: string;
}

interface Route {
  name: string;
  subRoutes: SubRoute[];
}

interface SidebarMenuProps {
  route: Route;
  showAnimation: {
    hidden: { width: number; opacity: number; transition: { duration: number } };
    show: { opacity: number; width: string; transition: { duration: number } };
  };
}

const SidebarMenu = ({ route, showAnimation }: SidebarMenuProps) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const isSidebarOpen = useAppSelector((state) => state?.commonReducer?.isSidebarOpen);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    dispatch(CommonActions.setIsSidebarOpen(true));
  };

  useEffect(() => {
    if (!isSidebarOpen) {
      setIsMenuOpen(false);
    }
  }, [isSidebarOpen]);

  return (
    <>
      <div 
        className={`
          flex items-center gap-2.5 py-[5px] px-2.5 
          border-r-4 border-transparent my-[5px] mr-2.5 ml-0
          transition-all duration-200 ease-[cubic-bezier(0.6,-0.28,0.735,0.045)] 
          justify-between cursor-pointer
          hover:border-r-4 hover:border-white hover:bg-[#EF4444] hover:text-white 
          hover:rounded-lg hover:rounded-tr-[10px] hover:rounded-br-[10px]
          text-[#716767]
        `}
        onClick={toggleMenu}
      >
        <div className="flex items-center gap-2.5">
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="whitespace-nowrap text-[15.5px] py-0.5"
              >
                {route.name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {isSidebarOpen && (
          <motion.div
            animate={isMenuOpen ? { rotate: -90 } : { rotate: 0 }}
          >
            <FaAngleDown />
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex flex-col"
          >
            {route.subRoutes.map((subRoute, i) => (
              <motion.div variants={menuItemAnimation} key={i} custom={i}>
                <Link
                  href={subRoute.path}
                  className={`
                    flex items-center gap-2.5 py-[5px] px-2.5 pl-5 no-underline 
                    border-r-4 border-transparent my-[5px] mr-2.5 ml-0
                    transition-all duration-200 ease-[cubic-bezier(0.6,-0.28,0.735,0.045)]
                    hover:border-r-4 hover:border-white hover:bg-[#EF4444] hover:text-white 
                    hover:rounded-lg hover:rounded-tr-[10px] hover:rounded-br-[10px]
                    ${pathname === subRoute.path 
                      ? "bg-[#EF4444] text-white border-r-4 border-white rounded-lg rounded-tr-[10px] rounded-br-[10px]" 
                      : "text-[#716767]"
                    }
                  `}
                >
                  <motion.div className="whitespace-nowrap text-[15.5px] py-0.5">
                    {subRoute.name}
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SidebarMenu;