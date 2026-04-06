from django.shortcuts import render
from rest_framework.views import APIView
from task.models import TodoApp
from task.serializers import TodoSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.

class TodoList(APIView):
    permission_classes = [IsAuthenticated]  
    def get(self, request):
        # query_set = TodoApp.objects.all()
        query_set = TodoApp.objects.filter(user=request.user)
        serializer = TodoSerializer(query_set, many=True)
        return Response(serializer.data)
        # return Response({
        #     "message" : "All Todos are geted Successfuly",
        #     "Todo" : serializer.data,
        # })


    # def post(self, request):
    #     data = request.data
    #     serializer = TodoSerializer(data=data)
    #     if not serializer.is_valid():
    #         return Response({
    #             "message" : "Todos are not setted",
    #             "error" : serializer.errors,
    #             "status" : status.HTTP_400_BAD_REQUEST
    #         })
    #     serializer.save()
    #     return Response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = TodoSerializer(data=data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # 🔥 IMPORTANT
            return Response(serializer.data)
        return Response(serializer.errors, status=400)





        # return Response({
        #     "message" : "Data has saved",
        #     "totos" : serializer.data,
        #     "status" : status.HTTP_200_OK 
        # })


    # def delete(self, request, id):
    #     try:
    #         print(id)
    #         todo = TodoApp.objects.get(id=id)
    #         todo.delete()
    #         return Response(status=status.HTTP_204_NO_CONTENT)
    #     except TodoApp.DoesNotExist:
    #         return Response(status=status.HTTP_404_NOT_FOUND)

    # def delete(self, request):
    #     data = request.data
    #     if not data.get('id'):
    #         return Response(status.HTTP_400_BAD_REQUEST)
    #     todos = get_object_or_404(TodoApp, id=data.get('id')).delete()
    #     return Response({
    #         "data" : {}
    #     })
    

#JWT 
class TodoDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        todo = get_object_or_404(TodoApp, id=id, user=request.user)
        serializer = TodoSerializer(todo)
        return Response(serializer.data)

    def put(self, request, id):
        todo = get_object_or_404(TodoApp, id=id, user=request.user)
        serializer = TodoSerializer(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, id):
        todo = get_object_or_404(TodoApp, id=id, user=request.user)
        todo.delete()
        return Response(status=204)


class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=400)
        user = User.objects.create_user(username=username, password=password, email=email)
        return Response({'message': 'User created successfully'}, status=201)


class LoginView(TokenObtainPairView):
    pass






# class TodoDetail(APIView):
#     def get(self, request, id):
#         todo = get_object_or_404(TodoApp, id=id)
#         serializer = TodoSerializer(todo)
#         return Response(serializer.data)
    
#     def put(self, request, id):
#         todo = get_object_or_404(TodoApp, id=id)
#         serializer = TodoSerializer(todo, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=400)
    
#     def delete(self, request, id):
#         todo = get_object_or_404(TodoApp, id=id)
#         todo.delete()
#         return Response(status=204)



    