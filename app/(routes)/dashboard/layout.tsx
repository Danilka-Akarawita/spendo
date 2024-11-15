"use client";
import React, { ReactNode, useEffect } from "react";
import SideNav from "./_components/sideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { useUser } from "@clerk/nextjs";
import prisma from "@/prisma/client";
import { useRouter } from "next/navigation";

interface DashboardLayoutProps {
  children: ReactNode;
}

const Layout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      const fetchUserBudget = async () => {
        const response = await fetch(
          `/api/user/${user.primaryEmailAddress?.emailAddress}`
        );
        const data = await response.json();
        //console.log(data);
        if (data == null) {
          router.replace("/dashboard/budgets");
        }
      };

      fetchUserBudget();
    }
  }, [user]);

  return (
    <div>
      <div className="fixed md:w-64 hidden md:block ">
        <SideNav />
      </div>
      <div className="md:ml-64 b">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
};

export default Layout;
