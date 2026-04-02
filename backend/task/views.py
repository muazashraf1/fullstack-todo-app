from django.shortcuts import render
from rest_framework.views import APIView
from task.models import TodoApp
from task.serializers import TodoSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

# Create your views here.

class TodoList(APIView):
    def get(self, request):
        query_set = TodoApp.objects.all()
        serializer = TodoSerializer(query_set, many=True)
        return Response(serializer.data)
        # return Response({
        #     "message" : "All Todos are geted Successfuly",
        #     "Todo" : serializer.data,
        # })
    def post(self, request):
        data = request.data
        serializer = TodoSerializer(data=data)
        if not serializer.is_valid():
            return Response({
                "message" : "Todos are not setted",
                "error" : serializer.errors,
                "status" : status.HTTP_400_BAD_REQUEST
            })
        serializer.save()
        return Response(serializer.data)
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
    

class TodoDetail(APIView):
    def get(self, request, id):
        todo = get_object_or_404(TodoApp, id=id)
        serializer = TodoSerializer(todo)
        return Response(serializer.data)
    
    def put(self, request, id):
        todo = get_object_or_404(TodoApp, id=id)
        serializer = TodoSerializer(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    def delete(self, request, id):
        todo = get_object_or_404(TodoApp, id=id)
        todo.delete()
        return Response(status=204)



    