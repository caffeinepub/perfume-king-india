import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Perfume {
    id: bigint;
    heartNotes: string;
    name: string;
    longevity: bigint;
    description: string;
    shortDescription: string;
    category: string;
    baseNotes: string;
    projection: bigint;
    price: string;
    isBestSeller: boolean;
    topNotes: string;
}
export interface backendInterface {
    getAllPerfumes(): Promise<Array<Perfume>>;
    getBestSellers(): Promise<Array<Perfume>>;
    getPerfumeById(id: bigint): Promise<Perfume | null>;
    getPerfumesByCategory(category: string): Promise<Array<Perfume>>;
    init(): Promise<void>;
    searchPerfumes(searchQuery: string): Promise<Array<Perfume>>;
}
