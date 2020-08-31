// @flow

import _ from 'lodash';

import { createToolbarEvent, sendAnalytics } from '../../analytics';
import { appNavigate } from '../../app/actions';
import { disconnect } from '../../base/connection';
import { translate } from '../../base/i18n';
import { connect } from '../../base/redux';
import { AbstractTestButton } from '../../base/toolbox/components';
import { sendMessage, setPrivateMessageRecipient } from '../../chat/actions';
import { getParticipants, getLocalParticipant } from '../../base/participants/functions';
import type { AbstractButtonProps } from '../../base/toolbox/components';

/**
 * The type of the React {@code Component} props of {@link HangupButton}.
 */
type Props = AbstractButtonProps & {

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function
};

/**
 * Component that renders a toolbar button for leaving the current conference.
 *
 * @extends AbstractTestButton
 */
class TestButton extends AbstractTestButton<Props, *> {
    _hangup: Function;

    accessibilityLabel = 'toolbar.accessibilityLabel.hangup';
    label = 'test feature';
    tooltip = 'test feature';

    /**
     * Initializes a new HangupButton instance.
     *
     * @param {Props} props - The read-only properties with which the new
     * instance is to be initialized.
     */
    constructor(props: Props) {
        super(props);

        this._test = ((p, roomID) => {
            console.log(p);
            this.props.dispatch(setPrivateMessageRecipient(p));
            this.props.dispatch(sendMessage("https://localhost:8080/" + roomID));
        });
    }

    /**
     * Helper function to perform the actual hangup action.
     *
     * @override
     * @protected
     * @returns {void}
     */
    _doTest() {
        const participants = getParticipants(APP.store.getState()).slice();
        let n = 0;
        let c = 0;
        let size = 2;
        for(let p of participants){
            if(p === getLocalParticipant(APP.store.getState())){
                continue;
            }
            this._test(p, 'easyfliproom' + n);
            c++;
            if(c >= size){
                c = c % size;
                n++
            }
        }
    }
}

export default translate(connect()(TestButton));
