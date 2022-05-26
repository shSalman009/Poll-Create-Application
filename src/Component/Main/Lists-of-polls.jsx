import { useState } from "react";
import {
    Button,
    FormControl,
    InputGroup,
    ListGroup,
    ListGroupItem,
    Modal,
} from "react-bootstrap";
import CreateForm from "../Create/Create-Form";

export default function ListOfPolls({ polls, selectedPolls, createPoll }) {
    // states
    const [show, setShow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // functions
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchTerm = () => {
        return polls.filter((poll) =>
            poll.title.toLowerCase().includes(searchTerm)
        );
    };
    const searchPoll = handleSearchTerm();

    return (
        <div className="p-4 bg-light text-center my-4">
            <h3>List of Polls</h3>
            <InputGroup className="my-4">
                <FormControl
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search here"
                />
                <Button onClick={handleShow}>New</Button>
            </InputGroup>

            <ListGroup>
                {searchPoll.map((poll) => (
                    <ListGroupItem
                        key={poll.id}
                        onClick={() => selectedPolls(poll.id)}
                    >
                        {poll.title}
                    </ListGroupItem>
                ))}
            </ListGroup>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateForm createPoll={createPoll} />
                </Modal.Body>
            </Modal>
        </div>
    );
}
