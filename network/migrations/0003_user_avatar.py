# Generated by Django 3.1.1 on 2020-10-26 06:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0002_auto_20201010_1957'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='avatar',
            field=models.ImageField(null=True, upload_to='userAvatar'),
        ),
    ]