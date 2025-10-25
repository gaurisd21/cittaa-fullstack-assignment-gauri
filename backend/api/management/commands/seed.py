from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from api.models import Profile, Requirement, Appointment
from django.utils import timezone
import random

User = get_user_model()

class Command(BaseCommand):
    help = 'Seed DB with sample data'

    def handle(self, *args, **options):
        # avoid duplicate seeding
        if User.objects.filter(email='school1@example.com').exists():
            self.stdout.write(self.style.WARNING('Seed looks present, skipping.'))
            return

        schools = []
        for i in range(1,6):
            u = User.objects.create_user(email=f"school{i}@example.com", username=f"school{i}", password="password123", first_name=f"School{i}")
            p = u.profile
            p.user_type='school'
            p.institution_name=f"Sample School {i}"
            p.location=f"City {i}"
            p.contact_person=f"Contact {i}"
            p.save()
            schools.append(p)

        psychologists = []
        specs = ["Child", "Adolescent", "Clinical", "Counseling", "School"]
        for i in range(1,6):
            u = User.objects.create_user(email=f"psych{i}@example.com", username=f"psych{i}", password="password123", first_name=f"Psych{i}")
            p = u.profile
            p.user_type='psychologist'
            p.qualifications="M.Phil"
            p.specializations = specs[i-1]
            p.availability = [{"day":"Mon","from":"09:00","to":"17:00"}]
            p.is_approved = True
            p.save()
            psychologists.append(p)

        for i in range(10):
            req = Requirement.objects.create(
                school=random.choice(schools),
                title=f"Need {random.choice(specs)} Psychologist",
                description="We need help with students",
                specialization_required=random.choice(specs),
                preferred_location="City 1"
            )
            Appointment.objects.create(
                requirement=req,
                psychologist=random.choice(psychologists),
                requested_by=req.school,
                scheduled_date=timezone.now() + timezone.timedelta(days=random.randint(1,20)),
                duration_minutes=60,
                status=random.choice(['pending','confirmed'])
            )
        self.stdout.write(self.style.SUCCESS('Seeded DB'))
