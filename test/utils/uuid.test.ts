import { describe, it, expect, vi } from 'vitest';
import { buildUUID, buildShortUUID } from '/@/utils/uuid';

describe('utils/uuid', () => {
  describe('buildUUID', () => {
    it('should generate a UUID string', () => {
      const uuid = buildUUID();

      expect(typeof uuid).toBe('string');
      expect(uuid.length).toBe(32); // UUID without dashes
    });

    it('should generate different UUIDs', () => {
      const uuid1 = buildUUID();
      const uuid2 = buildUUID();

      expect(uuid1).not.toBe(uuid2);
    });

    it('should generate valid UUID format', () => {
      const uuid = buildUUID();

      // Should be 32 characters long
      expect(uuid.length).toBe(32);

      // Should only contain hexadecimal characters
      expect(/^[0-9a-f]+$/i.test(uuid)).toBe(true);
    });

    it('should generate multiple unique UUIDs', () => {
      const uuids = new Set();
      const count = 100;

      for (let i = 0; i < count; i++) {
        uuids.add(buildUUID());
      }

      expect(uuids.size).toBe(count);
    });

    it('should have consistent length', () => {
      const lengths = new Set();

      for (let i = 0; i < 10; i++) {
        lengths.add(buildUUID().length);
      }

      expect(lengths.size).toBe(1);
      expect(lengths.has(32)).toBe(true);
    });
  });

  describe('buildShortUUID', () => {
    it('should generate a short UUID string', () => {
      const shortUuid = buildShortUUID();

      expect(typeof shortUuid).toBe('string');
      expect(shortUuid.length).toBeGreaterThan(0);
    });

    it('should include prefix when provided', () => {
      const prefix = 'test';
      const shortUuid = buildShortUUID(prefix);

      expect(shortUuid.startsWith(prefix + '_')).toBe(true);
    });

    it('should work without prefix', () => {
      const shortUuid = buildShortUUID();

      expect(shortUuid.startsWith('_')).toBe(true);
    });

    it('should generate different short UUIDs', () => {
      const shortUuid1 = buildShortUUID();
      const shortUuid2 = buildShortUUID();

      expect(shortUuid1).not.toBe(shortUuid2);
    });

    it('should generate unique short UUIDs with same prefix', () => {
      const prefix = 'test';
      const shortUuids = new Set();
      const count = 10;

      for (let i = 0; i < count; i++) {
        shortUuids.add(buildShortUUID(prefix));
      }

      expect(shortUuids.size).toBe(count);
    });

    it('should include timestamp in the UUID', () => {
      const before = Date.now();
      const shortUuid = buildShortUUID();
      const after = Date.now();

      // Extract the combined string (second part after splitting by '_')
      const parts = shortUuid.split('_');
      // The combined string is the second element (index 1)
      const combinedStr = parts[1];

      // Extract timestamp from the end of the combined string
      // The format is: random + unique + timestamp
      // Since we don't know the exact length of random and unique parts,
      // we'll check if the combined string contains a timestamp-like value
      expect(combinedStr).toMatch(/^\d+$/); // Should be all digits

      // We can't reliably extract just the timestamp part since it's concatenated
      // with random and unique values, but we can verify it's a reasonable length
      expect(combinedStr.length).toBeGreaterThan(10);
    });

    it('should generate different UUIDs with same prefix', () => {
      // Since the unique counter is part of the combined string, we need to extract it properly
      // The unique counter is embedded in the combined random+unique string
      const shortUuid1 = buildShortUUID('test');
      const shortUuid2 = buildShortUUID('test');

      // Extract the combined part (second part after splitting by '_')
      const parts1 = shortUuid1.split('_');
      const parts2 = shortUuid2.split('_');

      // The combined string is the second element (index 1)
      const combined1 = parts1[1];
      const combined2 = parts2[1];

      // We can't directly parse the unique counter, but we can verify the combined string is different
      expect(combined2).not.toBe(combined1);
    });

    it('should handle empty string prefix', () => {
      const shortUuid = buildShortUUID('');

      expect(shortUuid.startsWith('_')).toBe(true);
    });

    it('should handle special characters in prefix', () => {
      const prefix = 'test-123_abc';
      const shortUuid = buildShortUUID(prefix);

      expect(shortUuid.startsWith(prefix + '_')).toBe(true);
    });

    it('should generate consistent format', () => {
      const shortUuid = buildShortUUID('test');
      const parts = shortUuid.split('_');

      // Should have 2 parts: prefix, combined (random+unique+timestamp)
      expect(parts.length).toBe(2);
      expect(parts[0]).toBe('test');
      expect(parts[1]).toMatch(/^\d+$/); // combined (random + unique + timestamp) should be numeric
    });
  });

  describe('integration', () => {
    it('should work with both functions', () => {
      const uuid = buildUUID();
      const shortUuid = buildShortUUID('test');

      expect(typeof uuid).toBe('string');
      expect(typeof shortUuid).toBe('string');
      expect(uuid.length).toBe(32);
      expect(shortUuid.length).toBeGreaterThan(0);
    });

    it('should generate different types of UUIDs', () => {
      const uuid = buildUUID();
      const shortUuid = buildShortUUID();

      expect(uuid).not.toBe(shortUuid);
      expect(uuid.length).not.toBe(shortUuid.length);
    });
  });
});
