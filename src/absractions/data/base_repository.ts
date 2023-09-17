export interface IBaseRepository<T> {
    add(entity: T): Promise<T>;
    update(id: string, entity: T): Promise<T | null>;
    findById(id: string): Promise<T | null>;
    getAll(): Promise<T[]>;
    query(filter: any): Promise<T[]>;
    count(): Promise<number>;
    dispose(): void;
}