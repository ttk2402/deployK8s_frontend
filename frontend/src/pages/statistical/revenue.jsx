import React, { useEffect, useState } from 'react';
import "./statistical.css"
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Widget from '../../components/widget/Widget';
import Featured from '../../components/featured/Featured';
import Chart from '../../components/chart/Chart';
import TableOrderBy from '../../components/table/TableOrderBy';
import axios from 'axios';
import RevenueDateChart from '../../components/chart/RevenueDateChart';
const Revenue = () => {
    const [orders, setOrders] = useState([]);
    const [revenueDate, setRevenueDate] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchOrdersData = async () => {
            try {
                const response = await axios.get(`http://foodapp.k8s.com/api/order/all`);

                const sortedOrders = response.data.sort((a, b) => b.id - a.id); // Sắp xếp các đơn hàng theo ID giảm dần
                const top5Orders = sortedOrders.slice(0, 5); // Chọn 5 đơn hàng đầu tiên
                setOrders(top5Orders);

                console.log(top5Orders)

            } catch (error) {
                setError('Error fetching orders data. Please try again later.');

            }
        };
        const fetchRevenue = async () => {
            try {
                const response = await axios.get(`http://foodapp.k8s.com/api/bill/`);

                setRevenueDate(response.data)

            } catch (error) {
                setError('Error. Please try again later.');

            }
        };
        fetchOrdersData();
        fetchRevenue();

    }, []);
    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar title="Thống kê doanh thu" />
               

                <div className="listRevenue">
                    {/* <div className="listTitle">Đơn hàng gần đây</div> */}
                    {/* <TableOrderBy orders={orders} /> */}
                    < RevenueDateChart data={revenueDate} />
                </div>

            </div>
        </div>
    )
}

export default Revenue