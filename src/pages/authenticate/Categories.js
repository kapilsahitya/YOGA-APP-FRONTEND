import React, { useEffect, useState } from "react";
import { getAPIData } from "../../utils/getAPIData";
import { useNavigate } from "react-router-dom";
import { PageTrafficTable } from "../../components/Tables";

const Categories = () => {
    const [categoriesData, setCategoriesData] = useState([]);
    const navigate = useNavigate();
    let token = localStorage.getItem('token');

    useEffect(() => {
        async function fetchData() {
            let { data, error, status } = await getAPIData('/category', token);

            if (!error) {
                if (data.categories.length > 0) {
                    data.categories.map((item) => {
                        setCategoriesData((prev) => [...prev, {
                            Id: item.categoryId,
                            Image: item.image,
                            Category: item.category,
                            Description: item.description,
                            View_Exercise: {
                                label: "View Exercise",
                                type: "Button"
                            },
                            Pro: item.isActive,
                            Action: 1
                        }])
                    })
                }
            } else {
                if (status === 401) {
                    localStorage.removeItem('token');
                    navigate('/sign-in');
                }
            }
        }
        fetchData();
    }, []);


    return (
        <React.Fragment>
            {categoriesData.length > 0 && <PageTrafficTable data={categoriesData} />}
        </React.Fragment>
    )
};
export default Categories;