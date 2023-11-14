var oracledb = require('oracledb');
oracledb.autoCommit = true;

const changePassword = async (id, password) => {
  const connection = await oracledb.getConnection({
    user: "sparklab", 
    password: "Iphone10", 
    connectString: "172.16.3.250:1521/emrep"
  });
  const result = await connection.execute(`
    UPDATE sparklab.USER_INFO R
    SET R.USER_PASSWORD = '${password}'
    where R.USER_ID = '${id}'
  `,{}, { outFormat: oracledb.OBJECT });
  return result;
};

module.exports = { changePassword };