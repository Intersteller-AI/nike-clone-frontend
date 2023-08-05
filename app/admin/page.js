"use client";
import { useEffect } from "react";
import { Dashboard, Sidebar } from "../components";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Page() {
  const { userInfo } = useSelector((state) => state.user);
  useEffect(() => {
    if (!userInfo?.admin) {
      toast.error("Not Authorized!");
      redirect("/");
    }
  });
  return (
    <div className="h-screen flex lg:flex-row flex-col">
      <Sidebar />
      <Dashboard />
    </div>
  );
}
