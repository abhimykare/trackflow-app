import { Platform } from 'react-native';

// Storage interface
interface IStorage {
  setItem(key: string, value: string): Promise<void>;
  getItem(key: string): Promise<string | null>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
}

// Fallback in-memory storage
class MemoryStorage implements IStorage {
  private storage = new Map<string, string>();

  async setItem(key: string, value: string): Promise<void> {
    this.storage.set(key, value);
    console.log(`[MemoryStorage] Set ${key}:`, value ? 'DATA_SET' : 'NULL');
  }

  async getItem(key: string): Promise<string | null> {
    const value = this.storage.get(key) || null;
    console.log(`[MemoryStorage] Get ${key}:`, value ? 'DATA_FOUND' : 'NULL');
    return value;
  }

  async removeItem(key: string): Promise<void> {
    this.storage.delete(key);
    console.log(`[MemoryStorage] Removed ${key}`);
  }

  async clear(): Promise<void> {
    this.storage.clear();
    console.log('[MemoryStorage] Cleared all data');
  }
}

// Try to get AsyncStorage, fallback to memory storage
let storage: IStorage;

try {
  console.log('[Storage] Attempting to load AsyncStorage...');
  const AsyncStorage =
    require('@react-native-async-storage/async-storage').default;

  // Test if AsyncStorage is actually working
  AsyncStorage.setItem('__test__', 'test')
    .then(() => AsyncStorage.getItem('__test__'))
    .then((value: string | null) => {
      if (value === 'test') {
        console.log('[Storage] ✅ AsyncStorage is working properly');
        AsyncStorage.removeItem('__test__');
      } else {
        throw new Error('AsyncStorage test failed');
      }
    })
    .catch((error: any) => {
      console.warn('[Storage] ⚠️ AsyncStorage test failed:', error.message);
    });

  storage = AsyncStorage;
  console.log('[Storage] Using AsyncStorage');
} catch (error) {
  console.warn('[Storage] ⚠️ AsyncStorage not available, using memory storage');
  console.warn('[Storage] Error:', error);
  storage = new MemoryStorage();
}

export default storage;
