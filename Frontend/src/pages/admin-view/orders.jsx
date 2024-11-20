import AdminOrdersView from "@/components/admin-view/orders";
import { TabsContent } from "@/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";


function AdminOrders() {
    return ( 
        <div>
            <Tabs>
            <TabsContent>
            <AdminOrdersView/>
            </TabsContent>
            </Tabs>
        </div>
     );
}

export default AdminOrders;