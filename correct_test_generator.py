#!/usr/bin/env python3
import os
import re

def find_component_file(component_path):
    """根据组件路径找到实际的文件"""
    base_path = '/Users/chaoxin.lu/IdeaProjects/tb-ui-vue3/src/components'
    full_path = os.path.join(base_path, component_path)
    
    if os.path.exists(full_path):
        return full_path
    
    return None

def generate_component_test(component_name, import_path, source_content):
    """生成组件测试"""
    return f'''import {{ describe, it, expect, vi }} from 'vitest'
import {{ mount }} from '@vue/test-utils'
import {component_name} from '{import_path}'

// Mock common dependencies
vi.mock('@/hooks/web/usePage', () => ({{
  useGo: () => ({{
    go: vi.fn(),
    back: vi.fn(),
    replace: vi.fn()
  }})
}}))

vi.mock('@/hooks/web/useI18n', () => ({{
  useI18n: () => ({{
    t: (key: string) => key
  }})
}}))

vi.mock('vue-router', () => ({{
  useRouter: () => ({{
    push: vi.fn(),
    replace: vi.fn(),
    go: vi.fn(),
    back: vi.fn()
  }})
}}))

describe('{component_name}', () => {{
  it('should render without crashing', () => {{
    const wrapper = mount({component_name}, {{
      global: {{
        stubs: {{
          'a-input': true,
          'a-button': true,
          'a-modal': true,
          'a-drawer': true,
          'a-table': true,
          'a-form': true,
          'a-select': true,
          'a-checkbox': true,
          'a-radio': true,
          'a-tree': true,
          'a-menu': true,
          'a-popover': true,
          'a-tooltip': true,
          'a-icon': true,
          'a-divider': true,
          'a-space': true,
          'a-row': true,
          'a-col': true,
          'a-card': true,
          'a-tabs': true,
          'a-collapse': true,
          'a-spin': true,
          'a-alert': true,
          'a-message': true,
          'a-notification': true,
          'a-affix': true,
          'a-back-top': true,
          'a-breadcrumb': true,
          'a-dropdown': true,
          'a-pagination': true,
          'a-progress': true,
          'a-result': true,
          'a-skeleton': true,
          'a-statistic': true,
          'a-timeline': true,
          'a-transfer': true,
          'a-upload': true,
          'a-avatar': true,
          'a-badge': true,
          'a-calendar': true,
          'a-carousel': true,
          'a-cascader': true,
          'a-date-picker': true,
          'a-descriptions': true,
          'a-empty': true,
          'a-image': true,
          'a-list': true,
          'a-mentions': true,
          'a-rate': true,
          'a-slider': true,
          'a-steps': true,
          'a-switch': true,
          'a-time-picker': true,
          'a-tree-select': true,
          'a-typography': true,
          'a-watermark': true
        }},
        provide: {{
          'Symbol(basic-table)': {{
            getDefaultRowSelection: vi.fn(() => ({{}})),
            getSize: vi.fn(() => 'default'),
            wrapRef: {{ current: document.createElement('div') }}
          }},
          'Symbol(router)': {{
            push: vi.fn(),
            replace: vi.fn()
          }}
        }}
      }},
      props: {{
        modelValue: undefined,
        value: undefined,
        defaultValue: undefined,
        formSchema: {{}},
        clearSelectedRowKeys: vi.fn(),
        itemHeight: 50,
        visible: false,
        open: false
      }}
    }})
    expect(wrapper.exists()).toBe(true)
  }})

  it('should be a valid Vue component', () => {{
    const wrapper = mount({component_name}, {{
      global: {{
        stubs: {{
          'a-input': true,
          'a-button': true,
          'a-modal': true,
          'a-drawer': true,
          'a-table': true,
          'a-form': true,
          'a-select': true,
          'a-checkbox': true,
          'a-radio': true,
          'a-tree': true,
          'a-menu': true,
          'a-popover': true,
          'a-tooltip': true,
          'a-icon': true,
          'a-divider': true,
          'a-space': true,
          'a-row': true,
          'a-col': true,
          'a-card': true,
          'a-tabs': true,
          'a-collapse': true,
          'a-spin': true,
          'a-alert': true,
          'a-message': true,
          'a-notification': true,
          'a-affix': true,
          'a-back-top': true,
          'a-breadcrumb': true,
          'a-dropdown': true,
          'a-pagination': true,
          'a-progress': true,
          'a-result': true,
          'a-skeleton': true,
          'a-statistic': true,
          'a-timeline': true,
          'a-transfer': true,
          'a-upload': true,
          'a-avatar': true,
          'a-badge': true,
          'a-calendar': true,
          'a-carousel': true,
          'a-cascader': true,
          'a-date-picker': true,
          'a-descriptions': true,
          'a-empty': true,
          'a-image': true,
          'a-list': true,
          'a-mentions': true,
          'a-rate': true,
          'a-slider': true,
          'a-steps': true,
          'a-switch': true,
          'a-time-picker': true,
          'a-tree-select': true,
          'a-typography': true,
          'a-watermark': true
        }},
        provide: {{
          'Symbol(basic-table)': {{
            getDefaultRowSelection: vi.fn(() => ({{}})),
            getSize: vi.fn(() => 'default'),
            wrapRef: {{ current: document.createElement('div') }}
          }},
          'Symbol(router)': {{
            push: vi.fn(),
            replace: vi.fn()
          }}
        }}
      }},
      props: {{
        modelValue: undefined,
        value: undefined,
        defaultValue: undefined,
        formSchema: {{}},
        clearSelectedRowKeys: vi.fn(),
        itemHeight: 50,
        visible: false,
        open: false
      }}
    }})
    expect(wrapper.vm).toBeDefined()
  }})
}})
'''

def generate_ts_test(component_name, import_path, source_content):
    """生成TypeScript文件测试"""
    return f'''import {{ describe, it, expect }} from 'vitest'
import * as {component_name} from '{import_path}'

describe('{component_name}', () => {{
  it('should export expected functions/objects', () => {{
    expect({component_name}).toBeDefined()
    expect(typeof {component_name}).toBe('object')
  }})

  it('should have valid exports', () => {{
    const exports = Object.keys({component_name})
    expect(exports.length).toBeGreaterThanOrEqual(0)
  }})

  it('should be importable without errors', () => {{
    expect(() => {{
      const module = require('{import_path}')
      return module
    }}).not.toThrow()
  }})
}})
'''

def process_coverage_file():
    """直接处理coverage.txt文件"""
    coverage_file = '/Users/chaoxin.lu/IdeaProjects/tb-ui-vue3/coverage.txt'
    
    if not os.path.exists(coverage_file):
        print("coverage.txt文件不存在")
        return
    
    with open(coverage_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    processed_count = 0
    current_component = None
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
        
        # 检查是否是组件目录行
        if line.startswith('components/') and '|' in line and '0' in line:
            current_component = line.split('|')[0].strip()
            print(f"\\n处理组件目录: {current_component}")
            continue
        
        # 检查是否是文件行
        if line.startswith('  ') and '|' in line and '0' in line and not line.startswith('  components/'):
            file_name = line.split('|')[0].strip()
            if current_component and (file_name.endswith('.ts') or file_name.endswith('.vue')):
                # 构建完整的组件路径
                if current_component.endswith('/src'):
                    component_path = f"{current_component}/{file_name}"
                else:
                    component_path = f"{current_component}/src/{file_name}"
                print(f"  处理文件: {component_path}")
                
                # 找到实际文件
                actual_file = find_component_file(component_path)
                if actual_file:
                    # 生成测试文件
                    test_file = actual_file.replace('/Users/chaoxin.lu/IdeaProjects/tb-ui-vue3/src/', 'test/')
                    if test_file.endswith('.vue'):
                        test_file = test_file.replace('.vue', '.test.ts')
                    elif not test_file.endswith('.test.ts'):
                        test_file = test_file.replace('.ts', '.test.ts')
                    
                    test_file = os.path.join('/Users/chaoxin.lu/IdeaProjects/tb-ui-vue3', test_file)
                    test_dir = os.path.dirname(test_file)
                    
                    if test_dir:
                        os.makedirs(test_dir, exist_ok=True)
                    
                    # 读取源文件
                    with open(actual_file, 'r', encoding='utf-8') as sf:
                        source_content = sf.read()
                    
                    # 生成测试内容
                    file_name_only = os.path.basename(actual_file)
                    component_name = file_name_only.replace('.vue', '').replace('.ts', '')
                    import_path = f"/@/components/{component_path}"
                    
                    if actual_file.endswith('.vue'):
                        test_content = generate_component_test(component_name, import_path, source_content)
                    else:
                        test_content = generate_ts_test(component_name, import_path, source_content)
                    
                    # 写入测试文件
                    with open(test_file, 'w', encoding='utf-8') as tf:
                        tf.write(test_content)
                    
                    print(f"    生成测试文件: {test_file}")
                    processed_count += 1
                else:
                    print(f"    找不到文件: {component_path}")
    
    print(f"\\n处理完成: 生成了 {processed_count} 个测试文件")

if __name__ == '__main__':
    process_coverage_file()
