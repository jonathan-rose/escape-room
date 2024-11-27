import { Scene } from 'phaser';
import Util from '../util';

export class Telescope extends Scene
{
    constructor ()
    {
        super('Telescope');
    }

    create ()
    {
        this.add.image(512, 384, 'starfield');

        this.prevX = 0;
        this.prevY = 0;

        this.star1 = this.add.image(512, 384, 'star').setInteractive()
        .on('pointerdown', () => {
            this.add.image(512,384, 'starGlow');
            this.DrawLine(this.star1.x, this.star1.y);
            // this.prevX = this.star1.x;
            // this.prevY = this.star1.y;
        });;

        this.star2 = this.add.image(600, 300, 'star').setInteractive()
        .on('pointerdown', () => this.DrawLine(this.star2.x, this.star2.y));

        this.star3 = this.add.image(700, 400, 'star').setInteractive()
        .on('pointerdown', () => this.DrawLine(this.star3.x, this.star3.y));

        this.star4 = this.add.image(800, 350, 'star').setInteractive()
        .on('pointerdown', () => this.DrawLine(this.star4.x, this.star4.y));

        // this.star1.on(
        //     'pointerdown',
        //     () => this.add.line(
        //         0,
        //         0,
        //         this.star1.x,
        //         this.star1.y,
        //         this.star2.x,
        //         this.star2.y,
        //         0xff0000
        //     ).setOrigin(0, 0)
        // );

        this.add.text(20, 20, 'Back', {
            fontFamily: 'Arial Black', fontSize: 64, color: Util.colours.WHITE,
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setInteractive()
        .on('pointerdown', () => {
            this.scene.start('Game');
        });
    }

    DrawLine(x, y) {
        if(this.prevX == 0)
        {
            this.prevX = x;
            this.prevY = y;
            return;
        }
        this.add.line(
            0,
            0,
            this.prevX,
            this.prevY,
            x,
            y,
            0xff0000
        ).setOrigin(0, 0);
        this.prevX = x;
        this.prevY = y;
    }
}
