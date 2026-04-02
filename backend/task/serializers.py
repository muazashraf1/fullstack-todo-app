from rest_framework import serializers
from task.models import TodoApp


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoApp
        fields = "__all__"