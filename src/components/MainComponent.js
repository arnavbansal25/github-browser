import React from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import styled from 'styled-components';
import { Paper, Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

import AddModal from './AddModal';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

const Item = muiStyled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    border: '2px solid #000',
}));

const Wrapper = styled.div`
    padding: 0 20px 0 20px;
    justify-content: center;
    align-items: center;
`

const Heading = styled.h1`
    text-align: center;
    margin-bottom: 40px;
`

const Content = styled.div`
    background-color: grey;
    border-radius: 5px;
    padding: 0 10px;
`

const AddRepoIcon = styled.div`
    background-image: radial-gradient(skyblue, blue); 
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    cursor: pointer;
`

function MainComponent() {

    // const [repos, setRepos] = React.useState([
    //     { text: 'buy coffee', key: '1' },
    //     { text: 'create an app', key: '2' },
    //     { text: 'play on the switch', key: '3' },
    // ]);
    const [repos, setRepos] = React.useState([]);
    const [selectedRepo, setSelectedRepo] = React.useState();
    const [addModal, setAddModal] = React.useState(false);



    React.useEffect(() => {
        // setRepos(JSON.parse(localStorage.getItem('repos')))
        // axios.get(`https://api.github.com/users/arnavbansal25/repos`)
        //     .then(response => {
        //         console.log("qq", response);
        //     })
    }, [])


    return (
        <Wrapper>

            {/* Add Repository Dialog */}
            <AddModal
                open={addModal}
                handleClose={() => setAddModal(false)}
                repos={repos}
                setRepos={setRepos}
            />

            {/* Page Heading */}
            <Heading>Github Browser</Heading>

            {/* Page Content */}
            <Content>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        {repos && repos.map((item, index) => (
                            <LeftPanel
                                index={index}
                                repo={item}
                                setSelectedRepo={setSelectedRepo}
                            />
                        ))}
                        <AddRepoIcon onClick={() => setAddModal(true)}>
                            <AddIcon />
                        </AddRepoIcon>
                    </Grid>

                    <Grid item xs={8}>
                        <Button variant="contained" onClick={() => console.log("delete")}>Delete</Button>

                        {selectedRepo ?
                            <RightPanel
                                selectedRepo={selectedRepo}
                            />
                            :
                            <>
                            </>
                        }
                    </Grid>
                </Grid>
            </Content>
        </Wrapper>
    )
}

export default MainComponent;