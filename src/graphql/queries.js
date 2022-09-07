/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSubscriberList = /* GraphQL */ `
  query GetSubscriberList($id: ID!) {
    getSubscriberList(id: $id) {
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
export const listSubscriberLists = /* GraphQL */ `
  query ListSubscriberLists(
    $filter: ModelSubscriberListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubscriberLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncSubscriberLists = /* GraphQL */ `
  query SyncSubscriberLists(
    $filter: ModelSubscriberListFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSubscriberLists(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getUploadResume = /* GraphQL */ `
  query GetUploadResume($id: ID!) {
    getUploadResume(id: $id) {
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
export const listUploadResumes = /* GraphQL */ `
  query ListUploadResumes(
    $filter: ModelUploadResumeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUploadResumes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncUploadResumes = /* GraphQL */ `
  query SyncUploadResumes(
    $filter: ModelUploadResumeFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUploadResumes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
