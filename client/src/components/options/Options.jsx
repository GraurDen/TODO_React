import React from "react";
import { Button, Radio, Typography, Row, Col } from "antd";
import { useState } from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const Options = (props) => {
    const { onOrderBy, onSetFilterBy } = props;
    const [filterBy, setFilterBy] = useState("");
    const { Text } = Typography;
    const handleChange = (e) => {
        onSetFilterBy(e.target.value);
        setFilterBy(e.target.value);
    };
    const { t } = useTranslation();

    console.log("render!!!!!!!");

    return (
        <div style={{ marginBottom: "40px" }}>
            <Row>
                <Col flex="auto">
                    <Radio.Group value={filterBy} onChange={handleChange}>
                        <Radio.Button value="">{t("buttons.All")}</Radio.Button>
                        <Radio.Button value="done">
                            {t("buttons.Done")}
                        </Radio.Button>
                        <Radio.Button value="undone">
                            {t("buttons.Undone")}
                        </Radio.Button>
                    </Radio.Group>
                </Col>
                <Col>
                    <Text type="secondary" style={{ marginRight: "10px" }}>
                        {t("Sort by Date")}
                    </Text>
                    <Button
                        icon={<ArrowDownOutlined />}
                        onClick={() => onOrderBy("asc")}
                    />
                    <Button
                        icon={<ArrowUpOutlined />}
                        onClick={() => onOrderBy("desc")}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default Options;
