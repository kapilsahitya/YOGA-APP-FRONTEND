import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAPIData } from "../../utils/getAPIData";
import { PageTrafficTable } from "../../components/Tables";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Exercise = () => {
    const [exerciseData, setExerciseData] = useState([]);
    const navigate = useNavigate();
    let token = localStorage.getItem('token');

    useEffect(() => {
        async function fetchData() {
            let { data, error, status } = await getAPIData('/exercise', token);

            if (!error) {
                if (data.exericises.length > 0) {
                    data.exericises.map((item) => {
                        setExerciseData((prev) => [...prev, {
                            Id: item.exerciseId,
                            Image: item.image,
                            Exercise_Name: item.exerciseName,
                            Description: item.description,
                            Exercise_Time: item.exerciseTime,
                            Active: item.isActive,
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
            <Button variant="primary" className="my-2" onClick={()=>navigate('/exercise/add')}>
                <FontAwesomeIcon icon={faPlus} /> Add New Exercise
            </Button>
            {exerciseData.length > 0 && <PageTrafficTable data={exerciseData}/>}
        </React.Fragment>
    )
};
export default Exercise;