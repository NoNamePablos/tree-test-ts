import {ITreeStoreItem} from "./TreeStore.interface";
import {TreeStore} from "./TreeStore";


describe('TreeStore', () => {
    const items: ITreeStoreItem[] = [
        { id: 1, parent: 'root' },
        { id: 2, parent: 1, type: 'test' },
        { id: 3, parent: 1, type: 'test' },
        { id: 4, parent: 2, type: 'test' },
        { id: 5, parent: 2, type: 'test' },
        { id: 6, parent: 2, type: 'test' },
        { id: 7, parent: 4, type: null },
        { id: 8, parent: 4, type: null },
    ];

    let treeStore: TreeStore;

    beforeEach(() => {
        treeStore = new TreeStore(items);
    });

    test('getAll() вернем все элементы', () => {
        expect(treeStore.getAll()).toEqual(items);
    });

    test('getItem() возвращает корректный элемент', () => {
        expect(treeStore.getItem(7)).toEqual({ id: 7, parent: 4, type: null });
    });

    test('getChildren() корректно отрабатывает', () => {
        expect(treeStore.getChildren(4)).toEqual([{ id: 7, parent: 4, type: null }, { id: 8, parent: 4, type: null }]);
        expect(treeStore.getChildren(5)).toEqual([]);
    });

    test('getAllChildren()', () => {
        expect(treeStore.getAllChildren(2)).toEqual([
            { id: 7, parent: 4, type: null },
            { id: 8, parent: 4, type: null },
            { id: 4, parent: 2, type: 'test' },
            { id: 5, parent: 2, type: 'test' },
            { id: 6, parent: 2, type: 'test' },
        ]);
    });

    test('getAllParents() корректно выводит весь путь', () => {
        expect(treeStore.getAllParents(7)).toEqual([
            { id: 7, parent: 4, type: null },
            { id: 4, parent: 2, type: 'test' },
            { id: 2, parent: 1, type: 'test' },
            { id: 1, parent: 'root' }
        ]);
    });
});
