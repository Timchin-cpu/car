import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  SlidersHorizontal,
  Home,
  User,
  Heart,
  ArrowUpRight,
} from "lucide-react";
import styles from "./App.module.css";

export default function CarRentalApp() {
  const [selectedBrand, setSelectedBrand] = useState("All");
  const navigate = useNavigate();

  const brands = [
    { name: "All", icon: null },
    { name: "Porsche", icon: "🏎️" },
    { name: "Ferrari", icon: "🏎" },
    { name: "BMW", icon: "🚗" },
  ];

  const cars = [
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

  const handleCarClick = (car) => {
    navigate(`/booking/${car.id}`, { state: { car } });
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <div>
            <p className={styles.greeting}>Good Morning ✨</p>
            <h1 className={styles.userName}>Jhon Smith</h1>
          </div>
          <button className={styles.iconButton}>
            <Bell size={24} />
          </button>
        </div>

        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <div className={styles.searchBar}>
            <Search size={20} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search"
              className={styles.searchInput}
            />
          </div>
          <button className={styles.filterButton}>
            <SlidersHorizontal size={24} />
          </button>
        </div>

        {/* Brand Filter */}
        <div className={styles.brandFilter}>
          {brands.map((brand) => (
            <button
              key={brand.name}
              onClick={() => setSelectedBrand(brand.name)}
              className={`${styles.brandButton} ${
                selectedBrand === brand.name ? styles.brandButtonActive : ""
              }`}
            >
              {brand.icon && <span>{brand.icon}</span>}
              <span>{brand.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Car Cards */}
      <div className={styles.carList}>
        {cars.map((car) => (
          <div
            key={car.id}
            className={styles.carCard}
            onClick={() => handleCarClick(car)}
          >
            <div className={styles.carImageContainer}>
              <img src={car.image} alt={car.name} className={styles.carImage} />
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

      {/* Bottom Navigation */}
      <div className={styles.bottomNav}>
        <div className={styles.navContainer}>
          <button className={styles.navButton}>
            <div className={`${styles.navIcon} ${styles.navIconActive}`}>
              <Home size={24} />
            </div>
          </button>
          <button
            className={styles.navButton}
            onClick={() => navigate("/search")}
          >
            <div className={styles.navIcon}>
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
