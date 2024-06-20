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
  //   async fetchmenuItemFromDb(menuItemName: string, menuItemPassword: string): Promise<any> {
  //     const connection = await this.connect();
  //     try {
  //       const query = `SELECT * FROM menuItem WHERE menuItemName = ? AND menuItemPassword = ?`;
  //       const values = [menuItemName, menuItemPassword];
  //       const [queryResponse] : any = await connection.query(query, values);
  //       return queryResponse[0]
  //     } catch (err) {
  //       console.error('Error fetching menuItem:', err);
  //     } finally {
  //       await connection.end();
  //     }
  //   }
}

export default MenuItemDatabaseManagement;
