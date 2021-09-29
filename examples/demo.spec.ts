import {centerOf, down, mouse, screen, straightTo} from "@nut-tree/nut-js";

describe("This demo", () => {
    it('should drag an icon on my desktop', async () => {
        // GIVEN
        const template = "ext.png";
        screen.config.resourceDirectory = "./assets";

        // WHEN
        await mouse.move(
            straightTo(
                centerOf(
                    screen.waitFor(template, 4000)
                )
            )
        );
        await mouse.drag(down(600));

        // THEN
    });
});
