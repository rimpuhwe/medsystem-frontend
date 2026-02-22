import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userInitials, setUserInitials] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const savedProfile = localStorage.getItem('doctorProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      const initials = profile.fullName.split(' ').map((n: string) => n[0]).join('');
      setUserInitials(initials);
    }
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('userPassword');
    localStorage.removeItem('securitySettings');
    localStorage.removeItem('doctorProfile');
    console.log('Signed out successfully!');
    window.location.reload();
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="ml-12 lg:ml-0">
          <h1 className="text-lg lg:text-xl font-semibold text-gray-900">Medical Dashboard</h1>
          <p className="text-sm text-gray-600 hidden sm:block">Manage Prescriptions And Patient Records</p>
        </div>
        <div ref={dropdownRef} className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium">
              {userInitials}
            </div>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <button 
                onClick={() => { router.push('/doctor/profile'); setIsDropdownOpen(false); }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
              >
                <User className="w-4 h-4" />
                Profile
              </button>
              <button 
                onClick={() => { router.push('/doctor/settings'); setIsDropdownOpen(false); }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <hr className="my-2" />
              <button 
                onClick={handleSignOut}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-red-600"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Header;