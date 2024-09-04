const properties = require("./json/properties.json");
const users = require("./json/users.json");

const { Pool } = require("pg");
const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "lightbnb"
});

/// Users

//  test_user info:
// name: A A
// email: a@a.com
// pw: 123

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  const lowerCaseEmail = email.toLocaleLowerCase();

  return pool.query(
    `SELECT * FROM users WHERE email = $1;`, [lowerCaseEmail])
    .then(result => {
      const userExists = result.rows.length;
      if (userExists) {
        return result.rows[0];
      } else {
        return null;
      }
    })
    .catch(err => {
      console.error(err.message);
      return;
    });
  //tristanjacobs@gmail.com
  // let resolvedUser = null;
  // for (const userId in users) {
  //   const user = users[userId];
  //   if (user && user.email.toLowerCase() === email.toLowerCase()) {
  //     resolvedUser = user;
  //   }
  // }
  // return Promise.resolve(resolvedUser);
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool.query(
    `SELECT * FROM users WHERE id = $1;`, [id])
    .then(result => {
      const userExists = result.rows.length;
      if (userExists) {
        return result.rows[0];
      } else {
        return null;
      }
    })
    .catch(err => {
      console.error(err.message);
      return;
    })
  // return Promise.resolve(users[id]);
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const { name, email, password } = user;
  const lowerCaseEmail = email.toLowerCase();

  return pool.query(
    `INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;`, [name, lowerCaseEmail, password])
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      console.error(err.message);
      return;
    })

  // console.log(user);
  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {

  return pool.query(`
    SELECT reservations.id, properties.title, properties.cost_per_night, properties.number_of_bedrooms, properties.number_of_bathrooms, 
           properties.parking_spaces, properties.thumbnail_photo_url, reservations.start_date, AVG(property_reviews.rating) AS average_rating
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON property_reviews.property_id = properties.id
    WHERE reservations.guest_id = $1
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date
    LIMIT $2;`, [guest_id, limit])
    .then(result => {
      console.log(result.rows);
      return result.rows;
    })

  // return getAllProperties(null, 2);
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {

  return pool.query(
    `SELECT * FROM properties LIMIT $1;`, [limit])
    .then(result => {
      return result.rows;
    })
    .catch(err => {
      console.error(err.message);
      return;
    })

  // const limitedProperties = {};
  // for (let i = 1; i <= limit; i++) {
  //   limitedProperties[i] = properties[i];
  // }
  // return Promise.resolve(limitedProperties);
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
