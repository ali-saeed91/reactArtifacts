import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class SubscriberList {
  readonly id: string;
  readonly email: string;
  readonly userAgent?: string | null;
  readonly clientIp?: string | null;
  readonly subscribedDate?: string | null;
  constructor(init: ModelInit<SubscriberList>);
  static copyOf(source: SubscriberList, mutator: (draft: MutableModel<SubscriberList>) => MutableModel<SubscriberList> | void): SubscriberList;
}

export declare class UploadResume {
  readonly id: string;
  readonly fullName: string;
  readonly email: string;
  readonly s3Location: string;
  readonly message: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  constructor(init: ModelInit<UploadResume>);
  static copyOf(source: UploadResume, mutator: (draft: MutableModel<UploadResume>) => MutableModel<UploadResume> | void): UploadResume;
}