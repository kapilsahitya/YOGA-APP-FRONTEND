import { Button, Card, Form } from "react-bootstrap";
import InputField from "../../utils/InputField";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPlan = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const [deactive, setDeactive] = useState(false);
    const navigate = useNavigate();

    let token = localStorage.getItem('token');

    const submitData = () => {

    }

    return (
        <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
                <h5 className="mb-4">Add New Plan</h5>
                <Form onSubmit={handleSubmit(submitData)}>
                    <InputField
                        label="Plan Name"
                        type="text"
                        placeholder="Plan Name"
                        errors={errors['planName']}
                        {...register('planName', { required: "Plan is required." })}
                    />

                    <InputField
                        label="Price"
                        type="number"
                        placeholder="Price"
                        errors={errors['price']}
                        {...register('price', { required: "Price is required." })}
                    />

                    <InputField
                        label="Months"
                        type="number"
                        placeholder="Months"
                        errors={errors['month']}
                        {...register('month', { required: "Month is required." })}
                    />

                    <InputField
                        label="SKU ID Android"
                        type="text"
                        placeholder="SKU ID Android"
                        errors={errors['skuidand']}
                        {...register('skuidand', { required: "SKU ID - ANDROID is required." })}
                    />

                    <InputField
                        label="SKU ID IOS"
                        type="text"
                        placeholder="SKU ID IOSe"
                        errors={errors['skuidios']}
                        {...register('skuidios', { required: "SKU ID - IOS is required." })}
                    />
                    <Button variant="primary" type="submit" className="mt-4" disabled={deactive}>
                        Add Plan
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
};

export default AddPlan;