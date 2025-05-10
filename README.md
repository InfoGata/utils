# @infogata/utils

[![npm version](https://img.shields.io/npm/v/@infogata/utils.svg)](https://www.npmjs.com/package/@infogata/utils)

A TypeScript utility library providing common functions and helpers for Infogata projects.

## Projects Using This Library

- [VideoGata](https://github.com/InfoGata/videogata)
- [AudioGata](https://github.com/InfoGata/audiogata)

## Installation

```bash
npm install @infogata/utils
```

## Usage

```typescript
import { formatSeconds, getThumbnailImage, mergeItems } from '@infogata/utils';

// Format seconds to time string
const formatted = formatSeconds(125); // '02:05'

// Get appropriate thumbnail image
const images = [
  { height: 50, url: 'small.jpg' },
  { height: 100, url: 'medium.jpg' },
  { height: 200, url: 'large.jpg' }
];
const thumbnail = getThumbnailImage(images, 100); // 'medium.jpg'

// Merge arrays with unique IDs
const items1 = [{ id: '1', name: 'Item 1' }];
const items2 = [{ id: '2', name: 'Item 2' }];
const merged = mergeItems(items1, items2);
```

## API Reference

### Time Utilities

- `formatSeconds(seconds?: number): string` - Formats seconds into a time string (MM:SS or HH:MM:SS)

### Image Utilities

- `getThumbnailImage(images: Array<{ height?: number; url: string }> | undefined, size: number): string | undefined` - Retrieves the smallest image bigger than the target size, or the largest if none are big enough

### Async Utilities

- `mapAsync<T, U>(array: T[], callback: (value: T, index: number) => Promise<U>): Promise<U[]>` - Maps an array asynchronously using Promise.all
- `filterAsync<T>(array: T[], predicate: (value: T, index: number) => Promise<boolean>): Promise<T[]>` - Filters an array asynchronously

### Collection Utilities

- `mergeItems<T extends { id: string }>(items1: T[], items2: T[]): T[]` - Merges two arrays of items with IDs, removing duplicates and preserving the second array's values for duplicates

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test
npm run test:watch

# Lint code
npm run lint

# Build for production
npm run build
```

## License

MIT