import { test, expect } from "@playwright/test";

[
    {tabName: 'Add', expected: 'nav-link active'},
    {tabName: 'Search', expected: 'nav-link'},
].forEach(({ tabName, expected}) => {
    test.describe('Navigation tabs are available', async() => {

        test.beforeEach('Navigate to home page url', async({ page }) => {
            await page.goto('/');
        })

        test(`TC-NavBar-1: Verify ${tabName} Tab Load Correctly And Available`, async({ page }) => {

            const tab = page.getByRole('link', {name: `${tabName}`, exact: true});
            const tabClassAttribute = await tab.getAttribute('class');

            await expect(tab).toBeAttached();
            await expect(tab).toHaveCount(1);
            await expect(tab).toBeVisible();
            await expect(tab).toBeEnabled();
            expect(tabClassAttribute).toStrictEqual(`${expected}`);
        })
    })
})
