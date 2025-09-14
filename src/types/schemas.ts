import { z } from 'zod';

// Schemas básicos
export const companySchema = z.object({
    id: z.number(),
    name: z.string().min(3),
    isActive: z.boolean().default(true),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const userSchema = z.object({
    id: z.number(),
    companyId: z.number(),
    username: z.string().min(3),
    name: z.string(),
    email: z.string().email(),
    role: z.enum(['ADMIN', 'OPERATOR']),
    isActive: z.boolean().default(true),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const warehouseSchema = z.object({
    id: z.number(),
    companyId: z.number(),
    name: z.string().min(3),
    description: z.string().optional(),
    isActive: z.boolean().default(true),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const vehicleSchema = z.object({
    id: z.number(),
    companyId: z.number(),
    plate: z.string(),
    type: z.string(),
    description: z.string().optional(),
    tare: z.number().optional(),
    isActive: z.boolean().default(true),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const weighingSchema = z.object({
    id: z.number(),
    companyId: z.number(),
    vehicleId: z.number(),
    warehouseId: z.number().optional(),
    coldRoomId: z.number().optional(),
    batchId: z.number().optional(),
    entryWeight: z.number(),
    exitWeight: z.number().optional(),
    netWeight: z.number().optional(),
    status: z.enum(['IN_PROGRESS', 'COMPLETED']),
    entryDate: z.date(),
    exitDate: z.date().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

// Types derivados dos schemas
export type Company = z.infer<typeof companySchema>;
export type User = z.infer<typeof userSchema>;
export type Warehouse = z.infer<typeof warehouseSchema>;
export type Vehicle = z.infer<typeof vehicleSchema>;
export type Weighing = z.infer<typeof weighingSchema>;