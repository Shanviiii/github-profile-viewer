import React, { useState } from "react";

function Body() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    if (!username.trim()) return;

    try {
      setLoading(true);
      setError("");

      const userRes = await fetch(
        `https://api.github.com/users/${username}`
      );

      if (!userRes.ok) {
        throw new Error("User not found");
      }

      const userData = await userRes.json();

      const repoRes = await fetch(userData.repos_url);
      const repoData = await repoRes.json();

      setProfile(userData);
      setRepos(repoData);
    } catch (err) {
      setError(err.message);
      setProfile(null);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">

      <div className="searchBox">
        <input
          type="text"
          placeholder="Enter GitHub Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button onClick={fetchProfile}>
          Search
        </button>
      </div>

      {loading && <h2>Loading...</h2>}

      {error && <h2>{error}</h2>}

      {profile && (
        <div className="profileCard">

          <img
            src={profile.avatar_url}
            alt={profile.login}
          />

          <h2>{profile.name || profile.login}</h2>

          <p>{profile.bio}</p>

          <div className="stats">
            <span>Followers: {profile.followers}</span>
            <span>Following: {profile.following}</span>
            <span>Repos: {profile.public_repos}</span>
          </div>

          <a
            href={profile.html_url}
            target="_blank"
            rel="noreferrer"
          >
            View GitHub Profile
          </a>
        </div>
      )}

      {repos.length > 0 && (
        <div className="repoSection">
          <h2>Repositories</h2>

          {repos.map((repo) => (
            <div className="repoCard" key={repo.id}>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
              >
                {repo.name}
              </a>

              <p>{repo.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Body;