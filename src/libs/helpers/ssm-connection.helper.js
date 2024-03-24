const { SSMClient, GetParameterCommand } = require("@aws-sdk/client-ssm");

class SsmSingletonConnection {
  static instance = null;
  ssmConnection = null;
  cache = {};

  constructor() {
    this.ssmConnection = new SSMClient({ region: process.env.AWS_REGION });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new SsmSingletonConnection();
    }

    return this.instance;
  }

  async getParameter(name, withDecryption = true) {
    if (this.cache.hasOwnProperty(name)) {
      return this.cache[name];
    }

    try {
      const paramStoreData = {
        Name: name,
        WithDecryption: withDecryption,
      };
      const command = new GetParameterCommand(paramStoreData);
      const result = await this.ssmConnection.send(command);

      const value = result.Parameter.Value;
      this.cache[name] = value;

      return value;
    } catch (error) {
      console.error(`Error fetching parameter ${name}:`, error);
      return null;
    }
  }
}

module.exports = SsmSingletonConnection;
