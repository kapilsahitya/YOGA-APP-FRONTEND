import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAPIData, postAPIData } from "../../utils/getAPIData";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { PageTrafficTable } from "../../components/Tables";
import { useForm } from "react-hook-form";
import InputField from "../../utils/InputField";
import { toast } from "react-toastify";

const QuickWorkout = () => {
    const [workoutData, setWorkoutData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [updateUser, setUpdateUser] = useState({});
    const [deleteUser, setDeleteUser] = useState({
        Id: 0,
        IsConfirmed: false
    });
    const [errormsg, setErrormsg] = useState('');
    const navigate = useNavigate();
    let token = localStorage.getItem('token');

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();

    const handleClose = () => {
        setValue('quickworkoutName');
        setValue('description');
        setShowModal(false);
    }

    const fetchData = async () => {
        let { data, error, status } = await getAPIData('/quickworkout', token);

        if (!error) {
            setWorkoutData([]);
            if (data.quickworkouts.length > 0) {
                data.quickworkouts.map((item) => {
                    setWorkoutData((prev) => [...prev, {
                        Id: item._id,
                        Image: item.image,
                        Quick_Workout: item.quickworkout,
                        Description: item.description,
                        View_Exercise: {
                            label: "View Exercise",
                            type: "Button",
                            navigateRoute: "/admin/quickworkoutexercise",
                            queryparams: {
                                quickworkoutid: item._id,
                            },
                        },
                        Pro: item.isActive,
                        Action: 1
                    }])
                })
            } else if (data.quickworkouts.length < 1) {
                setErrormsg(data.message);
            }
        } else {
            if (status === 401) {
                localStorage.removeItem('token');
                toast.error(`${data.message}`, { position: "top-center", autoClose: 2500 });
                navigate('/');
            } else {
                setErrormsg(' ');
                toast.error("Something went wrong.", { position: "top-center", autoClose: 2500 });
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const updateData = async (values) => {
        let { data, error, status } = await postAPIData(`/updateQuickworkout/${updateUser.Id}`, values, token);

        if (!error) {
            toast.success("Update was successful!", { position: "top-center", autoClose: 2500 });
            fetchData();
        } else {
            if (status === 401) {
                localStorage.removeItem('token');
                toast.error(`${data.message}`, { position: "top-center", autoClose: 2500 });
                navigate('/');
            } else if (status === 400) {
                toast.error(`${data.message}`, { position: "top-center", autoClose: 2500 });
            } else {
                toast.error("Something went wrong.", { position: "top-center", autoClose: 2500 });
            }
        }
        handleClose();
    }

    const deleteData = async () => {
        let { data, error, status } = await postAPIData(`/deleteQuickworkout/${deleteUser.Id}`, null, token);

        if (!error) {
            fetchData();
        } else {
            if (status === 401) {
                localStorage.removeItem('token');
                toast.error(`${data.message}`, { position: "top-center", autoClose: 2500 });
                navigate('/');
            } else if (status === 400) {
                toast.error(`${data.message}`, { position: "top-center", autoClose: 2500 });
            } else {
                toast.error("Something went wrong.", { position: "top-center", autoClose: 2500 });
            }
        }
        setDeleteUser({ Id: 0, IsConfirmed: false })
    }

    const statusChange = async (Id, Status) => {
        let { data, error, status } = await postAPIData(`/changeQuickworkoutStatus`, {
            id: Id,
            status: Status ? 1 : 0
        }, token);

        if (!error) {
            fetchData();
        } else {
            if (status === 401) {
                localStorage.removeItem('token');
                toast.error(`${data.message}`, { position: "top-center", autoClose: 2500 });
                navigate('/');
            } else if (status === 400) {
                toast.error(`${data.message}`, { position: "top-center", autoClose: 2500 });
            } else {
                toast.error("Something went wrong.", { position: "top-center", autoClose: 2500 });
            }
        }
    }

    return (
        <React.Fragment>
            <Button variant="primary" className="my-2" onClick={() => navigate('/admin/workout/add')}>
                <FontAwesomeIcon icon={faPlus} /> Add New Quick Workout
            </Button>
            {workoutData.length > 0 ?
                <PageTrafficTable
                    data={workoutData}
                    handleModal={setShowModal}
                    setUser={setUpdateUser}
                    deleteUser={setDeleteUser}
                    statusChange={statusChange}
                /> : errormsg ? <h1>{errormsg}</h1> : <Spinner animation='border' variant='primary' style={{ height: 80, width: 80 }} className="position-absolute top-50 start-50" />}

            <Modal show={showModal} onHide={handleClose}>
                <Form onSubmit={handleSubmit(updateData)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Workout</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputField
                            type="text"
                            label="Workout"
                            placeholder="Workout"
                            defaultValue={updateUser?.Quick_Workout}
                            errors={errors['quickworkoutName']}
                            {...register('quickworkoutName', { required: "Workout name is required." })}
                        />

                        <InputField
                            label="Workout Image"
                            type="file"
                            errors={errors['image']}
                            {...register('image', { required: "Workout image is required." })}
                        />

                        <InputField
                            label="Description"
                            type="textarea"
                            row="3"
                            placeholder="Description"
                            defaultValue={updateUser?.Description}
                            errors={errors['description']}
                            {...register('description', { required: "Description is required." })}
                        />

                        <InputField
                            label="Selected Image"
                            type="image"
                            defaultValue={updateUser?.Image}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal show={deleteUser.IsConfirmed} onHide={() => setDeleteUser({ Id: 0, IsConfirmed: false })}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Are you sure you want to delete?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setDeleteUser({ Id: 0, IsConfirmed: false })}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={deleteData}>
                        Confirm Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
};
export default QuickWorkout;