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
        this.add.image(512, 384, 'star').setInteractive()
        .on('pointerdown', () => {
            this.add.image(512,384, 'starGlow')
        });;

        this.stars = this.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 200, y: 300, stepX: 70 }
        });


        this.add.text(20, 20, 'Back', {
            fontFamily: 'Arial Black', fontSize: 64, color: Util.colours.WHITE,
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setInteractive()
        .on('pointerdown', () => {

            this.scene.start('Game');

        });
    }
}
