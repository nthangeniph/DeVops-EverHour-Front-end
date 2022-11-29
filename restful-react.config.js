const camelCase = require('camel-case');
// const BASE_URL = 'h-**********/ttp://10.21.3.90:8081';
const BASE_URL = 'http://localhost:8080/api-docs';
const ROOT_PATH = './src/api';

const API_LIST = [
  //app specific
  // 'InspectionFormTemplate',
  // 'AssetStoreAppointment',
  // 'AssetStore',
  //'Contracts',
  // 'Dashboard',
  //'InspectionBatchAssignment',
  // 'InspectionBatch',
  // 'InspectionProject',
  // 'RouteList',
  // 'InspectionTeam',
  //'Meter',
  // 'MeterBatch',
  // 'MeterBatchItem',
  // 'MeterBulkAction',
  // 'MeterCheckInOut',
  // 'PropertyGroup',
  //'PropertyInspection',
  // 'Supplier',
  // 'UtilityMeter',
  //'UtilityOrder',
  //'WorkOrderWorkflow',
  //'UtilityWorkOrder',
  //SHESHA
  // 'Person',
  // 'DepartmentUser',
  // 'OtpAuditItem',
  // 'NotificationMessage',
  // 'Maintenance',
  // 'EntityHistory',
  // 'EmailSender',
  // 'DataTable',
  // 'Account',
  // 'Area',
  // 'AuthorizationSettings',
  // 'Clickatell',
  // 'DeviceForceUpdate',
  // 'DeviceRegistration',
  // 'Framework',
  // 'Ldap',
  // 'MobileDevice',
  //'MeterException',
  // 'Note',
  // 'Notification',
  // 'NotificationTemplate',
  // 'Otp',
  // 'ReferenceList',
  //'ReportDesigner',
  //'ReportingReport',
 // 'ReportingReportParameter',
  // 'Role',
  // 'ScheduledJob',
  // 'ScheduledJobExecution',
  // 'ScheduledJobTrigger',
  // 'Session',
  // 'ShaRole',
  // 'ShaRoleAppointedPerson',
  // 'ShaUserLoginAttempts',
  // 'StoredFile',
  // 'Tenant',
  // 'TokenAuth',
  // 'User',
  // 'AuthorizationSettings',
  // 'Autocomplete',
  'DevOps',
  // 'Contracts',
  // 'Invoice',
  // 'Supplier',
  // 'ContractorServiceDelivered',
  // 'TaxRate',
  // 'Product',
  // 'SupplierPrice',
  // 'WorkOrderToServiceMapping',
  // 'PropertyInspectionToServiceMapping',
  // 'WorkOrderType',
  // 'ReferenceList',
  // 'ReferenceListItem',
  // 'UtilManSettings',
  // 'SmsSettings',
  // 'SmsGateways',
  // 'Clickatell',
  // 'Xml2Sms',
  // 'BulkSms',
  // 'SmsPortal',
  // 'PushSettings',
  // 'PushNotifiers',
];

function generateFetcher() {
  let apiObj = {};

  API_LIST.forEach(key => {
    
    const camelCasedName = camelCase(key);
    apiObj[`${camelCasedName}Api`] = {
      output: `${ROOT_PATH}/${camelCasedName}.tsx`,
      url: `${BASE_URL}/swagger/service:${key}/swagger.json`,
    };
  });

  return apiObj;
}

module.exports = {
  ...generateFetcher(),
};
