/**
 * GET /anode -> getMultiple()
 * POST /anode -> create()
 * PUT /anode/:id -> update()
 * DELETE /anode/:id -> remove()
 */

const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const helmet = require("helmet");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank
        FROM freactanode LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function create(freactanode) {
  const { name, released_year, githut_rank, pypl_rank, tiobe_rank } =
    freactanode;
  const nameStr = JSON.stringify(name);
  const result = await db.query(
    `INSERT INTO freactanode
    (name, released_year, githut_rank, pypl_rank, tiobe_rank)
    VALUES
    (${nameStr}, ${released_year}, ${githut_rank}, ${pypl_rank}, ${tiobe_rank})`
  );

  let message = "Error in creating anode";

  if (result.affectedRows) {
    message = "freactanode created successfully";
  }

  return { message };
}

async function update(id, freactanode) {
  const { name, released_year, githut_rank, pypl_rank, tiobe_rank } =
    freactanode;
  const nameStr = JSON.stringify(name);
  const result = await db.query(
    `UPDATE freactanode
    SET name=${nameStr}, released_year=${released_year}, githut_rank=${githut_rank},
    pypl_rank=${pypl_rank}, tiobe_rank=${tiobe_rank}
    WHERE id=${id}`
  );

  let message = "Error in updating freactanode";

  if (result.affectedRows) {
    message = "freactanode updated successfully";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(`DELETE FROM freactanode WHERE id=${id}`);
  console.log(result);
  let message = "Error in deleting freactanode";

  if (result.affectedRows) {
    message = "freactanode deleted successfully";
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
};
