import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types/schemas';

interface AuthContextType {
    user: User | null;
    signIn: (username: string, password: string) => Promise<void>;
    signOut: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock de usuário para desenvolvimento
const mockUsers: User[] = [
    {
        id: 1,
        companyId: 1,
        username: 'admin',
        name: 'Administrador',
        email: 'admin@example.com',
        role: 'ADMIN',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        companyId: 1,
        username: 'operator',
        name: 'Operador',
        email: 'operator@example.com',
        role: 'OPERATOR',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Verificar se há um usuário no localStorage
        const storedUser = localStorage.getItem('balanca-user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const signIn = async (username: string, password: string) => {
        // Simulação de autenticação
        const user = mockUsers.find(
            (u) => u.username === username && u.isActive
        );

        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Em um sistema real, validaríamos a senha aqui
        localStorage.setItem('balanca-user', JSON.stringify(user));
        setUser(user);
    };

    const signOut = () => {
        localStorage.removeItem('balanca-user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}