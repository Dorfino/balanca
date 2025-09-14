import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';

export default function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex min-h-screen">
            <Sidebar />
            <div className="flex-1">
                <Header />
                <main className="container mx-auto p-6">{children}</main>
            </div>
        </div>
    );
}