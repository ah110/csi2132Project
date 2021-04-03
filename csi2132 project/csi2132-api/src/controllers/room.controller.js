

const db = require("../config/database");

exports.listRoomByName = async (req, res) => {
  let hotel_name;
  hotel_name = req.params.name;
  
  try {
    const { rows } = await db.query(
      "SELECT room.hotel_id, hotel.hotel_name, hotel.city, hotel.stars, room.price from room, hotel where room.hotel_id = hotel.hotel_id AND room.available=true AND hotel.city = $1 ORDER BY hotel.stars, room.price",
      [hotel_name]);
      res.status(200).send(rows);
  } catch (error) {
    console.error('listAllRoom', error);
    res.status(500).send({
      message: "error"
    });
  }
};
exports.listAllRoom = async (req, res) => {
  try {
    const { rows } = await db.query(`SELECT * FROM room ORDER BY room.hotel_id;`);
    res.status(200).send(rows);
  } catch (error) {
    console.error('listAllRoom', error);
    res.status(500).send({
      message: "error"
    });
  }
};

exports.bookRoom = async (req, res) => {
  const {b_id, c_id, r_id, rent_from, rent_to} = req.body;
  try {
    const {rows} = await db.query(
      "INSERT into booking values ($1, 1, $2,$3, 'started', 1,$4, $5, true, $6)",
      [b_id, c_id, r_id, rent_from, rent_to, b_id]
    );
    res.status(201).send({
      message: "booking successfully!",
      body: {
        booking: {b_id, c_id, r_id, rent_from, rent_to},
      },
    });
  } catch (error) {
    console.error('bookRoom', error);
    res.status(500).send({
      message: "error"
    });
  }
};
  exports.checkInById = async (req, res) => {
    const bookingId = parseInt(req.params.id);
    const response = await db.query(
      "update booking set status='complete' where booking_id = $1",
      [bookingId]
    );

    res.status(200).send({ message: "check in Successfully!" });
  };

exports.rentRoom = async (req, res) => {
  const {renting_id,e_id, c_id, r_id, rent_from, rent_to} = req.body;
  try {
    const {rows} = await db.query(
      "INSERT into renting values ($1, $2,$3, $4,'started', 1,$5, $6, true, null )",
      [renting_id,e_id, c_id, r_id, rent_from, rent_to]
    );
    res.status(201).send({
      message: "renting successfully!",
      body: {
        booking: {renting_id,e_id, c_id, r_id, rent_from, rent_to},
      },
    });
  } catch (error) {
    console.error('rentRoom', error);
    res.status(500).send({
      message: "error"
    });
  }
};
