enum PermissionEnum {
  "login_user.store",
  "user.index",
  "user.store",
  "user.show",
  "user.update",
  "user.delete",
  "admin.index",
  "admin.store",
  "admin.show",
  "admin.update",
  "admin.delete",
}

export type PermissionList = Array<keyof typeof PermissionEnum>;
