import { APIRequestContext } from "@playwright/test";
import { API_USERS_ENDPOINT } from "@data/api.endpoints.data";

export async function deleteUsers(request: APIRequestContext) {
    await request.delete(API_USERS_ENDPOINT);
}

export async function createUsers(request: APIRequestContext, data: any) {
    for (const user of data) {
        await request.post(
            API_USERS_ENDPOINT,
            {data: user}
        )
    }
}