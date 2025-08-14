import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-6 max-w-7xl mx-auto">
      {/* Left side - App Name */}
      <div className="flex-1">
        <a className="text-2xl font-bold tracking-tight">Think Board</a>
      </div>

      {/* Right side - New Note button */}
      <div className="flex-none">
        <Link to="/create" className="btn btn-primary gap-2">
          <Plus size={18} />
          New Note
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
