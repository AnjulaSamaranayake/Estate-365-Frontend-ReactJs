import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Trash } from "lucide-react";
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Divider,
} from "@mui/material";
import './SearchPage.css';
import Navbar from "./Navbar";

const SearchPage = () => {
  const [filters, setFilters] = useState({
    propertyType: "Any",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
    maxBedrooms: "",
    addedMonth: "",
    addedYear: "",
    postcode: "",
  });

  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [favourites, setFavourites] = useState(() => {
    const savedFavourites = localStorage.getItem("favourites");
    return savedFavourites ? JSON.parse(savedFavourites) : [];
  });

  useEffect(() => {
    fetch("/properties.json")
      .then((response) => response.json())
      .then((data) => {
        setProperties(data.properties);
        setFilteredProperties(data.properties);
      })
      .catch((error) => console.error("Error fetching properties:", error));
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const filtered = properties.filter((property) => {
      const matchesType =
        filters.propertyType === "Any" ||
        property.type.toLowerCase() === filters.propertyType.toLowerCase();
      const matchesMinPrice =
        !filters.minPrice || property.price >= parseInt(filters.minPrice, 10);
      const matchesMaxPrice =
        !filters.maxPrice || property.price <= parseInt(filters.maxPrice, 10);
      const matchesMinBedrooms =
        !filters.minBedrooms || property.bedrooms >= parseInt(filters.minBedrooms, 10);
      const matchesMaxBedrooms =
        !filters.maxBedrooms || property.bedrooms <= parseInt(filters.maxBedrooms, 10);
      const matchesAddedMonth =
        !filters.addedMonth || property.added.month.toLowerCase() === filters.addedMonth.toLowerCase();
      const matchesAddedYear =
        !filters.addedYear || property.added.year.toString() === filters.addedYear;
      const matchesPostcode =
        !filters.postcode ||
        property.location.toLowerCase().includes(filters.postcode.toLowerCase());

      return (
        matchesType &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesMinBedrooms &&
        matchesMaxBedrooms &&
        matchesAddedMonth &&
        matchesAddedYear &&
        matchesPostcode
      );
    });

    setFilteredProperties(filtered);
  };

  const addToFavourites = (property) => {
    if (!favourites.some((fav) => fav.id === property.id)) {
      setFavourites([...favourites, property]);
    }
  };

  const removeFavourite = (propertyId) => {
    setFavourites(favourites.filter((fav) => fav.id !== propertyId));
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  const handleDragStart = (e, property) => {
    e.dataTransfer.setData("property", JSON.stringify(property));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const property = JSON.parse(e.dataTransfer.getData("property"));
    addToFavourites(property);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Navbar favouritesCount={favourites.length} />
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Search Your <i>Dream Home</i>
        </Typography>
        <Box
          component="form"
          sx={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginBottom: "30px",
          }}
          onSubmit={handleSearch}
        >
          <Grid container spacing={2}>
            {/* Search Filters */}
            <Grid item xs={12} md={4}>
              <TextField
                label="Property Type"
                name="propertyType"
                value={filters.propertyType}
                onChange={handleInputChange}
                select
                fullWidth
              >
                <MenuItem value="Any">Any</MenuItem>
                <MenuItem value="House">House</MenuItem>
                <MenuItem value="Flat">Flat</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Min Price (Rs)"
                name="minPrice"
                type="number"
                value={filters.minPrice}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Max Price (Rs)"
                name="maxPrice"
                type="number"
                value={filters.maxPrice}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Min Bedrooms"
                name="minBedrooms"
                type="number"
                value={filters.minBedrooms}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Max Bedrooms"
                name="maxBedrooms"
                type="number"
                value={filters.maxBedrooms}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Added Month"
                name="addedMonth"
                value={filters.addedMonth}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Added Year"
                name="addedYear"
                type="number"
                value={filters.addedYear}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Location"
                name="postcode"
                value={filters.postcode}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ height: "56px" }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ marginY: "20px" }} />

        {/* Favourites Section */}
        <Box
          sx={{
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            marginBottom: "30px",
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <Typography variant="h5" gutterBottom>
            Favourites
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={clearFavourites}
            disabled={favourites.length === 0}
            sx={{ marginBottom: "10px" }}
          >
            Clear Favourites
          </Button>
          <Grid container spacing={2}>
            {favourites.map((property) => (
              <Grid item xs={12} sm={6} md={4} key={property.id}>
                <Card className="property-card">
                  <CardMedia
                    component="img"
                    height="140"
                    image={property.picture}
                    alt="Property"
                  />
                  <CardContent>
                    <Typography variant="h6">
                      Rs. {property.price.toLocaleString()} M
                    </Typography>
                    <Typography>Bedrooms: {property.bedrooms}</Typography>
                    <Typography>Bathrooms: {property.bathrooms}</Typography>
                    <Typography>Location: {property.location}</Typography>
                    <IconButton
                      onClick={() => removeFavourite(property.id)}
                      color="error"
                    >
                      <Trash />
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ marginY: "20px" }} />

        {/* Search Results Section */}
        <Typography variant="h5" gutterBottom>
          Search Results
        </Typography>
        <Grid container spacing={2}>
          {filteredProperties.map((property) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={property.id}
              draggable
              onDragStart={(e) => handleDragStart(e, property)}
            >
              <Card className="property-card">
                <CardMedia
                  component="img"
                  height="140"
                  image={property.picture}
                  alt="Property"
                />
                <CardContent>
                  <Typography variant="h6">
                    Rs. {property.price.toLocaleString()} M
                  </Typography>
                  <Typography>Bedrooms: {property.bedrooms}</Typography>
                  <Typography>Bathrooms: {property.bathrooms}</Typography>
                  <Typography>Location: {property.location}</Typography>
                  <IconButton
                    onClick={() => addToFavourites(property)}
                    color={
                      favourites.some((fav) => fav.id === property.id)
                        ? "error"
                        : "default"
                    }
                  >
                    <Heart />
                  </IconButton>
                  <Button
                    component={Link}
                    to={`/property/${property.id}`}
                    variant="outlined"
                    sx={{ marginLeft: 1 }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default SearchPage;
