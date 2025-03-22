
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCard from "@/components/common/GlassCard";
import { CheckCircle, ArrowRight, TrendingUp, BarChart4, Calculator, Sparkles, Award, Shield } from "lucide-react";

const Index: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    const elements = document.querySelectorAll(".section-fade-in");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const features = [
    {
      icon: <Sparkles className="h-6 w-6 text-primary" />,
      title: "AI-Powered Insights",
      description:
        "Get personalized investment advice based on your financial goals and risk tolerance.",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      title: "Real-time Market Data",
      description:
        "Access up-to-date market information and stock prices to make informed decisions.",
    },
    {
      icon: <BarChart4 className="h-6 w-6 text-primary" />,
      title: "Interactive Visualizations",
      description:
        "View your portfolio performance and market trends through intuitive charts and graphs.",
    },
    {
      icon: <Calculator className="h-6 w-6 text-primary" />,
      title: "Tax Optimization",
      description:
        "Understand tax implications and optimize your investments for tax efficiency.",
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Regulatory Compliance",
      description:
        "Stay informed about market regulations and ensure your investments are compliant.",
    },
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: "Premium Experience",
      description:
        "Enjoy a seamless, intuitive interface designed specifically for retail investors.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background to-accent/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 animate-fade-in">
              <h1 className="text-balance font-bold tracking-tight mb-6">
                <span className="text-4xl sm:text-5xl md:text-6xl block mb-2">Make Smarter</span>
                <span className="text-4xl sm:text-5xl md:text-6xl block mb-2">Investment Decisions</span>
                <span className="text-4xl sm:text-5xl md:text-6xl block text-primary">With AI</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl">
                FinSight helps retail investors navigate financial markets with
                AI-powered insights, tax optimization, and interactive visualizations.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/auth?type=signup">
                  <Button size="lg" className="group">
                    Get Started
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="lg" variant="outline">
                    View Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl border border-primary/30 animate-pulse-soft"></div>
                <GlassCard className="w-full h-full">
                  <div className="p-4">
                    <img 
                      src="https://images.unsplash.com/photo-1642790551116-304f69394d9c?q=80&w=800&auto=format&fit=crop" 
                      alt="Dashboard visualization" 
                      className="rounded-lg w-full h-auto object-cover shadow-lg"
                    />
                    <div className="mt-6 space-y-4">
                      <div className="h-6 bg-muted rounded-full w-3/4"></div>
                      <div className="h-4 bg-muted rounded-full w-full"></div>
                      <div className="h-4 bg-muted rounded-full w-5/6"></div>
                      <div className="h-10 bg-primary rounded-lg w-1/3 mt-6"></div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 section-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Everything You Need to Make Informed Decisions
            </h2>
            <p className="text-xl text-muted-foreground">
              Our platform combines cutting-edge AI technology with financial
              expertise to help you navigate the complex world of investing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <GlassCard
                key={index}
                className="h-full hover:shadow-xl transition-all duration-300"
                hoverable
              >
                <div className="p-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-accent/30 section-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Trusted by Investors
            </h2>
            <p className="text-xl text-muted-foreground">
              Hear from our users who have transformed their investment approach
              with FinSight.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <GlassCard key={item} hoverable>
                <div className="p-6">
                  <div className="flex items-center text-finance-yellow mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-star"
                      >
                        <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mb-6 italic">
                    "{item === 1
                      ? "FinSight has completely changed how I approach investing. The AI advisor helped me optimize my portfolio and I've seen a 15% increase in returns."
                      : item === 2
                      ? "The tax optimization features alone saved me thousands last year. The intuitive interface makes complex financial data easy to understand."
                      : "As a beginner investor, I was overwhelmed by the market. FinSight's personalized guidance has given me confidence and helped me build a strong portfolio."}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-secondary mr-4"></div>
                    <div>
                      <div className="font-medium">
                        {item === 1
                          ? "Sarah Johnson"
                          : item === 2
                          ? "Michael Chen"
                          : "Emily Rodriguez"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item === 1
                          ? "Tech Professional"
                          : item === 2
                          ? "Small Business Owner"
                          : "Freelance Designer"}
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 section-fade-in">
        <div className="container mx-auto px-4">
          <GlassCard className="max-w-5xl mx-auto">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Transform Your Investment Strategy?
                  </h2>
                  <p className="text-xl text-muted-foreground mb-6 md:mb-0">
                    Join thousands of investors making smarter decisions with AI.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Link to="/auth?type=signup">
                    <Button size="lg" className="min-w-40">
                      Get Started Free
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button size="lg" variant="outline" className="min-w-40">
                      Explore Demo
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
