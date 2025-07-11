var Role;
(function (Role) {
    Role["SuperAdmin"] = "superAdmin";
    Role["Moderator"] = "moderator";
    Role["Viewer"] = "viewer";
})(Role || (Role = {}));
var canEdit = function (role) {
    if (role == Role.Viewer) {
        return false;
    }
    else {
        return true;
    }
};
console.log(canEdit(Role.Moderator));
console.log(canEdit(Role.Viewer));
