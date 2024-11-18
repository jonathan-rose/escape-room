import 'phaser';
import Util from '../util';

export default class Player extends Phaser.GameObjects.Container {
    constructor(scene, x, y, sprite) {
        super(scene, x, y);
        this.scene = scene;

        this.wizard = new Phaser.GameObjects.Sprite(scene, 0, 0, sprite);
        this.add(this.wizard);

        let wandLength = 80;
        let wandWidth = 10;
        let wandX = 100;
        let wandY = 0;

        this.wand = new Phaser.GameObjects.Container(scene, wandX, wandY);
        this.wandBody = new Phaser.GameObjects.Rectangle(
            this.scene,
            0,
            0,
            wandWidth,
            wandLength,
            Util.colors.BLACK
        );
        this.wandTip = new Phaser.GameObjects.Rectangle(
            this.scene,
            0,
            0 - (wandLength / 2) + (wandWidth / 2),
            wandWidth,
            wandWidth,
            Util.colors.WHITE
        );
        this.wandHand = new Phaser.GameObjects.Ellipse(
            this.scene,
            0,
            0 + (wandWidth * 2),
            wandWidth * 2,
            wandWidth * 2,
            Util.colors.ROBE_BLUE
        );
        this.wand.add(this.wandBody);
        this.wand.add(this.wandTip);
        this.wand.add(this.wandHand);
        this.add(this.wand);

        this.wandRadius = 100;
        this.wandAngle = 0;
        this.updateWandPos();

        this.velX = 0;
        this.velY = 0;

        // controls
        this.wKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.aKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.sKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.dKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.scene.add.existing(this);
    }

    update() {
        let hdv = 0.5; // horiontal velocity delta
        let vdv = 0.3; // vertical velocity delta
        let maxVelX = 5;
        let maxVelY = 2.5;
        let decayRate = 0.85;

        if (this.wKey.isDown) {
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

        this.updateWandAngle();
        this.updateWandPos();
    }

    updateWandAngle() {
        let x = this.scene.input.activePointer.x;
        let y = this.scene.input.activePointer.y;
        this.wandAngle = Math.atan2(y - this.y, x - this.x);
    }

    updateWandPos() {
        this.wand.x = Math.cos(this.wandAngle) * this.wandRadius;
        this.wand.y = Math.sin(this.wandAngle) * this.wandRadius;
    }
}
