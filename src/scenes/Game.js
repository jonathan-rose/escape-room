import { Scene } from 'phaser';
import Player from '../objects/Player';
import Util from '../util';
import HiddenText from '../objects/HiddenText';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');

        this.layout = {
            "bookshelf-1":[146,271],
            "bookshelf-2":[357,295],
            "owl-perch":[930,429],
            "telescope":[744,275],
            "table":[727,709]
        };
    }

    create ()
    {
        const sceneCenter = Util.sceneCenter(this);

        this.add.image(sceneCenter.x, sceneCenter.y, 'escape-room-bg');

        for (const [name, pos] of Object.entries(this.layout)) {
            let s = new Phaser.GameObjects.Sprite(this, pos[0], pos[1], name).setInteractive({draggable: true});
            // s.on('drag', (pointer, dragX, dragY) => {
            //     s.x = dragX;
            //     s.y = dragY;
            // });
            this.add.existing(s);
        }

        this.player = new Player(this, 256, 384, 'wizard');
        this.add.existing(this.player);
        this.anims.create({
            key: 'wizard-idle',
            frames: this.anims.generateFrameNumbers('wizard'),
            frameRate: 10,
            repeat: -1
        });
        this.player.anims.play('wizard-idle');

        this.hiddenText = new HiddenText(this);

        // this.input.keyboard.on('keydown', (e) => {
        //     let currentLayout = {};
        //     this.children.list.map((s) => {
        //         if (this.layout[s.texture.key]) {
        //             currentLayout[s.texture.key] = [Math.trunc(s.x), Math.trunc(s.y)];
        //         }
        //     });
        //     console.log("this.layout = " + JSON.stringify(currentLayout) + ";");
        // }, this);
    }

    update() {
        this.player.update();
    }
}
