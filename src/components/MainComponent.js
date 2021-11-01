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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '20px solid black',
    // border: 'none',
    outline: 'none',
    boxShadow: 24,
    borderRadius: 2,
    pt: 2,
    px: 4,
    pb: 3,
};

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
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [error, setError] = React.useState();
    const ownerRef = React.useRef();
    const repoRef = React.useRef();


    React.useEffect(() => {
        // setRepos(JSON.parse(localStorage.getItem('repos')))
        // axios.get(`https://api.github.com/users/arnavbansal25/repos`)
        //     .then(response => {
        //         console.log("qq", response);
        //     })
    }, [])

    const ifRepoExists = (repo) => {
        for(var i=0; i<repos.length; i++){
            if(repos[i].fullName === repo.fullName || repos[i].desc === repo.desc) {
                return true;
            }
        } 
        return false;
    }

    const handleAddRepo = () => {
        console.log("rr", ownerRef.current.value, repoRef.current.value);
        // axios.get(`https://api.github.com/repos/${ownerRef.current.value}/${repoRef.current.value}`)
             
        axios.get(`https://api.github.com/repos/facebook/react`)
            .then(response => {
                console.log("qq", response);

                const newRepo = {
                    fullName: response.data.full_name,
                    desc: response.data.description
                }

                console.log("ttt", ifRepoExists(newRepo));
                if(ifRepoExists(newRepo)) {
                    console.log("final yes");
                    setError('Repository already exists!')
                }
                else {
                    setRepos((prev) => {
                        return [
                            newRepo,
                            ...prev
                        ];
                    })
                    // localStorage.setItem('repos', JSON.stringify(repos));
                    setError(null);
                }

                // setDialogOpen(false);
            })
            .catch((err) => {
                setError(err.response.data.message);
                console.log(err.response);
            })
    }


    return (
        <Wrapper>

            {/* Add Repository Dialog */}
            <Modal
                open={dialogOpen}
                onClose={() => { setDialogOpen(false); setError(null) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ textAlign: 'center' }}>ADD NEW REPOSITORY</div>

                    <div style={{ margin: "40px 0 20px 0", height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TextField
                            inputRef={ownerRef}
                            id="standard-basic"
                            label="Owner / Organization"
                            placeholder="eg: facebook"
                            variant="standard"
                            fullWidth
                        />
                        <TextField
                            inputRef={repoRef}
                            id="standard-basic"
                            label="Repository Name"
                            placeholder="eg: react"
                            variant="standard"
                            fullWidth
                        />

                        <Button variant="contained" onClick={handleAddRepo}>ADD</Button>
                    </div>

                    {
                        error ?
                            <div style={{ textAlign: 'center', color: 'red' }}>

                                {error}
                            </div>
                            :
                            <>
                            </>
                    }
                </Box>
            </Modal>

            {/* Page Heading */}
            <Heading>Github Browser</Heading>

            {/* Page Content */}
            <Content>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        {repos && repos.map((item, index) => (
                            <Item key={index}>
                                {/* {console.log("rre", item)} */}
                                <div style={{fontWeight: 'bold'}}>{item && item.fullName}</div>
                                <div>{item && item.desc}</div>
                            </Item>
                        ))}

                        <AddRepoIcon onClick={() => setDialogOpen(true)}>
                            <AddIcon />
                        </AddRepoIcon>
                    </Grid>

                    <Grid item xs={8}>
                        <Button variant="contained">Delete</Button>
                        <Item>xs=8</Item>
                    </Grid>
                </Grid>
            </Content>
        </Wrapper>
    )
}

export default MainComponent;