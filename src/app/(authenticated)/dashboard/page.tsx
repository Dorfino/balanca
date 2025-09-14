'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTenant } from '@/hooks/use-tenant';
import { WeighingService } from '@/lib/weighing-service';
import { Weighing } from '@/types/schemas';

const weighingService = new WeighingService();

export default function DashboardPage() {
    const { currentCompany } = useTenant();
    const [inProgressWeighings, setInProgressWeighings] = useState<Weighing[]>([]);
    const [recentWeighings, setRecentWeighings] = useState<Weighing[]>([]);

    useEffect(() => {
        if (!currentCompany) return;

        // Carregar pesagens em andamento
        weighingService.getInProgress(currentCompany.id).then(setInProgressWeighings);

        // Carregar pesagens recentes
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 7); // Últimos 7 dias
        weighingService
            .getByDateRange(currentCompany.id, startDate, endDate)
            .then(setRecentWeighings);
    }, [currentCompany]);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Pesagens em Andamento</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{inProgressWeighings.length}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Pesagens Hoje</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">
                            {recentWeighings.filter(
                                (w) =>
                                    w.entryDate.toDateString() === new Date().toDateString()
                            ).length}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Total na Semana</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{recentWeighings.length}</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Veículos no Pátio</CardTitle>
                </CardHeader>
                <CardContent>
                    {inProgressWeighings.length > 0 ? (
                        <div className="space-y-4">
                            {inProgressWeighings.map((weighing) => (
                                <div
                                    key={weighing.id}
                                    className="flex items-center justify-between rounded-lg border p-4"
                                >
                                    <div>
                                        <p className="font-medium">Veículo: {weighing.vehicleId}</p>
                                        <p className="text-sm text-muted-foreground">
                                            Entrada:{' '}
                                            {weighing.entryDate.toLocaleString('pt-BR', {
                                                dateStyle: 'short',
                                                timeStyle: 'short',
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-right">
                                            {weighing.entryWeight} kg
                                        </p>
                                        <p className="text-sm text-muted-foreground">Peso Entrada</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground">
                            Nenhum veículo no pátio no momento.
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}