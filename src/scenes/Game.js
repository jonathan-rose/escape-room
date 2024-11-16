import { Scene } from 'phaser';

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
        this.add.image(512, 384, 'escape-room-bg');

        for (const [name, pos] of Object.entries(this.layout)) {
            let s = new Phaser.GameObjects.Sprite(this, pos[0], pos[1], name).setInteractive({draggable: true});
            s.on('drag', (pointer, dragX, dragY) => {
                s.x = dragX;
                s.y = dragY;
            });
            this.add.existing(s);
        }

        // @TODO: add wizard character sprite

        this.input.keyboard.on('keydown', (e) => {
            let currentLayout = {};
            this.children.list.map((s) => {
                if (this.layout[s.texture.key]) {
                    currentLayout[s.texture.key] = [Math.trunc(s.x), Math.trunc(s.y)];
                }
            });
            console.log("this.layout = " + JSON.stringify(currentLayout) + ";");
        }, this);
    }
}
