import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.
 */
export const DialogAlert = (open) => {
    return (
      <div>
        <Dialog
          modal={false}
          open={open}
        >
          Discard draft?
        </Dialog>
      </div>
    );
}