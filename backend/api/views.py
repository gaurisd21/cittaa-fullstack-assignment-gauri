from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status, filters, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import get_user_model
from .models import Profile, Requirement, Appointment
from .serializers import ProfileSerializer, RequirementSerializer, AppointmentSerializer, RegisterSerializer

User = get_user_model()

class RegisterAPIView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.select_related('user').all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Profile.objects.all()
        return Profile.objects.filter(user=user)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        return Response(ProfileSerializer(request.user.profile).data)

class RequirementViewSet(viewsets.ModelViewSet):
    queryset = Requirement.objects.select_related('school').all()
    serializer_class = RequirementSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title','description','specialization_required','preferred_location']

    def perform_create(self, serializer):
        serializer.save(school=self.request.user.profile)

    def get_queryset(self):
        qs = super().get_queryset().filter(is_open=True)
        specialization = self.request.query_params.get('specialization')
        location = self.request.query_params.get('location')
        if specialization:
            qs = qs.filter(specialization_required__icontains=specialization)
        if location:
            qs = qs.filter(preferred_location__icontains=location)
        return qs

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.select_related('psychologist','requirement','requested_by').all()
    serializer_class = AppointmentSerializer
    permission_classes = [AllowAny]  # TEMPORARY


    def perform_create(self, serializer):
        serializer.save(requested_by=None)  # TEMP: no JWT


    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        appointment = self.get_object()
        if request.user.profile != appointment.psychologist:
            return Response({"detail":"Only the psychologist can accept."}, status=status.HTTP_403_FORBIDDEN)
        appointment.status = 'confirmed'
        appointment.save()
        return Response(self.get_serializer(appointment).data)

    @action(detail=True, methods=['post'])
    def decline(self, request, pk=None):
        appointment = self.get_object()
        if request.user.profile != appointment.psychologist:
            return Response({"detail":"Only the psychologist can decline."}, status=status.HTTP_403_FORBIDDEN)
        appointment.status = 'declined'
        appointment.save()
        return Response(self.get_serializer(appointment).data)
