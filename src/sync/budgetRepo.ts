import { executeSql, executeRun } from "../db/sqlite";

export type BudgetEntry = {
  id: number;
  vendor: string;
  category: string;
  amount: number;
  date: string;
  debitAccount: string;
};

export async function getUnsyncedEntries(): Promise<BudgetEntry[]> {
  return executeSql<BudgetEntry>(
    `SELECT id, vendor, category, amount, date, debitAccount
     FROM budgetEntries
     WHERE isSynced = 0`
  );
}

export async function markEntriesSynced(ids: number[]): Promise<void> {
  if (ids.length === 0) return;

  const placeholders = ids.map(() => "?").join(",");
  await executeRun(
    `UPDATE budgetEntries
     SET isSynced = 1
     WHERE id IN (${placeholders})`,
    ids
  );
}

export async function upsertEntries(entries: BudgetEntry[]) {
  for (const e of entries) {
    await executeRun(
      `INSERT OR REPLACE INTO budgetEntries
       (id, vendor, category, amount, date, debitAccount, isSynced)
       VALUES (?, ?, ?, ?, ?, ?, 1)`,
      [e.id, e.vendor, e.category, e.amount, e.date, e.debitAccount]
    );
  }
}
