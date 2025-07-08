import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const HeaderLink = ({ path, content }) => {
  const { pathname } = useLocation();
  // console.log({ path, content });
  return (
    <Link className={`nav-link ${pathname === path ? "active" : ""}`} to={path}>
      {content}
    </Link>
  );
};

export default HeaderLink;
