import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import InputField from "../../utils/InputField";
import { postAPIData } from "../../utils/getAPIData";
import { useNavigate } from "react-router-dom";

const AddExercise = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();
    const navigate = useNavigate();

    let token = localStorage.getItem('token');

    const submitData = async (values) => {
        let { data, error, status } = await postAPIData('/addexercise', values, token);

        if(!error){
            console.log(data);
        }else{
            if (status === 401) {
                localStorage.removeItem('token');
                navigate('/sign-in');
            }
        }
    }

    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <h5 className="mb-4">Add Exercise</h5>
                <Form onSubmit={handleSubmit(submitData)}>
                    <InputField
                        label="Exercise Name"
                        type="text"
                        placeholder="Enter your exercise name"
                        required={true}
                        {...register('exerciseName')}
                    />

                    <InputField
                        label="Exercise Image"
                        type="file"
                        required={true}
                        {...register('image')}
                    />

                    <InputField
                        label="Description"
                        type="rte"
                        required={true}
                        setValue={setValue}
                        {...register('description')}
                    />

                    <InputField
                        label="Exercise Time (in minutes)"
                        type="number"
                        placeholder="0"
                        required={true}
                        {...register('exerciseTime')}
                    />
                    <Button variant="primary" type="submit" className="w-100 mt-4">
                        Sign in
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
};
export default AddExercise;