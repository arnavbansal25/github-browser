import React from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import styled from 'styled-components';
import { Paper, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import AddModal from './AddModal';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

const Wrapper = styled.div`
    padding: 0 20px 0 20px;
    justify-content: center;
    align-items: center;
`

const Heading = styled.h1`
    text-align: center;
    margin-bottom: 40px;
    // background-color: #161b22;
    color:#e4f3f3;
`

const Content = styled.div`
    // background-color: pink;
    border-radius: 5px;
    padding: 0 10px;
`

const AddRepoIcon = styled.div`
    background-image: radial-gradient(#238636, green); 
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    cursor: pointer;
`

function LandingScreen() {

    const [repos, setRepos] = React.useState([]);
    const [selectedRepo, setSelectedRepo] = React.useState();
    const [addModal, setAddModal] = React.useState(false);

    const handleDeleteRepo = () => {
        setRepos(prev => {
            return prev.filter(repo => repo.fullName != selectedRepo.fullName);
        });
        setSelectedRepo(null);
    }


    return (
        <Wrapper>
            {/* Add Repository Dialog */}
            <AddModal
                open={addModal}
                handleClose={() => setAddModal(false)}
                repos={repos}
                setRepos={setRepos}
                setAddModal={setAddModal}
            />

            {/* Page Heading */}
            <Heading>Github Browser</Heading>

            {/* Page Content */}
            <Content>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '39%' }}>
                        <div style={{ marginBottom: '10px', maxHeight: '550px', overflowY: 'scroll' }}>
                            {repos && repos.map((item, index) => (
                                <LeftPanel
                                    index={index}
                                    repo={item}
                                    setSelectedRepo={setSelectedRepo}
                                />
                            ))}
                        </div>
                        <AddRepoIcon onClick={() => setAddModal(true)}>
                            <AddIcon style={{ fill: "white" }} />
                        </AddRepoIcon>
                    </div>

                    <div style={{ width: '60%' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="contained" style={{ backgroundColor: '#238636' }} onClick={handleDeleteRepo}>Delete</Button>
                        </div>
                        <div style={{ backgroundColor: '#161b22', marginTop: '10px', maxHeight: '550px', overflowY: 'scroll' }}>
                            {selectedRepo ?
                                <RightPanel
                                    selectedRepo={selectedRepo}
                                />
                                :
                                <>
                                </>
                            }
                        </div>
                    </div>
                </div>

            </Content>
        </Wrapper>
    )
}

export default LandingScreen;