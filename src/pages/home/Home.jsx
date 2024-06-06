import "./style.scss";


import Herobanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";


function Home() {
    return (
        <div className="homePage">
            <Herobanner />
            <Trending />
            <Popular />
            <TopRated />
        </div>
    );
}

export default Home;