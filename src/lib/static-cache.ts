import fs from "fs/promises";
import path from "path";

const CACHE_DIR = path.join(process.cwd(), ".data-cache");

/**
 * Fetch with last-known-good fallback, for use in getStaticProps/getStaticPaths.
 *
 * 1. Try the live API. On success, snapshot the response to disk
 *    (best-effort — skipped on read-only filesystems).
 * 2. On failure, serve the last snapshot if one exists.
 * 3. With no snapshot, rethrow — Next.js then aborts the ISR regeneration
 *    and keeps serving the previously generated page.
 */
export async function fetchWithCache<T>(
  key: string,
  fetcher: () => Promise<T>
): Promise<T> {
  const file = path.join(CACHE_DIR, `${key}.json`);

  try {
    const data = await fetcher();

    try {
      await fs.mkdir(CACHE_DIR, { recursive: true });
      await fs.writeFile(file, JSON.stringify(data));
    } catch {
      // read-only filesystem — can't snapshot, live data still returned
    }

    return data;
  } catch (fetchError) {
    try {
      const cached = await fs.readFile(file, "utf8");
      console.warn(
        `[static-cache] API failed for "${key}", serving cached snapshot`
      );
      return JSON.parse(cached) as T;
    } catch {
      throw fetchError;
    }
  }
}
