const {keyboard, Key} = require("@nut-tree/nut-js");

describe("nut.js keyboard usage", () => {
    describe("pressKey and releaseKey", () => {
        it("should press and release Cmd+Q", async () => {
            // GIVEN

            // WHEN
            await keyboard.pressKey(Key.LeftSuper, Key.Q);
            await keyboard.releaseKey(Key.LeftSuper, Key.Q);

            // THEN
        });
    });

    describe("type", () => {
        it("should type unicode strings", async () => {
            // GIVEN
            await keyboard.pressKey(Key.I);
            await keyboard.releaseKey(Key.I);

            // WHEN
            await keyboard.type("Hello enterJS");

            // THEN
        });
    });
});