from django.shortcuts import render, redirect

# Create your views here.
from django.urls import reverse

from Shopping.settings import MAXAGE


def index(request):
    return render(request, 'common/huawei.html')


def detail(request):
    return render(request, 'common/detailnew2.html', context={
        'title': '华为P30',
    })


def login(request):
    if request.method == 'POST':
        # 获取数据
        username = request.POST.get('username')
        password = request.POST.get('password')
        print(username, password)
        # 验证
        if username == 'oooo' and password == '123':
            response = redirect(reverse('app:index'))
            # response.set_cookie('username',username,max_age=MAXAGE)
            request.session['username'] = username
            request.session.set_expiry(MAXAGE)
            return response
        else:
            print('2', username, password)
            return render(request, 'common/hualogin.html', context={
                'title': '为华-登录',
                'testid': 1
            })
    return render(request, 'common/hualogin.html', context={
        'title': '为华-登录',
        'testid': 0
    })


def car(request):
    return render(request, 'common/shopping_car.html', context={
        'title': '为华-购物车'
    })


def logout(request):
    response =  redirect(reverse('app:index'))
    request.session.flush()
    return response