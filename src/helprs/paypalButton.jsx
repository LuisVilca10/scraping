import React, { useEffect } from "react";

const PayPalButton = ({ price, onSuccess, id }) => {
    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: price,
                            },
                        },
                    ],
                });
            },
            onApprove: (data, actions) => {
                return actions.order.capture().then((details) => {
                    onSuccess(details);
                });
            },
        }).render(`#paypal-button-container-${id}`); // Renderiza en un contenedor único
    }, [price, onSuccess, id]);

    return <div id={`paypal-button-container-${id}`} />;
};

export default PayPalButton;
