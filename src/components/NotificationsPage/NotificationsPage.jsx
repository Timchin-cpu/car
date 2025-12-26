import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Bell,
  Check,
  X,
  Calendar,
  CreditCard,
  AlertCircle,
  Gift,
  TrendingUp,
} from "lucide-react";
import styles from "./NotificationsPage.module.css";

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "booking",
      icon: Calendar,
      title: "Booking Confirmed",
      message:
        "Your Porsche Cayman 981 is ready for pickup tomorrow at 10:00 AM",
      time: "5 min ago",
      isRead: false,
      color: "#10b981",
    },
    {
      id: 2,
      type: "payment",
      icon: CreditCard,
      title: "Payment Successful",
      message: "Payment of $674 for Ferrari 488 GTB has been processed",
      time: "1 hour ago",
      isRead: false,
      color: "#fbbf24",
    },
    {
      id: 3,
      type: "offer",
      icon: Gift,
      title: "Special Offer! 🎉",
      message: "Get 20% off on your next luxury car rental. Limited time only!",
      time: "3 hours ago",
      isRead: false,
      color: "#ec4899",
    },
    {
      id: 4,
      type: "reminder",
      icon: Bell,
      title: "Return Reminder",
      message: "Don't forget to return your BMW X5 by 6:00 PM today",
      time: "5 hours ago",
      isRead: true,
      color: "#3b82f6",
    },
    {
      id: 5,
      type: "alert",
      icon: AlertCircle,
      title: "Booking Update",
      message: "Your Tesla Model S pickup time has been changed to 2:00 PM",
      time: "1 day ago",
      isRead: true,
      color: "#f59e0b",
    },
    {
      id: 6,
      type: "success",
      icon: Check,
      title: "Review Posted",
      message:
        "Thank you for reviewing Lamborghini Huracán. Your feedback helps us improve!",
      time: "2 days ago",
      isRead: true,
      color: "#10b981",
    },
    {
      id: 7,
      type: "info",
      icon: TrendingUp,
      title: "New Cars Available",
      message:
        "Check out our latest collection of sports cars just added to the fleet",
      time: "3 days ago",
      isRead: true,
      color: "#8b5cf6",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate("/")}>
          <ChevronLeft size={24} />
        </button>
        <h2 className={styles.title}>Notifications</h2>
        <div className={styles.badge}>{unreadCount}</div>
      </div>

      {/* Actions */}
      {notifications.length > 0 && (
        <div className={styles.actionsBar}>
          {unreadCount > 0 && (
            <button
              className={styles.actionButton}
              onClick={handleMarkAllAsRead}
            >
              <Check size={16} />
              Mark all as read
            </button>
          )}
          <button
            className={styles.actionButtonDanger}
            onClick={handleClearAll}
          >
            <X size={16} />
            Clear all
          </button>
        </div>
      )}

      {/* Content */}
      <div className={styles.content}>
        {notifications.length > 0 ? (
          <div className={styles.notificationList}>
            {notifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`${styles.notificationCard} ${
                    !notification.isRead ? styles.unread : ""
                  }`}
                >
                  <div
                    className={styles.iconContainer}
                    style={{ backgroundColor: `${notification.color}15` }}
                  >
                    <IconComponent
                      size={20}
                      style={{ color: notification.color }}
                    />
                  </div>
                  <div className={styles.notificationContent}>
                    <div className={styles.notificationHeader}>
                      <h3 className={styles.notificationTitle}>
                        {notification.title}
                      </h3>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDelete(notification.id)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <p className={styles.notificationMessage}>
                      {notification.message}
                    </p>
                    <div className={styles.notificationFooter}>
                      <span className={styles.notificationTime}>
                        {notification.time}
                      </span>
                      {!notification.isRead && (
                        <button
                          className={styles.readButton}
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                  {!notification.isRead && (
                    <div className={styles.unreadDot}></div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Bell size={80} color="#e5e7eb" />
            </div>
            <h3 className={styles.emptyTitle}>No Notifications</h3>
            <p className={styles.emptyText}>
              You're all caught up! Check back later for updates
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
