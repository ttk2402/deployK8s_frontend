
import "../../css/mngtHome.css"
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

import AllTableProductMngt from "../../components/tableProductMngtHome/AllTableProductMngt";
//import HiddenTableProductMngt from "../../components/tableProductMngtHome/HiddenTableProductMngt ";
import TabContent from "../../components/tab-content/tab-content";
import { Link } from "react-router-dom";
import AllTableCategoryProductMngt from "../../components/tableProductMngtHome/AllTableCategoryProductMngt";

const ProductMngtHome = () => {
   
    const contents = [
        {
            title: "Tất cả Món ăn",
            content: (
                <AllTableProductMngt />
            ),
        },
        {
            title: "Tất cả danh mục",
            content: (
                <AllTableCategoryProductMngt />
            ),
        },
    ];
    return (
        <div className='list'>
            <Sidebar />
            <div className="listContainer">
                <Navbar title="Quản lý món ăn" />
                <div className="headerMngt">
                  
                    <div className="linkAdd">
                        <Link to="/admin/productManagement/addProduct" style={{ textDecoration: "none" }}>
                            <div className="textAdd">Thêm mới</div>
                        </Link>
                    </div>
                </div>

                <TabContent input={contents} />

            </div>


        </div>

    )
}

export default ProductMngtHome;