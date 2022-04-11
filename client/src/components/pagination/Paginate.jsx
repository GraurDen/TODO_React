import React from 'react';
import { Pagination } from 'antd';

const Paginate = (props) => {
    // Tasks total number
    const { totalItemsCount, paginate, currentPage } = props;

    return (
        <div style={{ marginTop: 'auto', textAlign: 'center' }}>
            <Pagination
                defaultCurrent={1}
                total={totalItemsCount}
                defaultPageSize={5}
                current={currentPage}
                onChange={paginate}
                hideOnSinglePage={true}
            />
        </div>
    );
};

export default Paginate;
