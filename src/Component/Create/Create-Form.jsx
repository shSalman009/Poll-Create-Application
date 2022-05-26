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

const defaultOptions = [
    { id: shortid.generate(), value: "", vote: 0 },
    { id: shortid.generate(), value: "", vote: 0 },
];

export default function CreateForm({ createPoll }) {
    // states
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [options, setOptions] = useState([]);
    const [validate, setValidate] = useState(false);
    const [optionValidate, setOptionValidate] = useState(false);

    const submitPoll = () => {
        const errors = validation();
        if (Object.keys(errors).length) {
            setValidate(true);
        } else {
            createPoll(title, description, options);
            setTitle("");
            setDescription("");
            setValidate(false);
        }
    };
    const validation = () => {
        const errors = {};
        if (!title) {
            errors.title = "Title is required";
        } else if (!description) {
            errors.description = "Description is required";
        } else if (!options.value) {
            options.forEach((option) => {
                if (!option.value) {
                    errors.options = "Options are required";
                }
            });
        }
        return errors;
    };
    const handleOptionChange = (e, index) => {
        const newState = [...options];
        newState[index].value = e.target.value;
        setOptions(newState);
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
    const deleteOption = (index) => {
        const deleteOption = options.filter((e, i) => i !== index);
        setOptions(deleteOption);
    };

    // hooks
    useEffect(() => {
        setOptions(defaultOptions);
    }, []);

    return (
        <Form>
            {validate && (
                <Alert
                    variant="danger"
                    onClose={() => setValidate(false)}
                    dismissible
                >
                    <h5>Please Provide All Feilds</h5>
                </Alert>
            )}
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
            <Button className="my-2 " onClick={submitPoll}>
                Create Poll
            </Button>
        </Form>
    );
}
