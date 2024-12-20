import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../ui/table";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus } from "@/store/admin-slice/order-slice";
import { useToast } from "@/hooks/use-toast";

const initialFromData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFromData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const {toast} = useToast()

//   console.log({
//     id: orderDetails?._id,
//     orderStatus: status
// })

  function handleUpdateStatus(event) {
    event.preventDefault();

    const {status} = formData;
    dispatch(updateOrderStatus({
        id: orderDetails?._id,
        orderStatus: status
    })).then(data => {
        // console.log(data);
        if(data?.payload?.success){
            dispatch(getOrderDetailsForAdmin(orderDetails?._id))
            dispatch(getAllOrdersForAdmin())
            setFormData(initialFromData)
            toast({
                title: data?.payload?.message
            })
        }
    })

  }

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[97vh] overflow-y-auto">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              {orderDetails?.orderStatus === "pending" ? (
                <Badge className="bg-orange-400 py-1 px-3">
                  {orderDetails?.orderStatus}
                </Badge>
              ) : orderDetails?.orderStatus === "confirmed" ? (
                <Badge className="bg-green-400 py-1 px-3">
                  {orderDetails?.orderStatus}
                </Badge>
              ) : (
                <Badge className="bg-red-400 py-1 px-3">
                  {orderDetails?.orderStatus}
                </Badge>
              )}
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                  ? orderDetails?.cartItems.map((item) => (
                      // eslint-disable-next-line react/jsx-key
                      <TableRow>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${item.price}</TableCell>
                      </TableRow>

                      // <li className="flex items-center justify-between">
                      //   <span>Title: {item.title}</span>
                      //   <span>Quantity: {item.quantity}</span>
                      //   <span>Price: ${item.price}</span>
                      // </li>
                    ))
                  : null}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "rejected", label: "Rejected" },
                  { id: "delivered", label: "Delivered" },
                  { id: "cancelled", label: "Cancelled" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
