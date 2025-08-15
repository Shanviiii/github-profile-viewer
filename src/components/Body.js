import React, { useEffect, useState, useCallback } from "react";

function Body() {
  const [profiles, setProfiles] = useState([]);
  const [numberOfProfiles, setNumberOfProfiles] = useState("");

  const generateProfile = useCallback(async (count) => {
    try {
      const ran = Math.floor(1 + Math.random() * 10000);
      const response = await fetch(
        `https://api.github.com/users?since=${ran}&per_page=${count}`
      );
      const data = await response.json();
      setProfiles(data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  }, []);

  useEffect(() => {
    generateProfile(10);
  }, [generateProfile]);

  return (
    <div className="container">
      <div className="but">
        <input
          type="number"
          className="inpu"
          placeholder="Enter number of profiles"
          value={numberOfProfiles}
          onChange={(e) => setNumberOfProfiles(e.target.value)}
        />
        <button onClick={() => generateProfile(Number(numberOfProfiles))}>
          Search Profiles
        </button>
      </div>

      <div className="profiles">
        {profiles.map((user) => (
          <div key={user.id} className="cards">
            <img src={user.avatar_url} alt="avatar" />
            <h2>{user.login}</h2>
            <a href={user.html_url} target="_blank" rel="noreferrer">
              View GitHub
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Body;

