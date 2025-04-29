
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Placeholder for auth state

  // Temporary login/logout toggle for demo
  const toggleLogin = () => setIsLoggedIn(!isLoggedIn);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="font-bold text-2xl bg-gradient-to-r from-wonder-600 to-learn-600 bg-clip-text text-transparent">
            WonderLearn
          </div>
        </Link>

        {isMobile ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>

            {isOpen && (
              <div className="fixed inset-0 top-16 bg-white z-40 p-4">
                <nav className="flex flex-col space-y-4">
                  <Link
                    to="/"
                    className="px-4 py-2 hover:bg-muted rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/exams"
                    className="px-4 py-2 hover:bg-muted rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Exams
                  </Link>
                  {isLoggedIn && (
                    <Link
                      to="/dashboard"
                      className="px-4 py-2 hover:bg-muted rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link
                    to="/pricing"
                    className="px-4 py-2 hover:bg-muted rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Pricing
                  </Link>
                  <div className="pt-4 border-t">
                    {isLoggedIn ? (
                      <>
                        <Button
                          onClick={() => {
                            toggleLogin();
                            setIsOpen(false);
                          }}
                          className="w-full mb-2"
                          variant="outline"
                        >
                          Log Out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => {
                            toggleLogin();
                            setIsOpen(false);
                          }}
                          className="w-full mb-2"
                          variant="outline"
                        >
                          Log In
                        </Button>
                        <Link to="/signup" onClick={() => setIsOpen(false)}>
                          <Button className="w-full button-gradient">Sign Up</Button>
                        </Link>
                      </>
                    )}
                  </div>
                </nav>
              </div>
            )}
          </>
        ) : (
          <>
            <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/exams" className="text-foreground hover:text-primary transition-colors">
                Exams
              </Link>
              {isLoggedIn && (
                <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              )}
              <Link to="/pricing" className="text-foreground hover:text-primary transition-colors">
                Pricing
              </Link>
            </nav>

            <div className="hidden lg:flex items-center space-x-4">
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-full h-10 w-10 p-0 border-2">
                      <span>S</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={toggleLogin}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button variant="ghost" onClick={toggleLogin}>
                    Log In
                  </Button>
                  <Button className="button-gradient">
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
