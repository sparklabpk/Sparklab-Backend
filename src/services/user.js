var oracledb = require('oracledb');
oracledb.autoCommit = true;


const orgList = async () => {
  const connection = await oracledb.getConnection({
    user: "sparklab", 
    password: "Iphone10", 
    connectString: "172.16.3.250:1521/emrep"
  });
  const result = await connection.execute(`select org_id, description, default_loc_id, active, website, logo, copy_right, rowid from sparklab.organization`,
  {}, { outFormat: oracledb.OBJECT });
  return result.rows;
};

const ifEmailExists = async (email) => {
  const connection = await oracledb.getConnection({
    user: "sparklab", 
    password: "Iphone10", 
    connectString: "172.16.3.250:1521/emrep"
  });
  const result = await connection.execute(`
  select t.user_id, t.user_name from sparklab.user_info t where t.user_name = '${email}'
  `,
  {}, { outFormat: oracledb.OBJECT });
  return result.rows[0];
};

const getLastUserId = async () => {
    const connection = await oracledb.getConnection({
      user: "sparklab", 
      password: "Iphone10", 
      connectString: "172.16.3.250:1521/emrep"
    });
    const result = await connection.execute(`
    select max(user_id) AS LastUserId from sparklab.USER_INFO
    `,
    {}, { outFormat: oracledb.OBJECT });
    return result.rows[0].LASTUSERID;
};


const createUser = async (userid, name, email, password, organization) => {
  
  const connection = await oracledb.getConnection({
    user: "sparklab", 
    password: "Iphone10", 
    connectString: "172.16.3.250:1521/emrep"
  });
  const result = await connection.execute(`
    INSERT INTO sparklab.USER_INFO
    (
        user_id, 
        user_name, 
        user_password, 
        user_full_name, 
        org_id, 
        loc_id, 
        active
    )
    VALUES
    (
        'U${userid}', 
        '${email}', 
        '${password}', 
        '${name}', 
        '${organization}', 
        '000', 
        'Y'
    )
  `,
  {}, { outFormat: oracledb.OBJECT });
  return result.rows;
};

module.exports = { orgList, ifEmailExists, getLastUserId, createUser };