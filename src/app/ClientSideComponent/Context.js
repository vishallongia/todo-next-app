"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { myProfile } from "../../../services/UserService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "../ServerComponent/Loader";
const AppContext = createContext();
export const AppWrapper = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const contextValue = { user, setUser, isAuthenticated, setIsAuthenticated };
  const router = useRouter();
  const pathname = usePathname();

  const openRoutes = [
    {
      name: "Welcome Page",
      path: "/",
    },
  ];

  useEffect(() => {
    const fetchMyProfile = async () => {
      const response = await myProfile();
      if (response.status === 200) {
        router.push("/home");
        setUser(response.user);
        setIsLoading(false);
      } else {
        if (pathname === "/" || pathname === "/register" ) {
          setIsLoading(false);
        } else {
          router.push("/login");
          toast.error(response.message);
          setUser("");
          setIsLoading(false);
        }
      }
    };

    fetchMyProfile();
  }, [pathname,router]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <AppContext.Provider value={contextValue}>
          {children}
        </AppContext.Provider>
      )}
    </>
  );
};

export function UseAppContext() {
  return useContext(AppContext);
}
