import { Link } from "react-router-dom";

// ── Change this to your actual team name ──
const TEAM_NAME = "Team Alpha";

function Home() {
  return (
    <>
      <div className="hero-glow" />
      <div className="hero">
        <div className="hero-content">

          {/* Team name banner — required display */}
          <div className="team-name-banner">
            <span className="team-name-label">Team</span>
            <span className="team-name-value">{TEAM_NAME}</span>
          </div>

          <div className="hero-badge" style={{ marginTop: 20 }}>✦ Team Management Made Simple</div>

          <h1>
            Welcome to<br />{TEAM_NAME}
          </h1>

          <p>
            Add members, track roles, and view team profiles — all in one clean,
            minimal interface.
          </p>

          <div className="hero-actions">
            <Link to="/add" className="btn btn-primary">
              + Add Member
            </Link>
            <Link to="/members" className="btn btn-ghost">
              View Members →
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <div className="stat-value">∞</div>
              <div className="stat-label">Members</div>
            </div>
            <div className="stat">
              <div className="stat-value">1</div>
              <div className="stat-label">Dashboard</div>
            </div>
            <div className="stat">
              <div className="stat-value">0ms</div>
              <div className="stat-label">Setup Time</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;