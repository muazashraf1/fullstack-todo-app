from django.urls import path
from task import views

urlpatterns = [
    path('todos/', views.TodoList.as_view(), name="todo-list" ),
    path('todos/<int:id>/', views.TodoDetail.as_view()),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
]
