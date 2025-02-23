import { test, expect, request, APIRequestContext} from "@playwright/test";
import * as preconditions from "@preconditions/preconditions";
import * as usersData from "@data/users.data";
import { HomePage } from "@pages/home.page";
import { SearchPage } from "@pages/search.page";

test.describe('Should Search Users By Search Criteria', async () => {
    let apiRequest: APIRequestContext;

    test.beforeEach('Create API Request Context, Create Preconditions', async({ page }) => {
        apiRequest = await request.newContext();
        await preconditions.deleteUsers(apiRequest);
        await preconditions.createUsers(apiRequest, usersData.users);

        await page.goto('/');
    })

    test('Search User With Unique First Name POM', async({ page }) => {
        const userWithUniqueFirstName = usersData.uniqueFirstNameUser;
        const expectedFirstName = usersData.uniqueFirstNameUser.firstName;
        const expectedLastName = usersData.uniqueFirstNameUser.lastName;
        const expectedAge = usersData.uniqueFirstNameUser.age.toString();
        let actualUserInfo: string[];

        await new HomePage(page).tab.clickSearchTab();

        const searchPage = new SearchPage(page);
        await searchPage.form.inputFirstName(userWithUniqueFirstName.firstName);
        await searchPage.form.clickSearchButton();

        actualUserInfo = await searchPage.table.getFirstResultInfo();

        expect(await searchPage.table.tableRow).toHaveCount(1);

        expect(actualUserInfo[1]).toStrictEqual(expectedFirstName);
        expect(actualUserInfo[2]).toStrictEqual(expectedLastName);
        expect(actualUserInfo[3]).toStrictEqual(expectedAge);
    })

    test('Search User With Unique First Name (no POM)', async({ page }) => {
        const userWithUniqueFirstName = usersData.users[0];

        const searchTab = page.getByRole('link', {name: 'Search', exact: true});
        const tableRow = page.locator("tbody>tr");
        const firstNamePlaceholder = page.getByPlaceholder('Enter first name...');
        const searchButton = page.getByRole('button', {name: 'Search', exact: true});

        await expect(searchTab).toBeEnabled();
        await searchTab.hover();
        await searchTab.click();

        await expect(tableRow.first()).toBeAttached();
        await expect(searchButton).toBeDisabled();

        await firstNamePlaceholder.fill(userWithUniqueFirstName.firstName);

        await expect (searchButton).toBeEnabled();
        await searchButton.click();

        await expect(tableRow).toHaveCount(1);

        await tableRow.first().hover();
        await expect(tableRow.first()).toBeVisible();

        const actualUserInfo = await tableRow.first().innerText().then(text => text.split("\t"));

        expect(actualUserInfo[1]).toStrictEqual(userWithUniqueFirstName.firstName);
        expect(actualUserInfo[2]).toStrictEqual(userWithUniqueFirstName.lastName);
        expect(actualUserInfo[3]).toStrictEqual(userWithUniqueFirstName.age.toString());
    })

    test.afterEach('Close API request context', async () => {
        await apiRequest.dispose();
    })
})