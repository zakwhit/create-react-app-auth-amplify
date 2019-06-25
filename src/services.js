import Amplify from '@aws-amplify/core';
import Storage from '@aws-amplify/storage';

// REACT_APP_region='us-east-1'
// REACT_APP_userPoolId='us-east-1_0mOnsHACV'
// REACT_APP_userPoolWebClientId='1hijjndqts3ukuejqs4skmm3u2'
// REACT_APP_identityPoolId='us-east-1:4eaf2287-d9b0-4e4a-99e0-02c0cbf8431c'
// REACT_APP_Bucket_name='rnd-dl-v2'

export function configureAmplify() {
  Amplify.configure(
  {
   Auth: {
     identityPoolId: 'us-east-1:4eaf2287-d9b0-4e4a-99e0-02c0cbf8431c',
     region: 'us-east-1',
     userPoolId: 'us-east-1_0mOnsHACV',
     userPoolWebClientId: '1oi4k90a22jogpdqa7gto15nd4'
    },
  Storage: { 
     bucket: 'rnd-dl-v2',
     region: 'us-east-1',
     identityPoolId: 'us-east-1:4eaf2287-d9b0-4e4a-99e0-02c0cbf8431c'
    }
  }
 );
}
//Configure Storage with S3 bucket information
export function SetS3Config(bucket, level){
   Storage.configure({ 
          bucket: bucket,
          level: level,
          region: 'us-east-1',  
          identityPoolId: 'us-east-1:4eaf2287-d9b0-4e4a-99e0-02c0cbf8431c' 
       });
}