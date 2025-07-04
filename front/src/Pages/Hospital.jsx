import React from "react";

const hospitalImages = [
 
  "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
];

const Hospital = () => {
  return (
    <div className="container1" style={{ padding: "70px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Xəstəxanamız</h1>
      <div
        className="images-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {hospitalImages.map((url, index) => (
          <div
            key={index}
            style={{
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "transform 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <img
              src={url}
              alt={`Hospital ${index + 1}`}
              style={{ width: "100%", height: "180px", objectFit: "cover" }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hospital;
