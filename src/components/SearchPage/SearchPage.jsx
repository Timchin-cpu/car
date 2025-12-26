import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ArrowUpRight,
  Home,
  User,
  Heart,
} from "lucide-react";
import styles from "./SearchPage.module.css";

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedType, setSelectedType] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 2000]);

  const carTypes = ["All", "Sports", "Luxury", "SUV", "Electric"];

  const searchResults = [
 {
  id: 1,
  name: "Bugatti Chiron",
  brand: "Bugatti",
  price: 3000,
  rating: 5.0,
  type: "Hypercar",
  image: "/car.jfif",
},

    {
      id: 2,
      name: "Ferrari 488 GTB",
      brand: "Ferrari",
      price: 890,
      rating: 4.9,
      type: "Sports",
      image:
        "/car6.jfif",
    },
    {
      id: 3,
      name: "BMW X5 M50i",
      brand: "BMW",
      price: 520,
      rating: 4.7,
      type: "SUV",
      image:
        "/car7.jfif",
    },
    {
      id: 4,
      name: "Tesla Model S Plaid",
      brand: "Tesla",
      price: 780,
      rating: 4.9,
      type: "Electric",
      image:
        "/car8.jfif",
    },
    {
  id: 5,
  name: "Mercedes-AMG GT R",
  brand: "Mercedes-Benz",
  price: 200,
  rating: 4.8,
  type: "Sports",
  image: "/car2.jfif",
},{
  id: 3,
  name: "Porsche 911 GT3",
  brand: "Porsche",
  price: 220,
  rating: 4.9,
  type: "Sports",
  image: "/car3.jfif",
}
  ];

  const filteredResults = searchResults.filter((car) => {
    const matchesSearch =
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || car.type === selectedType;
    const matchesPrice =
      car.price >= priceRange[0] && car.price <= priceRange[1];
    return matchesSearch && matchesType && matchesPrice;
  });

  const handleCarClick = (car) => {
    navigate(`/booking/${car.id}`, { state: { car } });
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate("/")}>
          <ChevronLeft size={24} />
        </button>
        <h2 className={styles.title}>Search Cars</h2>
        <div style={{ width: 24 }}></div>
      </div>

      {/* Search Bar */}
      <div className={styles.searchSection}>
        <div className={styles.searchBar}>
          <Search size={20} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by name or brand..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className={styles.clearButton}
              onClick={() => setSearchQuery("")}
            >
              <X size={18} />
            </button>
          )}
        </div>
        <button
          className={`${styles.filterButton} ${
            showFilters ? styles.filterButtonActive : ""
          }`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal size={24} />
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className={styles.filtersContainer}>
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Car Type</h3>
            <div className={styles.typeButtons}>
              {carTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`${styles.typeButton} ${
                    selectedType === type ? styles.typeButtonActive : ""
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </h3>
            <div className={styles.rangeContainer}>
              <input
                type="range"
                min="0"
                max="2000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className={styles.rangeSlider}
              />
            </div>
          </div>

          <button
            className={styles.resetButton}
            onClick={() => {
              setSelectedType("All");
              setPriceRange([0, 2000]);
              setSearchQuery("");
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Results */}
      <div className={styles.content}>
        <div className={styles.resultsHeader}>
          <h3 className={styles.resultsTitle}>
            {filteredResults.length}{" "}
            {filteredResults.length === 1 ? "Car" : "Cars"} Found
          </h3>
        </div>

        <div className={styles.carList}>
          {filteredResults.map((car) => (
            <div key={car.id} className={styles.carCard}>
              <div className={styles.carImageContainer}>
                <img
                  src={car.image}
                  alt={car.name}
                  className={styles.carImage}
                />
                <div className={styles.ratingBadge}>⭐ {car.rating}</div>
              </div>
              <div className={styles.carInfo}>
                <div className={styles.carDetails}>
                  <div>
                    <h3 className={styles.carName}>{car.name}</h3>
                    <p className={styles.carType}>{car.type}</p>
                    <p className={styles.carPrice}>
                      <span className={styles.priceAmount}>${car.price}</span>
                      <span className={styles.pricePeriod}>/day</span>
                    </p>
                  </div>
                </div>
                <button
                  className={styles.viewButton}
                  onClick={() => handleCarClick(car)}
                >
                  <ArrowUpRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredResults.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <h3 className={styles.emptyTitle}>No Cars Found</h3>
            <p className={styles.emptyText}>
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className={styles.bottomNav}>
        <div className={styles.navContainer}>
          <button className={styles.navButton} onClick={() => navigate("/")}>
            <div className={styles.navIcon}>
              <Home size={24} />
            </div>
          </button>
          <button className={styles.navButton}>
            <div className={`${styles.navIcon} ${styles.navIconActive}`}>
              <Search size={24} />
            </div>
          </button>
          <button
            className={styles.navButton}
            onClick={() => navigate("/favorites")}
          >
            <div className={styles.navIcon}>
              <Heart size={24} />
            </div>
          </button>
          <button
            className={styles.navButton}
            onClick={() => navigate("/profile")}
          >
            <div className={styles.navIcon}>
              <User size={24} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
