import Phaser from 'phaser';

export default class HiddenText extends Phaser.GameObjects.Layer {
    constructor(scene, lightSource, radius) {
        super(scene);
        this.scene = scene;
        this.lightSource = lightSource;
        this.castRadius = radius;
        this.glowGradient = 25;
        this.glowColor = 0x00fff00;

        const text1 = this.scene.add.image(495, 350, 'hidden-text');

        this.hiddenText = [text1];

        this.maskGraphics = this.scene.make.graphics({
            x: this.lightSource.x,
            y: this.lightSource.y
        });
        this.maskGraphics.fillStyle(0xffffff);
        this.maskGraphics.fillCircle(0, 0, this.castRadius);

        this.mask = this.maskGraphics.createGeometryMask();
        this.setMask(this.mask);

        this.glowGraphics = this.scene.add.graphics({
            x: this.lightSource.x,
            y: this.lightSource.y
        });
        for (let i = 0; i <= this.glowGradient; i++) {
            const alpha = (this.glowGradient - i) / this.glowGradient;
            this.glowGraphics.fillStyle(this.glowColor, alpha * 0.01);
            this.glowGraphics.fillCircle(0, 0, this.castRadius * (1 - i / this.glowGradient));
        }
        this.glowGraphics.setBlendMode(Phaser.BlendModes.ADD);

        this.hiddenText.forEach((image) => {
            const fx = image.preFX.addGlow(0x9900FF, 1, 1);

            this.scene.tweens.add({
                targets: fx,
                outerStrength: 5,
                yoyo: true,
                loop: -1,
                ease: 'sine.inout'
            });
        });

        this.add(this.hiddenText);
        this.scene.add.existing(this);
    }

    update() {
        let globalPosition = this.lightSource.getBounds();
        this.maskGraphics.setPosition(globalPosition.centerX, globalPosition.centerY);
        this.glowGraphics.setPosition(globalPosition.centerX, globalPosition.centerY);
    }
}
