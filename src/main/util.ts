/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import moment from 'moment';

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

export function timeFormat(
  time?: string | number | Date,
  format: string = 'YYYY-MM-DD HH:mm:ss'
) {
  return moment(time).format(format);
}
