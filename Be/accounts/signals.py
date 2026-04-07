from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import UserProfile


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """Khi có User mới → tự động tạo UserProfile"""
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    """Khi User được save → Profile cũng save theo"""
    if hasattr(instance, 'profile'):
        instance.profile.save()

#pattern observer : khi có sự kiện gì đó xảy ra thì các đối tượng khác sẽ nhận được thông báo và thực hiện hành động tương ứng
# trong trường hợp này sự kiện là khi có User mới → tự động tạo UserProfile