import React from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import styled from 'styled-components';
import { Paper, Grid, Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';

const Item = muiStyled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    border: '2px solid #000',
}));

function BranchInfo({ index, branch }) {
    return (
        <div key={index}>
            {branch.name}
        </div>
    )
};

function IssueInfo({ index, issue }) {
    console.log("call");
    return (
        <div key={index}>
            <img src={issue.user.avatar_url} />
            {issue.title}
        </div>
    )
}

function RightPanel(props) {

    const { selectedRepo } = props;

    const [branches, setBranches] = React.useState([]);
    const [issues, setIssues] = React.useState([]);

    React.useEffect(() => {
        const ownerName = selectedRepo.fullName.split("/")[0];
        const repoName = selectedRepo.fullName.split("/")[1];
        axios.get(`https://api.github.com/repos/${ownerName}/${repoName}/branches`)
            .then(response => {
                console.log("qqe", response);
                setBranches(response.data);
            })
            .catch(err => {
                console.log(err);
            })

        axios.get(`https://api.github.com/repos/${ownerName}/${repoName}/issues`)
            .then(response => {
                console.log("qqep", response);
                setIssues(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [selectedRepo])

    return (
        <>
            {branches && branches.map((item, index) => (
                <BranchInfo index={index} branch={item} />
                // <Item>{console.log("select", selectedRepo)}</Item>
            ))}
            {console.log("rr", issues)}
            {issues && issues.map((item, index) => (
                <IssueInfo index={index} issue={item} />
            ))}
        </>
    )
}

export default RightPanel;