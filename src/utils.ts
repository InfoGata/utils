/**
 * Formats seconds into a time string (MM:SS or HH:MM:SS)
 * @param seconds Number of seconds to format
 * @returns Formatted time string
 */
export function formatSeconds(seconds?: number): string {
  if (!seconds) {
    return "00:00";
  }
  const hours = Math.floor(seconds / 3600);
  seconds = seconds % 3600;

  const minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;

  seconds = Math.floor(seconds);
  let result =
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (seconds < 10 ? "0" : "") +
    seconds;

  if (hours > 0) {
    result = hours + ":" + result;
  }
  return result;
}

/**
 * Retrieve smallest image bigger than thumbnail size, or the largest if none are big enough
 * @param images Array of images with height and url properties
 * @param size Minimum size (height) required
 * @returns URL of the selected image or undefined if no images
 */
export const getThumbnailImage = (
  images: Array<{ height?: number; url: string }> | undefined,
  size: number
): string | undefined => {
  if (!images || images.length === 0) {
    return;
  }

  const sortedImages = [...images].sort(
    (a, b) => (a.height || 0) - (b.height || 0)
  );
  const thumbnailImage = sortedImages.find((i) => (i.height || 0) >= size);
  // Return the image URL if found, otherwise return the largest image URL (the last one in sorted array)
  return thumbnailImage ? thumbnailImage.url : sortedImages[sortedImages.length - 1]?.url;
};

/**
 * Maps an array asynchronously using Promise.all
 * @param array Input array
 * @param callback Async function to apply to each element
 * @returns Promise of the mapped array
 */
export async function mapAsync<T, U>(
  array: T[],
  callback: (value: T, index: number) => Promise<U>
): Promise<U[]> {
  return Promise.all(array.map(callback));
}

/**
 * Filters an array asynchronously
 * @param array Input array
 * @param predicate Async predicate function
 * @returns Promise of the filtered array
 */
export async function filterAsync<T>(
  array: T[],
  predicate: (value: T, index: number) => Promise<boolean>
): Promise<T[]> {
  const filterMap = await mapAsync(array, predicate);
  return array.filter((_, index) => filterMap[index]);
}

/**
 * Generic function to merge two arrays of items with IDs
 * Replaces both mergeTracks and mergeVideos from the original repos
 * @param items1 First array of items
 * @param items2 Second array of items (takes precedence on duplicates)
 * @returns Merged array with duplicates removed
 */
export function mergeItems<T extends { id: string }>(
  items1: T[],
  items2: T[]
): T[] {
  const map = new Map<string, T>();
  items1.forEach((item) => {
    map.set(item.id, item);
  });
  items2.forEach((item) => {
    map.set(item.id, item);
  });
  return Array.from(map.values());
}