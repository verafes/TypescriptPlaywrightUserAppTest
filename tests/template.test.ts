import { test, expect, request, APIRequestContext} from "@playwright/test";
import * as preconditions from "../utils/preconditions/preconditions";
import * as usersData from "../data/users.data";

test.describe('Tests Suite Name', async() => {

    let apiRequest: APIRequestContext;

    test.beforeEach('Create API Request Context, Create Preconditions', async({ page }) => {
        apiRequest = await request.newContext();
        await preconditions.deleteUsers(apiRequest);
        await preconditions.createUsers(apiRequest, usersData);

        await page.goto('/');
    })

    test('Unique Test Name', async({ page }) => {

    })

    test.afterEach('Close API request context', async () => {
        await apiRequest.dispose();
    })
})