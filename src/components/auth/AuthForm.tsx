
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import GlassCard from "@/components/common/GlassCard";
import { ArrowRight, Mail, Lock, User } from "lucide-react";

interface FormValues {
  fullName?: string;
  email: string;
  password: string;
  rememberMe: boolean;
}

const AuthForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const formType = searchParams.get("type") || "login";
  const isLogin = formType === "login";
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<FormValues>({
    fullName: "",
    email: "",
    password: "",
    rememberMe: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormValues((prev) => ({ ...prev, rememberMe: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success
      toast.success(
        isLogin
          ? "Successfully logged in!"
          : "Account created successfully! Redirecting to dashboard."
      );
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        isLogin
          ? "Invalid credentials. Please try again."
          : "Error creating account. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GlassCard className="w-full max-w-md mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-2">
          {isLogin ? "Welcome back" : "Create an account"}
        </h2>
        <p className="text-muted-foreground">
          {isLogin
            ? "Enter your credentials to access your account"
            : "Enter your information to get started"}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {!isLogin && (
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <User size={18} />
              </div>
              <Input
                id="fullName"
                name="fullName"
                value={formValues.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="pl-10"
                required
              />
            </div>
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Mail size={18} />
            </div>
            <Input
              id="email"
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="pl-10"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Lock size={18} />
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="pl-10"
              required
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              checked={formValues.rememberMe}
              onCheckedChange={handleCheckboxChange}
            />
            <Label htmlFor="rememberMe" className="text-sm cursor-pointer">
              Remember me
            </Label>
          </div>
          {isLogin && (
            <a
              href="#"
              className="text-sm font-medium text-primary hover:underline"
            >
              Forgot password?
            </a>
          )}
        </div>
        <Button
          type="submit"
          className="w-full group"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              {isLogin ? "Sign in" : "Create account"}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
          )}
        </Button>
        <div className="text-center mt-4 text-sm">
          {isLogin ? (
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <a
                href="/auth?type=signup"
                className="font-medium text-primary hover:underline"
              >
                Sign up
              </a>
            </p>
          ) : (
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <a
                href="/auth?type=login"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </a>
            </p>
          )}
        </div>
      </form>
    </GlassCard>
  );
};

export default AuthForm;
