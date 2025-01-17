import React from 'react';

const Card = ({ title, children, className }) => {
  return (
    <div className={`border rounded shadow-lg p-4 ${className}`}>
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export default Card;
