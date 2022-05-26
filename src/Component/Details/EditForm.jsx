import React, { useEffect, useState } from "react";
import {
    Alert,
    Button,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    InputGroup,
} from "react-bootstrap";
import shortid from "shortid";

export default function EditForm({ selectedPoll, updatePoll, handleClose }) {
    // states
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [options, setOptions] = useState([]);
    const [validate, setValidate] = useState(false);
    const [optionValidate, setOptionValidate] = useState(false);

    useEffect(() => {
        setTitle(selectedPoll.title);
        setDescription(selectedPoll.description);
        setOptions(selectedPoll.options);
    }, [selectedPoll]);
    const handleOptionChange = (e, index) => {
        const newState = [...options];
        newState[index].value = e.target.value;
        setOptions(newState);
    };
    const deleteOption = (index) => {
        const deleteOption = options.filter((e, i) => i !== index);
        setOptions(deleteOption);
    };
    const addOption = () => {
        if (options.length < 5) {
            const option = {};
            option.id = shortid.generate();
            option.value = "";
            option.vote = 0;
            setOptions([...options, option]);
        } else {
            setOptionValidate(true);
        }
    };
    const submitPoll = () => {
        const copyPoll = selectedPoll;
        copyPoll.title = title;
        copyPoll.description = description;
        copyPoll.options = options;
        updatePoll(copyPoll);
    };

    return (
        <Form>
            <FormGroup className="my-3">
                <FormLabel>Enter Youe Title</FormLabel>
                <FormControl
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Enter Title"
                />
            </FormGroup>
            <FormGroup className="my-3">
                <FormLabel>Enter Youe Description</FormLabel>
                <FormControl
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    placeholder="Enter Description"
                />
            </FormGroup>
            <div className="mt-3 mb-2">
                <Button className="mb-2" type="button" onClick={addOption}>
                    Add Option
                </Button>
                {optionValidate && (
                    <Alert
                        variant="danger"
                        onClose={() => setValidate(false)}
                        dismissible
                    >
                        <h5>You can't add option out of 5</h5>
                    </Alert>
                )}
            </div>
            <FormGroup>
                {options.map((option, index) => (
                    <InputGroup key={option.id} className="my-2">
                        <FormControl
                            value={options[index].value}
                            onChange={(e) => {
                                handleOptionChange(e, index);
                            }}
                        />
                        <Button
                            disabled={options.length <= 2 ? true : false}
                            onClick={() => deleteOption(index)}
                        >
                            Delete
                        </Button>
                    </InputGroup>
                ))}
            </FormGroup>
            <Button
                className="my-2"
                onClick={() => {
                    submitPoll();
                    handleClose();
                }}
            >
                Update Poll
            </Button>
        </Form>
    );
}
