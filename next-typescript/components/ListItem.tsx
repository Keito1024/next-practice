import React from "react";
import { User } from "../interfaces";
import Link from "next/link";

type Props = {
  data: User
}

const ListItem: React.FC<Props> = ({ data }) => (
  <Link href='/users/[id]' as={`/users/${data.id}`}>
    <a>
      {data.id}: {data.name}
    </a>
  </Link>
);

export default ListItem
