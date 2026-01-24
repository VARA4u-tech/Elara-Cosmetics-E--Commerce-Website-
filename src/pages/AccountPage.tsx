import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";

const AccountPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: isLogin ? "Login" : "Register" }]} />
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-md mx-auto">
          {/* Tabs */}
          <div className="flex border-b border-border mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={cn(
                "flex-1 py-4 text-sm uppercase tracking-luxury font-medium transition-colors",
                isLogin 
                  ? "border-b-2 border-primary text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={cn(
                "flex-1 py-4 text-sm uppercase tracking-luxury font-medium transition-colors",
                !isLogin 
                  ? "border-b-2 border-primary text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      className="w-full pl-10 pr-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91"
                  className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-primary"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 border border-border bg-background text-sm focus:outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full pl-10 pr-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-primary" />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>
            )}

            <button type="submit" className="btn-luxury w-full">
              {isLogin ? "Login" : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-4 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 border border-border hover:border-primary transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-border hover:border-primary transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-sm">Facebook</span>
            </button>
          </div>

          {/* Benefits */}
          <div className="mt-12 p-6 bg-secondary/30">
            <h3 className="font-serif text-lg mb-4 text-center">Member Benefits</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Exclusive early access to new launches
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Birthday rewards and special offers
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Track orders and manage addresses
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Faster checkout experience
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountPage;