import Phaser from 'phaser';
import Util from '../util';

export default class HiddenText extends Phaser.GameObjects.Layer {
    constructor(scene) {
        super(scene);
        this.scene = scene;

        const sceneCenter = Util.sceneCenter(scene);

        const hiddenText = this.scene.add.image(sceneCenter.x, sceneCenter.y, 'hidden-text');

        this.add([ hiddenText ]);

        this.scene.add.existing(this);
    }
}
