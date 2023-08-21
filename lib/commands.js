module.exports = {
    choosingAHall: async function (page, film, hall) {
        try {
            const linkToHall = `section:nth-child(${film}) > div:nth-child(${hall}) > ul > li > a`;
            await page.waitForSelector(linkToHall);
            await page.click(linkToHall);
            await page.waitForSelector('div.buying-scheme', {
                visible: true,
            });
        } catch (error) {
            throw new Error("The movie or hall is specified incorrectly");
        }
    },

    choosingSite: async function (page, row, chairNumber) {
        try {
            const site = `div:nth-child(${row}) > span:nth-child(${chairNumber})`;
            await page.waitForSelector(site);
            await page.click(site);
        } catch (error) {
            throw new Error("The place is indicated incorrectly or is already busy");
        }
        
    },

    completionOfBooking: async function (page, selectorButtomBook, selektorButtomCode) {
        try {
            const buttonBook = selectorButtomBook;
            await page.click(buttonBook);
            const buttonCode = selektorButtomCode;
            await page.click(buttonCode);
            await page.waitForSelector('.ticket__info-qr', {
                visible: true,
            });
        } catch (error) {
            throw new Error(`The action is not available for the selector: ${buttonCode}`);
        }
        
    },

    choosingDate: async function (page, day) {
        try {
            const buttomDay = `a:nth-child(${day})`;
            await page.click(buttomDay);
            
        } catch (error) {
            throw new Error(`The action is not available for the selector: ${buttomDay}`);
        }
        
    }
}