import { Sun, Moon, Globe, User, LogOut } from 'lucide-react';
import { useTheme } from './theme-provider';

export function Header() {
    const { theme, setTheme } = useTheme();

    return (
        <header className="sticky top-0 z-30 border-b bg-background">
            <div className="container flex h-16 items-center justify-end gap-4 px-6">
                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="rounded-lg p-2 hover:bg-muted"
                >
                    {theme === 'dark' ? (
                        <Sun className="h-5 w-5" />
                    ) : (
                        <Moon className="h-5 w-5" />
                    )}
                </button>
                <button className="rounded-lg p-2 hover:bg-muted">
                    <Globe className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span className="text-sm font-medium">Admin</span>
                </div>
                <button className="rounded-lg p-2 hover:bg-muted">
                    <LogOut className="h-5 w-5" />
                </button>
            </div>
        </header>
    );
}