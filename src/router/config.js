// 前台路由
import Article from '@/view/front/articlelist/articlelist';
import ArticleDetail from '@/view/front/articledetail/articledetail';

// 后台路由
import sortList from '@/view/admin/sort/sortList/sortList'
import sortAdd from '@/view/admin/sort/sortAdd/sortAdd'
import articleList from '@/view/admin/article/articleList/articleList'
import articleAdd from '@/view/admin/article/articleAdd/articleAdd'

export const routerConfig = [
    {
        path: '/front/articlelist',
        component: Article,
        title: '文章列表',
        name: 'index',
        auth: true,
        index: ['1'],
        subIndex: ['']
    },
    {
        path: '/front/articledetail',
        component: ArticleDetail,
        title: '文章详情',
        name: 'index',
        auth: true,
        index: ['1'],
        subIndex: ['']
    },
    {
        path: '/admin/sortList',
        component: sortList,
        subtitle: `分类\xa0\xa0/\xa0\xa0分类列表\xa0\xa0/\xa0\xa0`,
        title: '分类列表',
        auth: true,
        name: 'login',
        index: ['1'],
        subIndex: ['sub1']
    },
    {
        path: '/admin/sortAdd',
        component: sortAdd,
        subtitle: `分类\xa0\xa0/\xa0\xa0添加分类\xa0\xa0/\xa0\xa0`,
        title: '添加分类',
        auth: true,
        index: ['2'],
        subIndex: ['sub1']
    },
    {
        path: '/admin/articlelist',
        component: articleList,
        subtitle: `平台首页\xa0\xa0/\xa0\xa0企业管理\xa0\xa0/\xa0\xa0`,
        title: '申请管理',
        name: 'login',
        auth: true,
        index: ['3'],
        subIndex: ['sub2']
    }, 
    {
        path: '/admin/articleadd',
        component: articleAdd,
        subtitle: `平台首页\xa0\xa0/\xa0\xa0企业管理\xa0\xa0/\xa0\xa0`,
        title: '测试管理',
        name: 'login',
        auth: true,
        index: ['4'],
        subIndex: ['sub2']
    },
]