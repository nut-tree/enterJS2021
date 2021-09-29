import {centerOf, mouse, Region, screen, straightTo} from "@nut-tree/nut-js";
import "@nut-tree/plugin-ocr";

describe("nut.js OCR plugin usage", () => {
    describe("read", () => {
        it('should should find the current active window', async () => {
            // GIVEN
            const regionToReadFrom = new Region(350, 240, 500, 200);
            await screen.highlight(regionToReadFrom);

            // WHEN
            const textFromRegion = await screen.read(screen.grabRegion(regionToReadFrom));

            // THEN
            console.log(textFromRegion)
        });
    });

    describe("findText", () => {
        it('should find a searchText on screen', async () => {
            // GIVEN
            const searchText = "File";
            const searchRegion = new Region(100, 0, 200, 40);

            // WHEN
            const textFromRegion = await screen.findText(searchText, {
                searchRegion,
                preprocessConfig: {
                    invert: true
                }
            });

            // THEN
            if (textFromRegion.length) {
                await mouse.move(straightTo(centerOf(textFromRegion.pop()!.location)))
                await mouse.leftClick();
            }
        });
    });
})