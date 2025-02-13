import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAPIData } from "../../utils/getAPIData";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { PageTrafficTable } from "../../components/Tables";

const Stretches = () => {
    const [stretchesData, setStretchesData] = useState([]);
    const navigate = useNavigate();
    let token = localStorage.getItem('token');

    useEffect(() => {
        async function fetchData() {
            let { data, error, status } = await getAPIData('/stretches', token);

            if (!error) {
                if (data.stretchess.length > 0) {
                    data.stretchess.map((item) => {
                        setStretchesData((prev) => [...prev, {
                            Id: item.stretchesId,
                            Image: item.image,
                            Stretches: item.stretches,
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
            <Button variant="primary" className="my-2" onClick={()=>navigate('/stretches/add')}>
                <FontAwesomeIcon icon={faPlus} /> Add New Stretches
            </Button>
            {stretchesData.length > 0 && <PageTrafficTable data={stretchesData} />}
        </React.Fragment>
    )
};
export default Stretches;