import * as path from 'node:path';
import { Connection } from '@salesforce/core';
import { Factory } from './Factory.js';
import { openUrl } from './metadataUtils.js';

export async function open(conn: Connection, pathString: string): Promise<string> {
  if (!conn || !pathString) {
    throw new Error('Connection or pathString is empty');
  }

  const pathParsed = path.parse(pathString);
  const extension = getExtension(pathParsed.base);
  const metadata = new Factory().create(conn, extension, pathParsed);
  const url = await metadata.getUrl();

  if (!url) {
    throw new Error('URL is empty');
  }

  const targetUrl = encodeURIComponent(url);

  const completeUrl = `${conn.instanceUrl}/secur/frontdoor.jsp?sid=${conn.accessToken}&retURL=${targetUrl}`;

  await openUrl(completeUrl);

  return `${conn.instanceUrl}/${targetUrl}`;
}

function getExtension(pathParsedBase: string): string {
  const fileNameSplitted = pathParsedBase.split('.');

  if (fileNameSplitted.length > 2) {
    return `${fileNameSplitted[fileNameSplitted.length - 2]}.${fileNameSplitted[fileNameSplitted.length - 1]}`;
  } else {
    return fileNameSplitted[fileNameSplitted.length - 1];
  }
}
