import { describe, it, expect } from 'vitest';
import { buildUUID, buildShortUUID } from '/@/utils/uuid';

describe('utils/uuid', () => {
  it('should generate a UUID', () => {
    const uuid = buildUUID();
    expect(uuid).toBeDefined();
    expect(typeof uuid).toBe('string');
    expect(uuid.length).toBeGreaterThan(0);
  });

  it('should generate different UUIDs', () => {
    const uuid1 = buildUUID();
    const uuid2 = buildUUID();
    expect(uuid1).not.toBe(uuid2);
  });

  it('should generate a short UUID', () => {
    const shortUuid = buildShortUUID();
    expect(shortUuid).toBeDefined();
    expect(typeof shortUuid).toBe('string');
    expect(shortUuid.length).toBeGreaterThan(0);
  });

  it('should generate a short UUID with prefix', () => {
    const prefix = 'test';
    const shortUuid = buildShortUUID(prefix);
    expect(shortUuid).toBeDefined();
    expect(shortUuid.startsWith(prefix + '_')).toBe(true);
  });

  it('should generate different short UUIDs', () => {
    const shortUuid1 = buildShortUUID();
    const shortUuid2 = buildShortUUID();
    expect(shortUuid1).not.toBe(shortUuid2);
  });
});
