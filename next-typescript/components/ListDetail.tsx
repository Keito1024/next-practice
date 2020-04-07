import React from "react";
import { User } from "../interfaces";

type ListDetailProps = {
  user: User
}

const ListDetail: React.FC<ListDetailProps> = ({ user }) => (
  <div>
    <h1>Detail for {user.name}</h1>
    <p>ID: {user.id}</p>
  </div>
);

export default ListDetail
