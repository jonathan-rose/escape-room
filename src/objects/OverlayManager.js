import Overlay from './Overlay';

// @TODO: would be really nice for new overlays to find "free space"
// to launch in

/**
 * This class is responsible for creating overlys and binding them to
 * game objects with its `register` functions.
 *
 * Overlays are specified by a string `name`, if the overlay is bound
 * to an object this will be a random unique string, the overlay
 * `name` field should match the object `overlayName` field.
 *
 * You can also just create an overlay by hand (ensuring it's `name`
 * field is memorable) and pass it the `register` function. You can
 * then use the manager to open and close that overlay by name instead
 * of relying on interaction with a gameObject. Useful for triggering
 * overlays on timers or in reaction to state.
 */
export default class OverlayManager {
    constructor(scene) {
        this.scene = scene;
        this.overlays = new Phaser.GameObjects.Group(this.scene);
    }

    /**
     * Attach a listener to close the topmost overlay on ESC. Must be
     * called by the `create` function of any scene that wants this
     * behaviour.
     */
    attachEscListener() {
        this.escKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.escKey.on('down', this.closeTopOverlay, this);
    }

    /**
     * Register an overlay with the manager.
     */
    register(overlay) {
        this.overlays.add(overlay);
    }

    /**
     * Create an overlay for an object and bind them together.
     */
    registerObject(obj, config) {
        // Create an overlay based on the config and register it with the manager.
        let overlayName = crypto.randomUUID();
        let overlay = new Overlay(this.scene, this, overlayName, config);
        this.register(overlay);

        // Give the object the name of the overlay and make it open on click.
        obj.overlayName = overlayName;
        obj.setInteractive();
        obj.on('pointerdown', () => {
            this.openObject(obj);
        }, this);
    }

    open(name) {
        let overlay = this.overlays.getMatching('name', name)[0];
        overlay.open();
    }

    openObject(obj) {
        this.open(obj.overlayName);
    }

    close(name) {
        let overlay = this.overlays.getMatching('name', name)[0];
        overlay.close();
    }

    closeObject(obj) {
        this.close(obj.overlayName);
    }

    /**
     * Use the scene displayList to find the overlay that is being
     * drawn on top and close it.
     */
    closeTopOverlay() {
        let displayList = this.scene.children.list;
        for (let i = displayList.length - 1; i >= 0; i--) {
            let child = displayList[i];
            if (child instanceof Overlay && child.visible) {
                child.close();
                break;
            }
        }
    }
}
