/**
 * 复制文本
 *
 * @param value 点击复制的内容
 * @param msg 复制成功的提示内容
 */
export function copyToClipboard(value: string) {
  const input = document.createElement('input');
  input.value = value;
  document.body.append(input);
  input.select();
  document.execCommand('copy');
  input.remove();
}

/**
 * 字节转换
 *
 * @param bytes 字节大小
 */
export function convertBytesToSize(bytes: number) {
  const sizes = ['b', 'Kb', 'Mb', 'Gb', 'Tb']; // 存储单位的数组
  if (bytes === 0) {
    return '0 b';
  }
  if (!Number.isFinite(bytes) || bytes < 0) {
    throw new Error(
      'Invalid byte value. It must be a non-negative finite number.',
    );
  }
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${Number(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
}

export const REGULAR_HTML_ENCODE =
  /["&'<>\u0000-\u0020\u007F-\u00FF\u0100-\u2700]/g;

export function encodeHtml(s: any) {
  return typeof s === 'string'
    ? s.replaceAll(REGULAR_HTML_ENCODE, ($0) => {
        let c = $0.codePointAt(0);
        const r = ['&#'];
        c = c === 0x20 ? 0xa0 : c;
        r.push(c, ';');
        return r.join('');
      })
    : s;
}
