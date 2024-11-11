import Phaser from 'phaser';
import Util from '../util';

/**
 * A basic Book class, just a brown rectangle.
 */
export default class Book extends Phaser.GameObjects.Rectangle {
    constructor(scene, {x, y, color = Util.colors.BROWN}) {
        let width = 20;
        let height = 60;
        super(scene, x, y, width, height, color);

        this.scene = scene;

        this.scene.add.existing(this);
    }
}
