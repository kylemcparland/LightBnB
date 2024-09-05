// INITIALIZE NODE-POSTGRES:
const { Pool } = require("pg");
const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "lightbnb"
});

// LOG QUERIES:
const query = async(text, params) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('executed query', {text, duration, rows: res.rowCount });

  return res;
};

// LOG CLIENT:
const getClient = async() => {
  const client = await pool.connect();
  const query = client.query;
  const release = client.release;

  const timeout = setTimeout(() => {
    console.error('A client has been checked out for more than 5 seconds!');
    console.error(`The last executed query on this client was: ${client.lastQuery}`);
  }, 5000);

  client.query = (...args) => {
    client.lastQuery = args;
    return query.apply(client, args);
  };

  client.release = () => {
    clearTimeout(timeout);

    client.query = query;
    client.release = release;
    return release.apply(client);
  };
  return client;
};


/// --- USERS --- ///

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const lowerCaseEmail = email.toLowerCase();

  return query(`SELECT * FROM users WHERE email = $1;`, [lowerCaseEmail])
    .then(result => result.rows.length ? result.rows[0] : null)
    .catch(err => {
      console.error('Error fetching user by email: ', err.message);
      return err;
    });
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return query(`SELECT * FROM users WHERE id = $1;`, [id])
    .then(result => result.rows.length ? result.rows[0] : null)
    .catch(err => {
      console.error('Error fetching user by ID: ', err.message);
      return err;
    });
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  const { name, email, password } = user;
  const lowerCaseEmail = email.toLowerCase();

  return query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;`,
    [name, lowerCaseEmail, password])
    .then(result => result.rows[0])
    .catch(err => {
      console.error('Error adding user: ', err.message);
      return err;
    });
};


/// --- RESERVATIONS --- ///

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return query(`
    SELECT reservations.id, properties.title, properties.cost_per_night, properties.number_of_bedrooms, properties.number_of_bathrooms, 
      properties.parking_spaces, properties.thumbnail_photo_url, reservations.start_date, AVG(property_reviews.rating) AS average_rating
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON property_reviews.property_id = properties.id
    WHERE reservations.guest_id = $1
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date
    LIMIT $2;`,
    [guest_id, limit])
    .then(result => result.rows)
    .catch(err => {
      console.error('Error fetching reservations: ', err.message);
      return err;
    });
};


/// --- PROPERTIES --- ///

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];

  // Initialize Query...
  let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
    WHERE 1=1 `;

  // Owner ID...
  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryString += `AND owner_id = $${queryParams.length} `;
  }

  // City...
  if (options.city) {
    const searchCity = options.city.trim();
    queryParams.push(`%${searchCity}%`);
    queryString += `AND city LIKE $${queryParams.length} `;
  }

  // Min Price...
  if (options.minimum_price_per_night) {
    const dollarsToCents = Number(options.minimum_price_per_night) * 100;

    queryParams.push(dollarsToCents);
    queryString += `AND cost_per_night >= $${queryParams.length} `;
  }

  // Max Price...
  if (options.maximum_price_per_night) {
    const dollarsToCents = Number(options.maximum_price_per_night) * 100;

    queryParams.push(dollarsToCents);
    queryString += `AND cost_per_night < $${queryParams.length} `;
  }

  // Add GROUP BY...
  queryString += `GROUP BY properties.id `;

  // Min Rating...
  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
  }

  // Limit / ORDER BY...
  queryParams.push(limit);
  queryString += `ORDER BY cost_per_night LIMIT $${queryParams.length};`;

  // Submit query:
  return query(queryString, queryParams)
    .then(res => res.rows)
    .catch(err => {
      console.error('Error fetching properties: ', err.message);
      return err;
    });
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const {
    title,
    description,
    number_of_bedrooms,
    number_of_bathrooms,
    parking_spaces,
    cost_per_night,
    thumbnail_photo_url,
    cover_photo_url,
    street,
    country,
    city,
    province,
    post_code,
    owner_id
  } = property;

  return query(`
    INSERT INTO properties (title, description, number_of_bedrooms, number_of_bathrooms, 
      parking_spaces, cost_per_night, thumbnail_photo_url, cover_photo_url, 
      street, country, city, province, post_code, owner_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;`,
    [title, description, number_of_bedrooms, number_of_bathrooms,
      parking_spaces, cost_per_night, thumbnail_photo_url, cover_photo_url,
      street, country, city, province, post_code, owner_id])
    .then(res => res.rows[0])
    .catch(err => {
      console.error('Error adding property: ', err.message);
      return err;
    });
};

module.exports = {
  query,
  getClient,
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};