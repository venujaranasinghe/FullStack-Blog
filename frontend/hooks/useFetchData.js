import axios from "axios";

const { useState, useEffect } = require("react");

function useFetchData(apiEndPoint){
    const [alldata, setAlldata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {

        const fetchAllData = async () => {
            if (initialLoad) {
                // Set initialLoad to false to prevent the API call on subsequent renders
                setInitialLoad(false);
                return;
            }

            setLoading(true);

            try{
                const res = await axios.get(apiEndPoint);
                const alldata = res.data;
                setAlldata(alldata);
                setLoading(false); // set loading state to false after data is fetched
            } catch (error) {
                console.error('Error fetching blog data', error.response || error);
                setLoading(false); // set loading false even if there's an error
            }
        };

        // Fetch data only if apiEndPoint is provided
        if (apiEndPoint) {
            fetchAllData();
        }
    }, [initialLoad, apiEndPoint]);

    return { alldata, loading }
}

export default useFetchData;
