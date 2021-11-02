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

function AddModal(props) {

    const { open, handleClose, repos, setRepos } = props;

    const ownerRef = React.useRef();
    const repoRef = React.useRef();
    const [error, setError] = React.useState();

    const ifRepoExists = (repo) => {
        for (var i = 0; i < repos.length; i++) {
            if (repos[i].fullName === repo.fullName) {
                return true;
            }
        }
        return false;
    }

    const handleAddRepo = () => {
        console.log("rr", ownerRef.current.value, repoRef.current.value);
        axios.get(`https://api.github.com/repos/${ownerRef.current.value}/${repoRef.current.value}`)

        // axios.get(`https://api.github.com/repos/facebook/react`)
            .then(response => {
                console.log("qq", response);

                const newRepo = {
                    fullName: response.data.full_name,
                    desc: response.data.description
                }

                console.log("ttt", ifRepoExists(newRepo));
                if (ifRepoExists(newRepo)) {
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

                // setAddModal(false);
            })
            .catch((err) => {
                setError(err.response.data.message);
                console.log(err.response);
            })
    }

    const closeModal = () => {
        setError(null);
        handleClose();
    }

    return (
        <Modal
            open={open}
            onClose={() => closeModal()}
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
    )
}

export default AddModal;