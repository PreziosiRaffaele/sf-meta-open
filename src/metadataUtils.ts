import { spawn } from 'node:child_process';
import { Connection } from '@salesforce/core';

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
  return new Promise((resolve, reject) => {
    const platform = process.platform;
    let command: string;

    if (platform === 'win32') {
      command = 'start';
    } else if (platform === 'darwin') {
      command = 'open';
    } else {
      command = 'xdg-open';
    }

    const child = spawn(command, [url], { shell: true });

    child.on('error', (error) => {
      reject(error);
    });

    child.on('close', () => {
      resolve();
    });
  });
}

// Helper function to get object ID using tooling API
export async function getObjectId(conn: Connection, objectName: string): Promise<string> {
  const records = await conn.tooling
    .sobject('CustomObject')
    .find({ DeveloperName: getObjectFieldDeveloperName(objectName) })
    .execute();

  if (records.length === 0) {
    throw new Error(`Object not found for ${objectName}`);
  }
  return records[0].Id as string;
}
