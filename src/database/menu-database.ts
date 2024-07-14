import { CafeteriaDatabaseConnection } from "./create-connection";

class MenuItemDatabaseManagement {
  private dbConnection: CafeteriaDatabaseConnection;

  constructor() {
    this.dbConnection = new CafeteriaDatabaseConnection();
  }

  async connect() {
    return await this.dbConnection.connect();
  }

  async addmenuItemToDb(
    foodName: string,
    foodPrice: string,
    foodStatus: string,
    mealType: string
  ) {
    const connection = await this.connect();
    try {
      const query = `INSERT INTO menu_item (foodName, foodPrice, foodStatus, mealType) VALUES (?, ?, ?, ?)`;
      const values = [foodName, foodPrice, foodStatus, mealType];
      await connection.query(query, values);
      console.log("Menu Item added successfully");
    } catch (err) {
      console.error("Error adding Menu Item:", err);
    } finally {
      await connection.end();
    }
  }

  async updateMenuPriceDb(itemId: string, updatedPrice: string) {
    const connection = await this.connect();
    try {
      const query = `UPDATE menu_item SET foodPrice = ? WHERE itemId = ?`;
      const values = [updatedPrice, itemId];
      await connection.query(query, values);
      console.log("Menu Item price updated successfully");
    } catch (err) {
      console.error("Error updating Menu Item price:", err);
    } finally {
      await connection.end();
    }
  }
  async updateMenuStatusDb(itemId: string, updatedStatus: string) {
    const connection = await this.connect();
    try {
      const query = `UPDATE menu_item SET foodStatus = ? WHERE itemId = ?`;
      const values = [updatedStatus, itemId];
      await connection.query(query, values);
      console.log("Menu Item status updated successfully");
    } catch (err) {
      console.error("Error updating Menu Item status:", err);
    } finally {
      await connection.end();
    }
  }
  async fetchMenuItemsFromDb() {
    const connection = await this.connect();
    try {
      const query = `SELECT * FROM menu_item;`;
      const [queryResponse] = await connection.query(query);
      return queryResponse
    } catch (err) {
      console.error("Error fetching menuItem:", err);
      return [];
    } finally {
      await connection.end();
    }
  }
  async fetchRolledOutMenuItemsFromDb(itemIds: number[]) {
    const connection = await this.connect();
    console.log(itemIds);
    try {
        const placeholders = itemIds.map(() => '?').join(', ');
        const query = `SELECT * FROM menu_item WHERE itemId IN (${placeholders})`;
        const [menuItems] = await connection.query(query, itemIds);
        console.log(menuItems);
        return menuItems;
    } catch (err) {
      console.error("Error fetching menuItem:", err);
    } finally {
      await connection.end();
    }
  }
  async fetchRolledOutMenuItemsFromDbByPreference(user: any, itemIds: number[]) {
    const connection = await this.connect();
    const { spice_level, veg_type, sweet, food_origin } = user;
    console.log(spice_level, veg_type, sweet, food_origin, itemIds);

    try {
        // Create placeholders for itemIds
        const placeholders = itemIds.map(() => '?').join(', ');
        
        // SQL query with conditions and item IDs
        const sql = `
            SELECT *
            FROM menu_item
            WHERE itemId IN (${placeholders})
            AND veg_type = ?
            AND spice_level = ?
            AND sweet = ?
            AND food_origin = ?
            ORDER BY veg_type DESC, spice_level DESC, sweet DESC, food_origin DESC;
        `;

        const values = [...itemIds, veg_type, spice_level, sweet, food_origin];
        const [menuItems] = await connection.query(sql, values);
        console.log("prefered: ",menuItems);
        return menuItems;
    } catch (err) {
        console.error("Error fetching menu items:", err);
    } finally {
        await connection.end();
    }
}

  async discardMenuItemFromDB(itemId: number){
    const connection = await this.connect();
    console.log(itemId);
    try{
      const query = "DELETE FROM menu_item WHERE itemId = ?"
      await connection.query(query, itemId);
    } catch(err){
      console.error('Error Discarding Menu Item:', err)
    } finally {
      await connection.end();
    }
  }
}

export default MenuItemDatabaseManagement;
