import { createContext, useContext, useState, ReactNode } from 'react';
import { Wheel } from '../types';
import { mockWheels } from '../data/mockData';

interface WheelsContextType {
  wheels: Wheel[];
  addWheel: (wheel: Omit<Wheel, 'id' | 'likes' | 'views'>) => void;
  updateWheel: (id: string, wheel: Partial<Wheel>) => void;
  deleteWheel: (id: string) => void;
}

const WheelsContext = createContext<WheelsContextType | undefined>(undefined);

export function WheelsProvider({ children }: { children: ReactNode }) {
  const [wheels, setWheels] = useState<Wheel[]>(mockWheels);

  const addWheel = (wheelData: Omit<Wheel, 'id' | 'likes' | 'views'>) => {
    const newWheel: Wheel = {
      ...wheelData,
      id: `wheel-${Date.now()}`,
      likes: 0,
      views: 0,
      isListed: wheelData.isListed !== undefined ? wheelData.isListed : true, // Default to listed
    };
    setWheels((prev) => [newWheel, ...prev]);
  };

  const updateWheel = (id: string, wheelData: Partial<Wheel>) => {
    setWheels((prev) =>
      prev.map((wheel) => (wheel.id === id ? { ...wheel, ...wheelData } : wheel))
    );
  };

  const deleteWheel = (id: string) => {
    setWheels((prev) => prev.filter((wheel) => wheel.id !== id));
  };

  return (
    <WheelsContext.Provider value={{ wheels, addWheel, updateWheel, deleteWheel }}>
      {children}
    </WheelsContext.Provider>
  );
}

export function useWheels() {
  const context = useContext(WheelsContext);
  if (context === undefined) {
    throw new Error('useWheels must be used within a WheelsProvider');
  }
  return context;
}