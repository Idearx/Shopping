from django.db import models

# Create your models here.
# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
# from __future__ import unicode_literals

from django.db import models


class Addrs(models.Model):
    rid = models.AutoField(primary_key=True)
    addr = models.CharField(max_length=50)
    receivername = models.CharField(max_length=30, blank=True, null=True)
    receivertel = models.CharField(max_length=11, blank=True, null=True)
    isdefault = models.IntegerField(blank=True, null=True)
    uid = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'hw_addrs'


class Cart(models.Model):
    cid = models.AutoField(primary_key=True)
    gid = models.IntegerField()
    buynum = models.IntegerField(blank=True, null=True)
    isbuy = models.IntegerField(blank=True, null=True)
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

    class Meta:
        managed = False
        db_table = 'hw_goods'


class Goodsdetail(models.Model):
    did = models.AutoField(primary_key=True)
    title = models.CharField(max_length=30)
    content = models.CharField(max_length=100)
    gid = models.IntegerField()

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

    class Meta:
        managed = False
        db_table = 'hw_user'