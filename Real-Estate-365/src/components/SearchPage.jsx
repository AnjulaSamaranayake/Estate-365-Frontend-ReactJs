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

  const validateFilters = () => {
    if (
      filters.minPrice < 0 ||
      filters.maxPrice < 0 ||
      filters.minBedrooms < 0 ||
      filters.maxBedrooms < 0 ||
      filters.addedYear < 0
    ) {
      alert("Values cannot be negative.");
      return false;
    }
    if (filters.minPrice > filters.maxPrice) {
      alert("Min Price cannot be greater than Max Price.");
      return false;
    }
    if (filters.minBedrooms > filters.maxBedrooms) {
      alert("Min Bedrooms cannot be greater than Max Bedrooms.");
      return false;
    }
    return true;
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!validateFilters()) return;

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
    <Box sx={{ padding: "20px", maxWidth: "1400px", margin: "0 auto" }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: "#6a4c93", fontWeight: "bold", marginBottom: "2rem" }}>
        Search Your Dream Home
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
              label="Min Price in Millions (Rs.)"
              name="minPrice"
              type="number"
              value={filters.minPrice}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Max Price in Millions (Rs.)"
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
              label="Added Month (Ex: February)"
              name="addedMonth"
              value={filters.addedMonth}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Added Year (Ex: 2020)"
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
              fullWidth
              sx={{ 
                height: "56px",
                backgroundColor: "#6a4c93",
                '&:hover': {
                  backgroundColor: "#5a3d80",
                }
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ marginY: "20px", borderColor: "#ddd" }} />

      <Box
        sx={{
          padding: "20px",
          backgroundColor: "#f9f6ff",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <Typography variant="h5" gutterBottom sx={{ color: "#6a4c93", fontWeight: "bold" }}>
          Favourites
        </Typography>
        <Button
          variant="contained"
          onClick={clearFavourites}
          disabled={favourites.length === 0}
          sx={{ 
            marginBottom: "10px",
            backgroundColor: "#d32f2f",
            '&:hover': {
              backgroundColor: "#b71c1c",
            },
            '&:disabled': {
              backgroundColor: "#f5f5f5",
            }
          }}
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
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Rs. {property.price.toLocaleString()} millions
                  </Typography>
                  <Typography>{property.short}</Typography>
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

      <Divider sx={{ marginY: "20px", borderColor: "#ddd" }} />

      <Typography variant="h5" gutterBottom sx={{ color: "#6a4c93", fontWeight: "bold" }}>
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
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Rs. {property.price.toLocaleString()} millions
                </Typography>
                <Typography>{property.short}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
                  <IconButton
                    onClick={() => addToFavourites(property)}
                    sx={{
                      color: favourites.some((fav) => fav.id === property.id)
                        ? "#d32f2f"
                        : "#aaa",
                    }}
                  >
                    <Heart />
                  </IconButton>
                  <Button
                    component={Link}
                    to={`/property/${property.id}`}
                    variant="outlined"
                    sx={{ 
                      marginLeft: 1,
                      color: "#6a4c93",
                      borderColor: "#6a4c93",
                      '&:hover': {
                        borderColor: "#5a3d80",
                        backgroundColor: "rgba(106, 76, 147, 0.1)"
                      }
                    }}
                  >
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SearchPage;