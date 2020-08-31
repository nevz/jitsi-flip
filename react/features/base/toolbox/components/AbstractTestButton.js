// @flow

import { IconArrowBack } from '../../icons';

import AbstractButton from './AbstractButton';
import type { Props } from './AbstractButton';

/**
 * An abstract implementation of a button for disconnecting a conference.
 */
export default class AbstractTestButton<P : Props, S: *>
    extends AbstractButton<P, S> {

    icon = IconArrowBack;

    /**
     * Handles clicking / pressing the button, and does whatever the button must do.
     *
     * @protected
     * @returns {void}
     */
    _handleClick() {
        this._doTest();
    }

    /**
     * Helper function to perform the actual test action.
     *
     * @protected
     * @returns {void}
     */
    _doTest() {
        // To be implemented by subclass.
    }
}
