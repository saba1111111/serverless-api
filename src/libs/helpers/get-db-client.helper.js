const SsmSingletonConnection = require("./ssm-connection.helper");
const { neon, neonConfig } = require("@neondatabase/serverless");
const DATABASE_URL_SSM_PARAM = require("../constants/index");

async function getDbClient() {
  const smsStore = SsmSingletonConnection.getInstance();
  const DATABASE_URL = await smsStore.getParameter(DATABASE_URL_SSM_PARAM);

  neonConfig.fetchConnectionCache = true;
  return neon(DATABASE_URL);
}

module.exports = getDbClient;
