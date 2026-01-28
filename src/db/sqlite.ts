import * as SQLite from "expo-sqlite";

export const database = SQLite.openDatabaseSync("budget.db");

export function executeSql<T = any>(
  sql: string,
  params: any[] = []
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    try {
      const result = database.getAllSync(sql, params);
      resolve(result as T[]);
    } catch (err) {
      reject(err);
    }
  });
}

export function executeRun(sql: string, params: any[] = []): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      database.runSync(sql, params);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
