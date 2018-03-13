/* global confirm */
import React from 'react';
import i18n from 'i18n';

const ownerAwareUnpublish = (FormAction) => (props) => {
  const originalOnclick = props.onClick;
  const newProps = {
    ...props,
    onClick(e, nameOrID) {
      const { owners } = props.data;
      if (owners && parseInt(owners, 10) > 0) {
        const message = [
          i18n.inject(
            i18n._t(
              'AssetAdmin.SINGLE_OWNED_WARNING_1',
              'This file is being used in {count} other published section(s).',
            ),
            { count: owners }
          ),
          i18n._t(
            'AssetAdmin.SINGLE_OWNED_WARNING_2',
            'Ensure files are removed from content areas prior to unpublishing them. Otherwise, they will appear as broken links.'
          ),
          i18n._t(
            'AssetAdmin.SINGLE_OWNED_WARNING_3',
            'Do you want to unpublish this file anyway?'
          )
        ];
        // eslint-disable-next-line no-alert
        if (confirm(message.join('\n\n'))) {
          e.preventDefault();
          return;
        }
      }
      originalOnclick(e, nameOrID);
    }
  };

  return <FormAction {...newProps} />;
};

export default ownerAwareUnpublish;
