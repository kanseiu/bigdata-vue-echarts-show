import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/homepage.vue';
import job1 from '@/components/job1';
import job2 from '@/components/job2';
import job3 from '@/components/job3';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
    },
    {
        path: '/job1',
        name: 'job1',
        component: job1,
    },
    {
        path: '/job2',
        name: 'job2',
        component: job2,
    },
    {
        path: '/job3',
        name: 'job3',
        component: job3,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
