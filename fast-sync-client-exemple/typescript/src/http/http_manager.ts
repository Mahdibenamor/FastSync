import {
  SyncPayload,
  IHttpManager,
  SyncOperationMetadata,
} from "fast-sync-client";

export class HttpManager implements IHttpManager {
  constructor() {}
  async pull(metadata: SyncOperationMetadata): Promise<SyncPayload> {
    try {
      const response = await fetch("http://localhost:3000/express/pull", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(metadata),
      });
      const data = await response.json();
      if (data.success === true) {
        return SyncPayload.create(data.data);
      } else {
        throw Error("pull error");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }

  async push(payload: SyncPayload): Promise<boolean> {
    try {
      const response = await fetch("http://localhost:3000/express/push", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success === true) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Fetch error:", error);
      return false;
    }
  }
}
