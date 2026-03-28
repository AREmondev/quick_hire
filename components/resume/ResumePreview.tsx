import type { Profile } from "@/services/types";
import React from "react";

export default function ResumePreview({ profile }: { profile: Profile }) {
  const accentColor = "#4640DE";
  const neutral60 = "#7C8493";
  const neutral100 = "#25324B";
  const sectionTitle = (text: string) => (
    <div style={{ marginBottom: 6, marginTop: 14 }}>
      <div
        style={{
          fontSize: "11.5pt",
          fontWeight: "bold",
          color: accentColor,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          borderBottom: `1.5px solid ${accentColor}`,
          paddingBottom: 2,
          marginBottom: 6,
        }}
      >
        {text}
      </div>
    </div>
  );

  const links = [
    profile.github,
    profile.linkedin,
    profile.portfolio,
    profile.website,
  ].filter(Boolean);
  const techSkills =
    profile.technicalSkills && profile.technicalSkills.length > 0
      ? profile.technicalSkills.join(", ")
      : profile.skills.length > 0
      ? profile.skills.join(", ")
      : "";
  const tools = (profile.tools || []).join(", ");

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', system-ui, Arial, sans-serif",
        fontSize: "10.5pt",
        color: "#1a1a1a",
        background: "white",
        padding: "36px 48px",
        width: "794px",
        minHeight: "1123px",
        boxSizing: "border-box",
        lineHeight: "1.45",
        boxShadow: "0 4px 32px rgba(0,0,0,0.13)",
        margin: "0 auto",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <div
          style={{
            fontSize: "22pt",
            fontWeight: "bold",
            color: "#111",
            letterSpacing: "0.01em",
            marginBottom: 4,
          }}
        >
          {profile.name || "Your Name"}
        </div>
        <div style={{ fontSize: "11pt", color: "#222", marginBottom: 4 }}>
          {profile.title}
        </div>
        <div
          style={{
            fontSize: "10pt",
            color: "#222",
            display: "flex",
            justifyContent: "center",
            gap: 0,
            flexWrap: "wrap",
          }}
        >
          <span>{profile.location}</span>
          {(profile.email || profile.phone) && (
            <span style={{ margin: "0 6px" }}>|</span>
          )}
          {profile.email && <span>{profile.email}</span>}
          {profile.phone && (
            <span style={{ marginLeft: 6 }}>{profile.phone}</span>
          )}
          {links.length > 0 && <span style={{ margin: "0 6px" }}>|</span>}
          {links.map((l, i) => (
            <a
              key={i}
              href={l}
              style={{
                color: accentColor,
                textDecoration: "none",
                marginLeft: i === 0 ? 0 : 6,
              }}
            >
              {l}
            </a>
          ))}
        </div>
      </div>

      {profile.summary && (
        <>
          {sectionTitle("Profile")}
          <p style={{ margin: 0, fontSize: "10.5pt" }}>{profile.summary}</p>
        </>
      )}

      {profile.education.length > 0 && (
        <>
          {sectionTitle("Education")}
          {profile.education.map((edu, idx) => (
            <div key={idx} style={{ marginBottom: 4 }}>
              <span style={{ fontWeight: "normal" }}>
                {edu.institution}
                {edu.degree ? ` | ${edu.degree}` : ""}
                {edu.startDate ? ` (${edu.startDate}` : ""}
                {edu.endDate ? ` - ${edu.endDate})` : edu.startDate ? ")" : ""}
              </span>
            </div>
          ))}
        </>
      )}

      {(techSkills || tools) && (
        <>
          {sectionTitle("Skills")}
          {techSkills && (
            <div style={{ marginBottom: 3 }}>
              <span style={{ fontWeight: "bold" }}>Technical: </span>
              <span>{techSkills}</span>
            </div>
          )}
          {tools && (
            <div>
              <span style={{ fontWeight: "bold" }}>Tools: </span>
              <span>{tools}</span>
            </div>
          )}
        </>
      )}

      {profile.experiences.length > 0 && (
        <>
          {sectionTitle("Experience")}
          {profile.experiences.map((exp, i) => (
            <div
              key={i}
              style={{
                marginBottom: i < profile.experiences.length - 1 ? "14px" : 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <span
                  style={{
                    fontSize: "10.5pt",
                    fontWeight: 600,
                    color: neutral100,
                  }}
                >
                  {exp.company}
                </span>
                <span
                  style={{
                    fontSize: "10.5pt",
                    fontStyle: "italic",
                    color: "#444",
                  }}
                >
                  {exp.location}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <span style={{ fontSize: "10.5pt" }}>{exp.role}</span>
                <span
                  style={{
                    fontSize: "10.5pt",
                    fontStyle: "italic",
                    color: "#444",
                  }}
                >
                  {exp.startDate}
                  {exp.endDate ? ` - ${exp.endDate}` : ""}
                </span>
              </div>
              <ul style={{ margin: "4px 0 0 0", paddingLeft: 20 }}>
                {exp.bullets
                  .filter((b) => b.description)
                  .map((b, j) => (
                    <li key={j} style={{ marginBottom: 3, fontSize: "10.5pt" }}>
                      {b.description}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </>
      )}

      {profile.projects.length > 0 && (
        <>
          {sectionTitle("Projects")}
          {profile.projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 6 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    fontSize: "10.5pt",
                    fontWeight: 600,
                    color: neutral100,
                  }}
                >
                  {p.name}
                </span>
                {p.link && (
                  <a
                    href={p.link}
                    style={{
                      color: accentColor,
                      textDecoration: "none",
                      fontSize: "10.5pt",
                    }}
                    target="_blank"
                  >
                    {p.link}
                  </a>
                )}
              </div>
              <p style={{ margin: 0, fontSize: "10.5pt", color: neutral60 }}>
                {p.description}
              </p>
              {p.tech && p.tech.length > 0 && (
                <p style={{ margin: 0, fontSize: "10.5pt", color: neutral60 }}>
                  {p.tech.join(", ")}
                </p>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
