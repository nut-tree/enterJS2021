const {keyboard, Key} = require("@nut-tree/nut-js");

describe("nut.js keyboard usage", () => {
    describe("pressKey and releaseKey", () => {
        it("should press and release Cmd+Space", async () => {
            // GIVEN

            // WHEN
            await keyboard.pressKey(Key.LeftSuper, Key.Space);
            await keyboard.releaseKey(Key.LeftSuper, Key.Space);

            // THEN
        });
    });

    describe("type", () => {
        it("should type strings", async () => {
            // GIVEN
            await keyboard.pressKey(Key.I);
            await keyboard.releaseKey(Key.I);

            // WHEN
            await keyboard.type("Hello enterJS!");

            // THEN
        });

        it("should let us configure typing speed", async () => {
            // GIVEN
            keyboard.config.autoDelayMs = 0;
            await keyboard.pressKey(Key.I);
            await keyboard.releaseKey(Key.I);

            // WHEN
            await keyboard.type("An even faster Hello, enterJS!");

            // THEN
        });
    });
});
