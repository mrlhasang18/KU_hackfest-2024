// contexts/PointsContext.tsx
"use client";
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface PointsContextType {
  totalPoints: number;
  addPoints: (points: number) => void;
  redeemPoints: (points: number) => void;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export const PointsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [totalPoints, setTotalPoints] = useState(1250);

  const addPoints = (pointsToAdd: number) => {
    setTotalPoints(prevPoints => prevPoints + pointsToAdd);
  };

  const redeemPoints = (pointsToRedeem: number) => {
    setTotalPoints(prevPoints => {
      const newPoints = Math.max(0, prevPoints - pointsToRedeem);
      return newPoints;
    });
  };

  return (
    <PointsContext.Provider value={{ totalPoints, addPoints, redeemPoints }}>
      {children}
    </PointsContext.Provider>
  );
};

// Custom hook to use points context
export const usePoints = () => {
  const context = useContext(PointsContext);
  if (context === undefined) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
};