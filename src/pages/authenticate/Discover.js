import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAPIData } from "../../utils/getAPIData";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { PageTrafficTable } from "../../components/Tables";

const Discover = () => {
    const [discoverData, setDiscoverData] = useState([]);
    const navigate = useNavigate();
    let token = localStorage.getItem('token');

    useEffect(() => {
        async function fetchData() {
            let { data, error, status } = await getAPIData('/discover', token);

            if (!error) {
                if (data.discovers.length > 0) {
                    data.discovers.map((item) => {
                        setDiscoverData((prev) => [...prev, {
                            Id: item.discoverId,
                            Image: item.image,
                            Discover: item.discover,
                            Description: item.description,
                            View_Exercise: {
                                label: "View Exercise",
                                type: "Button"
                            },
                            Pro: item.isActive,
                            Action: 1
                        }])
                    })
                }
            } else {
                if (status === 401) {
                    localStorage.removeItem('token');
                    navigate('/sign-in');
                }
            }
        }
        fetchData();
    }, []);

    return(
        <React.Fragment>
            <Button variant="primary" className="my-2" onClick={()=>navigate('/discover/add')}>
                <FontAwesomeIcon icon={faPlus} /> Add New Discover
            </Button>
            {discoverData.length > 0 && <PageTrafficTable data={discoverData} />}
        </React.Fragment>
    )
};
export default Discover;