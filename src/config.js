export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    BUCKET: "conferences-target-uploads"
  },
  apiGateway: {
    URL: "https://zfhd0timo5.execute-api.us-east-1.amazonaws.com/prod",
    REGION: "us-east-1"
  },
  cognito: {
    USER_POOL_ID: "us-east-1_3BhCq6WYk",
    APP_CLIENT_ID: "51jpu0pfjjbt0d7hra4n8tmk4h",
    REGION: "us-east-1",
    IDENTITY_POOL_ID: "us-east-1:31cbf72e-d12c-44b5-88a9-095f5a6de03b"
  }
};
