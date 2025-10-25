from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL

class Profile(models.Model):
    USER_TYPE_CHOICES = (
        ('school', 'School'),
        ('psychologist', 'Psychologist'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES)

    # common fields
    phone = models.CharField(max_length=20, blank=True, null=True)

    # School fields
    institution_name = models.CharField(max_length=255, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    contact_person = models.CharField(max_length=255, blank=True, null=True)
    requirements_note = models.TextField(blank=True, null=True)

    # Psychologist fields
    qualifications = models.TextField(blank=True, null=True)
    specializations = models.CharField(max_length=512, blank=True, null=True)
    availability = models.JSONField(default=list, blank=True)  # e.g. [{"day":"Mon","from":"10:00","to":"14:00"}]
    bio = models.TextField(blank=True, null=True)

    is_approved = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{getattr(self.user, 'email', self.user.username)} ({self.user_type})"


class Requirement(models.Model):
    school = models.ForeignKey(Profile, limit_choices_to={'user_type':'school'}, on_delete=models.CASCADE, related_name='requirements_posted')
    title = models.CharField(max_length=255)
    description = models.TextField()
    specialization_required = models.CharField(max_length=255, blank=True, null=True)
    preferred_location = models.CharField(max_length=255, blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_open = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.title} @ {self.school.institution_name or self.school.user.username}"


class Appointment(models.Model):
    STATUS_CHOICES = (
        ('pending','Pending'),
        ('confirmed','Confirmed'),
        ('completed','Completed'),
        ('declined','Declined'),
        ('cancelled','Cancelled'),
    )
    requirement = models.ForeignKey(Requirement, on_delete=models.CASCADE, related_name='appointments')
    psychologist = models.ForeignKey(Profile, limit_choices_to={'user_type':'psychologist'}, on_delete=models.CASCADE, related_name='appointments')
    requested_by = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='requests_made')  # the school profile
    scheduled_date = models.DateTimeField()
    duration_minutes = models.IntegerField(default=60)
    note = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Appt {self.id} {self.status} - {self.requirement.title}"
