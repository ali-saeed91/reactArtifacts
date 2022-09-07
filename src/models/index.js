// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { SubscriberList, UploadResume } = initSchema(schema);

export {
  SubscriberList,
  UploadResume
};