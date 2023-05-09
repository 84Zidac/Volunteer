# Generated by Django 4.2 on 2023-05-09 15:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event_app', '0002_rename_volunteers_reqired_event_volunteers_required'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='address',
        ),
        migrations.AddField(
            model_name='event',
            name='street_address',
            field=models.TextField(default='null address'),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='Address',
        ),
    ]
