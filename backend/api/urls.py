from django.urls import path
from task import views

urlpatterns = [
    path('todos/', views.TodoList.as_view(), name="todo-list" ),
    path('todos/<int:id>/', views.TodoDetail.as_view())
]
