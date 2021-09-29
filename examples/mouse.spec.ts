import {Point, down, jestMatchers, left, mouse, right, sleep, up, straightTo} from "@nut-tree/nut-js";

expect.extend(jestMatchers);

describe("nut.js mouse usage", () => {
    describe("getPosition", () => {
        it("returns a Point representing the current mouse position", async () => {
            // GIVEN
            let currentPosition;

            // WHEN
            currentPosition = await mouse.getPosition();

            // THEN
            expect(currentPosition).toHaveProperty("x", expect.any(Number));
            expect(currentPosition).toHaveProperty("y", expect.any(Number));
        });
    });

    describe("setPosition", () => {
        it("changes the mouse position to a provided point", async () => {
            // GIVEN
            const targetPoint = new Point(100, 100);

            // WHEN
            await mouse.setPosition(targetPoint);

            // THEN
            await sleep(500);
            const newPosition = await mouse.getPosition();
            await expect(newPosition.x).toBe(targetPoint.x);
            await expect(newPosition.y).toBe(targetPoint.y);
        });

        it("verifies mouse position using a custom Jest matcher", async () => {
            // GIVEN
            const targetPoint = new Point(540, 790);

            // WHEN
            await mouse.setPosition(targetPoint);

            // THEN
            await sleep(500);
            await expect(mouse).toBeAt(targetPoint);
        });
    });

    describe("move", () => {
        it("should follow a path of points", async () => {
            // GIVEN
            const width = 1920;
            const height = 500;

            const amplitude = 300;

            const twoPI = 2 * Math.PI;
            const points = Array(width).fill(0).map((_, idx) => {
                return new Point(idx, Math.floor(amplitude * Math.sin((twoPI * idx) / width) + height));
            });
            const lastPointInSequence = points[points.length - 1];

            // WHEN
            await mouse.move(points);

            // THEN
            await sleep(500);
            await expect(mouse).toBeAt(lastPointInSequence)
        });

        it("is usable with highlevel movement API functions", async () => {
            // GIVEN
            const startingPoint = await mouse.getPosition();

            // WHEN
            await mouse.move(right(500));
            await mouse.move(down(300));
            await mouse.move(left(500));
            await mouse.move(up(300));

            // THEN
            await sleep(500);
            await expect(mouse).toBeAt(startingPoint)
        });

        it("is goes straight to a point", async () => {
            // GIVEN
            const targetPoint = new Point(800, 600);

            // WHEN
            await mouse.move(straightTo(targetPoint));

            // THEN
            await sleep(500);
            await expect(mouse).toBeAt(targetPoint)
        });

        it("should apply configurable movement speed", async () => {
            // GIVEN
            mouse.config.mouseSpeed = 500;
            const expectedMovementTimeInSeconds = 2.0;

            await mouse.setPosition(new Point(0, 500));
            const start = Date.now();

            // WHEN
            await mouse.move(right(1000));

            // THEN
            const end = Date.now();
            const movementTimeInSeconds = (end - start) / 1000;
            await expect(movementTimeInSeconds).toBeCloseTo(expectedMovementTimeInSeconds, 1);
        });
    })

    describe("drag", () => {
        it("should drag the mouse along a path of points", async () => {
            // GIVEN

            // WHEN

            // THEN
        });
    });
});