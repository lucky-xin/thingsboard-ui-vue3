#!/usr/bin/env python3

import os
import subprocess
import sys
import re
from langchain_openai import OpenAI
from langchain.prompts import PromptTemplate
from langchain_community.llms import Tongyi

def read_test_files():
  """读取测试文件列表"""
  test_file_list_path = os.path.abspath('all-test-file.txt')
  with open(test_file_list_path, 'r', encoding='utf-8') as f:
    test_files = [line.strip() for line in f.readlines()]
  return test_files


def get_src_file_path(test_file_path):
  """根据测试文件路径获取源文件路径"""
  # 移除test/前缀
  src_path = test_file_path.replace('test/', 'src/', 1)

  # 替换测试文件后缀
  if src_path.endswith('.test.ts'):
    src_path = src_path.replace('.test.ts', '.ts')
  elif src_path.endswith('.test.tsx'):
    src_path = src_path.replace('.test.tsx', '.tsx')
  elif src_path.endswith('.vue.test.ts'):
    src_path = src_path.replace('.vue.test.ts', '.vue')

  return src_path


def run_test(test_file_path, src_file_path):
  """执行测试命令"""
  cmd = [
    'npx',
    'vitest',
    'run',
    test_file_path,
    '--coverage',
    '--run',
    f'--coverage.include="{src_file_path}"'
  ]

  print(f"执行命令: {' '.join(cmd)}")

  try:
    result = subprocess.run(
      cmd,
      cwd=os.getcwd(),
      capture_output=True,
      text=True,
      timeout=300  # 5分钟超时
    )

    print("测试输出:")
    print(result.stdout)

    if result.stderr:
      print("错误输出:")
      print(result.stderr)

    # 解析测试结果和覆盖率
    parsed_result = parse_test_result(result.stdout, result.stderr, result.returncode)
    return parsed_result

  except subprocess.TimeoutExpired:
    print("测试执行超时")
    return {"passed": False, "coverage": 0, "failures": ["Test timeout"]}
  except Exception as e:
    print(f"执行测试时出错: {str(e)}")
    return {"passed": False, "coverage": 0, "failures": [str(e)]}


def parse_test_result(stdout, stderr, exit_code):
  """解析测试结果和覆盖率"""
  result = {
    "passed": False,
    "coverage": 0,
    "failures": [],
    "stdout": stdout,
    "stderr": stderr
  }

  # 检查是否所有测试都通过
  if 'passed' in stdout and 'failed' not in stdout:
    result["passed"] = True

  # 提取覆盖率信息
  coverage_match = re.search(r'All files\s+\|\s+\d+\.\d+\s+\|\s+(\d+\.\d+)', stdout)
  if coverage_match:
    result["coverage"] = float(coverage_match.group(1))

  return result


def fix_test_file(test_file_path, src_file_path, test_result):
  """修复测试文件"""
  print(f"修复测试文件: {test_file_path}")
  print(f"源文件: {src_file_path}")
  print(f"测试结果: {test_result}")

  # 读取测试文件内容
  with open(test_file_path, 'r', encoding='utf-8') as f:
    test_content = f.read()

  # 读取源文件内容
  with open(src_file_path, 'r', encoding='utf-8') as f:
    src_content = f.read()

  # 初始化LLM
  # 注意：在实际使用中，您需要设置阿里云API密钥
  # os.environ["DASHSCOPE_API_KEY"] = "your-api-key"
  llm = Tongyi(model_name="qwen3-coder-plus")  # 也可以是 qwen-plus, qwen-turbo
  # llm = OpenAI(api_key=os.getenv('DASHSCOPE_API_KEY'),
  #              base_url='https://dashscope.aliyuncs.com/compatible-mode/v1',
  #              model='qwen3-coder-plus',
  #              temperature=0.2)

  failure_analysis = ""
  coverage_analysis = ""

  # 1. 分析失败的测试用例
  if not test_result.get("passed", True):
    print("1. 分析失败的测试用例...")
    failure_analysis_prompt = PromptTemplate(
      input_variables=["test_content", "stdout", "stderr"],
      template="""
      请分析以下测试文件和测试输出，找出测试失败的原因：

      测试文件内容：
      {test_content}

      测试标准输出：
      {stdout}

      测试错误输出：
      {stderr}

      请提供以下信息：
      1. 哪些测试用例失败了？
      2. 失败的原因是什么？
      3. 如何修复这些失败的测试用例？
      """
    )

    failure_analysis = llm.invoke(failure_analysis_prompt.format(
      test_content=test_content,
      stdout=test_result.get("stdout", ""),
      stderr=test_result.get("stderr", "")
    ))
    print(f"失败测试分析结果:\n{failure_analysis}")

  # 2. 检查源代码覆盖率不足的部分
  if test_result.get("coverage", 100) < 90:
    print("2. 检查源代码覆盖率不足的部分...")
    coverage_analysis_prompt = PromptTemplate(
      input_variables=["src_content", "test_content", "coverage"],
      template="""
      请分析以下源代码和测试代码，找出覆盖率不足的部分：

      源代码：
      {src_content}

      测试代码：
      {test_content}

      当前覆盖率：{coverage}%

      请提供以下信息：
      1. 哪些代码分支或函数没有被测试覆盖？
      2. 为什么这些部分没有被覆盖？
      3. 需要添加哪些测试用例来提高覆盖率？
      """
    )

    coverage_analysis = llm.invoke(coverage_analysis_prompt.format(
      src_content=src_content,
      test_content=test_content,
      coverage=test_result.get("coverage", 0)
    ))
    print(f"覆盖率分析结果:\n{coverage_analysis}")

  # 3. 生成或修改测试用例以提高覆盖率
  print("3. 生成或修改测试用例以提高覆盖率...")
  test_generation_prompt = PromptTemplate(
    input_variables=["src_content", "test_content", "coverage_analysis", "failure_analysis"],
    template="""
    基于以下信息，生成或修改测试用例以提高覆盖率并修复失败的测试：

    源代码：
    {src_content}

    当前测试代码：
    {test_content}

    覆盖率分析结果：
    {coverage_analysis}

    失败测试分析结果：
    {failure_analysis}

    请提供修改后的完整测试文件代码，要求：
    1. 修复所有失败的测试用例
    2. 添加新的测试用例以提高覆盖率到90%以上
    3. 保持现有测试用例不变
    4. 只返回修改后的完整测试文件代码，不要包含其他说明
    """
  )

  generated_tests = llm.invoke(test_generation_prompt.format(
    src_content=src_content,
    test_content=test_content,
    coverage_analysis=coverage_analysis,
    failure_analysis=failure_analysis
  ))
  print(f"生成的测试用例:\n{generated_tests}")

  # 保存生成的测试用例到文件
  print("将生成的测试用例写入文件...")
  with open(test_file_path, 'w', encoding='utf-8') as f:
    f.write(generated_tests)
  print("测试用例已更新")

  # 4. 重新运行测试验证修复结果
  print("4. 重新运行测试验证修复结果...")
  new_result = run_test(test_file_path, src_file_path)
  print(f"修复后的测试结果: {'通过' if new_result['passed'] else '失败'}")
  print(f"修复后的覆盖率: {new_result['coverage']}%")

  return new_result


def process_test_files():
  """处理每个测试文件"""
  test_files = read_test_files()
  print(f"总共找到 {len(test_files)} 个测试文件")

  for i, test_file_path in enumerate(test_files):
    test_file_path = test_file_path.strip()
    print(f"\n[{i + 1}/{len(test_files)}] 处理测试文件: {test_file_path}")

    # 获取对应的源文件路径
    src_file_path = get_src_file_path(test_file_path)
    print(f"对应的源文件: {src_file_path}")

    # 执行测试命令
    try:
      result = run_test(test_file_path, src_file_path)
      print(f"测试结果: {'通过' if result['passed'] else '失败'}")
      print(f"覆盖率: {result['coverage']}%")

      # 检查测试结果和覆盖率
      if result['passed'] and result['coverage'] >= 90:
        print("✓ 测试通过且覆盖率达标")
        continue  # 进入下一个文件
      else:
        print("✗ 测试未通过或覆盖率不足90%，需要修复")
        # 调用修复函数
        try:
          fix_result = fix_test_file(test_file_path, src_file_path, result)
          if fix_result['passed'] and fix_result['coverage'] >= 90:
            print("✓ 修复成功，测试通过且覆盖率达标")
          else:
            print("✗ 修复后测试仍未通过或覆盖率不足")
        except Exception as e:
          print(f"修复过程中出错: {str(e)}")

    except Exception as error:
      print(f"执行测试时出错: {str(error)}")

  print("\n所有测试文件处理完成")


if __name__ == "__main__":
  try:
    process_test_files()
  except Exception as error:
    print(f"处理过程中发生错误: {error}")
    sys.exit(1)
