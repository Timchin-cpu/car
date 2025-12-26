import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  ArrowUpRight,
  Home,
  User,
  Trash2,
  ChevronLeft,
} from "lucide-react";
import styles from "./FavoritesPage.module.css";

export default function FavoritesPage() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([
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
  ]);

  const handleRemoveFavorite = (id) => {
    setFavorites(favorites.filter((car) => car.id !== id));
  };

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
        <h2 className={styles.title}>Favorites</h2>
        <div style={{ width: 24 }}></div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {favorites.length > 0 ? (
          <>
            <div className={styles.statsCard}>
              <div className={styles.statItem}>
                <Heart size={20} className={styles.statIcon} />
                <div>
                  <div className={styles.statValue}>{favorites.length}</div>
                  <div className={styles.statLabel}>Saved Cars</div>
                </div>
              </div>
            </div>

            <div className={styles.carList}>
              {favorites.map((car) => (
                <div key={car.id} className={styles.carCard}>
                  <div className={styles.carImageContainer}>
                    <img
                      src={car.image}
                      alt={car.name}
                      className={styles.carImage}
                    />
                    <button
                      className={styles.favoriteButton}
                      onClick={() => handleRemoveFavorite(car.id)}
                    >
                      <Heart size={20} fill="#ef4444" color="#ef4444" />
                    </button>
                    <div className={styles.ratingBadge}>⭐ {car.rating}</div>
                  </div>
                  <div className={styles.carInfo}>
                    <div className={styles.carDetails}>
                      <div>
                        <h3 className={styles.carName}>{car.name}</h3>
                        <p className={styles.carType}>
                          {car.type} • {car.brand}
                        </p>
                        <p className={styles.addedDate}>
                          Added {car.addedDate}
                        </p>
                        <p className={styles.carPrice}>
                          <span className={styles.priceAmount}>
                            ${car.price}
                          </span>
                          <span className={styles.pricePeriod}>/day</span>
                        </p>
                      </div>
                    </div>
                    <div className={styles.buttonGroup}>
                      <button
                        className={styles.viewButton}
                        onClick={() => handleCarClick(car)}
                      >
                        <ArrowUpRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Heart size={80} color="#e5e7eb" />
            </div>
            <h3 className={styles.emptyTitle}>No Favorites Yet</h3>
            <p className={styles.emptyText}>
              Start adding cars to your favorites to see them here
            </p>
            <button
              className={styles.browseButton}
              onClick={() => navigate("/search")}
            >
              Browse Cars
            </button>
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
          <button
            className={styles.navButton}
            onClick={() => navigate("/search")}
          >
            <div className={styles.navIcon}>
              <Search size={24} />
            </div>
          </button>
          <button className={styles.navButton}>
            <div className={`${styles.navIcon} ${styles.navIconActive}`}>
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
