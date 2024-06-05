import { useEffect, useState } from "react";
import "./style.scss";
import { useLocation, useNavigate } from "react-router-dom";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";

function Header() {

    const [show, setshow] = useState("top");
    const [lastScrolly, setlastScrolly] = useState(0);
    const [mobileMenu, setmobileMenu] = useState(false);
    const [query, setquery] = useState("");
    const [showSearch, setshowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const controlNavbar = () => {
        // console.log(window.scrolly);
        if (window.scrolly > 200) {
            if (window.scrolly > lastScrolly && !mobileMenu) {
                setshow("hide");
            } else {
                setshow("show");
            }
        } else {
            setshow("top");
        }
        setlastScrolly(window.scrolly);
    };

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrolly]);

    const openSearch = () => {
        setmobileMenu(false);
        setshowSearch(true);
    };
    const openMobileMenu = () => {
        setmobileMenu(true);
        setshowSearch(false);
    };

    const navigationHandler = (type) => {
        if (type === "movie") {
            navigate("/explore/movie");
        } else {
            navigate("/explore/tv");
        }
        setmobileMenu(false);
    };

    const searchQueryHandler = (e) => {
        if (e.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
            setTimeout(() => {
                setshowSearch(false);
            }, 1000);
        }
    };

    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""}${show}`}>
            <ContentWrapper>
                <div className="logo" onClick={() => navigate("/")}>
                    <img src={logo} alt="" />
                </div>

                <ul className="menuItems">
                    <li
                        className="menuItem"
                        onClick={() => navigationHandler("movie")}>
                        Movies
                    </li>

                    <li
                        className="menuItem"
                        onClick={() => navigationHandler("tv")}>
                        TV Shows
                    </li>

                    <li className="menuItem">
                        <HiOutlineSearch onClick={openSearch} />
                    </li>
                </ul>

                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearch} />
                    {mobileMenu ? (<VscChromeClose onClick={() => setmobileMenu(false)} />) : (<SlMenu onClick={openMobileMenu} />)}
                </div>
            </ContentWrapper>

            {showSearch && (<div className="searchBar">
                <ContentWrapper>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show ..."
                            onKeyUp={searchQueryHandler}
                            onChange={(e) => setquery(e.target.value)}
                        />
                        <VscChromeClose onClick={() => setshowSearch(false)} />
                    </div>
                </ContentWrapper>
            </div>)}

        </header>

    );
}

export default Header;