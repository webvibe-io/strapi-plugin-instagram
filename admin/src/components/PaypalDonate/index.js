import React, { useEffect } from 'react';
import useScript from '../../utils/useScript';

const PaypalDonate = () => {
  const status = useScript(
    `https://www.paypalobjects.com/donate/sdk/donate-sdk.js`,
  );

  useEffect(() => {
    if (status == 'ready') {
      PayPal.Donation.Button({
        env: 'production',
        hosted_button_id: '4HJ6CC5MB79TN',
        image: {
          src: 'https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif',
          alt: 'Donate with PayPal button',
          title: 'PayPal - The safer, easier way to pay online!',
        },
      }).render('#donate-button');
    }
  }, [status]);

  return (
    <>
      {status == 'ready' ? (
        <div id="donate-button-container">
          <div id="donate-button"></div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default PaypalDonate;
