const username = 'Chinmay1743';
const currentYear = new Date().getFullYear();

document.getElementById('date').textContent = new Date().toLocaleDateString();

const apiBase = 'https://api.github.com';

// Fetch public repo info
async function fetchRepoInfo() {
    const response = await fetch(`${apiBase}/users/${username}/repos?per_page=100&type=public`);
    const repos = await response.json();
    let publicCount = repos.length;
    document.getElementById('public-repos').textContent = publicCount;
    return repos;
}

// Fetch commit information for public repositories
async function fetchCommitInfo(repos) {
    let totalCommits = 0, currentYearCommits = 0;

    for (const repo of repos) {
        const response = await fetch(`${apiBase}/repos/${username}/${repo.name}/commits?per_page=100`);
        const commits = await response.json();

        commits.forEach(commit => {
            totalCommits++;
            const commitDate = new Date(commit.commit.committer.date);
            if (commitDate.getFullYear() === currentYear) {
                currentYearCommits++;
            }
        });
    }

    document.getElementById('total-commits').textContent = totalCommits;
    document.getElementById('current-year-commits').textContent = currentYearCommits;
}

// Fetch the data and update the page
async function fetchGitHubStats() {
    const repos = await fetchRepoInfo();
    await fetchCommitInfo(repos);
}

// Fetch stats on page load
fetchGitHubStats();




