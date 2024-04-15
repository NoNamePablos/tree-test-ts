import type{ITreeStoreItem} from "./TreeStore.interface";

export class TreeStore {
    private items: { [id: string]: ITreeStoreItem } = {};

    constructor(items: ITreeStoreItem[]) {
        items.forEach(item => {
            this.items[item.id] = item;
        });
    }

    getAll(): ITreeStoreItem[] {
        return Object.values(this.items);
    }

    getItem(id: string | number): ITreeStoreItem | undefined {
        return this.items[id];
    }

    getChildren(id: string | number): ITreeStoreItem[] {
        return Object.values(this.items).filter(item => item.parent === id);
    }

    getAllChildren(id: string | number): ITreeStoreItem[] {
        const children: ITreeStoreItem[] = [];
        const stack: ITreeStoreItem[] = this.getChildren(id);

        while (stack.length > 0) {
            const current = stack.pop()!;
            children.unshift(current); // Добавляем текущий элемент в начало массива
            const directChildren = this.getChildren(current.id);
            stack.push(...directChildren); // Добавляем дочерние элементы текущего элемента в конец стека
        }

        return children;
    }

    getAllParents(id: string | number): ITreeStoreItem[] {
        const parents: ITreeStoreItem[] = [];
        let currentId: string | number | null = id;

        while (currentId !== null) {
            const parent = this.items[currentId];
            if (parent) {
                parents.push(parent);
                currentId = parent.parent;
            } else {
                currentId = null;
            }
        }

        return parents;
    }

}