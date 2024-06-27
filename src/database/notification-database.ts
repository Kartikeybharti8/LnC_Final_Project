import { CafeteriaDatabaseConnection } from "./create-connection";

class NotificationDatabaseManagement {
  private dbConnection: CafeteriaDatabaseConnection;

  constructor() {
    this.dbConnection = new CafeteriaDatabaseConnection();
  }

  async connect() {
    return await this.dbConnection.connect();
  }
  
  async addCustomNotification(itemID: number, customObjective: string): Promise<any> {
    const connection = await this.connect();
    try {
        const query = `INSERT INTO custom_notification (itemId, objective) VALUES (?, ?)`;
        const values = [itemID, customObjective];
        await connection.query(query, values);
        console.log("Notification added successfully");
    } catch (err) {
      console.error("Error adding new Notification:", err);
    } finally {
      await connection.end();
    }
  }
}

export default NotificationDatabaseManagement;
