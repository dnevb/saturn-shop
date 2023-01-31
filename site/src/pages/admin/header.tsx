import { T } from "components";
import Logo from "components/logo";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  return (
    <header>
      <nav className="px6 py2.5 flex bg-gray-800 text-white">
        <Link to="/admin" className="flex gap4 items-center select-none">
          <Logo className="h10 w10 text-brand" />
          <T size="h4">Saturn shop</T>
        </Link>
      </nav>
    </header>
  );
};

export default AdminHeader;
