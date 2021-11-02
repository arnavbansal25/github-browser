import axios from 'axios';
import React from 'react';

function ComminInfo({ index, commit }) {
    console.log("call", commit);
    return (
        <div key={index}>
            <div style={{fontWeight: 'bold'}}>{commit.commit.author.date}</div>
            <div>
                {commit.commit.message}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={commit.author.avatar_url} width="30" height="30" />
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
            {commits && commits.map((item, index) => (
                <ComminInfo index={index} commit={item} />
            ))}
        </>
    )
}

export default BranchCommits;