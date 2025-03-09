import util = require('node:util');
import { exec } from 'node:child_process';
import { Connection } from '@salesforce/core';

const execPromise = util.promisify(exec);

export function isStandardField(apiName: string): boolean {
  return !apiName.endsWith('__c');
}

export function isStandardObject(apiName: string): boolean {
  return !(apiName.endsWith('__c') || isCustomMetadata(apiName) || isPlatformEvent(apiName));
}

export function isCustomMetadata(apiName: string): boolean {
  return apiName.endsWith('__mdt');
}

export function isPlatformEvent(apiName: string): boolean {
  return apiName.endsWith('__e');
}

export function getObjectFieldDeveloperName(fileName: string): string {
  const fieldSplitted = fileName.split('__');
  if (fieldSplitted.length > 2) {
    return fieldSplitted[1];
  } else {
    return fieldSplitted[0];
  }
}

export async function openUrl(url: string): Promise<void> {
  if (!url) {
    throw new Error('URL is empty');
  }
  const platform = process.platform;
  const command = platform === 'win32' ? 'start' : platform === 'darwin' ? 'open' : 'xdg-open';
  const completeCommand = `${command} "${url}"`;
  await execPromise(completeCommand);
}

// Helper function to get object ID using tooling API
export async function getObjectId(conn: Connection, objectName: string): Promise<string> {
  if (!objectName) {
    throw new Error('Object name is required');
  }
  if (isStandardObject(objectName)) {
    return objectName;
  } else {
    const records = await conn.tooling
      .sobject('CustomObject')
      .find({ DeveloperName: getObjectFieldDeveloperName(objectName) })
      .execute();

    if (records.length === 0) {
      throw new Error(`Object not found for ${objectName}`);
    }
    return records[0].Id as string;
  }
}
