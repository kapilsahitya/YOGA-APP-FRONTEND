import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import InputField from "../../utils/InputField";
import { postAPIData } from "../../utils/getAPIData";
import { useNavigate } from "react-router-dom";

const AddChallenge = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const navigate = useNavigate();

    let token = localStorage.getItem('token');

    const submitData = async (values) => {
        // let { data, error, status } = await postAPIData('/addexercise', values, token);

        // if(!error){
        //     console.log(data);
        // }else{
        //     if (status === 401) {
        //         localStorage.removeItem('token');
        //         navigate('/sign-in');
        //     }
        // }
    }

    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <h5 className="mb-4">Add Challenges</h5>
                <Form onSubmit={handleSubmit(submitData)}>
                    <InputField
                        label="Challenges Name"
                        type="text"
                        placeholder="Enter your challenge name"
                        required={true}
                        {...register('challengesName')}
                    />

                    <InputField
                        label="Description"
                        type="textarea"
                        row="3"
                        placeholder="Description"
                        required={true}
                        {...register('description')}
                    />

                    <InputField
                        label="Challenges Image"
                        type="file"
                        required={true}
                        {...register('image')}
                    />

                    <Button variant="primary" type="submit" className="mt-4">
                        Add Challenges
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
};
export default AddChallenge;