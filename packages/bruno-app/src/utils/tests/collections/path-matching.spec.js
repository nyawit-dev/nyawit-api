import {
  normalizePathForComparison,
  findItemInCollectionByPathname,
  findParentItemInCollectionByPathname,
  deleteItemInCollectionByPathname
} from 'utils/collections';

describe('Path matching and collection item utilities', () => {
  describe('normalizePathForComparison', () => {
    it('normalizes backslashes to forward slashes', () => {
      expect(normalizePathForComparison('C:\\folder\\file.bru')).toBe('c:/folder/file.bru');
    });

    it('strips trailing slashes', () => {
      expect(normalizePathForComparison('/home/user/collection/')).toBe('/home/user/collection');
      expect(normalizePathForComparison('C:\\folder\\subfolder\\')).toBe('c:/folder/subfolder');
    });

    it('normalizes Windows drive letters to lowercase', () => {
      expect(normalizePathForComparison('D:\\Apps\\Bruno\\test.bru')).toBe('d:/apps/bruno/test.bru');
      expect(normalizePathForComparison('d:/apps/bruno/test.bru')).toBe('d:/apps/bruno/test.bru');
    });

    it('handles empty or non-string inputs safely', () => {
      expect(normalizePathForComparison('')).toBe('');
      expect(normalizePathForComparison(null)).toBe('');
      expect(normalizePathForComparison(undefined)).toBe('');
    });
  });

  describe('findItemInCollectionByPathname with slash/case discrepancies', () => {
    const mockCollection = {
      uid: 'col-1',
      items: [
        {
          uid: 'item-1',
          name: 'Request 1',
          pathname: 'D:\\collections\\my-col\\folder\\req1.bru',
          items: []
        },
        {
          uid: 'folder-1',
          name: 'Subfolder',
          pathname: 'D:\\collections\\my-col\\subfolder',
          items: [
            {
              uid: 'item-2',
              name: 'Request 2',
              pathname: 'D:\\collections\\my-col\\subfolder\\req2.bru'
            }
          ]
        }
      ]
    };

    it('finds top-level item with forward slash query', () => {
      const found = findItemInCollectionByPathname(mockCollection, 'D:/collections/my-col/folder/req1.bru');
      expect(found).not.toBeNull();
      expect(found.uid).toBe('item-1');
    });

    it('finds nested item with lowercase drive letter query', () => {
      const found = findItemInCollectionByPathname(mockCollection, 'd:/collections/my-col/subfolder/req2.bru');
      expect(found).not.toBeNull();
      expect(found.uid).toBe('item-2');
    });

    it('finds folder item by pathname', () => {
      const found = findItemInCollectionByPathname(mockCollection, 'D:/collections/my-col/subfolder/');
      expect(found).not.toBeNull();
      expect(found.uid).toBe('folder-1');
    });

    it('findParentItemInCollectionByPathname finds the parent folder with mismatched slashes', () => {
      const parent = findParentItemInCollectionByPathname(mockCollection, 'd:/collections/my-col/subfolder/req2.bru');
      expect(parent).not.toBeNull();
      expect(parent.uid).toBe('folder-1');
    });

    it('returns null when item is not in collection', () => {
      const found = findItemInCollectionByPathname(mockCollection, 'D:/collections/my-col/non-existent.bru');
      expect(found).toBeNull();
    });
  });

  describe('deleteItemInCollectionByPathname with slash/case discrepancies', () => {
    it('deletes nested item even with forward slash input', () => {
      const collection = {
        uid: 'col-1',
        items: [
          {
            uid: 'folder-1',
            pathname: 'C:\\test\\col\\folder',
            items: [
              {
                uid: 'item-1',
                pathname: 'C:\\test\\col\\folder\\req.bru'
              }
            ]
          }
        ]
      };

      deleteItemInCollectionByPathname('c:/test/col/folder/req.bru', collection);
      expect(collection.items[0].items.length).toBe(0);
    });

    it('deletes root level item', () => {
      const collection = {
        uid: 'col-1',
        items: [
          {
            uid: 'item-1',
            pathname: 'C:\\test\\col\\req.bru'
          }
        ]
      };

      deleteItemInCollectionByPathname('c:/test/col/req.bru', collection);
      expect(collection.items.length).toBe(0);
    });
  });
});
