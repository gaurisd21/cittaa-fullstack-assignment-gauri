from django.contrib import admin
from .models import Profile, Requirement, Appointment

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'user_type', 'institution_name', 'is_approved', 'created_at')
    search_fields = ('user__username','user__email','institution_name','location')

@admin.register(Requirement)
class RequirementAdmin(admin.ModelAdmin):
    list_display = ('title','school','is_open','created_at')
    search_fields = ('title','description','school__institution_name')

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('id','requirement','psychologist','status','scheduled_date','created_at')
    list_filter = ('status',)
