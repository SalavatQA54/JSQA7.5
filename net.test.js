const jestPuppeteerConfig = require("./jest-puppeteer.config");
const jestConfig = require("./jest.config");
const { choosingAHall, choosingSite, completionOfBooking, choosingDate } = require("./lib/commands.js");

let page;

beforeEach(async () => {
    page = await browser.newPage();
});

afterEach(() => {
    page.close();
});

describe("Training test suite", () => {
    beforeEach(async () => {
        await page.goto("http://qamid.tmweb.ru/client/index.php");
    });

    test.skip("booking for the current date, 'Логан', 'Зал 1'", async () => {
        //Выбор зала
        //film = 1, hall = 2 == "Зал 1"
        //film = 1, hall = 3 == "TEST HALL"
        //film = 2, hall = 2 == "Hercules"
        //film = 2, hall = 3 == "data.newHall"
        await choosingAHall(page, 1, 2);
        
        await choosingSite(page, 3, 4);
        await completionOfBooking(page, ".acceptin-button", ".acceptin-button");
        await page.waitForSelector('.ticket__info-qr', {
            visible: true,
        });
        const actual = await page.$eval(".ticket__info-qr", link => link.getAttribute('src') );
        expect(actual).toEqual("i/QR_code.png");
    });

    test.skip("booking for any date, 'Фильм 3', 'Hercules'", async () => {
        //Выбор даты
        //2 <= day <= 7
        await choosingDate(page, 2);
        await choosingAHall(page, 1, 2);
        
        await choosingSite(page, 3, 4);
        await completionOfBooking(page, ".acceptin-button", ".acceptin-button");
        
        const actual = await page.$eval(".ticket__info-qr", link => link.getAttribute('src') );
        expect(actual).toEqual("i/QR_code.png");
    });

    test("Inactive booking button", async () => {
        await choosingDate(page, 2);
        await choosingAHall(page, 1, 2);
        
        const actual = await page.$eval("button", link => link.hasAttribute('disabled'));
        expect(actual).toBe(true);
    });
})