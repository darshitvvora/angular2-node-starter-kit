const moment = require('moment');
const useragent = require('useragent');
const sequelize = require('sequelize');
const geoip = require('geoip-lite');

const logger = require('../logger');

function sessionLogger (options = {}) {
  const { db, sessionTime = 30 } = options;
  let creatingSession = false;

  return async function sessionLogger (req, res) {
    try {
      if (!db || !req.user) return;

      const sessionId = req.cookies.sessionId || 0;
      console.log(moment().subtract(sessionTime, 'm'));
      const userSession = await db.findOne({
        attributes: ['id', 'updated_on'],
        where: {
          id: sessionId,
          updated_on: {
            [sequelize.Op.gte]: new Date(moment().subtract(sessionTime, 'm')),
          },
        },
        order: [['id', 'desc']],
      });

      if (userSession) {
        await db.update({
          updated_on: new Date(),
        }, {
          where: {
            id: userSession.id,
          }
        });
      } else {
        if (creatingSession) return true;

        creatingSession = true;
        const ua = req.headers['user-agent'];

        const agent = useragent.parse(ua);

        const newSession = { user_id: req.user.id };

        if (agent) {
          Object.assign(newSession, {
            browser: agent.toAgent(),
            os: agent.os.toString(),
            device: agent.device.toString(),
          });
        }

        const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).split(',')[0];

        newSession.ip = ip;
        const geo = geoip.lookup(ip);

        if (geo) {
          const { country, region, city, ll, metro, zip } = geo;
          const [latitude, longitude] = ll;
          Object.assign(newSession, { latitude,
            longitude,
            country,
            region,
            city,
            metro,
            zip,
          });
        }

        const { id } = await db.create(newSession);
        creatingSession = false;
        res.cookie('sessionId', id, { overwrite: true, maxAge: 3600000 });
        return true;
      }
    } catch (err) {
      logger.error(err);
      return true;
    }
  }
}

module.exports = sessionLogger;
