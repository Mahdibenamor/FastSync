export interface IBaseRepository<T> {
    add(entity: T): Promise<T>;
    update(id: string, entity: T): Promise<T | null>;
    findById(id: string): Promise<T | null>;
    getAll(): Promise<T[]>;
    query(filter: (entity: T) => boolean): Promise<T[]>;
    count(): Promise<number>;
    dispose(): void;
}