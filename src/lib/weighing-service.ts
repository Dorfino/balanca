import { BaseService } from './base-service';
import { Weighing } from '@/types/schemas';

export class WeighingService extends BaseService<Weighing> {
    constructor() {
        super('weighings');
    }

    async registerEntry(data: {
        companyId: number;
        vehicleId: number;
        warehouseId?: number;
        coldRoomId?: number;
        batchId?: number;
        entryWeight: number;
    }): Promise<Weighing> {
        const weighing: Omit<Weighing, 'id'> = {
            ...data,
            status: 'IN_PROGRESS',
            entryDate: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        return this.create(weighing);
    }

    async registerExit(id: number, exitWeight: number): Promise<void> {
        const weighing = await this.getById(id);
        if (!weighing) {
            throw new Error('Weighing record not found');
        }

        const netWeight = Math.abs(weighing.entryWeight - exitWeight);

        await this.update(id, {
            exitWeight,
            netWeight,
            status: 'COMPLETED',
            exitDate: new Date(),
            updatedAt: new Date(),
        });
    }

    async getInProgress(companyId: number): Promise<Weighing[]> {
        return this.query({
            companyId,
            index: 'status',
            value: 'IN_PROGRESS',
        });
    }

    async getByDateRange(
        companyId: number,
        startDate: Date,
        endDate: Date
    ): Promise<Weighing[]> {
        const weighings = await this.query({
            companyId,
            index: 'entryDate',
            value: IDBKeyRange.bound(startDate, endDate),
        });

        return weighings.sort((a, b) => b.entryDate.getTime() - a.entryDate.getTime());
    }
}