export default interface RepositoryInterface<T> {
    getAll(): Promise<T[]>;
    insert(item: T): Promise<void>;
    updateById(id: string, data: T): Promise<void>;
    delete(id: string): Promise<void>;
    getById(id: string): Promise<T>;
    getByField(field: string, value: string): Promise<T[]>;
}
