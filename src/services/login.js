var oracledb = require('oracledb');
oracledb.autoCommit = true;

const loginUser = async (email, password) => {
  const result = await ifUserExists(email);
  if (result.rows.length > 0) {
    const user = result.rows[0];
    if (password === user.USER_PASSWORD) {
      return { ...user };
    }
  }
  return false;
};

const ifUserExists = async (email) => {
    const connection = await oracledb.getConnection({
      user: "sparklab", 
      password: "Iphone10", 
      connectString: "172.16.3.250:1521/emrep"
    });
    const result = await connection.execute(`
    select t.user_id, t.user_name, t.user_password, t.user_full_name, t.org_id, t.loc_id, t.active 
from sparklab.user_info t where t.user_name = '${email}'
    `,{}, { outFormat: oracledb.OBJECT });
    return result;
};

module.exports = { loginUser };