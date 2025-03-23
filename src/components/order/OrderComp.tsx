import Navbar from "../layout/Navbar"
import {
Table,
TableBody,
TableCaption,
TableCell,
TableFooter,
TableHead,
TableHeader,
TableRow,
} from "@/components/ui/table"

const invoices = [
    {
        oid: 1282244,
        dt: "20-11-2023 03:21:40",
        stock: "GOOGL",
        price: "$120",
        quantity: 4,
        bs: "Buy",
        tp: 482
    },
];

const OrderComp: React.FC = () => {
    return (<div style={{backgroundImage:"bg.png"}}>
       
        <div className="min-h-screen flex flex-col" bg-image="./bg.png">
            
            <Navbar />
      
            <main className="flex-1 bg-gradient-to-b from-background to-accent/20">
            <div className="container mx-auto px-4">
                {/* <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 "> */}
                <div className="container mx-auto px-4 py-6">
                    <div className="mb-6">
                    <h1 className="text-3xl font-bold mb-1">Orders</h1>
                    </div>
                <div className="overflow-x-auto">


                <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                
                    <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Buy/Sell</TableHead>
                    <TableHead>Total Price<p className="text-xs">(incl. charge)</p></TableHead>
                    </TableRow>
                
                <TableBody>
                    {invoices.map((invoice) => (
                    <TableRow>
                        <TableCell>{invoice.oid}</TableCell>
                        <TableCell>{invoice.dt}</TableCell>
                        <TableCell>{invoice.stock}</TableCell>
                        <TableCell>{invoice.price}</TableCell>
                        <TableCell>{invoice.quantity}</TableCell>
                        <TableCell><p className={invoice.bs === "Buy" ? "text-green-600": "text-red-600"}>{invoice.bs}</p></TableCell>
                        <TableCell>{invoice.tp}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                
                </Table>
            


                    {/**           */}
                        {/* <table className="min-w-full bg-white shadow-md rounded-lg mt-6">
                            <thead>
                                <tr className="bg-gray-200 text-gray-700 text-left">
                                    <th className="px-6 py-3 font-semibold">Order ID</th>
                                    <th className="px-6 py-3 font-semibold">Date & Time</th>
                                    <th className="px-6 py-3 font-semibold">Stock Name</th>
                                    <th className="px-6 py-3 font-semibold">Price</th>
                                    <th className="px-6 py-3 font-semibold">Quantity</th>
                                    <th className="px-6 py-3 font-semibold">Buy/Sell</th>
                                    <th className="px-6 py-3 font-semibold">Total Price<p className="text-xs">(incl. charges)</p></th>
                                </tr>
                            </thead>
                            <tbody>
                                //Example Row
                                <tr className="border-b hover:bg-gray-100">
                                    <td className="px-6 py-4">12345</td>
                                    <td className="px-6 py-4">2025-03-23 14:30</td>
                                    <td className="px-6 py-4">ABC Corp</td>
                                    <td className="px-6 py-4">$150</td>
                                    <td className="px-6 py-4">10</td>
                                    <td className="px-6 py-4 text-green-600 font-semibold">Buy</td>
                                    <td className="px-6 py-4">$1503</td>
                                </tr>
                                
                                <tr className="border-b hover:bg-gray-100">
                                    <td className="px-6 py-4">67890</td>
                                    <td className="px-6 py-4">2025-03-22 10:15</td>
                                    <td className="px-6 py-4">XYZ Ltd</td>
                                    <td className="px-6 py-4">$200</td>
                                    <td className="px-6 py-4">5</td>
                                    <td className="px-6 py-4 text-red-600 font-semibold">Sell</td>
                                    <td className="px-6 py-4">$1002</td>
                                </tr>
                            </tbody>
                        </table> */}
                    </div>
                </div>
            </div>
            </main>
        </div>
        </div>
    )
}

export default OrderComp;