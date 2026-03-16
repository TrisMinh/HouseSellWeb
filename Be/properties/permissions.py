from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerOrReadOnly(BasePermission):
    """
    Chỉ cho phép chủ sở hữu chỉnh sửa/xóa.
    Các request đọc (GET, HEAD, OPTIONS) thì ai cũng được.
    """
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.owner == request.user
