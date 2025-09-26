import { describe, it, expect, vi } from 'vitest';
import { CodeEditor, JsonPreview } from '/@/components/CodeEditor';

describe('CodeEditor/index', () => {
  describe('CodeEditor component', () => {
    it('should export CodeEditor component', () => {
      expect(CodeEditor).toBeDefined();
      expect(typeof CodeEditor).toBe('object');
    });

    it('should have install method from withInstall', () => {
      expect(CodeEditor.install).toBeDefined();
      expect(typeof CodeEditor.install).toBe('function');
    });

    it('should have component name or __name', () => {
      expect(CodeEditor.name || CodeEditor.__name).toBeTruthy();
    });

    it('should be a Vue component', () => {
      // Vue 3 components have either setup, render, or template
      expect(CodeEditor.setup || CodeEditor.render || CodeEditor.template).toBeTruthy();
    });

    it('should install component correctly', () => {
      const mockApp = {
        component: vi.fn(),
      };
      
      CodeEditor.install(mockApp);
      expect(mockApp.component).toHaveBeenCalledWith(CodeEditor.name || CodeEditor.__name, CodeEditor);
    });
  });

  describe('JsonPreview component', () => {
    it('should export JsonPreview component', () => {
      expect(JsonPreview).toBeDefined();
      expect(typeof JsonPreview).toBe('object');
    });

    it('should have install method from withInstall', () => {
      expect(JsonPreview.install).toBeDefined();
      expect(typeof JsonPreview.install).toBe('function');
    });

    it('should have component name or __name', () => {
      expect(JsonPreview.name || JsonPreview.__name).toBeTruthy();
    });

    it('should be a Vue component', () => {
      // Vue 3 components have either setup, render, or template
      expect(JsonPreview.setup || JsonPreview.render || JsonPreview.template).toBeTruthy();
    });

    it('should install component correctly', () => {
      const mockApp = {
        component: vi.fn(),
      };
      
      JsonPreview.install(mockApp);
      expect(mockApp.component).toHaveBeenCalledWith(JsonPreview.name || JsonPreview.__name, JsonPreview);
    });
  });

  describe('Type exports', () => {
    it('should export types from typing module', async () => {
      // Test that types can be imported without errors
      const module = await import('/@/components/CodeEditor');
      expect(module).toBeDefined();
      // The types are exported, which means they're available for import
      expect(module.CodeEditor).toBeDefined();
      expect(module.JsonPreview).toBeDefined();
    });
  });
});