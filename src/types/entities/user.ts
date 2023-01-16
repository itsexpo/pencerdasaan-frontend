import { PermissionList } from "@/types/entities/permission-list";
import { Level } from "@/types/entities/role";

export type User = {
  name: string;
  role_id: Level["id"];
  role: Level["name"];
  email: string;
  token: string;
  permissions: PermissionList;
};

export type LoginRespond = {
  name: string;
  email: string;
  permission: {
    role: Level["name"];
    role_id: Level["id"];
    routes: PermissionList;
  };
};
