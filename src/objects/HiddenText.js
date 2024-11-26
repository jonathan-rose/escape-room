import Phaser from 'phaser';

export default class HiddenText extends Phaser.GameObjects.Layer {
    constructor(scene, lightSource, radius) {
        super(scene);
        this.scene = scene;
        this.lightSource = lightSource;
        this.castRadius = radius;

        const text1 = this.scene.add.image(495, 350, 'hidden-text');

        this.hiddenText = [ text1 ];

        this.graphics = this.scene.make.graphics({
            x: this.lightSource.x,
            y: this.lightSource.y
        });
        this.graphics.fillStyle(0xffffff);
        this.graphics.fillCircle(0, 0, this.castRadius);

        const mask = this.graphics.createGeometryMask();
        this.setMask(mask);

        this.hiddenText.forEach((image) => {
            const fx = image.preFX.addGlow(0x9900FF, 1, 1);

            this.scene.tweens.add({
                targets: fx,
                outerStrength: 5,
                yoyo: true,
                loop: -1,
                ease: 'sine.inout'
            })
        }) 

        this.add( this.hiddenText );
        this.scene.add.existing(this);
    }

    update() {
        let globalPosition = this.lightSource.getBounds();
        this.graphics.setPosition(globalPosition.centerX, globalPosition.centerY);
    }
}
