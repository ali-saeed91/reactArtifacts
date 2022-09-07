/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSubscriberList = /* GraphQL */ `
  mutation CreateSubscriberList(
    $input: CreateSubscriberListInput!
    $condition: ModelSubscriberListConditionInput
  ) {
    createSubscriberList(input: $input, condition: $condition) {
      id
      email
      userAgent
      clientIp
      subscribedDate
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateSubscriberList = /* GraphQL */ `
  mutation UpdateSubscriberList(
    $input: UpdateSubscriberListInput!
    $condition: ModelSubscriberListConditionInput
  ) {
    updateSubscriberList(input: $input, condition: $condition) {
      id
      email
      userAgent
      clientIp
      subscribedDate
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteSubscriberList = /* GraphQL */ `
  mutation DeleteSubscriberList(
    $input: DeleteSubscriberListInput!
    $condition: ModelSubscriberListConditionInput
  ) {
    deleteSubscriberList(input: $input, condition: $condition) {
      id
      email
      userAgent
      clientIp
      subscribedDate
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createUploadResume = /* GraphQL */ `
  mutation CreateUploadResume(
    $input: CreateUploadResumeInput!
    $condition: ModelUploadResumeConditionInput
  ) {
    createUploadResume(input: $input, condition: $condition) {
      id
      fullName
      email
      s3Location
      message
      firstName
      lastName
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateUploadResume = /* GraphQL */ `
  mutation UpdateUploadResume(
    $input: UpdateUploadResumeInput!
    $condition: ModelUploadResumeConditionInput
  ) {
    updateUploadResume(input: $input, condition: $condition) {
      id
      fullName
      email
      s3Location
      message
      firstName
      lastName
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteUploadResume = /* GraphQL */ `
  mutation DeleteUploadResume(
    $input: DeleteUploadResumeInput!
    $condition: ModelUploadResumeConditionInput
  ) {
    deleteUploadResume(input: $input, condition: $condition) {
      id
      fullName
      email
      s3Location
      message
      firstName
      lastName
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
