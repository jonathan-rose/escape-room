import Phaser from 'phaser';
import Util from '../util';

// @TODO: want to be able to have multiple pages of a book

/**
 * A simple overlay class, displays as a coloured rectangle with a
 * title and a close icon.
 */
export default class Overlay extends Phaser.GameObjects.Container {
    constructor(scene, manager, name, {x, y, title, color = Util.colors.PARCHMENT}) {
        super(scene, x, y);
        this.scene = scene;
        this.manager = manager;
        this.name = name;

        // The container needs a size to be draggable
        this.setSize(300, 200);

        this.setVisible(false);
        this.setInteractive({draggable: true});

        // Bring overlays to the front when clicked
        this.on('pointerdown', () => {
            this.scene.children.bringToTop(this);
        }, this);


        this.on('drag', (pointer, x, y) => {
            this.x = x;
            this.y = y;
        });

        this.background = new Phaser.GameObjects.Rectangle(
            this.scene,
            0,
            0,
            300,
            200,
            color
        );
        this.add(this.background);

        this.titleText = new Phaser.GameObjects.Text(
            this.scene,
            0,
            0,
            title,
            {
                fontSize: '16px',
                color: Util.colors.BLACK,
                align: 'left'
            }
        ).setOrigin(0.5, 0.5);
        this.add(this.titleText);

        this.closeIcon = new Phaser.GameObjects.Text(
            this.scene,
            135,
            -80,
            'X',
            {
                fontSize: '20px',
                color: Util.colors.BROWN,
                align: 'right'
            }
        ).setOrigin(0.5, 0.5);
        this.closeIcon.setInteractive({cursor: 'pointer'});
        this.closeIcon.on('pointerdown', () => {
            this.close();
        });
        this.add(this.closeIcon);

        this.scene.add.existing(this);
    }

    open() {
        this.setVisible(true);
        this.scene.children.bringToTop(this);
    }

    close() {
        this.setVisible(false);
    }
}
