const express = require("express");
const router = express.Router();
const anode = require("../services/anode");

/*GET anode*/
router.get("/", async function (req, res, next) {
  try {
    res.json(await anode.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting anode`, err.message);
    next(err);
  }
});

/* POST anode */
router.post("/", async function (req, res, next) {
  try {
    res.json(await anode.create(req.body));
  } catch (err) {
    console.error(`Error while creating anode`, err.message);
    next(err);
  }
});

/* PUT anode */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await anode.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating anode`, err.message);
    next(err);
  }
});

/* DELETE anode */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await anode.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting anode`, err.message);
    next(err);
  }
});

module.exports = router;
