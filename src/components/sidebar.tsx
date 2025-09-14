import Link from 'next/link';
import { LayoutDashboard, Scale, FileText, Settings } from 'lucide-react';

const navigation = [
    {
        name: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        name: 'Pesagem',
        href: '/weighing',
        icon: Scale,
        children: [
            { name: 'Entrada', href: '/weighing/entry' },
            { name: 'Saída', href: '/weighing/exit' },
        ],
    },
    {
        name: 'Cadastros',
        href: '/registers',
        icon: FileText,
        children: [
            { name: 'Empresas', href: '/registers/companies' },
            { name: 'Armazéns', href: '/registers/warehouses' },
            { name: 'Câmaras Frias', href: '/registers/cold-rooms' },
            { name: 'Lotes', href: '/registers/batches' },
            { name: 'Produtos', href: '/registers/products' },
            { name: 'Clientes', href: '/registers/clients' },
            { name: 'Fornecedores', href: '/registers/suppliers' },
            { name: 'Motoristas', href: '/registers/drivers' },
            { name: 'Veículos', href: '/registers/vehicles' },
        ],
    },
    {
        name: 'Configurações',
        href: '/settings',
        icon: Settings,
        children: [
            { name: 'Sistema', href: '/settings/system' },
            { name: 'Balança', href: '/settings/scale' },
            { name: 'Câmeras', href: '/settings/cameras' },
        ],
    },
];

export function Sidebar() {
    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background">
            <div className="flex h-full flex-col">
                <div className="flex h-16 items-center border-b px-6">
                    <Link href="/dashboard" className="text-lg font-semibold">
                        Sistema de Pesagem
                    </Link>
                </div>
                <nav className="flex-1 space-y-1 px-3 py-4">
                    {navigation.map((item) => (
                        <div key={item.name}>
                            <Link
                                href={item.href}
                                className="flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
                            >
                                <item.icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                            {item.children && (
                                <div className="ml-6 mt-1 space-y-1">
                                    {item.children.map((child) => (
                                        <Link
                                            key={child.name}
                                            href={child.href}
                                            className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
                                        >
                                            {child.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </div>
        </aside>
    );
}