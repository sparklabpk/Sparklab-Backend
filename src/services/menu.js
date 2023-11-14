var oracledb = require('oracledb');
oracledb.autoCommit = true;

const menuList = async (id) => {
  const connection = await oracledb.getConnection({
    user: "sparklab", 
    password: "Iphone10", 
    connectString: "172.16.3.250:1521/emrep"
  });
  const result = await connection.execute(`select * from sparklab.vu_user_menu_info where USER_ID = '${id}'`,{}, { outFormat: oracledb.OBJECT });
  return result.rows;
};

module.exports = { menuList };