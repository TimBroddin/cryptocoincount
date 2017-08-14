const randomString = require("randomstring");
const moment = require("moment");

const syncPost = (Sync) =>  (req, res) => {
  const { data } = req.body;

  if(!typeof data === 'String' || !data) {
    res.sendStatus(500);
    return;
  }

  const code = randomString.generate({
    length: 6,
    charset: "alphabetic",
    capitalization: "uppercase"
  });
  const expires = new moment().add(2, 'minutes').toDate()

  const item = new Sync({ data, code, expires});

  item.save().then(() => {
    res.send({ code });
  }).catch((err) => {
    res.send(err);
  });
};

const syncGet = (Sync) => (req, res) => {
  const { code } = req.params;

  Sync.findOne({ code }).then((row) => {
    res.send(row.data);
  }).catch(() => {
    res.sendStatus(404);
    return;
  })
};

module.exports = { syncPost, syncGet }
