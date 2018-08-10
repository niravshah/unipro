module.exports = {

    unexpected_error_message: "An unexpected error occurred while creating new group",
    object_already_existis: function (id) {
        return "An object with this id already exists : " + id
    },
    object_not_found: function (id) {
        return "An object with this id was not found: " + id
    },
    object_update_error: function (id) {
        return "Could not update this object with id: " + id
    }
};