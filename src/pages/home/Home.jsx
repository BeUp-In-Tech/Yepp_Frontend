import { useEffect, useState } from "react";
import Banner from "../../components/home/Banner";
import Deals from "./deals/Deals";
import SearchDeals from "./deals/search/SearchDeals";

const Home = () => {
    const [searchText, setSearchText] = useState({});

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {

                const location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };

                localStorage.setItem("userLocation", JSON.stringify(location));
            });
        }
    }, []);


    const handleSearch = (value) => {
        setSearchText(value);
    }
    return (
        <div>
            <Banner handleSearch={handleSearch} />
            {
                searchText?.query?.length > 0 || searchText?.zipCode?.length > 0 ? <SearchDeals searchText={searchText} /> : <Deals />
            }
        </div>
    );
};

export default Home;