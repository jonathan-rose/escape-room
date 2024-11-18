/**
 * A place for common values and general purpose static utility
 * functions.
 */
export default class Util {

    /**
     * Colour palette.
     */
    static colors = {
        WHITE: '0xFFFFFF',
        BLACK: '0x000000',
        ROBE_BLUE: '0x306082',
        PARCHMENT: '0xF5ECCD',
        CHARCOAL: '0x26282C',
        BROWN: '0x482728',
        LIGHT_BROWN: '0x5D3233',
        DARK_BROWN: '0x351D1D',
        PINK: '0xFF4365',
        BLUE: '0x26547C',
        GREY_BLUE: '0x537D8D',
    };

    /**
     * just in case you want to spell `colours` correctly.
     */
    static colours = this.colors;

    /**
     * Random positive integer less than `max`.
     */
    static randInt(max) {
        return Math.floor(Math.random() * max);
    }

    /**
     * Random float between `min` and `max`.
     */
    static randBetween(min, max) {
        return min + (Math.random() * (max - min));
    }

    /**
     * Random element from an array.
     */
    static randNth (items) {
        return items[this.randInt(items.length)];
    }

    /**
     * Calculate a new point which is `distance` away from `start` in
     * the direction of `angle`.
     *
     * x and y are rouned to the nearest int.
     */
    static offsetByTrig(start, angle, distance) {
        let newX = Math.round(Math.cos(angle * Math.PI / 180) * distance + start.x);
        let newY = Math.round(Math.sin(angle * Math.PI / 180) * distance + start.y);
        return new Phaser.Math.Vector2(newX, newY);
    }

    /**
     * Fixing JavaScript's modulus operator so it works correctly with
     * negative numbers.
     */
    static mod(n, m) {
        return ((n % m) + m) % m;
    }

    /**
     * Get the position of the middle of the scene.
     */
    static sceneCenter(scene) {
        return new Phaser.Math.Vector2(
            scene.cameras.main.width / 2,
            scene.cameras.main.height / 2
        );
    }

    /**
     * Just in case you want to spell `Centre` properly.
     */
    static sceneCentre(scene) {
        return this.sceneCenter(scene);
    }
}
