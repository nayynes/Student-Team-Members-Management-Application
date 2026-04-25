import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton" style={{ width: 56, height: 56, borderRadius: "50%", flexShrink: 0 }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <div className="skeleton" style={{ height: 14, width: "60%" }} />
        <div className="skeleton" style={{ height: 11, width: "40%" }} />
      </div>
    </div>
  );
}

function MemberAvatar({ member }) {
  const imgSrc = member.image
    ? `${API_URL}/uploads/${member.image}`
    : null;

  const initials = member.name
    ? member.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  if (imgSrc) {
    return (
      <img
        className="member-avatar"
        src={imgSrc}
        alt={member.name}
        loading="lazy"
        onError={(e) => { e.target.style.display = "none"; }}
      />
    );
  }

  return (
    <div className="member-avatar-placeholder">{initials}</div>
  );
}

function ViewMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMembers = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/members`, {
          signal: controller.signal,
        });
        setMembers(res.data);
      } catch (err) {
        if (!axios.isCancel(err)) setError("Failed to load members.");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
    return () => controller.abort();
  }, []);

  return (
    <main className="page">
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1>Team Members</h1>
          <p>
            {loading ? "Loading..." : `${members.length} member${members.length !== 1 ? "s" : ""} found`}
          </p>
        </div>
        <Link to="/add" className="btn btn-primary btn-sm">+ Add Member</Link>
      </div>

      {error && (
        <div className="card" style={{ color: "var(--error)", textAlign: "center", padding: 32 }}>
          ⚠ {error}
        </div>
      )}

      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
        </div>
      ) : members.length === 0 && !error ? (
        <div className="empty">
          <div className="empty-icon">👤</div>
          <div className="empty-title">No members yet</div>
          <div className="empty-text">Add your first team member to get started.</div>
          <Link to="/add" className="btn btn-primary" style={{ marginTop: 16 }}>
            + Add Member
          </Link>
        </div>
      ) : (
        <div className="members-grid">
          {members.map((m) => (
            <div key={m._id} className="member-card">
              <div className="member-card-top">
                <MemberAvatar member={m} />
                <div className="member-info">
                  <div className="member-name">{m.name}</div>
                  <div className="role-badge">{m.role}</div>
                </div>
              </div>
              <Link to={`/member/${m._id}`} className="btn btn-ghost btn-sm btn-full">
                View Profile →
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default ViewMembers;