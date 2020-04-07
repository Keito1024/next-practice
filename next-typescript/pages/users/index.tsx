import React from "react";
import { User } from "../../interfaces";
import Layout from "../../components/Layout";
import Link from "next/link";
import { GetStaticProps } from "next";
import List from "../../components/List";
import { sampleUserData } from "../../utils/sample-data";

type Props = {
  items: User[]
}

const WithStaticProps: React.FC<Props> = ({ items }) => (
  <Layout title="Users List | Next.js + TypeScript Example">
    <h1>Users List</h1>
    <p>
      Example fetching data from inside <code>getStaticProps()</code>.
    </p>
    <p>You are currently on: /users</p>
    <List items={items} />
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const items: User[] = sampleUserData;
  return {props: {items}}
};

export default WithStaticProps
