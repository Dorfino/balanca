'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useTenant } from '@/hooks/use-tenant';
import { WeighingService } from '@/lib/weighing-service';
import { Weighing } from '@/types/schemas';

const weighingService = new WeighingService();

export default function WeighingExitPage() {
    const router = useRouter();
    const { currentCompany } = useTenant();
    const [inProgressWeighings, setInProgressWeighings] = useState<Weighing[]>([]);
    const [selectedWeighing, setSelectedWeighing] = useState<Weighing | null>(null);
    const [exitWeight, setExitWeight] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!currentCompany) return;

        weighingService.getInProgress(currentCompany.id).then(setInProgressWeighings);
    }, [currentCompany]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedWeighing) return;

        setIsLoading(true);
        try {
            await weighingService.registerExit(
                selectedWeighing.id!,
                Number(exitWeight)
            );

            router.push('/dashboard');
        } catch (error) {
            console.error('Erro ao registrar saída:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Simulação de leitura da balança
    const handleReadScale = () => {
        // Em um sistema real, isso seria uma leitura da balança
        const mockWeight = Math.floor(Math.random() * 50000) + 1000;
        setExitWeight(mockWeight.toString());
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Pesagem - Saída</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Registrar Saída</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Selecionar Veículo</Label>
                            <div className="space-y-2">
                                {inProgressWeighings.map((weighing) => (
                                    <div
                                        key={weighing.id}
                                        className={`cursor-pointer rounded-lg border p-4 hover:bg-accent ${selectedWeighing?.id === weighing.id
                                                ? 'border-primary'
                                                : ''
                                            }`}
                                        onClick={() => setSelectedWeighing(weighing)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">
                                                    Veículo: {weighing.vehicleId}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Entrada:{' '}
                                                    {weighing.entryDate.toLocaleString('pt-BR', {
                                                        dateStyle: 'short',
                                                        timeStyle: 'short',
                                                    })}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium">
                                                    {weighing.entryWeight} kg
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Peso Entrada
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {selectedWeighing && (
                            <div className="space-y-2">
                                <Label htmlFor="exitWeight">Peso de Saída (kg)</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="exitWeight"
                                        value={exitWeight}
                                        onChange={(e) => setExitWeight(e.target.value)}
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
                        )}

                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading || !selectedWeighing || !exitWeight}
                            >
                                {isLoading ? 'Registrando...' : 'Registrar Saída'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}