export function isPaymentResponse(item: Object): item is PaymentResponse {
    return (
        'details' in item &&
        'methodName' in item &&
        'payerEmail' in item &&
        'payerName' in item &&
        'payerPhone' in item &&
        'requestId' in item &&
        'shippingAddress' in item &&
        'shippingOption' in item &&
        'complete' in item &&
        'toJSON' in item
    );
}
