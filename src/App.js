import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import shortid from "shortid";
import Details from "./Component/Details/Details";
import ListOfPolls from "./Component/Main/Lists-of-polls";
import POLLS from "./Data/data";

export default function Polls() {
    // states
    const [polls, setPolls] = useState([]);
    const [selectedPoll, setSelectedPoll] = useState();

    // hooks
    useEffect(() => {
        setPolls(POLLS);
    }, []);

    // functions
    const selectedPolls = (pollId) => {
        const poll = polls.find((p) => p.id === pollId);
        setSelectedPoll(poll);
    };
    const createPoll = (title, description, options) => {
        const poll = {};
        poll.id = shortid.generate();
        poll.title = title;
        poll.description = description;
        poll.created = new Date();
        poll.totalVote = 0;
        poll.opinions = [];
        poll.options = options;
        setPolls([...polls, poll]);
    };
    const submitOpinion = (id, sop, name) => {
        const CopyPoll = [...polls];
        const poll = CopyPoll.find((poll) => poll.id === id);
        const pl = poll.options.find((p) => p.id === sop);
        pl.vote++;
        poll.totalVote++;
        poll.opinions.push(name);
        setPolls(CopyPoll);
    };
    const deletePoll = (id) => {
        const Polls = [...polls];
        const poll = Polls.filter((pol) => pol.id !== id);
        setPolls(poll);
        selectedPolls();
    };

    const updatePoll = (updatedPoll) => {
        const Polls = [...polls];
        let poll = Polls.find((p) => p.id === updatedPoll.id);
        poll = updatedPoll;
        setPolls(Polls);
    };

    return (
        <Container className="my-5">
            <Row>
                <Col md="4">
                    <ListOfPolls
                        polls={polls}
                        selectedPolls={selectedPolls}
                        createPoll={createPoll}
                    />
                </Col>
                <Col md="8">
                    <Details
                        selectedPoll={selectedPoll}
                        submitOpinion={submitOpinion}
                        deletePoll={deletePoll}
                        updatePoll={updatePoll}
                    />
                </Col>
            </Row>
        </Container>
    );
}
