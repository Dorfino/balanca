import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'balancaDB';
const DB_VERSION = 1;

interface BalancaDB extends IDBPDatabase {
    companies: IDBPObjectStore<any, any, 'id'>;
    users: IDBPObjectStore<any, any, 'id'>;
    warehouses: IDBPObjectStore<any, any, 'id'>;
    coldRooms: IDBPObjectStore<any, any, 'id'>;
    batches: IDBPObjectStore<any, any, 'id'>;
    products: IDBPObjectStore<any, any, 'id'>;
    clients: IDBPObjectStore<any, any, 'id'>;
    suppliers: IDBPObjectStore<any, any, 'id'>;
    drivers: IDBPObjectStore<any, any, 'id'>;
    vehicles: IDBPObjectStore<any, any, 'id'>;
    weighings: IDBPObjectStore<any, any, 'id'>;
}

export async function initDB() {
    const db = await openDB<BalancaDB>(DB_NAME, DB_VERSION, {
        upgrade(db) {
            // Companies
            const companyStore = db.createObjectStore('companies', {
                keyPath: 'id',
                autoIncrement: true,
            });
            companyStore.createIndex('name', 'name', { unique: false });

            // Users
            const userStore = db.createObjectStore('users', {
                keyPath: 'id',
                autoIncrement: true,
            });
            userStore.createIndex('username', 'username', { unique: true });
            userStore.createIndex('companyId', 'companyId', { unique: false });

            // Warehouses
            const warehouseStore = db.createObjectStore('warehouses', {
                keyPath: 'id',
                autoIncrement: true,
            });
            warehouseStore.createIndex('companyId', 'companyId', { unique: false });
            warehouseStore.createIndex('name', 'name', { unique: false });

            // Cold Rooms
            const coldRoomStore = db.createObjectStore('coldRooms', {
                keyPath: 'id',
                autoIncrement: true,
            });
            coldRoomStore.createIndex('companyId', 'companyId', { unique: false });
            coldRoomStore.createIndex('name', 'name', { unique: false });

            // Batches
            const batchStore = db.createObjectStore('batches', {
                keyPath: 'id',
                autoIncrement: true,
            });
            batchStore.createIndex('companyId', 'companyId', { unique: false });
            batchStore.createIndex('code', 'code', { unique: false });

            // Products
            const productStore = db.createObjectStore('products', {
                keyPath: 'id',
                autoIncrement: true,
            });
            productStore.createIndex('companyId', 'companyId', { unique: false });
            productStore.createIndex('code', 'code', { unique: false });

            // Clients
            const clientStore = db.createObjectStore('clients', {
                keyPath: 'id',
                autoIncrement: true,
            });
            clientStore.createIndex('companyId', 'companyId', { unique: false });
            clientStore.createIndex('name', 'name', { unique: false });

            // Suppliers
            const supplierStore = db.createObjectStore('suppliers', {
                keyPath: 'id',
                autoIncrement: true,
            });
            supplierStore.createIndex('companyId', 'companyId', { unique: false });
            supplierStore.createIndex('name', 'name', { unique: false });

            // Drivers
            const driverStore = db.createObjectStore('drivers', {
                keyPath: 'id',
                autoIncrement: true,
            });
            driverStore.createIndex('companyId', 'companyId', { unique: false });
            driverStore.createIndex('name', 'name', { unique: false });

            // Vehicles
            const vehicleStore = db.createObjectStore('vehicles', {
                keyPath: 'id',
                autoIncrement: true,
            });
            vehicleStore.createIndex('companyId', 'companyId', { unique: false });
            vehicleStore.createIndex('plate', 'plate', { unique: false });

            // Weighings
            const weighingStore = db.createObjectStore('weighings', {
                keyPath: 'id',
                autoIncrement: true,
            });
            weighingStore.createIndex('companyId', 'companyId', { unique: false });
            weighingStore.createIndex('vehicleId', 'vehicleId', { unique: false });
            weighingStore.createIndex('entryDate', 'entryDate', { unique: false });
        },
    });

    return db;
}

let dbPromise: Promise<IDBPDatabase<BalancaDB>>;

export function getDB() {
    if (!dbPromise) {
        dbPromise = initDB();
    }
    return dbPromise;
}