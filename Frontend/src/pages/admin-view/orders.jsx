import AdminOrdersView from "@/components/admin-view/orders";
import { TabsContent } from "@/components/ui/tabs";


function AdminOrders() {
    return ( 
        <div>
            <TabsContent>
            <AdminOrdersView/>
            </TabsContent>
        </div>
     );
}

export default AdminOrders;