# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=80)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Addrs(models.Model):
    rid = models.AutoField(primary_key=True)
    addr = models.CharField(max_length=50)
    receivername = models.CharField(max_length=30, blank=True, null=True)
    receivertel = models.CharField(max_length=11, blank=True, null=True)
    isdefault = models.IntegerField(blank=True, null=True)
    uid = models.IntegerField()
    youbian = models.CharField(max_length=6, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'hw_addrs'


class Cart(models.Model):
    cid = models.AutoField(primary_key=True)
    gid = models.IntegerField()
    buynum = models.IntegerField(blank=True, null=True)
    isbuy = models.IntegerField(blank=True, null=True)
    uid = models.IntegerField()
    server = models.IntegerField(blank=True, null=True)
    count = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'hw_cart'


class Comments(models.Model):
    comid = models.AutoField(primary_key=True)
    content = models.CharField(max_length=1000)
    posttime = models.DateTimeField(blank=True, null=True)
    greatnum = models.IntegerField(blank=True, null=True)
    gid = models.IntegerField()
    uid = models.IntegerField()
    reid = models.IntegerField(blank=True, null=True)
    goodname = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'hw_comments'


class Goods(models.Model):
    gid = models.AutoField(primary_key=True)
    goodcode = models.CharField(unique=True, max_length=20)
    goodname = models.CharField(max_length=200)
    color = models.CharField(max_length=10)
    versions = models.CharField(max_length=30)
    price = models.IntegerField()
    count = models.IntegerField()
    tid = models.IntegerField()
    reid = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'hw_goods'


class Goodsdetail(models.Model):
    did = models.AutoField(primary_key=True)
    title = models.CharField(max_length=30)
    content = models.CharField(max_length=100)
    goodname = models.CharField(max_length=200)

    class Meta:
        managed = False
        db_table = 'hw_goodsdetail'


class Imgs(models.Model):
    mid = models.AutoField(primary_key=True)
    imgurl = models.CharField(max_length=200)
    gid = models.IntegerField(blank=True, null=True)
    rid = models.IntegerField(blank=True, null=True)
    goodname = models.CharField(max_length=200)

    class Meta:
        managed = False
        db_table = 'hw_imgs'


class Manager(models.Model):
    mid = models.IntegerField(primary_key=True)
    password = models.CharField(max_length=45)
    email = models.CharField(max_length=45, blank=True, null=True)
    tel = models.IntegerField(blank=True, null=True)
    nickyname = models.CharField(max_length=45, blank=True, null=True)
    realname = models.CharField(max_length=45, blank=True, null=True)
    sex = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'hw_manager'


class Msgs(models.Model):
    msgid = models.AutoField(primary_key=True)
    title = models.CharField(max_length=30, blank=True, null=True)
    touid = models.IntegerField()
    msgtype = models.CharField(max_length=30, blank=True, null=True)
    content = models.CharField(max_length=300, blank=True, null=True)
    sendtime = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'hw_msgs'


class Orders(models.Model):
    oid = models.AutoField(primary_key=True)
    ordernum = models.CharField(max_length=30)
    ordtime = models.DateTimeField(blank=True, null=True)
    usepoints = models.IntegerField(blank=True, null=True)
    expressprice = models.IntegerField(blank=True, null=True)
    expressid = models.CharField(unique=True, max_length=30, blank=True, null=True)
    expresscom = models.CharField(max_length=30, blank=True, null=True)
    buynum = models.IntegerField(blank=True, null=True)
    isguarantee = models.IntegerField(blank=True, null=True)
    isreplace = models.IntegerField(blank=True, null=True)
    gid = models.IntegerField()
    uid = models.IntegerField()
    rid = models.IntegerField()
    status = models.CharField(max_length=30, blank=True, null=True)
    totalprice = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'hw_orders'


class Types(models.Model):
    tid = models.AutoField(primary_key=True)
    typename = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'hw_types'


class User(models.Model):
    uid = models.AutoField(primary_key=True)
    password = models.CharField(max_length=200)
    hwid = models.CharField(unique=True, max_length=50)
    email = models.CharField(unique=True, max_length=30, blank=True, null=True)
    tel = models.CharField(unique=True, max_length=11, blank=True, null=True)
    vipgrade = models.IntegerField(blank=True, null=True)
    nickyname = models.CharField(max_length=30)
    sex = models.IntegerField(blank=True, null=True)
    birth = models.DateField(blank=True, null=True)
    img = models.CharField(max_length=200, blank=True, null=True)
    realname = models.CharField(max_length=30, blank=True, null=True)
    points = models.IntegerField(blank=True, null=True)
    regtime = models.DateTimeField(blank=True, null=True)
    addr = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'hw_user'
