from django.contrib.auth.models import User
from rest_framework import serializers
from api.models import Profile, Requirement, Appointment


# ----------------------
# USER REGISTRATION
# ----------------------
class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)
    user_type = serializers.ChoiceField(choices=[
        ('school', 'School'),
        ('psychologist', 'Psychologist'),
        ('student', 'Student'),
    ])

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password', 'user_type']

    def validate_email(self, value):
        """Ensure email is unique."""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def create(self, validated_data):
        # Generate unique username from email
        base_username = validated_data['email'].split('@')[0]
        username = base_username
        counter = 1
        while User.objects.filter(username=username).exists():
            username = f"{base_username}{counter}"
            counter += 1

        # Create User
        user = User.objects.create_user(
            username=username,
            email=validated_data['email'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            password=validated_data['password']
        )

        # Profile is automatically created by signal.
        # We just update the user_type here.
        profile = user.profile
        profile.user_type = validated_data.get('user_type', 'student')
        profile.save()

        return user

    def to_representation(self, instance):
        """Customize response after registration."""
        return {
            "id": instance.id,
            "username": instance.username,
            "email": instance.email,
            "first_name": instance.first_name,
            "last_name": instance.last_name,
            "user_type": instance.profile.user_type,
            "message": "User registered successfully!"
        }


# ----------------------
# LOGIN SERIALIZER
# ----------------------
from django.contrib.auth import authenticate

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid credentials — user not found.")

        user = authenticate(username=user.username, password=password)
        if not user:
            raise serializers.ValidationError("Invalid credentials — check password.")

        data["user"] = user
        return data


# ----------------------
# PROFILE SERIALIZER
# ----------------------
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"


# ----------------------
# REQUIREMENT SERIALIZER
# ----------------------
class RequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requirement
        fields = "__all__"


# ----------------------
# APPOINTMENT SERIALIZER
# ----------------------
class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = "__all__"
        extra_kwargs = {
            "requested_by": {"required": False, "allow_null": True},
        }

