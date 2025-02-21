import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAPIData, postAPIData } from "../../utils/getAPIData";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import InputField from "../../utils/InputField";
import { toast } from "react-toastify";

const AddChallengesExercise = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [searchParams] = useSearchParams();
    const [exercisesData, setExercisesData] = useState([]);
    const [errormsg, setErrormsg] = useState("")
    const navigate = useNavigate();
    const week_id = searchParams.get('weekid');
    const days_id = searchParams.get('daysid');
    const challenges_id = searchParams.get('challengesid');
    let token = localStorage.getItem('token');

    const fetchData = async () => {
        let { data, error, status } = await getAPIData(`/exercise`, token)
        // console.log("data", data)
        if (!error) {
            setExercisesData([]);
            if (data.exercises.length > 0) {
                data.exercises.map((item) => {
                    setExercisesData((prev) => [...prev, {
                        Id: item._id,
                        Exercise_Name: item.exerciseName,
                    }])
                })
            }

        }
        else {
            if (status === 401) {
                localStorage.removeItem('token');
                navigate('/');
            }
            else {
                if (data.message) {
                    setErrormsg(data.message);
                }
                else {
                    setErrormsg("Something Went Wrong!")
                }
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const submitData = async (values) => {

        const formData = {
            day_id: days_id,
            exercise_ids: values.exercise_ids
        }

        let { data, error, status } = await postAPIData("/addChallengesexercises", formData, token);

        if (!error) {
            if (status === 201) {
                toast.success(`${data.message}`, { position: "top-center", autoClose: 2500 })
                navigate("/admin/challenges");
            }
        } else {
            if (status === 401 || status === 400) {
                localStorage.removeItem("token");
                toast.error(`${data.message}`, { position: "top-center", autoClose: 2500 })
                navigate("/");
            } else {
                toast.error("Something went wrong.", { position: "top-center", autoClose: 2500 })
            }
        }
    };

    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <h5 className="mb-4">Add Challenges Exercise</h5>
                <Form onSubmit={handleSubmit(submitData)}>
                    <InputField
                        label="Select exercise"
                        type="multiselect"
                        options={exercisesData}
                        {...register("exercise_ids")}
                    />

                    <Button variant="primary" type="submit" className="mt-4">
                        Add Challenges Exercise
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};
export default AddChallengesExercise;