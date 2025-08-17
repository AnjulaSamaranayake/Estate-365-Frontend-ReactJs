import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PropertyDetails.css";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    fetch("/properties.json")
      .then((response) => response.json())
      .then((data) => {
        const foundProperty = data.properties.find((prop) => prop.id === id);
        setProperty(foundProperty);
      })
      .catch((error) =>
        console.error("Error fetching property details:", error)
      );
  }, [id]);

  if (!property) {
    return <div className="loading">Loading property details...</div>;
  }

  return (
    <div className="property-details-container">
      <div className="property-details">
        <button className="back-button" onClick={() => navigate("/search")}>
          &larr; Back to Search
        </button>

        <h1>{property.type}</h1>

        <div className="property-gallery">
          <img src={property.img1} alt="Gallery 1" />
          <img src={property.img2} alt="Gallery 2" />
          <img src={property.img3} alt="Gallery 3" />
          <img src={property.img4} alt="Gallery 4" />
          <img src={property.img5} alt="Gallery 5" />
          <img src={property.img6} alt="Gallery 6" />
          <img src={property.img7} alt="Gallery 7" />
        </div>

        <div className="property-info">
          <p>
            Price: <span>Rs. {property.price.toLocaleString()} million</span>
          </p>
          <p>
            Bedrooms: <span>{property.bedrooms}</span>
          </p>
          <p>
            Bathrooms: <span>{property.bathrooms}</span>
          </p>
          <p>
            Area: <span>{property.area} perches</span>
          </p>
          <p>
            Location: <span>{property.location}</span>
          </p>
        </div>

        <div className="tabs">
          <button
            className={activeTab === "description" ? "active" : ""}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={activeTab === "floorPlan" ? "active" : ""}
            onClick={() => setActiveTab("floorPlan")}
          >
            Floor Plan
          </button>
          <button
            className={activeTab === "map" ? "active" : ""}
            onClick={() => setActiveTab("map")}
          >
            Map
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "description" && (
            <div className="description">
              <p>{property.description}</p>
            </div>
          )}
          {activeTab === "floorPlan" && (
            <div className="floor-plan">
              <img src={property.floorMap} alt="Floor Plan" />
            </div>
          )}
          {activeTab === "map" && (
            <div className="map">
              <iframe
                src={property.map}
                width="100%"
                height="400"
                allowFullScreen
                loading="lazy"
                title="Property Map"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;