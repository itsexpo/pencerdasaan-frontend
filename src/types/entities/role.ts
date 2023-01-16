import { Permission } from "@/types/entities/permission";

export type Role = {
  id: number;
  name: string;
  permissions: Permission[];
  level: Level;
};

export type RoleDetail = {
  id: number;
  name: string;
  level: string;
  permission: {
    role: Level["name"];
    role_id: Level["id"];
    routes: string[];
  }[];
};

export type Level =
  | {
      id: "1";
      name: "USER";
    }
  | {
      id: "2";
      name: "ADMIN";
    }
  | {
      id: "3";
      name: "KADIV";
    };
