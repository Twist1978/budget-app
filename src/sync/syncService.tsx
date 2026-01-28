import {
  getUnsyncedEntries,
  markEntriesSynced,
  upsertEntries,
} from "./budgetRepo";
import { apiGet, apiPost } from "./api";

let syncing = false;
let lastSyncAt = 0;

type SyncOptions = { reason: string };

export async function syncNow(opts: SyncOptions): Promise<void> {
  const now = Date.now();

  // Debounce: nicht öfter als alle 30s
  if (now - lastSyncAt < 30000) return;
  if (syncing) return;

  syncing = true;
  try {
    // 1) PUSH
    const unsynced = await getUnsyncedEntries();
    console.log(unsynced);
    if (unsynced.length > 0) {
      const res = await apiPost<{ syncedIds: number[] }>("/api/accounts", {
        entries: unsynced,
      });
      console.log(res);
      //await markEntriesSynced(res.syncedIds);
    }

    // 1) PUSH: lokale Outbox-Operationen zum Backend schicken
    // const ops = await outboxGetPending();
    // if (ops.length) await apiPost("/api/sync/push", { ops });

    // 2) PULL: Änderungen vom Server holen
    // const since = await getLastServerCursor(); // timestamp / cursor
    // const delta = await apiGet(`/api/sync/pull?since=${encodeURIComponent(since)}`);
    // await applyDeltaLocally(delta);
    // await setLastServerCursor(delta.nextCursor);

    lastSyncAt = now;
    // optional logging
    // console.log(`[sync] ok (${opts.reason})`);
    console.log("hier wird gesynct");
  } catch (err) {
    console.log(err);
  } finally {
    syncing = false;
    console.log("finally block");
  }
}
