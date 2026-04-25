import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function MemberDetails() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMember = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/members/${id}`, {
          signal: controller.signal,
        });
        setMember(res.data);
      } catch (err) {
        if (!axios.isCancel(err)) setError("Member not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
    return () => controller.abort();
  }, [id]);

  const initials = member?.name
    ? member.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  const hasImage = member?.image && !imgError;

  if (loading) {
    return (
      <main className="page">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="skeleton" style={{ height: 80, width: 80, borderRadius: 12 }} />
          <div className="skeleton" style={{ height: 24, width: 200 }} />
          <div className="skeleton" style={{ height: 16, width: 120 }} />
          <div className="card">
            <div className="skeleton" style={{ height: 14, marginBottom: 12 }} />
            <div className="skeleton" style={{ height: 14, marginBottom: 12 }} />
            <div className="skeleton" style={{ height: 14 }} />
          </div>
        </div>
      </main>
    );
  }

  if (error || !member) {
    return (
      <main className="page">
        <div className="empty">
          <div className="empty-icon">⚠</div>
          <div className="empty-title">{error || "Member not found"}</div>
          <Link to="/members" className="btn btn-ghost" style={{ marginTop: 16 }}>
            ← Back to Members
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <Link to="/members" className="btn btn-ghost btn-sm" style={{ marginBottom: 24 }}>
        ← Back to Members
      </Link>

      <div className="detail-hero">
        {hasImage ? (
          <img
            className="detail-avatar"
            src={`${API_URL}/uploads/${member.image}`}
            alt={member.name}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="detail-avatar-placeholder">{initials}</div>
        )}

        <div className="detail-meta">
          <h1>{member.name}</h1>
          <div className="role-badge" style={{ marginTop: 8 }}>{member.role}</div>
        </div>
      </div>

      <div className="card">
        <div className="detail-field">
          <span className="detail-field-label">Full Name</span>
          <span className="detail-field-value">{member.name}</span>
        </div>
        <div className="detail-field">
          <span className="detail-field-label">Role</span>
          <span className="detail-field-value">{member.role}</span>
        </div>
        <div className="detail-field">
          <span className="detail-field-label">Email</span>
          <a className="detail-field-value" href={`mailto:${member.email}`} style={{ color: "var(--accent)" }}>
            {member.email}
          </a>
        </div>
        {member.createdAt && (
          <div className="detail-field">
            <span className="detail-field-label">Member Since</span>
            <span className="detail-field-value">
              {new Date(member.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        )}
      </div>
    </main>
  );
}

export default MemberDetails;