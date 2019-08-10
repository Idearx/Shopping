from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request,'common/huawei.html')


def detail(request):
    return render(request,'common/detailnew2.html',context={
        'title':'华为P30',
    })


def login(request):
    return render(request,'common/hualogin.html',context={
        'title':'为华-登录'
    })