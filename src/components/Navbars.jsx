import React,{useState,useEffect} from 'react'
import logo from '../assets/logo.svg';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectIsAuthenticated, logout } from "../slices/AuthSlice";
import { Menu, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IoIosPower } from "react-icons/io";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge"
import { User, Settings, LogOut } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import api from "../Services/api"
const navItems = [
    { href: '#features', label: 'Features' },
    { href: '#Pricing', label: 'Pricing' },
    { href: '#about', label: 'About' },
    
  ];
function Navbars() {
     const user = useSelector(selectUser);
     const isAuthenticated = useSelector(selectIsAuthenticated);
     const [isSubscribed, setIsSubscribed] = useState(false);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
      const dispatch = useDispatch();
       const navigate = useNavigate();
        const handleLogin = ()=>{
            navigate('/login')
        }
         const handleLogout = async () => {
           dispatch(logout());
           navigate("/")
           localStorage.removeItem('authToken');
           localStorage.removeItem('userInfo');
           
           await new Promise(resolve => setTimeout(resolve, 100)); // Small delay
            navigate("/");
           setMobileMenuOpen(false);
         };
 
         useEffect(() => {
          const fetchUserDetails = async () => {
            try {
              setLoading(true);
              const response = await api.get('/api/users/details');
              
              // Extract the subscribed status from the response
              const { subscribed } = response.data;
              setIsSubscribed(subscribed);
              setLoading(false);
            } catch (err) {
              setError('Failed to fetch user subscription details');
              setLoading(false);
              console.error('Error fetching user details:', err);
            }
          };
      
          fetchUserDetails();
        }, [])
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-[10px]">
        <div className="flex items-center space-x-2  hidden md:flex">
              <Link to={isAuthenticated ? "/dashboard/projects" : "/"}>
                 <img src={logo} alt="Logo" className="h-8  sm:h-10 md:h-7 " />
                
               </Link>
               {!isAuthenticated &&(<nav className="hidden px-5 md:flex items-center space-x-6">
            {navItems.map((item) => item.href.startsWith('/')? (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray transition-colors hover:text-gray-80 font-Poppins"
              >
                {item.label}
              </Link>
            ):(<a
              key={item.label}
              href={item.href}
              className="px-4 py-2 text-gray-700 hover:text-blue-500"
            >
              {item.label}
            </a>))}
          </nav>)}
       
        </div>

        {/* Mobile Menu */}
        <div className="flex w-full items-center justify-between px-4 py-2 md:hidden">
            {/* Logo */}
            <Link to={isAuthenticated ? "/dashboard/home" : "/"}>
                <img src={logo} alt="Logo" className="h-8 sm:h-10" />
            </Link>

            {/* Right side: Auth buttons or User info */}
            {isAuthenticated ? (
                <div className="flex items-center gap-3">
                <div className="flex flex-col items-end text-right">
                
                <div className="flex items-center gap-1">
            
                  <span className="text-lg sm:text-lg text-gray-700 font-semibold font-Poppins truncate max-w-[120px]">
                      {user?.user.name}
                  </span>
                  <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Avatar className="cursor-pointer">
                            <AvatarFallback>{user?.user?.name?.charAt(0)?.toUpperCase()}</AvatarFallback>
                          </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuLabel className="flex justify-start px-5 ">    {isSubscribed ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge 
                            variant="default" 
                            className="text-lg h-7 font-Poppins bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                          >
                            Subscribed
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent className="font-Poppins">
                          <p>You're subscribed! 🎉</p>
                          <p>Expires on: {user?.user.subscriptionExpiry}</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <Badge 
                        variant="secondary" 
                        className="text-lg h-7 font-Poppins bg-gray-500 text-white hover:bg-gray-600 cursor-pointer"
                        onClick={() => navigate('/subscription')}
                      >
                        Demo
                      </Badge>
                    )}</DropdownMenuLabel>
                          <DropdownMenuSeparator  />
                          <DropdownMenuItem asChild onSelect={() => navigate('/profile')}>
                            
                            <span><User className="h-4 w-4" /> Profile Settings</span>  
                            
                          </DropdownMenuItem>
                          <DropdownMenuSeparator /> {/* Added a separator before logout for visual distinction */}
                          <DropdownMenuItem>
                            <Button variant="destructive" onClick={handleLogout} className="w-full justify-start flex items-center gap-2">
                              <LogOut className="h-4 w-4" /> Logout
                            </Button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
              </div>
                    <span className="text-xs text-gray-500 truncate max-w-[120px]">
                    {user?.user.role}
                    </span>
                </div>
            
                </div>
            ) : (
                <Button
                variant="outline"
                onClick={handleLogin}
                className="bg-blue-500 text-white hover:bg-blue-600 shadow-md transition-transform hover:scale-105"
                >
                Sign In
                </Button>
            )}
            </div>

        {/* Desktop CTA Buttons */}
        {isAuthenticated ? (<div className="flex items-center gap-2 sm:gap-4 hidden md:flex">
                    <div className="hidden sm:flex flex-col items-end">
                    <div className="flex items-center gap-8">
                    {isSubscribed ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge 
                            variant="default" 
                            className="text-lg h-7 font-Poppins bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                          >
                            Subscribed
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent className="font-Poppins">
                          <p>You're subscribed! 🎉</p>
                          <p>Expires on: {user?.user.subscriptionExpiry}</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <Badge 
                        variant="secondary" 
                        className="text-lg h-7 font-Poppins bg-gray-500 text-white hover:bg-gray-600 cursor-pointer"
                        onClick={() => navigate('/subscription')}
                      >
                        Demo
                      </Badge>
                    )}
                      <span className="text-sm sm:text-base text-gray-700 font-medium font-Poppins truncate max-w-xs">
                          {user?.user.name}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Avatar className="cursor-pointer">
                            <AvatarFallback>{user?.user?.name?.charAt(0)?.toUpperCase()}</AvatarFallback>
                          </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuLabel>{user?.user?.name}</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild onClick={() => navigate('/profile')}>
                            
                          <span>
                            <User className="h-4 w-4" /> Profile Settings
                          </span>
                            
                          </DropdownMenuItem>
                          <DropdownMenuSeparator /> {/* Added a separator before logout for visual distinction */}
                          <DropdownMenuItem>
                            <Button variant="destructive" onClick={handleLogout} className="w-full justify-start flex items-center gap-2">
                              <LogOut className="h-4 w-4" /> Logout
                            </Button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                     
                    </div>
                    {/* <button 
                      onClick={handleLogout}
                      className="p-1.5 sm:p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                      aria-label="Logout"
                      title="Logout"
                    >
                      <IoIosPower size={18} className="sm:w-5 sm:h-5" />
                    </button> */}
                  </div>):( <div className="hidden flex-1 items-center justify-end space-x-2 md:flex">
          <Button variant="default" onClick={handleLogin} className="bg-blue-500 text-white font-Poppins hover:bg-blue-600">
            SignIn
          </Button>
          
        </div>)}
       
      </div>
    </header>
  )
}

export default Navbars
