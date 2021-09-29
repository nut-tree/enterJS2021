import {centerOf, down, jestMatchers, mouse, Region, screen, straightTo} from "@nut-tree/nut-js";
import {stringify} from "ts-jest/dist/utils/json";

expect.extend(jestMatchers);

describe("nut.js screen usage", () => {
    describe("basic find", () => {
        it('should search the screen for an image', async () => {
            // GIVEN
            const template = "debug.png";
            screen.config.resourceDirectory = "./assets";

            // WHEN
            const imageRegion = await screen.find(template);

            // THEN
            expect(imageRegion).toHaveProperty("top", expect.any(Number))
            expect(imageRegion).toHaveProperty("left", expect.any(Number))
            expect(imageRegion).toHaveProperty("width", expect.any(Number))
            expect(imageRegion).toHaveProperty("height", expect.any(Number))
        });

        it('should be usable via custom Jest matchers', async () => {
            // GIVEN
            const template = "debug.png";
            screen.config.resourceDirectory = "./assets";

            // WHEN

            // THEN
            await expect(screen).toShow("debug.png");
        });

        it('should accept optional search parameters', async () => {
            // GIVEN
            const template = "debug.png";
            const searchRegion = new Region(800, 500, 100, 100);
            screen.config.resourceDirectory = "./assets";

            // WHEN
            const findCall = () => screen.find(template, {searchRegion});

            // THEN
            await expect(findCall())
                .rejects
                .toEqual(expect.stringContaining(
                        "Searching for debug.png failed. Reason: 'Error: No match with required confidence"
                    )
                );
        });
    });

    describe("highlight", () => {
        it('should visualize regions on screen', async () => {
            // GIVEN
            const template = "debug.png";
            const searchRegion = new Region(800, 500, 100, 100);
            screen.config.resourceDirectory = "./assets";
            await screen.highlight(searchRegion);

            // WHEN
            const findCall = () => screen.find(template, {searchRegion});

            // THEN
            await expect(findCall())
                .rejects
                .toEqual(expect.stringContaining(
                        "Searching for debug.png failed. Reason: 'Error: No match with required confidence"
                    )
                );
        });

        it('should help us visualize find results', async () => {
            // GIVEN
            const template = "debug.png";
            screen.config.resourceDirectory = "./assets";

            // WHEN
            const imageRegion = await screen.highlight(screen.find(template));

            // THEN
            expect(imageRegion).toHaveProperty("top", expect.any(Number))
            expect(imageRegion).toHaveProperty("left", expect.any(Number))
            expect(imageRegion).toHaveProperty("width", expect.any(Number))
            expect(imageRegion).toHaveProperty("height", expect.any(Number))
        });

        it('lets us configure duration and opacity', async () => {
            // GIVEN
            const template = "debug.png";
            screen.config.resourceDirectory = "./assets";
            screen.config.highlightDurationMs = 1500;
            screen.config.highlightOpacity = 0.75;

            // WHEN
            const imageRegion = await screen.highlight(screen.find(template));

            // THEN
            expect(imageRegion).toHaveProperty("top", expect.any(Number))
            expect(imageRegion).toHaveProperty("left", expect.any(Number))
            expect(imageRegion).toHaveProperty("width", expect.any(Number))
            expect(imageRegion).toHaveProperty("height", expect.any(Number))
        });

        it('is toggelable for visual debugging', async () => {
            // GIVEN
            const template = "debug.png";
            screen.config.resourceDirectory = "./assets";
            screen.config.autoHighlight = true;

            // WHEN
            const imageRegion = await screen.find(template);

            // THEN
            expect(imageRegion).toHaveProperty("top", expect.any(Number))
            expect(imageRegion).toHaveProperty("left", expect.any(Number))
            expect(imageRegion).toHaveProperty("width", expect.any(Number))
            expect(imageRegion).toHaveProperty("height", expect.any(Number))
        });
    });

    describe("waitFor", () => {
        it('should find images even in dynamic environments', async () => {
            // GIVEN
            const template = "click.png";
            screen.config.resourceDirectory = "./assets";

            // WHEN
            const imageRegion = await screen.highlight(screen.waitFor(template, 4000));

            // THEN
            expect(imageRegion).toHaveProperty("top", expect.any(Number))
            expect(imageRegion).toHaveProperty("left", expect.any(Number))
            expect(imageRegion).toHaveProperty("width", expect.any(Number))
            expect(imageRegion).toHaveProperty("height", expect.any(Number))
        });
    });

    describe("hooks", () => {
        it('should execute a callback once the image has been located', async () => {
            // GIVEN
            const template = "click.png";
            screen.config.resourceDirectory = "./assets";

            screen.on(template, async (res) => {
                await mouse.move(straightTo(centerOf(res.location)));
            });

            // WHEN
            const imageRegion = await screen.highlight(screen.waitFor(template, 4000));

            // THEN
            await expect(mouse).toBeIn(imageRegion);
        });
    });
});