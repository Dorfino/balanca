import { getDB } from './db';

export class BaseService<T extends { id?: number }> {
    protected storeName: string;

    constructor(storeName: string) {
        this.storeName = storeName;
    }

    async getAll(companyId: number): Promise<T[]> {
        const db = await getDB();
        const tx = db.transaction(this.storeName, 'readonly');
        const store = tx.objectStore(this.storeName);
        const index = store.index('companyId');
        return index.getAll(companyId);
    }

    async getById(id: number): Promise<T | undefined> {
        const db = await getDB();
        const tx = db.transaction(this.storeName, 'readonly');
        const store = tx.objectStore(this.storeName);
        return store.get(id);
    }

    async create(data: Omit<T, 'id'>): Promise<T> {
        const db = await getDB();
        const tx = db.transaction(this.storeName, 'readwrite');
        const store = tx.objectStore(this.storeName);
        const id = await store.add(data);
        await tx.done;
        return { ...data, id } as T;
    }

    async update(id: number, data: Partial<T>): Promise<void> {
        const db = await getDB();
        const tx = db.transaction(this.storeName, 'readwrite');
        const store = tx.objectStore(this.storeName);
        const existing = await store.get(id);
        if (!existing) {
            throw new Error('Record not found');
        }
        await store.put({ ...existing, ...data });
        await tx.done;
    }

    async delete(id: number): Promise<void> {
        const db = await getDB();
        const tx = db.transaction(this.storeName, 'readwrite');
        const store = tx.objectStore(this.storeName);
        await store.delete(id);
        await tx.done;
    }

    async query(options: {
        companyId: number;
        index?: string;
        value?: any;
        direction?: IDBCursorDirection;
    }): Promise<T[]> {
        const db = await getDB();
        const tx = db.transaction(this.storeName, 'readonly');
        const store = tx.objectStore(this.storeName);
        const companyIndex = store.index('companyId');

        if (!options.index || !options.value) {
            return companyIndex.getAll(options.companyId);
        }

        const index = store.index(options.index);
        const results: T[] = [];
        let cursor = await index.openCursor(options.value, options.direction);

        while (cursor) {
            if (cursor.value.companyId === options.companyId) {
                results.push(cursor.value);
            }
            cursor = await cursor.continue();
        }

        return results;
    }
}