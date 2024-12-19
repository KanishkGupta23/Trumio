import React from "react";
import "./profileCard.css"; // Optional for additional styling

const ProfileCard = ({ profileData }) => {
  return (
    <div className="profile-card bg-gray-800 p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-xl mb-4">LinkedIn Profile Information</h2>
      {profileData ? (
        <div className="profile-details">
          <div className="profile-row">
            <strong>Name: </strong>
            <span>{profileData.name || "Not Available!"}</span>
          </div>
          <div className="profile-row">
            <strong>Headline: </strong>
            <span>{profileData.headline || "Not Available!"}</span>
          </div>
          <div className="profile-row">
            <strong>Education: </strong>
            <span>
              {profileData.education && profileData.education.length > 0 ? (
                <ul>
                  {profileData.education.map((edu, index) => (
                    <li key={index}>
                      {edu.degree || "Studied"} at {edu.school}
                    </li>
                  ))}
                </ul>
              ) : (
                "N/A"
              )}
            </span>
          </div>
          <div className="profile-row">
            <strong>Skills: </strong>
            <span>
              {profileData.skills && profileData.skills.length > 0 ? (
                <ul>
                  {profileData.skills.map((skill, index) => (
                    <li key={index}>
                      {skill.name} 
                    </li>
                  ))}
                </ul>
              ) : (
                "Not Available!"
              )}
            </span>
          </div>
          <div className="profile-row">
            <strong>Certifications: </strong>
            <span>
              {profileData.certifications && profileData.certifications.length > 0 ? (
                <ul>
                  {profileData.certifications.map((certi, index) => (
                    <li key={index}>
                      {certi.name} 
                    </li>
                  ))}
                </ul>
              ) : (
                "Not Available!"
              )}
            </span>
          </div>
          <div className="profile-row">
            <strong>Experience: </strong>
            <span>
              {profileData.experience && profileData.experience.length > 0 ? (
                <ul>
                  {profileData.experience.map((exp, index) => (
                    <li key={index}>
                      {exp.title} at {exp.company}
                    </li>
                  ))}
                </ul>
              ) : (
                "Not Available!"
              )}
            </span>
          </div>
          <div className="profile-row">
            <strong>Location: </strong>
            <span>{profileData.location || "Not Available!"}</span>
          </div>
          <div className="profile-row">
            <strong>Industry Name: </strong>
            <span>{profileData.industry || "Not Available!"}</span>
          </div>
          <div className="profile-row">
            <strong>Summary:</strong>
            <p>{profileData.summary || "Not Available!"}</p>
          </div>
          <div className="profile-row">
            <strong>Awards: </strong>
            <span>
              {profileData.honors_awards && profileData.honors_awards.length > 0 ? (
                <ul>
                  {profileData.honors_awards.map((honors_awards, index) => (
                    <li key={index}>
                      {honors_awards.occupation} 
                    </li>
                  ))}
                </ul>
              ) : (
                "Not Available!"
              )}
            </span>
          </div>
          <div className="profile-row">
            <strong>Profile URL: </strong>
            <span>
              {profileData.profile_url ? (
                <a
                  href={profileData.profile_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#1E90FF" }} // Optional: Customize the link color
                >
                  {profileData.profile_url}
                </a>
              ) : (
                "Not Available!"
              )}
            </span>
          </div>
        </div>
      ) : (
        <p>Profile data is not available.</p>
      )}
    </div>
  );
};

export default ProfileCard;
