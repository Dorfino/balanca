'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useTenant } from '@/hooks/use-tenant';
import { WeighingService } from '@/lib/weighing-service';

const weighingService = new WeighingService();

export default function WeighingEntryPage() {
    const router = useRouter();
    const { currentCompany } = useTenant();
    const [vehicleId, setVehicleId] = useState('');
    const [weight, setWeight] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentCompany) return;

        setIsLoading(true);
        try {
            await weighingService.registerEntry({
                companyId: currentCompany.id,
                vehicleId: Number(vehicleId),
                entryWeight: Number(weight),
            });

            router.push('/dashboard');
        } catch (error) {
            console.error('Erro ao registrar pesagem:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Simulação de leitura da balança
    const handleReadScale = () => {
        // Em um sistema real, isso seria uma leitura da balança
        const mockWeight = Math.floor(Math.random() * 50000) + 1000;
        setWeight(mockWeight.toString());
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Pesagem - Entrada</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Registrar Entrada</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="vehicleId">ID do Veículo</Label>
                            <Input
                                id="vehicleId"
                                value={vehicleId}
                                onChange={(e) => setVehicleId(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="weight">Peso (kg)</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="weight"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={handleReadScale}
                                >
                                    Ler Balança
                                </Button>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? 'Registrando...' : 'Registrar Entrada'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}