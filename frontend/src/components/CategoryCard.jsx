import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './CategoryCard.css';

export const CategoryCard = ({ category, projectCount = 0 }) => {
  const navigate = useNavigate();
  const Icon = getCategoryIconComponent(category.icon);

  const handleViewClick = () => {
    navigate(`/category/${category.id}`, { state: { category } });
  };

  return (
    <motion.div
      className="category-card card"
      whileHover={{ y: -8, boxShadow: 'var(--shadow-lg)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="card-header">
        <div className="category-icon">
          {Icon && <Icon size={32} />}
        </div>
        <h3 className="category-title">{category.name}</h3>
      </div>

      <p className="category-description">{category.description}</p>

      <div className="category-stats">
        <div className="stat">
          <span className="stat-value">{projectCount}</span>
          <span className="stat-label">Projects</span>
        </div>
      </div>

      <button 
        className="btn btn-primary"
        onClick={handleViewClick}
        style={{ width: '100%' }}
      >
        View Solutions
        <ArrowRight size={18} />
      </button>
    </motion.div>
  );
};

function getCategoryIconComponent(iconName) {
  const icons = {
    'Wrench': () => <span>🔧</span>,
    'Sparkles': () => <span>✨</span>,
    'CalendarDays': () => <span>📅</span>,
    'Gift': () => <span>🎁</span>,
    'Camera': () => <span>📷</span>,
    'Users': () => <span>👥</span>,
    'BookOpen': () => <span>📘</span>,
    'Plane': () => <span>✈️</span>,
    'UtensilsCrossed': () => <span>🍽️</span>,
    'Dumbbell': () => <span>💪</span>,
    'Scissors': () => <span>✂️</span>,
    'Shirt': () => <span>👕</span>,
    'HeartPulse': () => <span>❤️</span>,
    'Tooth': () => <span>🦷</span>,
    'Croissant': () => <span>🥐</span>,
    'Gem': () => <span>💎</span>,
    'Truck': () => <span>🚚</span>,
    'Leaf': () => <span>🌿</span>,
    'PawPrint': () => <span>🐾</span>,
    'Lotus': () => <span>🪷</span>,
    'DraftingCompass': () => <span>📐</span>,
    'Megaphone': () => <span>📣</span>
  };

  return icons[iconName] || (() => <span>⚡</span>);
}

export default CategoryCard;
