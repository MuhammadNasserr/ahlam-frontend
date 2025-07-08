const darkModeIcon = "/images/lightMood.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";

export const ThemeSwitcher = ({ isDark, setIsDark }) => {
  return (
    <button onClick={() => setIsDark((prev) => !prev)} className={`dark-mode ${isDark && " "}`}>
      {isDark ? (
        <FontAwesomeIcon icon={faMoon} />
      ) : (
        <img width={25} height={24} src={darkModeIcon} alt="dark-mode-icon" />
      )}
    </button>
  );
};
