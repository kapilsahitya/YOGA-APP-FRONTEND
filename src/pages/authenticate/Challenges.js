import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageTrafficTable } from "../../components/Tables";
import { getAPIData } from "../../utils/getAPIData";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Challenges = () => {
    const [challengesData, setChallengesData] = useState([]);
    const navigate = useNavigate();
    let token = localStorage.getItem('token');

    useEffect(() => {
        async function fetchData() {
            let { data, error, status } = await getAPIData('/challenges', token);

            if (!error) {
                if (data.challenges.length > 0) {
                    data.challenges.map((item) => {
                        setChallengesData((prev) => [...prev, {
                            Id: item.challengesId,
                            Image: item.image,
                            Challenges_Name: item.challengesName,
                            Description: item.description,
                            Add_Week: {
                                label: "View Week",
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

    return (
        <React.Fragment>
            <Button variant="primary" className="my-2" onClick={()=>navigate('/challenges/add')}>
                <FontAwesomeIcon icon={faPlus} /> Add New Challenges
            </Button>
            {challengesData.length > 0 && <PageTrafficTable data={challengesData} />}
        </React.Fragment>
    )
};
export default Challenges;