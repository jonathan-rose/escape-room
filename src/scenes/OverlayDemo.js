import { Scene } from 'phaser';
import Util from '../util';
import OverlayManager from '../objects/OverlayManager';
import Overlay from '../objects/Overlay';
import Book from '../objects/Book';

/**
 * A demo scene for how overlays work.
 *
 * You create a book, write a config object for it's overlay and then
 * use the overlayManager to bind them together.
 */
export class OverlayDemo extends Scene
{
    constructor ()
    {
        super('OverlayDemo');
        this.overlayManager = new OverlayManager(this);
    }

    create ()
    {
        this.overlayManager.attachEscListener();

        let c = Util.sceneCenter(this);

        let w = this.cameras.main.width;
        let h = this.cameras.main.height;

        let explanationText = new Phaser.GameObjects.Text(
            this,
            50,
            w / 3,
            "- Click books to open them\n- move the overlays around\n- click X or hit esc to close them",
            {
                fontSize: '16px',
                color: Util.colors.BLACK,
                align: 'left'
            }
        );
        this.add.existing(explanationText);

        // A bunch of books in a line
        this.book1 = new Book(this, c);
        this.book2 = new Book(this, {x: c.x + 22, y: c.y, color: Util.colors.DARK_BROWN});
        this.book3 = new Book(this, {x: c.x + 44, y: c.y, color: Util.colors.LIGHT_BROWN});
        this.book4 = new Book(this, {x: c.x + 66, y: c.y, color: Util.colors.BROWN});
        this.book5 = new Book(this, {x: c.x + 88, y: c.y, color: Util.colors.DARK_BROWN});
        this.book6 = new Book(this, {x: c.x + 110, y: c.y, color: Util.colors.LIGHT_BROWN});

        // Layout the overlays so they don't overlap initially
        let overlayConfig1 = {x: w / 5,
                              y: h / 5,
                              title: "The Necromancy of Thay",
                              color: Util.colors.GREY_BLUE};
        let overlayConfig2 = {x: w / 2,
                              y: h / 5,
                              title: "The Enchiridion of Epictetus"};
        let overlayConfig3 = {x: w * 4 / 5,
                              y: h / 5,
                              title: " Harry Potter and the\nMethods of Rationality",
                              color: Util.colors.BLUE};
        let overlayConfig4 = {x: w / 5,
                              y: h * 4 / 5,
                              title: "A Wizard of Earthsea",
                              color: Util.colors.PINK};
        let overlayConfig5 = {x: w / 2,
                              y: h * 4 / 5,
                              title: "The Hitchhiker's Guide\n    to the Galaxy",
                              color: Util.colors.PARCHMENT};
        let overlayConfig6 = {x: w * 4 / 5,
                              y: h * 4 / 5,
                              title: "The Book of Eibon",
                              color: Util.colors.CHARCOAL};

        // Bind the objects to their overlays with the overlay manager
        this.overlayManager.registerObject(this.book1, overlayConfig1);
        this.overlayManager.registerObject(this.book2, overlayConfig2);
        this.overlayManager.registerObject(this.book3, overlayConfig3);
        this.overlayManager.registerObject(this.book4, overlayConfig4);
        this.overlayManager.registerObject(this.book5, overlayConfig5);
        this.overlayManager.registerObject(this.book6, overlayConfig6);
    }
}
