import {clipboard} from "@nut-tree/nut-js";

describe("nut.js clipboard usage", () => {
    describe("copy", () => {
        it("copies a given text to the system clipboard", async () => {
            // GIVEN
            const textToCopy = "Hello enterJS!";

            // WHEN
            await clipboard.copy(textToCopy);

            // THEN
            await expect(clipboard.paste()).resolves.toBe(textToCopy);
        });
    });
});