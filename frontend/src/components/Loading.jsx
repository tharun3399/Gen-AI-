import React from 'react';
import './Loading.css';

export const Loading = ({ size = 'medium', fullPage = false }) => {
  return (
    <div className={`loading ${fullPage ? 'loading-fullpage' : ''}`}>
      <div className={`spinner spinner-${size}`}></div>
    </div>
  );
};

export const Skeleton = ({ width = '100%', height = '1rem', className = '' }) => {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius: 'var(--border-radius-md)'
      }}
    />
  );
};

export const CardSkeleton = () => {
  return (
    <div className="card skeleton-card">
      <Skeleton width="100%" height="150px" className="mb-3" />
      <Skeleton width="60%" height="1.5rem" className="mb-2" />
      <Skeleton width="100%" height="1rem" className="mb-2" />
      <Skeleton width="80%" height="1rem" className="mb-3" />
      <Skeleton width="40%" height="2.5rem" />
    </div>
  );
};

export default Loading;
