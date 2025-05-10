import { describe, it, expect } from 'vitest';
import {
  formatSeconds,
  getThumbnailImage,
  mapAsync,
  filterAsync,
  mergeItems
} from '../utils';

describe('Utils utilities', () => {
  describe('formatSeconds', () => {
    it('should format seconds to minutes and seconds', () => {
      expect(formatSeconds(125)).toBe('02:05');
    });

    it('should include hours when more than 60 minutes', () => {
      expect(formatSeconds(3661)).toBe('1:01:01');
    });

    it('should return 00:00 for null or undefined', () => {
      expect(formatSeconds(undefined)).toBe('00:00');
      expect(formatSeconds(0)).toBe('00:00');
    });

    it('should handle fractional seconds', () => {
      expect(formatSeconds(65.7)).toBe('01:05');
    });
  });

  describe('getThumbnailImage', () => {
    it('should return undefined for empty images array', () => {
      expect(getThumbnailImage([], 100)).toBeUndefined();
      expect(getThumbnailImage(undefined, 100)).toBeUndefined();
    });

    it('should get the smallest image bigger than target size', () => {
      const images = [
        { height: 50, url: 'small.jpg' },
        { height: 100, url: 'medium.jpg' },
        { height: 200, url: 'large.jpg' }
      ];
      expect(getThumbnailImage(images, 100)).toBe('medium.jpg');
    });

    it('should get the largest image if none are bigger than target size', () => {
      const images = [
        { height: 50, url: 'small.jpg' },
        { height: 80, url: 'medium.jpg' }
      ];
      expect(getThumbnailImage(images, 100)).toBe('medium.jpg');
    });

    it('should handle undefined heights', () => {
      const images = [
        { url: 'noheight.jpg' },
        { height: 100, url: 'medium.jpg' }
      ];
      expect(getThumbnailImage(images, 50)).toBe('medium.jpg');
    });
  });

  describe('mapAsync', () => {
    it('should map an array asynchronously', async () => {
      const numbers = [1, 2, 3];
      const result = await mapAsync(numbers, async (n) => n * 2);
      expect(result).toEqual([2, 4, 6]);
    });

    it('should handle empty arrays', async () => {
      const result = await mapAsync([], async (n) => n);
      expect(result).toEqual([]);
    });

    it('should preserve order of async operations', async () => {
      const asyncDelay = async (num: number, delay: number) => {
        await new Promise(resolve => setTimeout(resolve, delay));
        return num;
      };

      const result = await mapAsync([3, 1, 2], async (_n) => await asyncDelay(_n, 10 * (3 - _n)));
      expect(result).toEqual([3, 1, 2]);
    });
  });

  describe('filterAsync', () => {
    it('should filter an array asynchronously', async () => {
      const numbers = [1, 2, 3, 4, 5];
      const result = await filterAsync(numbers, async (n) => n % 2 === 0);
      expect(result).toEqual([2, 4]);
    });

    it('should handle empty arrays', async () => {
      const result = await filterAsync([], async (_n) => true);
      expect(result).toEqual([]);
    });

    it('should preserve order after filtering', async () => {
      const words = ['apple', 'banana', 'cherry', 'date'];
      const result = await filterAsync(words, async (word) => word.length > 5);
      expect(result).toEqual(['banana', 'cherry']);
    });
  });

  describe('mergeItems', () => {
    it('should merge two arrays of items', () => {
      const items1 = [
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' }
      ];
      const items2 = [
        { id: '2', name: 'Updated Item 2' },
        { id: '3', name: 'Item 3' }
      ];
      
      const result = mergeItems(items1, items2);
      expect(result).toHaveLength(3);
      expect(result).toContainEqual({ id: '1', name: 'Item 1' });
      expect(result).toContainEqual({ id: '2', name: 'Updated Item 2' });
      expect(result).toContainEqual({ id: '3', name: 'Item 3' });
    });

    it('should prioritize items from the second array', () => {
      const items1 = [{ id: '1', value: 'original' }];
      const items2 = [{ id: '1', value: 'updated' }];
      
      const result = mergeItems(items1, items2);
      expect(result).toHaveLength(1);
      expect(result[0].value).toBe('updated');
    });

    it('should handle empty arrays', () => {
      expect(mergeItems([], [])).toEqual([]);
      
      const items = [{ id: '1', value: 'test' }];
      expect(mergeItems(items, [])).toEqual(items);
      expect(mergeItems([], items)).toEqual(items);
    });
  });
});