const Normalizr = require('normalizr');
const schema = Normalizr.schema;

const site = new schema.Entity('sites', {});

const publisher = new schema.Entity('publisher', {
  sites: [site]
});

module.exports = publisher;