import axios from 'axios';
import React from 'react';

function ComminInfo({ index, commit }) {
    console.log("call", commit);
    return (
        <div key={index} style={{backgroundColor: '#161b22', marginBottom: '5px', padding: '10px'}}>
            <div style={{ fontWeight: 'bold', color: '#b7bdb9', marginBottom: '5px' }}>{commit.commit.author.date}</div>
            <div style={{ color: 'white', marginBottom: '10px' }}>
                {commit.commit.message}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                <img src={commit.author.avatar_url} width="30" height="30" style={{borderRadius: '50px'}} />
                &nbsp;&nbsp;{commit.author.login}
            </div>
        </div>
    )
}

function BranchCommits() {

    const branch = window.selectedBranch;

    const [commits, setCommits] = React.useState();

    console.log("ttt", branch, window);

    React.useEffect(() => {
        axios.get(`https://api.github.com/repos/${window.ownerName}/${window.repoName}/commits?sha=${branch.name}`)
            .then((response) => {
                console.log("Yy", response);
                setCommits(response.data);
            })
            .catch(err => {
                console.log(err.response);
            })
    }, [])

    return (
        <>
            {/* <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}> */}
            <h1 style={{ color: 'white', textAlign: 'center' }}>{branch.name}</h1>
            <div style={{ padding: '0 50px'}}>
                {commits && commits.map((item, index) => (
                    <ComminInfo index={index} commit={item} />
                ))}
            </div>
            {/* </div> */}
        </>
    )
}

export default BranchCommits;