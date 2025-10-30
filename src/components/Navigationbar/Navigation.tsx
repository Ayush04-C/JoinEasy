import { BookOpen, LogOut, Menu, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import SplitText from "../../animations/SplitText";

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};



// Navigation Component
const Navigation = () => {
  const { currentUser, logout, showMobileMenu, setShowMobileMenu } = useApp();

  return (
    <nav className=" shadow-sm text-left rounded-full" style={{background:' linear-gradient(135deg, #230944ff 0%, #070215ff 100%)'}}>
      <div className=" mx-auto px-4 text-left sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex justify-start items-center space-x-3">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <div className='flex flex-row justify-start items-center'>
              <h1 className="text-xl text-left font-bold bg-gradient-to-tr from-pink-400 to-yellow-400 bg-clip-text text-transparent">Assignment Hub</h1>
              <p className="text-xl translate-y-3 translate-x-70 bg-gradient-to-tr from-pink-400 to-yellow-400 bg-clip-text text-transparent">
                {currentUser?.role === 'admin' ? `Professor's Dashboard` : `Student's Dashboard`}
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-white">
                <SplitText
                  text={`Hello, ${currentUser.role == 'admin' ? currentUser?.name : currentUser?.name.split(' ')[0]} `}
                  className="text-2xl font-semibold text-center"
                  delay={100}
                  duration={0.6}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center"
                  onLetterAnimationComplete={handleAnimationComplete}
                />
              </p>
              <p className="text-s text-white">{currentUser?.email}</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>

          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {showMobileMenu && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            <div className="pb-3 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
              <p className="text-xs text-gray-500">{currentUser?.email}</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;