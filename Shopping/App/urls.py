from django.conf.urls import url

from App import views

urlpatterns=[
    url(r'^$',views.index,name='index'),
    url(r'^detail/$',views.detail,name='detail'),
    url(r'^login/$',views.login,name='login'),
    url(r'^login_phone/$',views.login_phone,name='login_phone'),
    url(r'^car/$',views.car,name='car'),
    url(r'^logout/$',views.logout,name='logout'),
    url(r'^register_phone/$', views.register_phone, name='register_phone'),
    url(r'^register_email/$', views.register_email, name='register_email'),
    url(r'^generate_yzm/$',views.generate_yzm,name='generate_yzm'),
    url(r'^order/$',views.order,name='order')
]