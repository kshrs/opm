from rest_framework import serializers

class LocationSerializer(serializers.Serializer):
    name = serializers.CharField()
    coordinates = serializers.ListField(child=serializers.FloatField())
    stability_status = serializers.CharField()
    safety_factor = serializers.FloatField()
    alert_priority = serializers.IntegerField()
    elevation = serializers.FloatField()
    slope_angle = serializers.FloatField()
    sensors_online = serializers.IntegerField()
    sensors_count = serializers.IntegerField()
    mine_type = serializers.CharField()
