import React, { useEffect } from "react";

const PayPalButton = ({ price, onSuccess  }) => {
    useEffect(() => {
        if (window.paypal) {
            window.paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: price, // Precio dinámico
                                    currency_code: "USD",
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    return actions.order.capture().then((details) => {
                        alert(`Transacción completada por ${details.payer.name.given_name}`);
                        console.log("Detalles de la transacción: ", details);
                        onSuccess(details);
                        // Opcional: Puedes guardar detalles en Firebase aquí
                    });
                },
                onError: (err) => {
                    console.error("Error en la transacción: ", err);
                },
            }).render("#paypal-button-container");
        }
    }, [price, onSuccess]);

    return <div id="paypal-button-container"></div>;
};

export default PayPalButton;
