import React from 'react';
import styled from 'styled-components';

const Item = styled.div`
    padding: 10px;
    textAlign: left;
    color: white;
    border: 2px solid #000;
    cursor: pointer;
    background-color: #161b22;

    &:hover {
        background-color: #0d1117;
    }
`

function LeftPanel(props) {

    const { index, repo, setSelectedRepo } = props;

    return (
        <Item key={index} onClick={() => setSelectedRepo(repo)}>
            <div style={{ fontWeight: 'bold' }}>{repo && repo.fullName}</div>
            <div>{repo && repo.desc}</div>
        </Item>
    )
}

export default LeftPanel;