import React from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Paper, Grid, Button, Tabs, Tab, Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import axios from 'axios';

const Item = muiStyled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    border: '2px solid #000',
}));

function BranchInfo({ index, branch, ownerName, repoName }) {
    return (
        <div key={index} style={{ cursor: 'pointer', backgroundColor: '#000408', color: '#d1cdcd', marginBottom: '5px', padding: '5px', overflowWrap: 'break-word' }}
            onClick={() => {
                var win = window.open("/landing-screen/branch-commits", "_blank")
                win.selectedBranch = branch;
                win.ownerName = ownerName;
                win.repoName = repoName;
            }}
        >
            {branch.name}
        </div>
    )
};

function IssueInfo({ index, issue }) {
    return (
        <div key={index} style={{ backgroundColor: '#000408', color: '#d1cdcd', marginBottom: '5px', padding: '10px', overflowWrap: 'break-word' }}>
            <div style={{marginBottom: '5px'}}>{issue.title}</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={issue.user.avatar_url} width="30" height="30" style={{borderRadius: '50px'}} />
                &nbsp;&nbsp;{issue.user.login}
            </div>
        </div>
    )
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function RightPanel(props) {

    const { selectedRepo } = props;

    const [branches, setBranches] = React.useState([]);
    const [issues, setIssues] = React.useState([]);
    const ownerName = selectedRepo.fullName.split("/")[0];
    const repoName = selectedRepo.fullName.split("/")[1];

    React.useEffect(() => {

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


    const [tab, setTab] = React.useState(0);

    const handleChange = (event, newTab) => {
        setTab(newTab);
    };

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tab} onChange={handleChange} >
                        <Tab label="Branches" style={{ color: '#6d757c' }} />
                        <Tab label="Issues" style={{ color: '#6d757c' }} />
                    </Tabs>
                </Box>
                <TabPanel value={tab} index={0}>
                    {branches && branches.map((item, index) => (
                        <BranchInfo
                            index={index}
                            branch={item}
                            ownerName={ownerName}
                            repoName={repoName}
                        />
                    ))}
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    {issues && issues.map((item, index) => (
                        <IssueInfo index={index} issue={item} />
                    ))}
                </TabPanel>
            </Box>
        </>
    )
}

export default RightPanel;