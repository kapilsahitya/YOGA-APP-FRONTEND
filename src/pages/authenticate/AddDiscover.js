import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import InputField from "../../utils/InputField";
import { postAPIData } from "../../utils/getAPIData";
import { useNavigate } from "react-router-dom";

const AddDiscover = () => {
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
                <h5 className="mb-4">Add New Discover</h5>
                <Form onSubmit={handleSubmit(submitData)}>
                    <InputField
                        label="Discover"
                        type="text"
                        placeholder="Discover"
                        required={true}
                        {...register('discover')}
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
                        label="Discover Image"
                        type="file"
                        required={true}
                        {...register('image')}
                    />

                    <Button variant="primary" type="submit" className="mt-4">
                        Add Discover
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
};
export default AddDiscover;