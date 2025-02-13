import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAPIData } from "../../utils/getAPIData";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { PageTrafficTable } from "../../components/Tables";

const QuickWorkout = () => {
    const [workoutData, setWorkoutData] = useState([]);
    const navigate = useNavigate();
    let token = localStorage.getItem('token');

    useEffect(() => {
        async function fetchData() {
            let { data, error, status } = await getAPIData('/quickworkout', token);

            if (!error) {
                if (data.quickworkouts.length > 0) {
                    data.quickworkouts.map((item) => {
                        setWorkoutData((prev) => [...prev, {
                            Id: item.quickworkoutId,
                            Image: item.image,
                            Quick_Workout: item.quickworkout,
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
            <Button variant="primary" className="my-2" onClick={()=>navigate('/workout/add')}>
                <FontAwesomeIcon icon={faPlus} /> Add New Quick Workout
            </Button>
            {workoutData.length > 0 && <PageTrafficTable data={workoutData} />}
        </React.Fragment>
    )
};
export default QuickWorkout;