import { createContext, useContext, useState, ReactNode } from 'react';
import { Car } from '../types';
import { mockCars } from '../data/mockData';

interface CarsContextType {
  cars: Car[];
  addCar: (car: Omit<Car, 'id'>) => void;
  updateCar: (id: string, car: Partial<Car>) => void;
  deleteCar: (id: string) => void;
}

const CarsContext = createContext<CarsContextType | undefined>(undefined);

export function CarsProvider({ children }: { children: ReactNode }) {
  const [cars, setCars] = useState<Car[]>(mockCars);

  const addCar = (carData: Omit<Car, 'id'>) => {
    const newCar: Car = {
      ...carData,
      id: `car-${Date.now()}`,
      isListed: carData.isListed !== undefined ? carData.isListed : true, // Default to listed
    };
    setCars((prev) => [newCar, ...prev]);
  };

  const updateCar = (id: string, carData: Partial<Car>) => {
    setCars((prev) =>
      prev.map((car) => (car.id === id ? { ...car, ...carData } : car))
    );
  };

  const deleteCar = (id: string) => {
    setCars((prev) => prev.filter((car) => car.id !== id));
  };

  return (
    <CarsContext.Provider value={{ cars, addCar, updateCar, deleteCar }}>
      {children}
    </CarsContext.Provider>
  );
}

export function useCars() {
  const context = useContext(CarsContext);
  if (context === undefined) {
    throw new Error('useCars must be used within a CarsProvider');
  }
  return context;
}