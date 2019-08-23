from django.conf.urls import url

from Admin import views

urlpatterns=[
    url(r'^$', views.index, name='index'),
    url(r'^login/$', views.manager_login, name='manager_login'),
    url(r'^logout/$', views.logout, name='logout'),
    url(r'^store/$', views.store, name='store'),
    url(r'^store1/(\d+)/$', views.store, name='store1'),
    url(r'^orders/$', views.orders, name='orders'),
    url(r'^orders1/(\d+)$', views.orders, name='orders1'),
    url(r'^finance/$', views.finance, name='finance'),
    url(r'^customs/$', views.customs, name='customs'),
    url(r'^customs1/(\d+)/$', views.customs, name='customs1'),
    url(r'^comments/$', views.comments, name='comments'),
    url(r'^comments1/(\d+)$', views.comments, name='comments1'),
]