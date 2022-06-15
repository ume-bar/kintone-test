import { Plugin } from '@nuxt/types';
import { initializeAxios } from '~/lib/axios';

export const accessor: Plugin = ({ $axios }): void => {
    initializeAxios($axios);
};

export default accessor;
