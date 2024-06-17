import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import "../../components/table/tableOrderBy.css"
import { Link } from 'react-router-dom';

const ReviewDate = () => {
    const [customerTotalPurchase, setCustomerTotalPurchase] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Lấy danh sách khách hàng và đơn hàng từ API
                const customersResponse = await axios.get('http://foodapp.k8s.com/api/account/3');
                const ordersResponse = await axios.get('http://foodapp.k8s.com/api/order/all');

                // Chuyển đổi dữ liệu thành dạng object với customerId là khóa và tổng số tiền đã mua là giá trị
                const orders = ordersResponse.data;
                const customers = {};
                orders.forEach(order => {
                    const customerId = order.account.id;
                    const totalPurchase = order.bill.totalprice;
                    if (customers[customerId]) {
                        customers[customerId] += totalPurchase;
                    } else {
                        customers[customerId] = totalPurchase;
                    }
                });

                // Tạo mảng dữ liệu khách hàng với thông tin tổng số tiền đã mua
                // const customerArray = Object.keys(customers).map((customerId, index) => {
                const customerArray = Object.keys(customers).map(customerId => {
                    const customer = customersResponse.data.find(customer => customer.id === parseInt(customerId));
                    return {
                        id: customerId,
                        //index: index + 1,
                        firstname: customer.firstname,
                        lastname: customer.lastname,
                        phonenumber: customer.phonenumber,
                        address: customer.address,
                        totalPurchase: customers[customerId],
                    };
                });
                // Sắp xếp danh sách khách hàng theo tổng số tiền đã mua từ cao đến thấp
                customerArray.sort((a, b) => b.totalPurchase - a.totalPurchase);
                // Thêm trường ranking để lưu số thứ tự
                customerArray.forEach((customer, index) => {
                    customer.ranking = index + 1;
                });
                // Lưu trữ kết quả vào state
                setCustomerTotalPurchase(customerArray);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const columns = [
        { field: 'ranking', headerName: 'STT', width: 90 },
        { field: 'id', headerName: 'ID KH', width: 120 },
        { field: 'firstname', headerName: 'Họ', width: 120 },
        { field: 'lastname', headerName: 'Tên', width: 120 },
        { field: 'phonenumber', headerName: 'Số điện thoại', width: 150 },
        {
            field: 'address', headerName: 'Địa chỉ', width: 240,
            renderCell: (params) => (
                <div>
                    {params.value ? (
                        <div>
                            <p>{params.value.street ? params.value.street + ', ' : '_, '}
                                {params.value.ward ? params.value.ward + ', ' : '_, '}
                                {params.value.district ? params.value.district + ', ' : '_, '}
                                {params.value.province ? params.value.province + '. ' : '_'}
                            </p>
                        </div>
                    ) : (
                        <p></p>
                    )}
                </div>
            ),
        },
        { field: 'totalPurchase', headerName: 'Tổng số tiền đã mua', width: 200 },
        {
            field: 'action',
            headerName: '',
            sortable: false,
            width: 150,
            renderCell: (params) => (
                <Link to={`/admin/customerManagement/customerDetail/${params.row.id}`} style={{ textDecoration: "none" }}>
                    <div className="viewButton">Xem chi tiết</div>
                </Link>
            )
        }
    ];

    return (
        <div style={{ height: 320, width: '100%' }}>
            <DataGrid className="datagridCustomerStats"
                rows={customerTotalPurchase}
                columns={columns}
                disableSelectionOnClick={false} // Đặt giá trị false để tắt chức năng chọn khi click
                checkboxSelection={false} // Đặt giá trị false để ẩn ô kiểm checkbox
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 4 },
                    },
                }}
                pageSizeOptions={[4]}
            />
        </div>
    );
};

export default ReviewDate;