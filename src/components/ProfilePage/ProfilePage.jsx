import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
  Bell,
  Shield,
  HelpCircle,
} from "lucide-react";
import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const navigate = useNavigate();

  const user = {
    name: "Jhon Smith",
    email: "jhon.smith@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    avatar: "JS",
    memberSince: "January 2024",
    totalRentals: 12,
  };

  const menuItems = [
    { icon: CreditCard, label: "Payment Methods", badge: "2" },
    { icon: Bell, label: "Notifications", badge: null },
    { icon: Shield, label: "Privacy & Security", badge: null },
    { icon: HelpCircle, label: "Help & Support", badge: null },
    { icon: Settings, label: "Settings", badge: null },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate("/")}>
          <ChevronLeft size={24} />
        </button>
        <h2 className={styles.title}>Profile</h2>
        <div style={{ width: 24 }}></div>
      </div>

      <div className={styles.content}>
        {/* Profile Card */}
        <div className={styles.profileCard}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}>{user.avatar}</div>
            <button className={styles.editButton}>
              <Settings size={16} />
            </button>
          </div>
          <h3 className={styles.userName}>{user.name}</h3>
          <p className={styles.memberSince}>Member since {user.memberSince}</p>

          <div className={styles.statsContainer}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{user.totalRentals}</div>
              <div className={styles.statLabel}>Total Rentals</div>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>4.8</div>
              <div className={styles.statLabel}>Rating</div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Contact Information</h4>
          <div className={styles.infoCard}>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <Mail size={20} />
              </div>
              <div className={styles.infoContent}>
                <div className={styles.infoLabel}>Email</div>
                <div className={styles.infoValue}>{user.email}</div>
              </div>
            </div>
            <div className={styles.infoDivider}></div>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <Phone size={20} />
              </div>
              <div className={styles.infoContent}>
                <div className={styles.infoLabel}>Phone</div>
                <div className={styles.infoValue}>{user.phone}</div>
              </div>
            </div>
            <div className={styles.infoDivider}></div>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <MapPin size={20} />
              </div>
              <div className={styles.infoContent}>
                <div className={styles.infoLabel}>Location</div>
                <div className={styles.infoValue}>{user.location}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>General</h4>
          <div className={styles.menuCard}>
            {menuItems.map((item, index) => (
              <div key={item.label}>
                <button className={styles.menuItem}>
                  <div className={styles.menuItemLeft}>
                    <div className={styles.menuIcon}>
                      <item.icon size={20} />
                    </div>
                    <span className={styles.menuLabel}>{item.label}</span>
                  </div>
                  <div className={styles.menuItemRight}>
                    {item.badge && (
                      <span className={styles.badge}>{item.badge}</span>
                    )}
                    <ChevronRight size={20} className={styles.chevron} />
                  </div>
                </button>
                {index < menuItems.length - 1 && (
                  <div className={styles.menuDivider}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <button className={styles.logoutButton}>
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
