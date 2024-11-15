import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";



function PaypalReturnPage() {

    const dispath = useDispatch()
    const location = useLocation()
    const params = new URLSearchParams(location.search);
    const paymentId = params.get('paymentId')
    const payerId = params.get('PayerID')

    useEffect(() => {

        if (payerId && paymentId){
            const orderId = JSON.parse(sessionStorage.getItem('currentOrderId'))

            dispath(capturePayment({
                paymentId,
                payerId,
                orderId
            })).then(data => {
                if(data?.payload?.success){
                    sessionStorage.removeItem('currentOrderId')
                    window.location.href = '/shop/payment-success'
                }
            })
        }

    },[payerId,paymentId,dispath])

    return ( 
        <Card>
            <CardHeader>
                <CardTitle>
                    Proccessing Payment...Please wait
                </CardTitle>
            </CardHeader>
        </Card>
     );
}

export default PaypalReturnPage;