from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .serializers import (RegisterSerializer, LoginSerializer,
                           UserProfileSerializer, ChangePasswordSerializer)
from .services import AuthService


class RegisterView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(request_body=RegisterSerializer)
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        tokens = AuthService.register(serializer.validated_data)
        return Response(tokens, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(request_body=LoginSerializer)
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = AuthService.login(
            username=serializer.validated_data['username'],
            password=serializer.validated_data['password'],
        )
        return Response(result)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={'refresh': openapi.Schema(type=openapi.TYPE_STRING, description='Refresh token')},
        required=['refresh']
    ))
    def post(self, request):
        try:
            refresh_token = request.data['refresh']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'message': 'Đăng xuất thành công!'})
        except Exception:
            return Response({'error': 'Token không hợp lệ!'}, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user.profile


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=ChangePasswordSerializer)
    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        AuthService.change_password(
            user=request.user,
            old_password=serializer.validated_data['old_password'],
            new_password=serializer.validated_data['new_password'],
        )
        return Response({'message': 'Đổi mật khẩu thành công!'})
