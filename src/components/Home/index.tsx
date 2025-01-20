import { FC } from "react";
import { HomeProps } from "./types";
import { Table } from "antd";
import { createStyles } from "antd-style";

const useStyles = createStyles(({ css, prefixCls }) => {
  return {
    table: css`
      ${prefixCls}-table-wrapper {
        height: 100%;

        ${prefixCls}-spin-nested-loading {
          height: 100%;

          ${prefixCls}-spin-container {
            height: 100%;
            display: flex;
            flex-flow: column nowrap;

            ${prefixCls}-table {
              flex: auto;
              overflow: hidden;

              ${prefixCls}-table-container {
                height: 100%;
                display: flex;
                flex-flow: column nowrap;

                ${prefixCls}-table-header {
                  flex: none;
                }

                ${prefixCls}-table-body {
                  flex: auto;
                  overflow: scroll;
                }
              }
            }

            ${prefixCls}-table-pagination {
              flex: none;
            }
          }
        }
      }
    `,
  };
});

const Home: FC<HomeProps> = ({ profile }) => {
  const { styles } = useStyles();

  return (
    <Table
      className={styles["table"]}
      columns={[
        {
          title: "Имя",
          dataIndex: "name",
        },
        {
          title: "Размер",
          dataIndex: "size",
        },
        {
          title: "Создано",
          dataIndex: "createdAt",
        },
      ]}
      bordered
    />
  );
};

export default Home;
