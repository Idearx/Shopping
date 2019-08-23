import datetime
import hashlib

from django.core.paginator import Paginator
from django.shortcuts import render

# Create your views here.
from App.models import *
from Shopping.settings import COUNTOFPAGE, PAGERANGE


def manager_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        admin = Manager.objects.filter(tel=username).first()
        print(admin.mid)
        if admin:
            if admin.password == password:
                request.session['admin'] = admin.nickyname
                print(admin.nickyname)
                return render(request, 'admin/index.html', locals())
    return render(request, 'admin/manager_login.html', locals())


def logout(request):
    request.session.pop('admin')
    return render(request, 'admin/manager_login.html', locals())


def index(request):
    orders = Orders.objects.all()
    order_count = len(orders)
    users = User.objects.all()
    user_count = len(users)
    goods = Goods.objects.all()
    good_count = len(goods)
    comments = Comments.objects.all()
    comment_count = len(comments)
    types = Types.objects.all()
    type_count = len(types)
    return render(request, 'admin/index.html', locals())


def store(request, page='1'):
    goods = Goods.objects.filter().all()
    if request.method == 'POST':
        print(222)
        if request.POST.get('0') == '1':
            print(11)
            good = Goods()
            good.goodcode = request.POST.get('code0')
            good.goodname = request.POST.get('name0')
            good.color = request.POST.get('color0')
            good.versions = request.POST.get('version0')
            good.price = int(request.POST.get('price0'))
            good.count = int(request.POST.get('count0'))
            good.save()
        if request.POST.get('submit') == '提交':
            print(333)
            for good in goods:
                print(6666)
                print(request.POST.get(str(good.gid)))
                if request.POST.get(str(good.gid)) == '1':
                    print(555)
                    good.goodcode = request.POST.get('code'+str(good.gid))
                    good.goodname = request.POST.get('name'+str(good.gid))
                    good.color = request.POST.get('color'+str(good.gid))
                    good.versions = request.POST.get('version'+str(good.gid))
                    good.price = int(request.POST.get('price'+str(good.gid)))
                    good.count = int(request.POST.get('count'+str(good.gid)))
                    good.save()
        elif request.POST.get('submit') == '删除':
            print(444)
            for good in goods:
                if request.POST.get(str(good.gid)) == '1':
                    print(good.gid)
                    good.delete()
    goods = Goods.objects.all()
    paginator = Paginator(goods, COUNTOFPAGE)
    page = int(page)
    # 参数是当前的页码
    pager = paginator.page(page)
    if paginator.num_pages > PAGERANGE:
        if page - 5 <= 0:
            my_page_range = range(1, 11)
        elif page + 4 > paginator.num_pages:
            my_page_range = range(paginator.num_pages - 9, paginator.num_pages + 1)
        else:
            my_page_range = range(page - 5, page + 5)
    else:
        my_page_range = paginator.page_range
    pager.page_range = my_page_range

    return render(request, 'admin/store.html', locals())



def orders(request, page='1'):
    orders = Orders.objects.filter().all()
    if request.method == 'POST':
        print(222)
        if request.POST.get('0') == '1':
            print(11)
            order = Orders()
            order.ordernum = request.POST.get('num0')
            order.gid = int(request.POST.get('gid0'))
            order.buynum = int(request.POST.get('buy0'))
            order.totalprice = int(request.POST.get('total0'))
            order.expressprice = int(request.POST.get('price0'))
            order.status = request.POST.get('status0')
            order.save()
        if request.POST.get('submit') == '提交':
            print(333)
            for order in orders:
                print(6666)
                print(request.POST.get(str(order.oid)))
                if request.POST.get(str(order.oid)) == '1':
                    print(555)
                    order.ordernum = request.POST.get('num'+str(order.oid))
                    order.gid = int(request.POST.get('gid'+str(order.oid)))
                    order.buynum = int(request.POST.get('buy'+str(order.oid)))
                    order.totalprice = int(request.POST.get('total'+str(order.oid)))
                    order.expressprice = int(request.POST.get('price')+str(order.oid))
                    order.status = request.POST.get('status')+str(order.oid)
                    order.save()
        elif request.POST.get('submit') == '删除':
            print(444)
            for order in orders:
                if request.POST.get(str(order.oid)) == '1':
                    print(order.oid)
                    order.delete()
    orders = Orders.objects.all()
    paginator = Paginator(orders, COUNTOFPAGE)

    page = int(page)
    # 参数是当前的页码
    pager = paginator.page(page)
    if paginator.num_pages > PAGERANGE:
        if page - 5 <= 0:
            my_page_range = range(1, 11)
        elif page + 4 > paginator.num_pages:
            my_page_range = range(paginator.num_pages - 9, paginator.num_pages + 1)
        else:
            my_page_range = range(page - 5, page + 5)
    else:
        my_page_range = paginator.page_range
    pager.page_range = my_page_range
    return render(request, 'admin/order.html', locals())


def finance(request):
    return render(request, 'admin/finance.html', locals())


def customs(request, page='1'):
    users = User.objects.filter().all()
    if request.method == 'POST':
        print(222)
        if request.POST.get('0') == '1':
            print(11)
            user = User()
            user.hwid = request.POST.get('hwid0')
            pas = request.POST.get('password0')
            user.password = hashlib.sha1(pas.encode('utf-8')).hexdigest()
            user.email = request.POST.get('email0')
            user.tel = request.POST.get('tel0')
            user.vipgrade = int(request.POST.get('vip0'))
            user.nickyname = request.POST.get('nickyname0')
            user.realname = request.POST.get('realname0')
            sex = request.POST.get('sex0')
            if sex == '男':
                user.sex = 1
            elif sex == '女':
                user.sex = 2
            else:
                user.sex = 0

            user.points = int(request.POST.get('points0'))
            print(request.POST.get('birth0'))
            user.regtime = datetime.datetime.now()
            user.save()
        if request.POST.get('submit') == '提交':
            print(333)
            for user in users:
                print(6666)
                print(request.POST.get(str(user.uid)))
                if request.POST.get(str(user.uid)) == '1':
                    print(555)
                    user.hwid = request.POST.get('hwid'+str(user.uid))
                    pas = request.POST.get('password'+str(user.uid))
                    user.password = hashlib.sha1(pas.encode('utf-8')).hexdigest()
                    user.email = request.POST.get('email'+str(user.uid))
                    user.tel = request.POST.get('tel'+str(user.uid))
                    user.vipgrade = int(request.POST.get('vip'+str(user.uid)))
                    user.nickyname = request.POST.get('nickyname'+str(user.uid))
                    user.realname = request.POST.get('realname'+str(user.uid))
                    sex = request.POST.get('sex'+str(user.uid))
                    if sex == '男':
                        user.sex = 1
                    elif sex == '女':
                        user.sex = 2
                    else:
                        user.sex = 0
                    # user.birth = datetime.date(request.POST.get('birth'+str(user.uid)))
                    user.points = int(request.POST.get('points'+str(user.uid)))
                    # user.regtime = datetime.datetime(request.POST.get('regtime'+str(user.uid)))

                    user.save()
        elif request.POST.get('submit') == '删除':
            print(444)
            for user in users:
                if request.POST.get(str(user.uid)) == '1':
                    print(user.uid)
                    user.delete()
    users = User.objects.all()
    paginator = Paginator(users, COUNTOFPAGE)

    page = int(page)
    # 参数是当前的页码
    pager = paginator.page(page)
    if paginator.num_pages > PAGERANGE:
        if page - 5 <= 0:
            my_page_range = range(1, 11)
        elif page + 4 > paginator.num_pages:
            my_page_range = range(paginator.num_pages - 9, paginator.num_pages + 1)
        else:
            my_page_range = range(page - 5, page + 5)
    else:
        my_page_range = paginator.page_range
    pager.page_range = my_page_range

    return render(request, 'admin/custom.html', locals())


def comments(request, page='1'):
    comments = Comments.objects.filter().all()
    if request.method == 'POST':
        print(222)
        if request.POST.get('0') == '1':
            print(11)
            comment = Comments()
            comment.comid = int(request.POST.get('id0'))
            comment.uid = int(request.POST.get('uid0'))
            comment.content = request.POST.get('content0')
            comment.gid = int(request.POST.get('gid0'))
            comment.goodname = request.POST.get('gname0')
            comment.greatnum = int(request.POST.get('grate0'))
            comment.save()
        if request.POST.get('submit') == '提交':
            print(333)
            for comment in comments:
                print(6666)
                print(request.POST.get(str(comment.comid)))
                if request.POST.get(str(comment.comid)) == '1':
                    print(555)
                    comment.comid = int(request.POST.get('id'+str(comment.comid)))
                    comment.uid = int(request.POST.get('uid'+str(comment.comid)))
                    comment.content = request.POST.get('content'+str(comment.comid))
                    comment.gid = int(request.POST.get('gid'+str(comment.comid)))
                    comment.goodname = request.POST.get('gname'+str(comment.comid))
                    comment.greatnum = int(request.POST.get('grate'+str(comment.comid)))
                    comment.save()
        elif request.POST.get('submit') == '删除':
            print(444)
            for comment in comments:
                if request.POST.get(str(comment.comid)) == '1':
                    print(comment.comid)
                    comment.delete()
    comments = Comments.objects.all()
    paginator = Paginator(comments, COUNTOFPAGE)
    page = int(page)
    # 参数是当前的页码
    pager = paginator.page(page)
    if paginator.num_pages > PAGERANGE:
        if page - 5 <= 0:
            my_page_range = range(1, 11)
        elif page + 4 > paginator.num_pages:
            my_page_range = range(paginator.num_pages - 9, paginator.num_pages + 1)
        else:
            my_page_range = range(page - 5, page + 5)
    else:
        my_page_range = paginator.page_range
    pager.page_range = my_page_range
    for comment in comments:
        print(comment.greatnum)
    return render(request, 'admin/comment.html', locals())


