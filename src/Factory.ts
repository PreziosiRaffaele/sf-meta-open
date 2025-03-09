import * as path from 'node:path';
import { Connection } from '@salesforce/core';
import { Metadata } from './Metadata.js';
import { ApprovalProcess } from './metadata/ApprovalProcess.js';
import { SObject } from './metadata/SObject.js';
import { GlobalValueSet } from './metadata/GlobalValueSet.js';
import { Flow } from './metadata/Flow.js';
import { Field } from './metadata/Field.js';
import { ValidationRule } from './metadata/ValidationRule.js';
import { FlexiPage } from './metadata/FlexiPage.js';
import { Profile } from './metadata/Profile.js';
import { PermissionSet } from './metadata/PermissionSet.js';
import { PermissionSetGroup } from './metadata/PermissionSetGroup.js';
import { ApexClass } from './metadata/ApexClass.js';
import { ApexTrigger } from './metadata/ApexTrigger.js';
import { RecordType } from './metadata/RecordType.js';
import { PageLayout } from './metadata/PageLayout.js';
import { QuickAction } from './metadata/QuickAction.js';

export class Factory {
  // eslint-disable-next-line class-methods-use-this
  public create = (conn: Connection, extension: string, pathParsed: path.ParsedPath): Metadata => {
    if (!conn || !extension || !pathParsed) {
      throw new Error('Invalid parameters');
    }
    let metadata: Metadata;
    if (extension === 'flow-meta.xml') {
      metadata = new Flow(conn, extension, pathParsed);
    } else if (extension === 'field-meta.xml') {
      metadata = new Field(conn, extension, pathParsed);
    } else if (extension === 'validationRule-meta.xml') {
      metadata = new ValidationRule(conn, extension, pathParsed);
    } else if (extension === 'flexipage-meta.xml') {
      metadata = new FlexiPage(conn, extension, pathParsed);
    } else if (extension === 'profile-meta.xml') {
      metadata = new Profile(conn, extension, pathParsed);
    } else if (extension === 'permissionset-meta.xml') {
      metadata = new PermissionSet(conn, extension, pathParsed);
    } else if (extension === 'permissionsetgroup-meta.xml') {
      metadata = new PermissionSetGroup(conn, extension, pathParsed);
    } else if (extension === 'cls') {
      metadata = new ApexClass(conn, extension, pathParsed);
    } else if (extension === 'trigger') {
      metadata = new ApexTrigger(conn, extension, pathParsed);
    } else if (extension === 'recordType-meta.xml') {
      metadata = new RecordType(conn, extension, pathParsed);
    } else if (extension === 'layout-meta.xml') {
      metadata = new PageLayout(conn, extension, pathParsed);
    } else if (extension === 'object-meta.xml') {
      metadata = new SObject(conn, extension, pathParsed);
    } else if (extension === 'globalValueSet-meta.xml') {
      metadata = new GlobalValueSet(conn, extension, pathParsed);
    } else if (extension === 'quickAction-meta.xml') {
      metadata = new QuickAction(conn, extension, pathParsed);
    } else if (extension === 'approvalProcess-meta.xml') {
      metadata = new ApprovalProcess(conn, extension, pathParsed);
    } else {
      throw new Error('Unsupported metadata type');
    }

    return metadata;
  };
}
