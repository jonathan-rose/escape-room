import 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        this.scene = scene;

        // this.setDepth(1);

        this.velX = 0;
        this.velY = 0;

        // controls
        this.wKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.aKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.sKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.dKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
        let hdv = 0.5; // horiontal velocity delta
        let vdv = 0.3; // vertical velocity delta
        let maxVelX = 5;
        let maxVelY = 2.5;
        let decayRate = 0.85;

        if (this.wKey.isDown) {
            console.log("foo");
            this.velY = Math.max(-maxVelY, this.velY - vdv);
        } else if (this.sKey.isDown) {
            this.velY = Math.min(maxVelY, this.velY + vdv);
        } else {
            let decayed = this.velY * decayRate;
            if (Math.abs(decayed) < 0.1) {
                this.velY = 0;
            } else {
                this.velY = decayed;
            }
        }

        if (this.aKey.isDown) {
            this.velX = Math.max(-maxVelX, this.velX - hdv);
        } else if (this.dKey.isDown) {
            this.velX = Math.min(maxVelX, this.velX + hdv);
        }else {
            let decayed = this.velX * decayRate;
            if (Math.abs(decayed) < 0.1) {
                this.velX = 0;
            } else {
                this.velX = decayed;
            }
        }

        this.x += this.velX;
        this.y += this.velY;
    }
}
