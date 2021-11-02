import React from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import styled from 'styled-components';
import { Paper, Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const Item = styled.div`
    padding: 10px;
    textAlign: left;
    color: white;
    border: 2px solid #000;
    cursor: pointer;
    background-color: #161b22;

    &:hover {
        background-color: #0d1117;
        // color: #51a3fe;
    }
    // &:active {
    //     background-color: #0d1117;
    //     // color: #51a3fe;
    // }
`

function LeftPanel(props) {

    const { index, repo, setSelectedRepo } = props;

    const [nameColor, setNameColor] = React.useState();

    return (
        <Item key={index} onClick={() => {setSelectedRepo(repo); setNameColor("#51a3fe")}}>
            <div style={{ fontWeight: 'bold' }}>{repo && repo.fullName}</div>
            <div>{repo && repo.desc}</div>
        </Item>
    )
}

export default LeftPanel;