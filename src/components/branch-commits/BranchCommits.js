import React from 'react';
import axios from 'axios';

function ComminInfo({ index, commit }) {
    var commitDate = commit.commit.author.date;

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const d = new Date(commitDate);

    return (
        <div key={index} style={{ backgroundColor: '#161b22', marginBottom: '5px', padding: '10px' }}>
            <div style={{ fontWeight: 'bold', color: '#b7bdb9', marginBottom: '5px' }}>
                {d.getDate() + " " + monthNames[d.getMonth()] + " " + d.getFullYear()}
            </div>
            <div style={{ color: 'white', marginBottom: '10px' }}>
                {commit.commit.message}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                <img src={commit.author && commit.author.avatar_url} width="30" height="30" style={{ borderRadius: '50px' }} />
                &nbsp;&nbsp;{commit.author && commit.author.login}
            </div>
        </div>
    )
}

function BranchCommits() {

    const branch = window.selectedBranch;

    const [commits, setCommits] = React.useState();

    React.useEffect(() => {
        axios.get(`https://api.github.com/repos/${window.ownerName}/${window.repoName}/commits?sha=${branch.name}`)
            .then((response) => {
                setCommits(response.data);
            })
            .catch(err => {
                console.log(err.response);
            })
    }, [])

    return (
        <>
            <h1 style={{ color: 'white', textAlign: 'center' }}>Commits: {branch.name}</h1>
            <div style={{ padding: '0 50px' }}>
                {commits && commits.map((item, index) => (
                    <ComminInfo index={index} commit={item} />
                ))}
            </div>
        </>
    )
}

export default BranchCommits;