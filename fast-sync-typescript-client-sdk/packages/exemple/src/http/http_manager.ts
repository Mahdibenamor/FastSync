import {
  SyncPayload,
  IHttpManager,
  SyncOperationMetadata,
} from "fast-sync-client";

import axios from "axios";

export class HttpManager implements IHttpManager {
  constructor() {}

  async pull(metadata: SyncOperationMetadata): Promise<SyncPayload> {
    try {
      const response = await axios.post(
        "http://localhost:3000/express/pull",
        metadata
      );
      if (response.data.success === true) {
        return SyncPayload.create(response.data.data);
      }
      throw new Error("pull failed");
    } catch (error) {
      throw new Error("pull failed");
    }
  }

  async push(payload: SyncPayload): Promise<boolean> {
    try {
      const response = await axios.post(
        "http://localhost:3000/express/pull",
        payload
      );
      if (response.data.success === true) {
        return true;
      }
      throw new Error("push failed");
    } catch (error) {
      throw new Error("push failed");
    }
  }
}
