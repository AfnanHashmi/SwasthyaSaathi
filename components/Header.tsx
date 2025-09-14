'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Shield, Menu, X, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  useEffect(() => {
    const checkAdminStatus = () => {
      const adminSession = sessionStorage.getItem('adminAuthenticated');
      setIsAdmin(adminSession === 'true');
    };

    checkAdminStatus();
    const interval = setInterval(checkAdminStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    setIsAdmin(false);
    window.location.href = '/';
  };

  return (
    <header className="bg-white shadow-lg tricolor-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="bg-gradient-to-br from-orange-500 to-green-600 p-2 rounded-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">SwasthyaSaathi</h1>
              <p className="text-sm text-gray-600">AI Driven Health Monitoring</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-orange-100 text-orange-700"
                    : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                )}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Admin Section */}
            <div className="ml-4 flex items-center space-x-2">
              {isAdmin ? (
                <div className="flex items-center space-x-2">
                  <Link href="/admin">
                    <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-50">
                      Admin Panel
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Link href="/login">
                  <Button variant="outline" size="sm" className="border-orange-500 text-orange-600 hover:bg-orange-50">
                    Admin Login
                  </Button>
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-orange-100 text-orange-700"
                      : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 border-t">
                {isAdmin ? (
                  <div className="flex flex-col space-y-2">
                    <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full border-green-600 text-green-600">
                        Admin Panel
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleLogout}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full border-orange-500 text-orange-600">
                      Admin Login
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}