"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (user) {
      if (user.role === "school") router.push("/school-dashboard");
      else if (user.role === "psychologist") router.push("/psych-dashboard");
    }
  }, [user, router]);

  return (
    <div>
      {/* login form */}
    </div>
  );
}