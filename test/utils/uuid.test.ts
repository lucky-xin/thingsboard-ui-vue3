import { describe, it, expect } from 'vitest';
import { buildUUID, buildShortUUID } from '../../src/utils/uuid';

describe('utils/uuid', () => {
  it('should generate valid UUID', () => {
    const uuid = buildUUID();
    expect(uuid).toBeTypeOf('string');
    expect(uuid).toHaveLength(32);
  });

  it('should generate unique UUIDs', () => {
    const uuid1 = buildUUID();
    const uuid2 = buildUUID();
    expect(uuid1).not.toBe(uuid2);
  });

  it('should generate short UUID with prefix', () => {
    const shortUUID = buildShortUUID('test');
    expect(shortUUID).toBeTypeOf('string');
    expect(shortUUID).toContain('test_');
  });
});