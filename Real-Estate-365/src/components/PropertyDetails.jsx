import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PropertyDetails.css";
import Navbar from "./Navbar";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetch("/properties.json")
      .then((response) => response.json())
      .then((data) => {
        const foundProperty = data.properties.find((prop) => prop.id === id);
        setProperty(foundProperty);
      })
      .catch((error) => console.error("Error fetching property details:", error));
  }, [id]);

  if (!property) {
    return <p>Loading property details...</p>;
  }

  return (
    <>
    <Navbar />
    <div className="property-details">
      <h1>{property.type}</h1>

      <div className="property-gallery">
        <img src={property.img1} alt="Gallery 1" />
        <img src={property.img2} alt="Gallery 2" />
        <img src={property.img3} alt="Gallery 3" />
        <img src={property.img4} alt="Gallery 4" />
        <img src={property.img5} alt="Gallery 5" />
        <img src={property.img6} alt="Gallery 6" />
        <img src={property.img7} alt="Gallery 7" />
        <img src={property.img8} alt="Gallery 8" />
      </div>

      <p>Price: <span>Rs. {property.price.toLocaleString()} M</span></p>
      <p>Bedrooms: <span>{property.bedrooms}</span></p>
      <p>Bathrooms: <span>{property.bathrooms}</span></p>
      <p>Area: <span>{property.area} perches</span></p>
      <p>Location: <span>{property.location}</span></p>
      <p className="description">{property.description}</p>
    </div>
    </>
  );
};

export default PropertyDetails;
