import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface Satellite {
  name: string;
  noradCatId: string;
  objectType: string;
  orbitCode: string;
}

interface SatelliteContextType {
  data: Satellite[];
  setData: React.Dispatch<React.SetStateAction<Satellite[]>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  noradCatId: string;
  setNoradCatId: React.Dispatch<React.SetStateAction<string>>;
  objectTypes:string[];
  setObjectTypes: React.Dispatch<React.SetStateAction<string[]>>;
  orbitCodes:string[];
  setOrbitCodes:React.Dispatch<React.SetStateAction<string[]>>;
  loading: boolean;
  error: string | null;
}

export const SatelliteContext = createContext<SatelliteContextType | undefined>(undefined);

export const SatelliteProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<Satellite[]>([]);
  const [name, setName] = useState<string>('');
  const [noradCatId, setNoradCatId] = useState<string>('');
  const [objectTypes,setObjectTypes]=useState<string[]>([]);
  const [orbitCodes,setOrbitCodes]=useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://backend.digantara.dev/v1/satellites?attributes=noradCatId,intlDes,name,launchDate,decayDate,objectType,launchSiteCode,countryCode,orbitCode');
      const json = await res.json();
      setData(json);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [name, noradCatId]);
  
  return (
    <SatelliteContext.Provider
      value={{ data, setData, name, setName, noradCatId, setNoradCatId,objectTypes,setObjectTypes,orbitCodes,setOrbitCodes, loading, error }}
    >
      {children}
    </SatelliteContext.Provider>
  );
};
