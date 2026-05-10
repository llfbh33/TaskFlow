const { sequelize } = require('./db/models');

async function setupSchema() {
  const schema = process.env.SCHEMA;

  const schemas = await sequelize.showAllSchemas({ logging: false });

  if (!schemas.includes(schema)) {
    await sequelize.createSchema(schema);
    console.log(`Created schema: ${schema}`);
  } else {
    console.log(`Schema already exists: ${schema}`);
  }

  await sequelize.close();
}

setupSchema().catch((err) => {
  console.error(err);
  process.exit(1);
});