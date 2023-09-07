import { provideSingleton } from "@expressots/core";
import Database from "better-sqlite3";

@provideSingleton(SqliteProvider)
class SqliteProvider {
  private db: Database.Database;

  constructor() {
    this.db = new Database("db.sqlite", {});

    this.initSchema();
  }

  public initSchema(): void {
    this.db.pragma("journal_mode = WAL");

    this.db.exec(`
      CREATE TABLE IF NOT EXISTS campaign (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL UNIQUE
      );

      CREATE TABLE IF NOT EXISTS campaign_option (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        votes INTEGER NOT NULL DEFAULT 0,
        campaign_id TEXT NOT NULL,
        FOREIGN KEY (campaign_id) REFERENCES campaign(id)
      );
    `);
  }

  public getDatabase(): Database.Database {
    return this.db;
  }
}

export { SqliteProvider };
