import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
interface UserContextProps {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  profileImage: string | null;
  token: string | null;
  setUser: (user: {
    _id: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    token: string | null;
    profileImage: string | null;
  }) => void;
}

const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();

  const router = useRouter();
  const [user, setUser] = useState<{
    _id: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    profileImage: string | null;
    token: string | null;
  }>({
    _id: "",
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    profileImage: null,
    token: null,
  });

  useEffect(() => {
    if (session && status === "authenticated") {
      console.log("Session is available");

      console.log("User", session.user);
      console.log("Session", session);
      setUser({
        _id: session.user._id,
        firstName: session.user?.name?.split(" ")[0] || "",
        lastName: session.user?.name?.split(" ")[1] || "",
        role: session.user.role,
        email: session.user.email,
        profileImage: session.user.image || null,
        token: session.accessToken || localStorage.getItem("token"),
      });

      if (session.user.role === "Aviator") {
        router.push("/");
      } else if (session.user.role === "Admin") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } else {
      console.log("No session");
    }
  }, [session, router]);

  useEffect(() => {
    if (user._id) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", user.token || "");
    }
  }, [user]);

  return <UserContext.Provider value={{ ...user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
