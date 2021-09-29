import {centerOf, getWindows, mouse, sleep, straightTo} from "@nut-tree/nut-js";

describe("nut.js window usage", () => {
    it('should should find the current active window', async () => {
        // GIVEN
        await sleep(3000);
        const searchTitle = "click.png";

        // WHEN
        const allWindows = await getWindows();
        for (const window of allWindows) {
            if (await window.title === searchTitle) {
                await mouse.move(straightTo(centerOf(window.region)));
                break;
            }
        }

        // THEN
    });
})