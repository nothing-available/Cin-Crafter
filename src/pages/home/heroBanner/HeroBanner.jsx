import "./style.scss";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/usefetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';


function HeroBanner() {
    const [background, setbackground] = useState("");
    const [query, setquery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);

    const { data, loading } = useFetch("/movie/upcoming");

    useEffect(() => {
        const bg = url.backdrop +
            data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setbackground(bg);
    }, [data]);

    const searchQueryHandler = (e) => {
        if (e.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    };

    return (
        <div className="heroBanner">

            {!loading && <div className="backdrop-img">
                <Img src={background} /></div>}

            <div className='opacity-layer'></div>

            <ContentWrapper>
                <div className="heroBannerContent">

                    <span className="title">Welcome</span>
                    <span className="subTitle">
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>

                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show ..."
                            onKeyUp={searchQueryHandler}
                            onChange={(e) => setquery(e.target.value)}
                        />
                        <button>Search</button>
                    </div>

                </div>
            </ContentWrapper>

        </div>
    );
}


export default HeroBanner;