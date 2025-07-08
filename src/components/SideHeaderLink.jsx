import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const SideHeaderLink = ({ path, content }) => {
  const { pathname } = useLocation();
  // console.log({ path, content });
  return (
    <Link
      className={`nav-link ${pathname === path ? "side-active" : ""}`}
      style={{ borderRadius: "12px" }}
      to={path}
    >
      {content}
    </Link>
  );
};

export default SideHeaderLink;
