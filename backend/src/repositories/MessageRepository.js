const db = require("../models/ConnectDatabase");

class MessageRepository {
  async findAll() {
    const rows = await db.query(`
        SELECT mensagens.id, mensagens.titulo, mensagens.fav FROM mensagens
        `);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(
      `
      SELECT mensagens.*
      FROM mensagens
      WHERE mensagens.id = ?;
      `,
      [id]
    );
    return row;
  }

  async findAllFav() {
    const [row] = await db.query(
      `
      SELECT mensagens.*
      FROM mensagens
      WHERE mensagens.fav = TRUE;
      `
    );
    return [row];
  }

  async create({ titulo, msg }) {
    const result = await db.query(
      `
      INSERT INTO mensagens (titulo, msg)
      VALUES (?, ?)
      `,
      [titulo, msg]
    );

    const insertedId = result.insertId;
    return {
      id: insertedId,
    };
  }

  async update(id, titulo, msg, fav) {
    const updateMsg = await db.query(
      `
        UPDATE mensagens
        SET mensagens.titulo = ?, mensagens.msg = ?, mensagens.fav = ?
        WHERE id = ?;
      `,
      [titulo, msg, fav, id]
    )
    return updateMsg;
  }

  async delete(id) {
    const deleteMsg = await db.query(
      `
        DELETE FROM mensagens
        WHERE id = ?;
      `,
      [id]
    );

    return deleteMsg;
  }

}

module.exports = new MessageRepository();
