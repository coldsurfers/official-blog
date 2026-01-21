// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

const dotenv = require('dotenv');

dotenv.config({
  path: '.env',
});

const name = 'official-blog';

export default $config({
  app(input) {
    if (!process.env.SST_PROVIDERS_AWS_PROFILE) {
      throw new Error('invalid env');
    }
    return {
      name,
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws',
      providers: {
        aws: {
          region: 'ap-northeast-2',
          profile: process.env.SST_PROVIDERS_AWS_PROFILE,
        },
      },
    };
  },
  async run() {
    if (!process.env.SST_DOMAIN_NAME || !process.env.SST_DOMAIN_CERT_ARN) {
      throw new Error('invalid env');
    }
    new sst.aws.Nextjs(name, {
      domain: {
        name: process.env.SST_DOMAIN_NAME,
        cert: process.env.SST_DOMAIN_CERT_ARN,
      },
    });
  },
});
