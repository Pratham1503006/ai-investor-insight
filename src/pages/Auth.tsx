
import React from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthForm from "@/components/auth/AuthForm";

const Auth: React.FC = () => {
  const [searchParams] = useSearchParams();
  const formType = searchParams.get("type") || "login";
  const isLogin = formType === "login";
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-background to-accent/30">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-md mx-auto text-center mb-10">
            <h1 className="text-4xl font-bold mb-3">
              {isLogin ? "Welcome Back" : "Join Myrupee"}
            </h1>
            <p className="text-muted-foreground">
              {isLogin
                ? "Access your personalized financial insights"
                : "Create your account and start making smarter investment decisions"}
            </p>
          </div>
          <AuthForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
