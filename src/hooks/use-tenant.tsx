import { createContext, useContext, useState, useEffect } from 'react';
import { Company } from '@/types/schemas';

interface TenantContextType {
    currentCompany: Company | null;
    setCurrentCompany: (company: Company) => void;
    isLoading: boolean;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

// Mock de empresa para desenvolvimento
const mockCompany: Company = {
    id: 1,
    name: 'Empresa Demo',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
};

export function TenantProvider({ children }: { children: React.ReactNode }) {
    const [currentCompany, setCurrentCompany] = useState<Company | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Em um sistema real, buscaríamos a empresa do usuário logado
        // Por enquanto, vamos usar a empresa mock
        setCurrentCompany(mockCompany);
        setIsLoading(false);
    }, []);

    return (
        <TenantContext.Provider
            value={{ currentCompany, setCurrentCompany, isLoading }}
        >
            {children}
        </TenantContext.Provider>
    );
}

export function useTenant() {
    const context = useContext(TenantContext);
    if (context === undefined) {
        throw new Error('useTenant must be used within a TenantProvider');
    }
    return context;
}