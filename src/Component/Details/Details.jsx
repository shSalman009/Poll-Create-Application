import React, { useState } from "react";
import { Alert, Modal } from "react-bootstrap";
import EditForm from "./EditForm";

export default function Details({
    selectedPoll,
    submitOpinion,
    deletePoll,
    updatePoll,
}) {
    // states
    const [opinionerName, setOpinionerName] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [validate, setValidate] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        setShow(true);
    };

    const handleSubmit = () => {
        const validate = validation();
        if (Object.keys(validate).length <= 0) {
            submitOpinion(selectedPoll.id, selectedOption, opinionerName);
        } else {
            if (validate.name) {
                setValidate(true);
            } else if (validate.option) {
                alert("Select option");
            }
        }
        setOpinionerName("");
    };

    const validation = () => {
        const errors = {};
        if (!selectedOption) {
            errors.option = "Option is required";
        } else if (!opinionerName) {
            errors.name = "Please type your name";
        }
        return errors;
    };

    return selectedPoll ? (
        <div className="m-4">
            <h2>{selectedPoll.title}</h2>
            <p className="my-4">{selectedPoll.description}</p>
            <div className="my-4 d-flex justify-content-between">
                <h4>Options</h4>
                <div className="me-5">
                    <button
                        className="mx-2 btn btn-warning "
                        onClick={handleShow}
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => deletePoll(selectedPoll.id)}
                        className="mx-2 btn btn-secondary "
                    >
                        Delete
                    </button>
                </div>
            </div>
            <div>
                {selectedPoll.options.map((option) => (
                    <div
                        key={option.id}
                        className="d-flex justify-content-between my-2 me-5"
                    >
                        <div>
                            <input
                                type="radio"
                                name="option"
                                className="me-4"
                                value={option.id}
                                onChange={(e) => {
                                    setSelectedOption(e.target.value);
                                }}
                            />
                            {option.value}
                        </div>
                        <div>
                            <span className="btn btn-sm btn-success mx-2">
                                {option.vote}
                            </span>
                            <span className="btn btn-sm btn-warning mx-2">
                                {option.vote > 0
                                    ? (
                                          (100 * option.vote) /
                                          selectedPoll.totalVote
                                      ).toFixed(2)
                                    : "0"}
                                %
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className=" my-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Name"
                    value={opinionerName}
                    onChange={(e) => {
                        setOpinionerName(e.target.value);
                        setValidate(false);
                    }}
                />

                {validate && (
                    <Alert
                        variant="danger"
                        onClose={() => setValidate(false)}
                        dismissible
                    >
                        <h5>Please enter your name</h5>
                    </Alert>
                )}
                <button
                    className="btn btn-secondary my-2"
                    onClick={handleSubmit}
                >
                    Submit your Opinion
                </button>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditForm
                        updatePoll={updatePoll}
                        selectedPoll={selectedPoll}
                        handleClose={handleClose}
                    />
                </Modal.Body>
            </Modal>
        </div>
    ) : (
        <div>
            <h2>No poll is selected right now</h2>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Consequuntur eos excepturi totam magnam sed et sint sit
                asperiores qui optio?
            </p>
        </div>
    );
}
